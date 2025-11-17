import { useRef, useState } from "react";
import { animated, useSpring, easings } from "@react-spring/three";

const AnimatedBox = (props) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // state based animations
  const { scale, color } = useSpring({
    scale: active ? 1.5 : 1,
    color: hovered ? "blue" : "white",
    config: {
      duration: 300,
      easing: easings.easeInOutQuart,
    },
  });

  // rotation loop
  const { rotation } = useSpring({
    loop: true,
    from: { rotation: [0, 0, 0] },
    to: { rotation: [Math.PI * 2, 0, 0] },
    config: {
      duration: 10 * 1000,
    },
  });

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      rotation={rotation}
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
