import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Center,
  Text3D,
} from "@react-three/drei";
import Box from "@/components/Box";
import Text from "@/components/Text";

function Scene() {
  return (
    <>
      <color attach="background" args={["white"]} />

      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls makeDefault />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, 5]} decay={0} intensity={2} />

      <Box position={[-2, 0, 0]} />
      <Box position={[0, 0, 0]} />
      <Box position={[2, 0, 0]} />

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
