'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const random = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return value - Math.floor(value);
};

function Field() {
  const group = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 260;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.1 + random(i + 1) * 1.6;
      const angle = random(i + 401) * Math.PI * 2;
      const height = (random(i + 801) - 0.5) * 1.6;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = height;
      values[i * 3 + 2] = Math.sin(angle) * radius - 0.8;
    }
    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.035;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.04;
  });

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#37c2b6"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.4]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 3], fov: 55 }}
      style={{ pointerEvents: 'none' }}
    >
      <Field />
    </Canvas>
  );
}
