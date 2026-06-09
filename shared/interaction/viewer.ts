import * as THREE from "three";
import { createScene, type SceneContext } from "@shared/scene/scene";
import { t, onLangChange } from "@locales/index";
import { InfoPanel } from "@shared/ui/panel";
import type { ExplodePart, ModelModule, PartInfoMap } from "@shared/model";
import "@shared/styles/viewer.css";

const HIGHLIGHT = 0x2a4d8f;

/**
 * 공통 3D 뷰어 — 어떤 모델(ModelModule)이든 받아 동일하게 동작시킨다.
 * 회전(드래그) · 분해(스크롤/핀치/슬라이더) · 카메라 자동 프레이밍 · 클릭 선택 · 정보 패널.
 * 모델별로 다른 건 형상(build)과 부품 설명(info)뿐. (hbm-3d.html 프로토타입을 일반화)
 *
 * Three.js에 의존하므로 앱은 이 모듈을 동적 import 해서 초기 번들에서 분리한다.
 */
export class Viewer {
  private ctx: SceneContext;
  private info: PartInfoMap;
  private parts: ExplodePart[];
  private pickables: THREE.Object3D[];
  private root: THREE.Object3D;
  private modelUpdate?: (t: number) => void;

  private pivotY: number;
  private spread: number;

  // 카메라 궤도 / 분해 상태
  private theta = 0.7;
  private phi = 1.15;
  private autoRotate = false;
  private curT = 0;
  private targetT = 0;
  private readonly margin = 1.15;

  // 피킹
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private selected: THREE.Mesh | null = null;

  // 프레이밍 재사용 객체
  private box = new THREE.Box3();
  private sphere = new THREE.Sphere();

  // DOM
  private panel: InfoPanel;
  private slider!: HTMLInputElement;
  private rotateBtn!: HTMLButtonElement;
  private hintEl!: HTMLElement;
  private loEl!: HTMLElement;
  private hiEl!: HTMLElement;

  private unsubLang: () => void;

  // 입력 상태
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private downT = 0;
  private moved = 0;
  private pinchStart = 0;
  private pinchT = 0;
  private tapX = 0;
  private tapY = 0;

  constructor(
    private mount: HTMLElement,
    model: ModelModule,
  ) {
    this.ctx = createScene(mount);
    this.info = model.info;

    const built = model.build({ scene: this.ctx.scene });
    this.root = built.root;
    this.parts = built.parts;
    this.pickables = built.pickables;
    this.modelUpdate = built.update;
    this.spread = built.spread ?? 1.4;
    this.pivotY =
      built.pivotY ??
      (this.parts.length ? this.parts.reduce((s, p) => s + p.baseY, 0) / this.parts.length : 0);
    this.ctx.scene.add(this.root);

    this.panel = new InfoPanel(mount, () => this.deselect());
    this.buildChrome();
    this.attachInput();
    this.relocalize();

    this.ctx.onFrame((dt) => this.update(dt));
    this.unsubLang = onLangChange(() => this.relocalize());
  }

  // ── 오버레이 크롬 (버튼 · 슬라이더 · 힌트) ──────────────
  private buildChrome(): void {
    const top = document.createElement("div");
    top.className = "v-topright";
    this.rotateBtn = document.createElement("button");
    this.rotateBtn.className = "v-btn";
    const resetBtn = document.createElement("button");
    resetBtn.className = "v-btn";
    top.append(this.rotateBtn, resetBtn);

    const bottom = document.createElement("div");
    bottom.className = "v-bottom";
    this.hintEl = document.createElement("div");
    this.hintEl.className = "v-hint";
    const wrap = document.createElement("div");
    wrap.className = "v-slider-wrap";
    this.loEl = document.createElement("span");
    this.hiEl = document.createElement("span");
    this.slider = document.createElement("input");
    this.slider.type = "range";
    this.slider.min = "0";
    this.slider.max = "100";
    this.slider.value = "0";
    wrap.append(this.loEl, this.slider, this.hiEl);
    bottom.append(this.hintEl, wrap);

    this.mount.append(top, bottom);

    this.slider.addEventListener("input", () => {
      this.targetT = Number(this.slider.value) / 100;
    });
    resetBtn.addEventListener("click", () => this.reset());
    this.rotateBtn.addEventListener("click", () => {
      this.autoRotate = !this.autoRotate;
      this.rotateBtn.classList.toggle("on", this.autoRotate);
    });
  }

