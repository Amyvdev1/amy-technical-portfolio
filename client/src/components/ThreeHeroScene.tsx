import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function DataPath({ points, color }: { points: [number, number, number][]; color: string }) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, 0.018, 8, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.72} />
    </mesh>
  );
}

function Signal({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const signal = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + delay;
    if (signal.current) {
      const pulse = 0.82 + Math.sin(time * 2.3) * 0.18;
      signal.current.scale.setScalar(pulse);
    }
  });
  return (
    <mesh ref={signal} position={position}>
      <sphereGeometry args={[0.085, 20, 20]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (event: PointerEvent) => {
      mouse.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("pointermove", updateMouse, { passive: true });
    return () => window.removeEventListener("pointermove", updateMouse);
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    const motion = reducedMotion ? 0 : 1;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.32 + mouse.current.x * 0.48, 0.035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.18 - mouse.current.y * 0.23, 0.035);
    group.current.position.y = Math.sin(time * 0.65) * 0.07 * motion;
  });

  return (
    <group ref={group} position={[1.5, -0.05, 0]} rotation={[0.18, -0.32, 0.05]}>
      <Float speed={reducedMotion ? 0 : 1.15} rotationIntensity={reducedMotion ? 0 : 0.18} floatIntensity={reducedMotion ? 0 : 0.35}>
        <RoundedBox args={[2.9, 0.16, 1.76]} radius={0.08} smoothness={6} position={[0, -0.74, 0.05]}>
          <meshStandardMaterial color="#0b2146" roughness={0.22} metalness={0.72} />
        </RoundedBox>
        <RoundedBox args={[2.28, 0.07, 1.22]} radius={0.06} smoothness={6} position={[-0.16, -0.51, 0.28]} rotation={[0.01, 0, -0.04]}>
          <meshStandardMaterial color="#133879" roughness={0.18} metalness={0.65} />
        </RoundedBox>
        <RoundedBox args={[0.82, 1.46, 0.09]} radius={0.06} smoothness={6} position={[-0.64, 0.02, 0.16]} rotation={[0, 0.1, 0.02]}>
          <MeshTransmissionMaterial thickness={0.17} roughness={0.08} transmission={0.94} ior={1.2} chromaticAberration={0.08} anisotropy={0.25} color="#3d93ff" />
        </RoundedBox>
        <RoundedBox args={[0.94, 1.68, 0.075]} radius={0.06} smoothness={6} position={[0.2, 0.24, -0.03]} rotation={[0, -0.11, 0.02]}>
          <MeshTransmissionMaterial thickness={0.14} roughness={0.04} transmission={0.92} ior={1.19} chromaticAberration={0.12} color="#5ba2ff" />
        </RoundedBox>
        <RoundedBox args={[0.59, 1.06, 0.09]} radius={0.05} smoothness={6} position={[0.86, 0.06, 0.21]} rotation={[0, 0.1, -0.02]}>
          <MeshTransmissionMaterial thickness={0.15} roughness={0.05} transmission={0.92} ior={1.2} chromaticAberration={0.08} color="#94c4ff" />
        </RoundedBox>
        <RoundedBox args={[0.66, 0.29, 0.34]} radius={0.05} smoothness={6} position={[-1.12, 0.76, 0.08]}>
          <meshStandardMaterial color="#173976" roughness={0.2} metalness={0.75} />
        </RoundedBox>
        <RoundedBox args={[0.48, 0.22, 0.33]} radius={0.05} smoothness={6} position={[0.95, 0.93, 0.02]}>
          <meshStandardMaterial color="#c99a58" roughness={0.25} metalness={0.85} />
        </RoundedBox>
      </Float>
      <DataPath color="#72b4ff" points={[[-1.16, 0.78, 0.29], [-0.92, 0.42, 0.3], [-0.5, 0.05, 0.36], [0.16, 0.31, 0.32]]} />
      <DataPath color="#b7dcff" points={[[0.15, 0.31, 0.3], [0.51, -0.1, 0.36], [0.86, 0.05, 0.36], [1.01, 0.84, 0.28]]} />
      <DataPath color="#e4b669" points={[[0.07, -0.5, 0.34], [0.56, -0.3, 0.38], [0.9, -0.56, 0.26], [1.24, -0.2, 0.15]]} />
      <Signal position={[-1.15, 0.79, 0.3]} color="#9bc8ff" delay={0} />
      <Signal position={[0.17, 0.31, 0.36]} color="#e7b164" delay={0.7} />
      <Signal position={[1.01, 0.84, 0.29]} color="#d9edff" delay={1.2} />
      <Signal position={[1.24, -0.2, 0.16]} color="#e7b164" delay={1.8} />
      <pointLight position={[0.3, 0.9, 2.2]} intensity={11} color="#7eb1ff" distance={5.5} />
      <pointLight position={[1.2, -0.15, 1.8]} intensity={5} color="#e7b164" distance={4} />
    </group>
  );
}

export default function ThreeHeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-three" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0.08, 5.1], fov: 39 }}>
        <ambientLight intensity={0.85} color="#99bfff" />
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
