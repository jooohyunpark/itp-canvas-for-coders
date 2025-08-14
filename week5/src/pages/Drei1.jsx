import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Center,
  Stage,
  Clouds,
  Cloud,
} from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import Human from "@/components/Human";

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 7]} />
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />

      <Stage intensity={0.7} adjustCamera={false} environment="city">
        <Center top position={[-2, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial
              color="white"
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>
        </Center>
        <Center top position={[0, 0, 0]}>
          <Human />
        </Center>
        <Center top position={[2, 0.5, 0]}>
          <Clouds material={MeshBasicMaterial} scale={0.05}>
            <Cloud segments={40} bounds={[10, 3, 2]} volume={10} color="#ccc" />
          </Clouds>
        </Center>
      </Stage>
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
