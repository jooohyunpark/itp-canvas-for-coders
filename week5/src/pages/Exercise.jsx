import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Box from "@/components/Box";

function App() {
  return (
    <div id="app">
      <Canvas>
        <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
        <OrbitControls makeDefault />

        <ambientLight intensity={3} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[0, -10, 0]} decay={0} intensity={1} />

        <Box position={[-2, 0, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
