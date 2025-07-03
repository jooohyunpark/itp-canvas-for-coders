import { RigidBody } from "@react-three/rapier";

export function Floor({ position = [0, 0, 0], size = 100, ...props }) {
  return (
    <RigidBody position={position} type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow {...props}>
        <planeGeometry args={[size, size]} />
        <shadowMaterial transparent opacity={0.4} />
        {/* <meshBasicMaterial color="gray" /> */}
      </mesh>
    </RigidBody>
  );
}
