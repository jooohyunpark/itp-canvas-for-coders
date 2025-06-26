import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PointLightHelper, DirectionalLightHelper } from "three";
import Box from "@/components/Box";

function Scene() {
  return (
    <>
      <color attach="background" args={["white"]} />

      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls makeDefault />

      <ambientLight intensity={1} />

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
