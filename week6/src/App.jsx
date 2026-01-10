import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Preload,
  Environment,
  Html,
  SoftShadows,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { initialTexts } from "@/data";
import { Text } from "@/components/Text";
import { Floor } from "@/components/Floor";

function Scene() {
  const [texts, setTexts] = useState(initialTexts);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle single character keys
      if (event.key.length === 1) {
        setTexts((prev) => [
          ...prev,
          {
            content: event.key,
            position: [0, 10, 0],
            rotation: [
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
            ],
          },
        ]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <SoftShadows size={40} samples={16} focus={0} />

      <Suspense>
        <PerspectiveCamera
          makeDefault
          position={[-15, 10, 20]}
          fov={35}
          near={0.1}
          far={10000}
        />

        <OrbitControls
          makeDefault
          enablePan={false}
          zoomSpeed={0.5}
          enableDamping
          dampingFactor={0.03}
          minDistance={10}
          maxDistance={80}
          target={[0, 3, 0]}
        />

        <directionalLight
          castShadow
          position={[-2.5, 8, 5]}
          intensity={1}
          shadow-mapSize={1024}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10, 0, 50]}
          />
        </directionalLight>

        <Environment files="/images/studio.hdr" />

        <Physics debug={false} gravity={[0, -30, 0]}>
          {texts.map((text, index) => (
            <Text
              key={index}
              content={text.content}
              position={text.position}
              rotation={text.rotation}
            />
          ))}

          <Floor size={300} position={[0, 0, 0]} />
        </Physics>

        <Preload all />
      </Suspense>
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
