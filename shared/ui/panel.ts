import { t, getLang } from "@locales/index";
import type { PartInfo } from "@shared/model";

/**
 * 부품 정보 패널 — 오른쪽(모바일은 아래)에서 슬라이드인. (hbm-3d.html의 #panel 이식)
 * 선택된 부품의 다국어 설명을 표시하고, 언어가 바뀌면 현재 내용을 다시 그린다.
 * 패널은 뷰어 컨테이너(.viewer) 안에 마운트된다.
 */
export class InfoPanel {
  private el: HTMLElement;
  private tagEl: HTMLElement;
  private titleEl: HTMLElement;
  private bodyEl: HTMLElement;
  private current: { info: PartInfo; layer?: number } | null = null;

  constructor(mount: HTMLElement, onClose: () => void) {
    this.el = document.createElement("div");
    this.el.className = "v-panel";
    this.el.innerHTML = `
      <button class="v-panel-close" aria-label="close">×</button>
      <div class="v-panel-accent"></div>
      <div class="v-panel-tag"></div>
      <h2 class="v-panel-title"></h2>
      <div class="v-panel-body"></div>`;
    mount.appendChild(this.el);

    this.tagEl = this.el.querySelector(".v-panel-tag")!;
    this.titleEl = this.el.querySelector(".v-panel-title")!;
    this.bodyEl = this.el.querySelector(".v-panel-body")!;
    this.el.querySelector(".v-panel-close")!.addEventListener("click", onClose);
  }

  show(info: PartInfo, layer?: number): void {
    this.current = { info, layer };
    this.paint();
    this.el.classList.add("open");
  }

  hide(): void {
    this.current = null;
    this.el.classList.remove("open");
  }

  /** 언어 변경 시 현재 표시 중인 부품 내용을 다시 그린다. */
  relocalize(): void {
    if (this.current) this.paint();
  }

  private paint(): void {
    if (!this.current) return;
    const lang = getLang();
    const { info, layer } = this.current;
    this.tagEl.textContent =
      layer != null ? t().viewer.layerLabel.replace("{n}", String(layer)) : info.tag[lang];
    this.titleEl.textContent = info.title[lang];
    this.bodyEl.textContent = info.body[lang];
  }

  dispose(): void {
    this.el.remove();
  }
}
