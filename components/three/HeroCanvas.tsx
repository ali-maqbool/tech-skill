// No "use client" directive — loaded via next/dynamic({ ssr: false })

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Two canvases:
//
//  1. StarsCanvas     — full-screen, stars only, very slow smooth animation.
//  2. OctahedronCanvas — small box pinned to the LEFT side, vertically
//                        centred at ~30% from the top so it sits in the
//                        left margin well away from the headline text.
// ---------------------------------------------------------------------------

// ── 1. Stars — full-screen, slow & smooth ────────────────────────────────────
function StarsCanvas() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
    >
      {/*
        speed={0.15} — very slow, smooth drift
        count reduced to 2000 for performance
        saturation kept at 0 (white stars matching brand)
      */}
      <Stars
        radius={100}
        depth={60}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={4}
      />
    </Canvas>
  );
}

// ── 2. Octahedron — left side, slightly above centre ─────────────────────────
function OctahedronMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.002;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshBasicMaterial color="#00aaff" wireframe />
    </mesh>
  );
}

function OctahedronCanvas() {
  return (
    <Canvas
      style={{
        position: "absolute",
        // same X column as before (left edge), shifted up ~30% from top
        left: 0,
        top: "30%",
        width:  "clamp(140px, 20vw, 260px)",
        height: "clamp(140px, 20vw, 260px)",
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 3], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
        <OctahedronMesh />
      </Float>
    </Canvas>
  );
}

// ---------------------------------------------------------------------------
// HeroCanvas — exported wrapper
// ---------------------------------------------------------------------------
export default function HeroCanvas() {
  return (
    <>
      <StarsCanvas />
      <OctahedronCanvas />
    </>
  );
}
