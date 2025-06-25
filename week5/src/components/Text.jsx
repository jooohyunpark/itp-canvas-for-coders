import { Text3D } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Text = ({ children, ...props }) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  // Center the geometry once it's available
  useEffect(() => {
    if (ref.current) ref.current.geometry.center();
  }, []);

  useFrame((state, delta) => (ref.current.rotation.y -= delta * 0.1));

  return (
    <Text3D
      ref={ref}
      font="/fonts/helvetiker_regular.typeface.json"
      size={1}
      height={0.2}
      curveSegments={12}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {
        console.log("clicked");
      }}
      center
      {...props}
    >
      {children}

      <meshBasicMaterial
        color={hovered ? "blue" : "black"}
        metalness={0.2}
        roughness={0.8}
      />
    </Text3D>
  );
};

export default Text;
