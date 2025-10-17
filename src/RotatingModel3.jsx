import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import "./RotatingModel3.css"; // 👈 new stylesheet

function RotatingModelContent() {
  const { scene } = useGLTF("/My-Portfolio/my-r3f-rive-app/assets/Chair-model.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // rotate only on Y
    }
  });

  return <primitive ref={ref} object={scene} scale={10.5} />;
}

export default function RotatingModel() {
  return (
    <div className="rotating-model-container3">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          cursor: "grab",
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 5, 5]} />
        <RotatingModelContent />
        <Environment preset="sunset" environmentIntensity={0.2} />
      </Canvas>
    </div>
  );
}
