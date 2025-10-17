import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import "./RotatingModel2.css";
import "./main.css"; // 👈 import main.css for positioning

function RotatingModelContent() {
  const { scene } = useGLTF("/My-Portfolio/assets/Computer-case-compressed.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // rotate only on Y
    }
  });

  // Add click/tap handler directly on the 3D object
  return (
    <primitive
      ref={ref}
      object={scene}
      scale={10.5}
      onPointerDown={(e) => {
        e.stopPropagation(); // prevent other canvas events
        window.open("https://cramination.github.io/Computer_Demo/", "_blank");
      }}
    />
  );
}

export default function RotatingModel2() {
  return (
    <div className="rotating-model-container2">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          cursor: "grab", // cursor for desktop
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 5, 5]} />
        <RotatingModelContent />
        <Environment preset="sunset" environmentIntensity={0.5} />
      </Canvas>
    </div>
  );
}
