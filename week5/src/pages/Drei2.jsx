import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 7]} />
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0.5, 0]}
      />

      {/* scroll camera 
      HTML component
       */}
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
