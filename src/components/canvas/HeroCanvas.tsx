"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Stars } from "@react-three/drei";
import AvatarOrb from "./AvatarOrb";

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <AdaptiveDpr pixelated />

        {/* Ambient + directional lighting */}
        <ambientLight intensity={0.3} />
        <pointLight
          position={[4, 4, 4]}
          intensity={2.5}
          color="#7C3AED"
        />
        <pointLight
          position={[-4, -2, 3]}
          intensity={1.5}
          color="#00D4AA"
        />
        <pointLight
          position={[0, 6, -4]}
          intensity={1}
          color="#FF6B35"
        />

        {/* Background stars */}
        <Stars
          radius={80}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        <Suspense fallback={null}>
          <AvatarOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
