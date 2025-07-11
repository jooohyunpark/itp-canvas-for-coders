import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Center } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";

function App() {
  const navigate = useNavigate();

  return (
    <div id="app">
      <Canvas>
        <PerspectiveCamera makeDefault fov={60} position={[0, 0, 20]} />
        <OrbitControls makeDefault />

        <Center>
          <Text position={[0, 0, 0]} onClick={() => navigate("/basic")}>
            Basic
          </Text>

          <Text position={[0, -2, 0]} onClick={() => navigate("/spring")}>
            Spring
          </Text>

          <Text position={[0, -4, 0]} onClick={() => navigate("/drei-1")}>
            Drei 1
          </Text>

          <Text position={[0, -6, 0]} onClick={() => navigate("/drei-2")}>
            Drei 2
          </Text>

          <Text position={[0, -8, 0]} onClick={() => navigate("/exercise")}>
            Exercise
          </Text>
        </Center>
      </Canvas>
    </div>
  );
}

export default App;
