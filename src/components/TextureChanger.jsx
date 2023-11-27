import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";
import Shoe from "./Shoe";

function TextureChanger({ aiTexture }) {
  return (
    <Canvas
      shadows
      //camera position values- toggle around
      camera={{
        position: [8, 1.5, 8],
        fov: 25,
      }}
      //preserve the buffers until manually cleared or overwritten, we need this to capture the Canvas and store as a image
      gl={{ preserveDrawingBuffer: true }}
    >
      <Center>
        <Shoe aiTexture={aiTexture} />
      </Center>
      {/**For shadow backdrop */}
      <AccumulativeShadows
        temporal
        frames={60}
        color={"rgb(231, 195, 228)"}
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.9}
        opacity={1}
        scale={12}
        position={[0, -1, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.5}
          intensity={1}
          position={[5, 9, -15]}
          bias={0.001}
        />
      </AccumulativeShadows>

      <ambientLight intensity={0.5} />
      {/* Orbit Controls for rotation */}

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={(Math.PI / 2) * 0.9}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}

export default TextureChanger;
