import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ScrollControls,
  useScroll,
  useHelper,
  Trail,
} from "@react-three/drei";
import Human from "@/components/Human";
import { PointLightHelper } from "three";

function Scene() {
  const scroll = useScroll();
  const modelRef = useRef();
  const pointLightRef = useRef();
  const ambientLightRef = useRef();
  const backgroundRef = useRef();
  const sphereRef = useRef();

  useHelper(pointLightRef, PointLightHelper, 0.1, "orange");

  useFrame((state, delta) => {
    const scrollProgress = scroll.offset;
    console.log("scrollProgress: ", scrollProgress.toFixed(2));

    // camera should look at the origin
    state.camera.lookAt(0, 0, 0);

    // rotat model
    modelRef.current.rotation.y = scrollProgress * 2 * Math.PI;

    // dim ambient light
    ambientLightRef.current.intensity = scrollProgress * 0.3;

    // move point light
    pointLightRef.current.position.y = 3 - scrollProgress * 3;

    // background color
    const color = 1 - scrollProgress;
    backgroundRef.current.setRGB(color, color, color);

    sphereRef.current.rotation.y = scrollProgress * -4 * Math.PI;
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0.3, 3]} />

      <color ref={backgroundRef} attach="background" args={["#ffffff"]} />

      <ambientLight ref={ambientLightRef} color="white" />

      <pointLight
        ref={pointLightRef}
        position={[0, 0, 1]}
        intensity={1}
        color="orange"
      />

      <group ref={modelRef}>
        <Human />
      </group>

      <group ref={sphereRef}>
        <Trail
          width={0.2} // Width of the line
          color={"blue"} // Color of the line
          length={2} // Length of the line
          decay={0.4} // How fast the line fades away
          local={false} // Wether to use the target's world or local positions
          stride={0} // Min distance between previous and current point
          interval={1} // Number of frames to wait before next calculation
        >
          <mesh position={[1, 0, 0]}>
            <sphereGeometry args={[0.04, 64, 64]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        </Trail>
      </group>
    </>
  );
}

function App() {
  return (
    <div id="app">
      <Canvas>
        <ScrollControls pages={3} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
