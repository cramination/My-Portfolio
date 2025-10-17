import React, { useRef, useMemo, useState, forwardRef, useImperativeHandle, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import Screen from "./Screen";

// ---------------- LOADING SCREEN ----------------
function LoadingScreen({ progress }) {
  return (
    <Html center>
      <div style={{
        color: "white",
        fontSize: "2rem",
        background: "rgba(0,0,0,0.7)",
        padding: "2rem",
        borderRadius: "1rem",
        textAlign: "center"
      }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// ---------------- ROTATING DIRECTIONAL LIGHT ----------------
function RotatingDirectionalLight({ position = [-5, 8, -19], radius = 10, speed = 0.01, intensity = 1.5, isActive = true }) {
  const lightRef = useRef();
  const targetRef = useRef();
  const angleRef = useRef(Math.PI / 13);
  const currentIntensity = useRef(0);

  useFrame((_, delta) => {
    if (!lightRef.current || !targetRef.current) return;

    if (isActive) angleRef.current -= speed;
    const x = position[0] + radius * Math.cos(angleRef.current);
    const z = position[2] + radius * Math.sin(angleRef.current);
    const y = position[1];
    targetRef.current.position.set(x, y, z);
    lightRef.current.target = targetRef.current;
    lightRef.current.target.updateMatrixWorld();

    const target = isActive ? intensity : 0;
    const fadeRate = 5;
    const diff = target - currentIntensity.current;
    const step = (diff / fadeRate) * delta * 60;
    currentIntensity.current += step;
    currentIntensity.current = Math.max(0, Math.min(intensity, currentIntensity.current));
    lightRef.current.intensity = currentIntensity.current;
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={position}
        intensity={0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-1}
        shadow-camera-right={1}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        layers={1}
      />
      <object3D ref={targetRef} />
    </>
  );
}

// ---------------- MODELS ----------------
const Model = forwardRef(({ path, layer = 0, ...props }, ref) => {
  const { scene } = useGLTF(path);
  scene.traverse(obj => {
    obj.layers.set(layer);
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.material.needsUpdate = true;
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
});

// ---------------- LAMP MODELS ----------------
function LampModel({ path, visible = true, ...props }) {
  const { scene } = useGLTF(path);
  scene.traverse(obj => {
    obj.layers.set(1);
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.material.needsUpdate = true;
    }
    obj.visible = visible;
  });
  return <primitive object={scene} {...props} />;
}

// ---------------- ANIMATED KNOB ----------------
const AnimatedKnob = forwardRef(({ toggleLight, ...props }, ref) => {
  const { scene, animations } = useGLTF("/My-Portfolio/assets/Lighthouse-model-switch_nob.glb");
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  useImperativeHandle(ref, () => ({
    playAnimation(forward = true) {
      if (!actions) return;
      const clipName = Object.keys(actions)[0];
      const action = actions[clipName];
      if (!action) return;

      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.paused = false;

      if (forward) {
        action.timeScale = 1;
        action.reset();
        action.play();
      } else {
        action.timeScale = -1;
        action.time = action.getClip().duration;
        action.play();
      }
    },
  }));

  return (
    <group ref={group} {...props} onClick={toggleLight} cursor="pointer">
      <primitive object={scene} />
    </group>
  );
});

// ---------------- TEXTURED CONE ----------------
function TexturedCone({ visible = true, ...props }) {
  const texture = useLoader(THREE.TextureLoader, "/My-Portfolio/assets/Lighthouse_cone (0-00-00-00).png");
  texture.center.set(0.5, 0.5);
  texture.rotation = (3 * Math.PI) / 2;

  const coneGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.25, 6, 32, 1, true);
    geo.translate(0, -3, 0);
    return geo;
  }, []);

  const ref = useRef();
  useFrame(() => {
    if (ref.current && visible) ref.current.rotation.z += 0.01;
  });

  return (
    <mesh
      ref={ref}
      visible={visible}
      geometry={coneGeo}
      rotation={[Math.PI / -1.9, 0, 0]}
      position={[-7, 6.9, -22.3]}
      {...props}
    >
      <meshStandardMaterial
        map={texture}
        transparent
        emissive="yellow"
        emissiveIntensity={1.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------- SCENE ----------------
const Scene = () => {
  const [isLampOn, setIsLampOn] = useState(true); // Everything ON initially
  const knobRef = useRef();
  const modelRef = useRef();   // First model
  const model2Ref = useRef();  // Second model

  const toggleLamp = () => {
    const next = !isLampOn;
    setIsLampOn(next);
    if (knobRef.current) knobRef.current.playAnimation(next);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        shadows
        gl={{ physicallyCorrectLights: true }}
        onCreated={({ camera }) => {
          camera.layers.enable(0);
          camera.layers.enable(1);
        }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
      >
        <Suspense fallback={<LoadingScreen progress={0} />}>

          {/* Rotating directional light */}
          <RotatingDirectionalLight
            position={[-7, 6.9, -22.4]}
            radius={8}
            speed={0.01}
            intensity={0.6}
            isActive={isLampOn}
          />

          <ambientLight intensity={0.4} layers={0} />

          {/* Static Models */}
          <Model ref={modelRef} path="/My-Portfolio/assets/Lighthouse-model.glb" position={[3, 0, -20]} scale={1} rotation={[0, (3 * Math.PI) / 2, 0]} />
          <Model ref={model2Ref} path="/My-Portfolio/assets/Lighthouse-model-computer.glb" position={[-6.5, -5, -20]} scale={1} rotation={[0, (3 * Math.PI) / 2, 0]} />

          {/* Switch */}
          <Model path="/My-Portfolio/assets/Lighthouse-model-switch.glb" position={[3.5, 8, -10]} scale={1.75} rotation={[0, (2.5 * Math.PI) / 2, -0.2]} onClick={toggleLamp} cursor="pointer" />

          {/* Lamp Models - REVERSED logic */}
          <LampModel path="/My-Portfolio/assets/Lighthouse-model-lamp-on.glb" visible={!isLampOn} position={[-31.2, -11.4, 27]} scale={1} rotation={[0, (3 * Math.PI) / 2, 0]} />
          <LampModel path="/My-Portfolio/assets/Lighthouse-model-lamp-off.glb" visible={isLampOn} position={[-31.2, -11.4, 27]} scale={1} rotation={[0, (3 * Math.PI) / 2, 0]} />

          {/* Animated Knob */}
          <AnimatedKnob ref={knobRef} position={[3.5, 8, -10]} scale={1.75} rotation={[0, (2.5 * Math.PI) / 2, -0.2]} toggleLight={toggleLamp} />

          {/* Textured Cone */}
          <TexturedCone visible={isLampOn} />

          {/* Directional lights that turn on when cone is OFF */}
          <directionalLight
            position={[-6, 3, 3]}
            intensity={!isLampOn ? .3 : 0}
            color="#FFFF00"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            target={model2Ref.current}
          />
          <directionalLight
            position={[-6, 5, -14]}
            intensity={!isLampOn ? .2 : 0}
            color="#FFFF00"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            target={modelRef.current}
          />

          

          {/* Screen */}
          <Screen position={[1.7, 0.51, -3.2]} scale={1.3} rotation={[0.1, -0.6, 0.23]} />

        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
