import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Center,
  Text3D,
  Box,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

function Scene() {
  const box1Ref = useRef();
  const box2Ref = useRef();
  const box3Ref = useRef();

  useFrame((state, delta) => {
    box1Ref.current.rotation.x += delta * 0.5;
    box2Ref.current.rotation.y += delta * 0.5;
    box3Ref.current.rotation.z += delta * 0.5;
  });

  return (
    <>
      <color attach="background" args={["white"]} />

      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls makeDefault />

      <ambientLight intensity={1} />

      <Center position={[0, -1, 0]}>
        <Box ref={box1Ref} position={[-2, 0, 0]}>
          <meshNormalMaterial />
        </Box>
        <Box ref={box2Ref} position={[0, 0, 0]}>
          <meshNormalMaterial />
        </Box>
        <Box ref={box3Ref} position={[2, 0, 0]}>
          <meshNormalMaterial />
        </Box>
      </Center>

      <Center position={[0, 2, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.15}
          curveSegments={12}
          scale={0.5}
        >
          Exercise:{"\n"}
          Rebuild your Three.js project in R3F.
          <meshNormalMaterial />
        </Text3D>
      </Center>
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
