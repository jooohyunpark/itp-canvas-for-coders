import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
  Stage,
} from "@react-three/drei";
import Human from "@/components/Human";

function Scene() {
  const scroll = useScroll();
  const modelRef = useRef();
  const lightRef = useRef();
  useFrame((state, delta) => {
    const scrollProgress = scroll.offset;

    console.log("scrollProgress: ", scrollProgress.toFixed(2));

    state.camera.position.z = 7 + scrollProgress * -5;
    modelRef.current.rotation.y = scrollProgress * 2 * Math.PI;
    lightRef.current.intensity = scrollProgress;
  });
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 7]} />
      {/* <OrbitControls makeDefault /> */}

      <pointLight
        ref={lightRef}
        position={[0, 0, 1]}
        intensity={2}
        color="white"
      />

      {/* <Stage adjustCamera={false} environment="city"> */}
      <group ref={modelRef}>
        <Human position={[0, 0, 0]} />
      </group>
      {/* </Stage> */}
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas shadows>
        <ScrollControls pages={3} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
