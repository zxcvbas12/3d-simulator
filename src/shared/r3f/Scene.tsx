import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";
import { useAppStore } from "../state/store";

/**
 * 2단계 부트스트랩용 R3F 씬 — 공통 <Viewer> 엔진(4단계)이 들어오기 전의 자리표시.
 * 검증 목적: R3F 렌더 · drei(OrbitControls) · zustand UI↔3D · 온디맨드 렌더 · 지연 청크 분리.
 * 렌더는 frameloop으로 제어 — 자동회전 중엔 always, 평소엔 demand(상호작용 시에만 렌더).
 */
function Placeholder() {
  const ref = useRef<THREE.Group>(null);
  const autoRotate = useAppStore((s) => s.autoRotate);

  useFrame((_, dt) => {
    if (autoRotate && ref.current) ref.current.rotation.y += dt * 0.5;
  });

  // 공학적 톤의 얇은 적층 판 (모델 형상은 4·5단계에서 들어온다)
  const layers = [0, 1, 2, 3];
  return (
    <group ref={ref}>
      {layers.map((i) => {
        const top = i === layers.length - 1;
        const w = 2.3 - i * 0.14;
        return (
          <mesh key={i} position={[0, i * 0.34 - 0.5, 0]} castShadow>
            <boxGeometry args={[w, 0.26, w]} />
            <meshStandardMaterial
              color={top ? "#a9762f" : "#33476b"}
              metalness={top ? 0.85 : 0.4}
              roughness={top ? 0.35 : 0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Scene() {
  const autoRotate = useAppStore((s) => s.autoRotate);
  return (
    <Canvas
      frameloop={autoRotate ? "always" : "demand"}
      dpr={[1, 1.5]}
      camera={{ position: [4, 3.2, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight args={[0xbcd0ff, 0x141821, 0.6]} />
      <directionalLight position={[7, 11, 7]} intensity={2.0} />
      <directionalLight position={[-9, 5, -8]} intensity={0.7} color="#88aaff" />
      <Placeholder />
      <OrbitControls makeDefault enablePan={false} minDistance={3} maxDistance={12} />
    </Canvas>
  );
}
