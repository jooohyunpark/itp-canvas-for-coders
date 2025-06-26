import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const Human = () => {
  const { scene } = useGLTF("/models/LeePerrySmith.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      <primitive object={scene} scale={0.15} />
    </>
  );
};

export default Human;