  /** 언어 변경 시 크롬 라벨 + 패널 내용을 다시 그린다. */
  private relocalize(): void {
    const v = t().viewer;
    this.rotateBtn.textContent = v.autoRotate;
    (this.rotateBtn.nextElementSibling as HTMLElement).textContent = v.reset;
    this.hintEl.textContent = v.hint;
    this.loEl.textContent = v.assemble;
    this.hiEl.textContent = v.explode;
    this.panel.relocalize();
  }

  // ── 입력(마우스 · 휠 · 터치) ───────────────────────────
  private attachInput(): void {
    const el = this.ctx.renderer.domElement;
    el.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
    el.addEventListener("wheel", this.onWheel, { passive: false });
    el.addEventListener("touchstart", this.onTouchStart, { passive: false });
    el.addEventListener("touchmove", this.onTouchMove, { passive: false });
    el.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }

  private clampPhi(): void {
    this.phi = Math.max(0.18, Math.min(Math.PI - 0.18, this.phi));
  }
  private clamp01(v: number): number {
    return Math.max(0, Math.min(1, v));
  }
  private syncSlider(): void {
    this.slider.value = String(Math.round(this.targetT * 100));
  }

  private onMouseDown = (e: MouseEvent): void => {
    this.dragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.downT = performance.now();
    this.moved = 0;
  };
  private onMouseMove = (e: MouseEvent): void => {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.moved += Math.abs(dx) + Math.abs(dy);
    this.theta -= dx * 0.005;
    this.phi -= dy * 0.005;
    this.clampPhi();
  };
  private onMouseUp = (e: MouseEvent): void => {
    if (this.dragging && this.moved < 6 && performance.now() - this.downT < 350) {
      this.pick(e.clientX, e.clientY);
    }
    this.dragging = false;
  };
  private onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    this.targetT = this.clamp01(this.targetT + -e.deltaY * 0.0012);
    this.syncSlider();
  };

  private touchDist(e: TouchEvent): number {
    const a = e.touches[0];
    const b = e.touches[1];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }
  private onTouchStart = (e: TouchEvent): void => {
    if (e.touches.length === 1) {
      const tch = e.touches[0];
      this.dragging = true;
      this.lastX = tch.clientX;
      this.lastY = tch.clientY;
      this.tapX = tch.clientX;
      this.tapY = tch.clientY;
      this.downT = performance.now();
      this.moved = 0;
    } else if (e.touches.length === 2) {
      this.dragging = false;
      this.pinchStart = this.touchDist(e);
      this.pinchT = this.targetT;
    }
  };
  private onTouchMove = (e: TouchEvent): void => {
    e.preventDefault();
    if (e.touches.length === 1 && this.dragging) {
      const tch = e.touches[0];
      const dx = tch.clientX - this.lastX;
      const dy = tch.clientY - this.lastY;
      this.lastX = tch.clientX;
      this.lastY = tch.clientY;
      this.moved += Math.abs(dx) + Math.abs(dy);
      this.theta -= dx * 0.005;
      this.phi -= dy * 0.005;
      this.clampPhi();
    } else if (e.touches.length === 2) {
      this.targetT = this.clamp01(this.pinchT + (this.touchDist(e) - this.pinchStart) * 0.004);
      this.syncSlider();
    }
  };
  private onTouchEnd = (e: TouchEvent): void => {
    if (this.dragging && e.touches.length === 0 && this.moved < 8 && performance.now() - this.downT < 350) {
      this.pick(this.tapX, this.tapY);
    }
    if (e.touches.length === 0) this.dragging = false;
  };

  // ── 분해 + 카메라 (매 프레임) ──────────────────────────
  private explodeY(baseY: number): number {
    return this.pivotY + (baseY - this.pivotY) * (1 + this.spread * this.curT);
  }
  private update(dt: number): void {
    this.curT += (this.targetT - this.curT) * 0.12;
    if (Math.abs(this.targetT - this.curT) < 0.0005) this.curT = this.targetT;

    for (const p of this.parts) p.group.position.y = this.explodeY(p.baseY);
    this.modelUpdate?.(this.curT);

    if (this.autoRotate) this.theta += dt * 0.18;
    this.frameCamera();
  }
  private frameCamera(): void {
    const cam = this.ctx.camera;
    this.box.setFromObject(this.root);
    this.box.getBoundingSphere(this.sphere);
    const c = this.sphere.center;
    const radius = this.sphere.radius || 1;
    const vF = (cam.fov * Math.PI) / 180;
    const hF = 2 * Math.atan(Math.tan(vF / 2) * cam.aspect);
    const dist = (radius / Math.sin(Math.min(vF, hF) / 2)) * this.margin;
    const sp = Math.sin(this.phi);
    const cp = Math.cos(this.phi);
    cam.position.set(
      c.x + dist * sp * Math.sin(this.theta),
      c.y + dist * cp,
      c.z + dist * sp * Math.cos(this.theta),
    );
    cam.lookAt(c);
  }

  // ── 피킹 / 선택 ────────────────────────────────────────
  private pick(clientX: number, clientY: number): void {
    const el = this.ctx.renderer.domElement;
    const r = el.getBoundingClientRect();
    this.pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
    this.pointer.y = -((clientY - r.top) / r.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.ctx.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, false);
    if (hits.length) this.select(hits[0].object as THREE.Mesh);
    else this.deselect();
  }
  private select(mesh: THREE.Mesh): void {
    if (this.selected && this.selected !== mesh) this.restoreEmissive(this.selected);
    this.selected = mesh;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (mesh.userData.emiOrig === undefined) {
      mesh.userData.emiOrig = mat.emissive.getHex();
      mesh.userData.eiOrig = mat.emissiveIntensity;
    }
    mat.emissive.setHex(HIGHLIGHT);
    mat.emissiveIntensity = 0.95;
    const info = this.info[mesh.userData.id as string];
    if (info) this.panel.show(info, mesh.userData.layer as number | undefined);
  }
  private restoreEmissive(mesh: THREE.Mesh): void {
    if (mesh.userData.emiOrig !== undefined) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissive.setHex(mesh.userData.emiOrig);
      mat.emissiveIntensity = mesh.userData.eiOrig;
    }
  }
  private deselect(): void {
    if (this.selected) this.restoreEmissive(this.selected);
    this.selected = null;
    this.panel.hide();
  }

  private reset(): void {
    this.theta = 0.7;
    this.phi = 1.15;
    this.targetT = 0;
    this.autoRotate = false;
    this.rotateBtn.classList.remove("on");
    this.syncSlider();
    this.deselect();
  }

  // ── 정리 ───────────────────────────────────────────────
  dispose(): void {
    const el = this.ctx.renderer.domElement;
    el.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    el.removeEventListener("wheel", this.onWheel);
    el.removeEventListener("touchstart", this.onTouchStart);
    el.removeEventListener("touchmove", this.onTouchMove);
    el.removeEventListener("touchend", this.onTouchEnd);
    this.unsubLang();
    this.panel.dispose();
    this.mount.querySelectorAll(".v-topright, .v-bottom").forEach((n) => n.remove());

    this.root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    this.ctx.dispose();
  }
}
