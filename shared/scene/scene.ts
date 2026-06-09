import * as THREE from "three";

/**
 * 모든 모델이 공유하는 Three.js 토대.
 * 씬·카메라·조명·렌더 루프·리사이즈만 담당하고, 모델 형상은 알지 못한다.
 * 회전/줌/분해/피킹 같은 인터랙션은 이후 shared/interaction에서 이 컨텍스트 위에 얹는다.
 */
export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  /** 매 프레임 호출될 콜백 등록 (dt = 직전 프레임과의 시간차, 초). */
  onFrame(cb: (dt: number) => void): void;
  /** 렌더 루프 중단 + 리스너/리소스 정리. 모델/뷰 전환 시 호출. */
  dispose(): void;
}

export function createScene(mount: HTMLElement): SceneContext {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(6, 5, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  mount.appendChild(renderer.domElement);

  // 차분한 조명: 하늘색 환경광 + 흰색 키 + 블루 필. (hbm-3d.html 프로토타입 톤)
  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x1a1d26, 0.95));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(7, 11, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x88aaff, 0.45);
  fill.position.set(-9, 4, -7);
  scene.add(fill);

  const frameCbs: Array<(dt: number) => void> = [];
  const clock = new THREE.Clock();
  let raf = 0;

  function resize() {
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  resize();
  window.addEventListener("resize", resize);

  function loop() {
    raf = requestAnimationFrame(loop);
    const dt = clock.getDelta();
    for (const cb of frameCbs) cb(dt);
    renderer.render(scene, camera);
  }
  loop();

  return {
    scene,
    camera,
    renderer,
    onFrame(cb) {
      frameCbs.push(cb);
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
