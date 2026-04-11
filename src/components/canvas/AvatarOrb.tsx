"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Morphing icosahedron orb that reacts to mouse
export default function AvatarOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Store original vertex positions for morphing
  const originalPositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, 64);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.6, 64);
  }, []);

  // Noise-based morph
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // Simple wave displacement
      const noise =
        Math.sin(ox * 2.5 + t * 0.7) * 0.08 +
        Math.sin(oy * 2.0 + t * 0.5) * 0.07 +
        Math.sin(oz * 3.0 + t * 0.9) * 0.05;

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const scale = (len + noise) / len;

      pos.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Mouse-driven tilt
    meshRef.current.rotation.y = t * 0.12 + mouse.x * 0.3;
    meshRef.current.rotation.x = mouse.y * -0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#3b0f7a"
        emissiveIntensity={0.6}
        roughness={0.25}
        metalness={0.6}
        wireframe={false}
      />
    </mesh>
  );
}
