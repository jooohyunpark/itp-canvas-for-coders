import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const Human = (props) => {
  const { scene } = useGLTF("/models/LeePerrySmith.glb");

  // You can traverse the scene graph
  useEffect(() => {
    scene.traverse((child) => {});
  }, [scene]);

  return (
    <>
      <primitive object={scene} scale={0.15} {...props} />
    </>
  );
};

export default Human;
