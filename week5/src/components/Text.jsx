import { Text3D } from "@react-three/drei";
import { useState, useRef } from "react";

const Text = ({ children, hover = true, ...props }) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  return (
    <Text3D
      ref={ref}
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.5}
      height={0.15}
      curveSegments={12}
      onPointerOver={() => hover && setHover(true)}
      onPointerOut={() => hover && setHover(false)}
      {...props}
    >
      {children}

      <meshBasicMaterial color={hovered ? "blue" : "black"} />
    </Text3D>
  );
};

export default Text;
