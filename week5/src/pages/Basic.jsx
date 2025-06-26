import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PointLightHelper, DirectionalLightHelper } from "three";
import Box from "@/components/Box";

function Scene() {
  const directionalLightRef = useRef();
  const pointLightRef = useRef();

  // ref, helper, size, color
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "black");
  useHelper(pointLightRef, PointLightHelper, 1, "black");

  // you can access useful information in the state object
  // { gl, scene, camera }
  useFrame((state) => {});

  return (
    <>
      <color attach="background" args={["white"]} />

      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls makeDefault />

      <ambientLight intensity={1} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={2}
      />
      <pointLight
        ref={pointLightRef}
        position={[-5, -5, 5]}
        decay={0}
        intensity={2}
      />

      <Box position={[-2, 0, 0]} />
      <Box position={[0, 0, 0]} />
      <Box position={[2, 0, 0]} />
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
