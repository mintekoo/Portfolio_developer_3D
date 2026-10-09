import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls, useTexture } from "@react-three/drei";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import CanvasLoader from "./Loader";
import CanvasErrorBoundary from "./canvas/CanvasErrorBoundary";

// Individual 3D faceted crystal ball inside the unified Tech canvas
const TechSkillBall = ({ technology, position, index, setHoveredName }) => {
  const [decal] = useTexture([technology.icon]);
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth continuous idle rotation (speeds up slightly on hover)
      meshRef.current.rotation.y += delta * (hovered ? 1.2 : 0.5);
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 1.2 + index * 0.5) * 0.15;
      // Weightless vertical floating with phase offset
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * 1.6 + index * 0.75) * 0.18;
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh
        ref={meshRef}
        position={[0, position[1], 0]}
        scale={hovered ? 1.18 : 0.96}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredName(technology.name);
        }}
        onPointerOut={() => {
          setHovered(false);
          setHoveredName(null);
        }}
      >
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
          scale={0.9}
          map={decal}
          flatShading
        />
        {/* Rear Decal for 360 rotation visibility */}
        <Decal
          position={[0, 0, -1]}
          rotation={[0, Math.PI, 0]}
          scale={0.9}
          map={decal}
          flatShading
        />
      </mesh>
    </group>
  );
};

// Calculate elegant 2-row 3D grid layout coordinates for 13 technologies
const getBallPositions = () => {
  const positions = [];
  // Row 1: 7 technologies
  const row1Count = 7;
  const row1Spacing = 2.5;
  const row1StartX = -((row1Count - 1) * row1Spacing) / 2;
  for (let i = 0; i < row1Count; i++) {
    positions.push([row1StartX + i * row1Spacing, 1.6, 0]);
  }

  // Row 2: 6 technologies
  const row2Count = 6;
  const row2Spacing = 2.5;
  const row2StartX = -((row2Count - 1) * row2Spacing) / 2;
  for (let i = 0; i < row2Count; i++) {
    positions.push([row2StartX + i * row2Spacing, -1.6, 0]);
  }

  return positions;
};

const ballPositions = getBallPositions();

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredName, setHoveredName] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth > 0 && window.innerWidth <= 640);
      }
    };
    checkMobile();

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

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
    <div ref={containerRef} className='relative w-full select-none'>
      {isMobile ? (
        // Clean, responsive 2D icon grid for mobile screens
        <div className='flex flex-row flex-wrap justify-center gap-6 sm:gap-8'>
          {technologies.map((technology) => (
            <div
              className='w-24 h-24 flex items-center justify-center'
              key={technology.name}
              title={technology.name}
            >
              <div className='w-full h-full rounded-full bg-tertiary shadow-card p-3 flex flex-col items-center justify-center border border-white/10 hover:scale-110 transition-transform duration-300'>
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className='w-12 h-12 object-contain'
                  loading='lazy'
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Unified single WebGL Canvas for all 13 3D skill balls
        <div className='w-full max-w-6xl mx-auto h-[440px] relative rounded-2xl overflow-hidden bg-primary/40 border border-white/5 shadow-2xl'>
          {/* Active hover info badge */}
          <div className='absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-all duration-300'>
            {hoveredName ? (
              <span className='px-4 py-1.5 rounded-full bg-[#915EFF]/20 border border-[#915EFF]/50 text-white font-semibold text-sm shadow-[0_0_15px_rgba(145,94,255,0.4)]'>
                {hoveredName}
              </span>
            ) : (
              <span className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary text-xs'>
                Hover on any sphere to inspect skill
              </span>
            )}
          </div>

          <CanvasErrorBoundary>
            <Canvas
              frameloop={isVisible ? "always" : "demand"}
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 11], fov: 50 }}
              gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
              className='w-full h-full cursor-grab active:cursor-grabbing'
            >
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.65} />
                <directionalLight position={[10, 10, 10]} intensity={0.9} />
                <directionalLight position={[-10, -10, -10]} intensity={0.35} />
                <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2 + 0.25}
                  minPolarAngle={Math.PI / 2 - 0.25}
                  maxAzimuthAngle={0.35}
                  minAzimuthAngle={-0.35}
                />
                {technologies.map((technology, index) => (
                  <TechSkillBall
                    key={technology.name}
                    technology={technology}
                    position={ballPositions[index] || [0, 0, 0]}
                    index={index}
                    setHoveredName={setHoveredName}
                  />
                ))}
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>

          {/* Interactive instruction footer pill */}
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-xs text-secondary/80 bg-black/50 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-sm'>
            Interactive 3D Skill Spheres • Drag to rotate perspective
          </div>
        </div>
      )}
    </div>
  );
};

const TechSection = SectionWrapper(Tech, "tech");
export default TechSection;