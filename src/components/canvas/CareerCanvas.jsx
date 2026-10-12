import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const milestonesData = [
  {
    title: "Abyssinia Software",
    role: "Full Stack Developer",
    period: "2025 - Present",
    color: "#915eff",
    position: [2.3, 0.4, 0.7],
    status: "Active Role",
  },
  {
    title: "Independent / Products",
    role: "Full-Stack Products",
    period: "2023 - 2024",
    color: "#00cea8",
    position: [-2.2, 0.5, -0.6],
    status: "Completed",
  },
  {
    title: "Jimma Institute",
    role: "Web Developer",
    period: "2022 - 2024",
    color: "#00b4d8",
    position: [0.3, -1.3, 1.4],
    status: "Completed",
  },
];

// Prismatic Geodesic Crystal Core
const PrismaticCrystalCore = () => {
  const crystalRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    // Gentle regal rotation for inner crystal
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.15;
      crystalRef.current.rotation.z += delta * 0.08;
    }
    // Very slow, majestic counter-rotation for gyroscopic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.06;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Central Luminous Point Light */}
      <pointLight color="#915eff" intensity={2.5} distance={5} />

      {/* Inner Glowing Orb */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          color="#a374ff"
          emissive="#915eff"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Faceted Prismatic Crystal Diamond */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#160e33"
          emissive="#915eff"
          emissiveIntensity={0.5}
          roughness={0.12}
          metalness={0.88}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Primary Gyroscopic Laser Orbit Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[1.5, 0.014, 16, 72]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={1.0}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Secondary Gyroscopic Laser Orbit Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.75, 0.012, 16, 72]} />
        <meshStandardMaterial
          color="#00cea8"
          emissive="#00cea8"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
};

// Orbiting Prismatic Milestone Node
const PrismaticMilestoneNode = ({
  data,
  index,
  isActive,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef();

  useFrame((state, delta) => {
    if (nodeRef.current) {
      nodeRef.current.rotation.y += delta * 0.3;
      nodeRef.current.rotation.x += delta * 0.15;
    }
  });

  const isHighlighted = isActive || hovered;

  return (
    <group position={data.position}>
      {/* Faceted Satellite Crystal Gem */}
      <mesh
        ref={nodeRef}
        onClick={() => onSelect(index)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={isHighlighted ? 1.4 : 1}
      >
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isHighlighted ? 1.5 : 0.6}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Pulsing Light Halo on active/hovered */}
      {isHighlighted && (
        <mesh scale={1.8}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Floating 3D Frosted Glass Pill Badge */}
      <Html distanceFactor={8.5} position={[0, 0.65, 0]} center>
        <button
          type="button"
          onClick={() => onSelect(index)}
          className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xl ${
            isHighlighted
              ? "bg-[#181138]/95 text-white border border-[#915eff] shadow-[#915eff]/50 scale-105"
              : "bg-black/80 text-secondary border border-white/10 hover:border-white/30 hover:text-white"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: data.color,
              boxShadow: isHighlighted ? `0 0 8px ${data.color}` : "none",
            }}
          />
          <span className="tracking-tight">{data.title}</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">
            • {data.period}
          </span>
        </button>
      </Html>
    </group>
  );
};

// Ambient Quantum Stardust Constellation
const QuantumStardust = () => {
  const count = 55;
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.1 + Math.random() * 1.6;
      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  const pointsRef = useRef();

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c8abff"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

// Interactive Scene with Mouse-Driven Dampened Parallax Tilt
const CareerScene = ({ activeMilestone, onSelectMilestone }) => {
  const sceneRef = useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      // Mouse-driven dampened parallax tilt
      const targetY = state.pointer.x * 0.45;
      const targetX = -state.pointer.y * 0.28;
      // Gentle breathing sway when cursor is static
      const breathing = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetY + breathing,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        targetX,
        0.05
      );
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Studio 3-Point Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 5]} intensity={1.6} />
      <pointLight position={[-5, -3, -4]} color="#915eff" intensity={2.2} />
      <pointLight position={[5, -3, 3]} color="#00cea8" intensity={1.4} />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.35}>
        <PrismaticCrystalCore />
        <QuantumStardust />

        {milestonesData.map((milestone, index) => (
          <PrismaticMilestoneNode
            key={milestone.title}
            data={milestone}
            index={index}
            isActive={activeMilestone === index}
            onSelect={onSelectMilestone}
          />
        ))}
      </Float>
    </group>
  );
};

const CareerCanvas = ({ activeMilestone, onSelectMilestone }) => {
  return (
    <div className="relative w-full max-w-4xl h-[280px] sm:h-[350px] mx-auto my-6 rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#151030]/80 via-[#100d25]/80 to-black/80 shadow-2xl backdrop-blur-xl group">
      {/* 3D Header Overlay Eyebrow */}
      <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse shadow-[0_0_8px_#915eff]" />
        <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-secondary">
          Interactive 3D Career Matrix
        </span>
      </div>

      <div className="absolute top-3.5 right-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] text-secondary pointer-events-none bg-black/50 px-3 py-1 rounded-full border border-white/[0.08] backdrop-blur-md">
        <span>Mouse tilts 3D view • Click crystals to inspect</span>
      </div>

      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-default"
        >
          <CareerScene
            activeMilestone={activeMilestone}
            onSelectMilestone={onSelectMilestone}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default CareerCanvas;
