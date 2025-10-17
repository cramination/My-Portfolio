import { Html } from "@react-three/drei";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState, useEffect } from "react";

export default function Screen({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { RiveComponent, rive } = useRive({
    src: "./assets/Resume_button.riv",
    autoplay: true,
    stateMachines: "State Machine 1",
    fit: "contain",
  });

  const clickInput = useStateMachineInput(rive, "State Machine 1", "Click");

  const aspect = 16 / 9;
  const height = 6 * scale;
  const width = height * aspect;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const handleClick = () => {
    rive?.play();
    clickInput?.fire();

    // Get the click animation duration
    const animation = rive?.artboard?.animations?.find(a => a.name === "Click");
    const durationMs = animation ? animation.duration * 1000 : 1000; // fallback 1s

    setTimeout(() => {
      window.open("/even-Newer-site/assets/Resume.pdf", "_blank");
    }, durationMs);
  };

  return (
    <group position={position} rotation={rotation} scale={scale}>
  

      <Html
        transform
        center
        occlude={false}
        distanceFactor={1}
        style={{
          width: `${width * 50}px`,
          height: `${height * 50}px`,
          pointerEvents: "auto",
        }}
      >
        <div
          onPointerDown={handleClick}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <RiveComponent style={{ width: "100%", height: "100%", background: "transparent" }} />
        </div>
      </Html>
    </group>
  );
}
