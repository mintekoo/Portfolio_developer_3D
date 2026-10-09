import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

export const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth continuous idle rotation so facets catch light and decal turns
      meshRef.current.rotation.y += delta * 0.75;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.18;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Front Decal */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
        {/* Rear Decal so icon is visible as it rotates 360 degrees */}
        <Decal
          position={[0, 0, -1]}
          rotation={[0, Math.PI, 0]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, isVisible = true }) => {
  return (
    <CanvasErrorBoundary
      fallback={
        <div className='w-full h-full rounded-full bg-tertiary shadow-card p-4 flex items-center justify-center border border-white/10'>
          <img src={icon} alt='technology icon' className='w-14 h-14 object-contain' />
        </div>
      }
    >
      <Canvas
        frameloop={isVisible ? "always" : "never"}
        dpr={1}
        gl={{ powerPreference: "low-power", antialias: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
};

export default BallCanvas;