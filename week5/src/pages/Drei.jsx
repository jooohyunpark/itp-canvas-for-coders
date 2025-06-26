import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Center,
  RandomizedLight,
  AccumulativeShadows,
  Stage,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 10]} />
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0.5, 0]}
      />

      <Stage
        intensity={0.5}
        preset="rembrandt"
        shadows={{
          type: "accumulative",
          color: "skyblue",
          colorBlend: 2,
          opacity: 1,
        }}
        adjustCamera={false}
        environment="city"
      >
        <Center top position={[-2, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.25, 64, 64]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </Center>
        <Center top position={[2.5, 0, 0]}>
          <animated.mesh castShadow rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="lightblue" />
          </animated.mesh>
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
