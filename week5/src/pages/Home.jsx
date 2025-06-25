import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";

function App() {
  const navigate = useNavigate();

  return (
    <div id="app">
      <Canvas>
        <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
        <OrbitControls />

        <Text position={[0, 0, 0]} onClick={() => navigate("/basic")}>
          Basic
        </Text>
        <Text position={[3, 0, 0]} onClick={() => navigate("/basic")}>
          ddd
        </Text>
      </Canvas>
    </div>
  );
}

export default App;
