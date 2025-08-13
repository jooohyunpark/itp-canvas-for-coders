import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ScrollControls,
  useScroll,
  useHelper,
} from "@react-three/drei";
import Human from "@/components/Human";
import { PointLightHelper } from "three";

function Scene() {
  const scroll = useScroll();
  const modelRef = useRef();
  const pointLightRef = useRef();
  const ambientLightRef = useRef();
  const backgroundRef = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.1, "orange");

  useFrame((state, delta) => {
    const scrollProgress = scroll.offset;
    console.log("scrollProgress: ", scrollProgress.toFixed(2));

    // camera should look at the origin
    state.camera.lookAt(0, 0, 0);

    // rotat model
    modelRef.current.rotation.y = scrollProgress * 2 * Math.PI;

    // dim ambient light
    ambientLightRef.current.intensity = scrollProgress * 0.3;

    // move point light
    pointLightRef.current.position.y = 3 - scrollProgress * 3;

    // background color
    const color = 1 - scrollProgress;
    backgroundRef.current.setRGB(color, color, color);
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0.3, 3]} />

      <color ref={backgroundRef} attach="background" args={["#ffffff"]} />

      <ambientLight ref={ambientLightRef} color="white" />

      <pointLight
        ref={pointLightRef}
        position={[0, 0, 1]}
        intensity={1}
        color="orange"
      />

      <group ref={modelRef}>
        <Human />
      </group>
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas>
        <ScrollControls pages={3} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
