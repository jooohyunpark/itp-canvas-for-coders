import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import AnimatedBox from "@/components/AnimatedBox";

function Scene() {
  const { color } = useSpring({
    loop: { reverse: true },
    from: { color: "white" },
    to: { color: "red" },
    config: { duration: 2000 },
  });

  return (
    <>
      <color attach="background" args={["white"]} />

      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls makeDefault />

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, 5]} decay={0} intensity={2} />

      <AnimatedBox position={[-2, 0, 0]} />
      <AnimatedBox position={[0, 0, 0]} />
      <AnimatedBox position={[2, 0, 0]} />
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
