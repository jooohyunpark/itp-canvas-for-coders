import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Box from "@/components/Box";

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
