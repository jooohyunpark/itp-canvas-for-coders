import { Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useSpring, animated } from "@react-spring/three";

export function Text({
  content = "",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  // fade in when added to the scene
  const { opacity } = useSpring({
    from: { opacity: 0.001 }, // since 0 gives a weird error, we use 0.001
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <RigidBody position={position} rotation={rotation} colliders="cuboid">
      <animated.group>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
          castShadow
          receiveShadow
        >
          {content}
          <animated.meshStandardMaterial
            color="white"
            metalness={1}
            roughness={0.2}
            transparent
            opacity={opacity}
          />
        </Text3D>
      </animated.group>
    </RigidBody>
  );
}
