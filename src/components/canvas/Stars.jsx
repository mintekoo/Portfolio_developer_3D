import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

/**
 * Generates a sphere of stars in 3D space.
 *
 * @param {{}} props Component props
 * @returns {JSX.Element} The stars component
 */
const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    // Generate a sphere of 5001 points (divisible by 3 for x, y, z triplets) with a radius of 1.2
    random.inSphere(new Float32Array(5001), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    // Rotate the sphere around the x and y axes over time
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-auto absolute inset-0 z-[-1]">
      <CanvasErrorBoundary fallback={null}>
        <Canvas
          frameloop={isVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1] }}
          gl={{ powerPreference: "low-power" }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default StarsCanvas;
