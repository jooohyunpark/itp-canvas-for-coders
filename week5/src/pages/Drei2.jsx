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

  useFrame((state, delta) => {
    const scrollProgress = scroll.offset;

    console.log("scrollProgress: ", scrollProgress.toFixed(2));

    state.camera.position.z = 7 + scrollProgress * -5; // Full rotation
  });
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 7]} />
      {/* <OrbitControls makeDefault /> */}

      <Stage intensity={0.7} adjustCamera={false} environment="city">
        <Human position={[0, 0, 0]} />
      </Stage>
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas shadows>
        <ScrollControls pages={3} damping={0.2}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
