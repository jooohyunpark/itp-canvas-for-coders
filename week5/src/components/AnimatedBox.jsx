import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring, easings } from "@react-spring/three";

const AnimatedBox = (props) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta * 0.5));

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: {
      duration: 350,
      easing: easings.easeInOutQuart,
    },
  });

  const { color } = useSpring({
    color: hovered ? "hotpink" : "orange",
    config: {
      duration: 300,
    },
  });

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

export default AnimatedBox;
