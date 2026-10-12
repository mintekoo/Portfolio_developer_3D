import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

const milestonesData = [
  {
    title: "Abyssinia Software",
    role: "Full Stack Developer",
    period: "2025 - Present",
    color: "#915eff",
    position: [2.2, 0.5, 0.6],
    status: "Active",
  },
  {
    title: "Independent Developer",
    role: "Full-Stack Products",
    period: "2023 - 2024",
    color: "#00cea8",
    position: [-2.1, 0.6, -0.7],
    status: "Completed",
  },
  {
    title: "Jimma Institute",
    role: "Web Developer",
    period: "2022 - 2024",
    color: "#00b4d8",
    position: [0.3, -1.3, 1.3],
    status: "Completed",
  },
];

// Central Holographic Quantum Core
const QuantumCore = () => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.3;
      ringRef1.current.rotation.x += delta * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.25;
      ringRef2.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#804dee"
          emissive="#915eff"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Holographic Wireframe Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color="#00cea8"
          emissive="#00cea8"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Orbital Energy Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.5, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#00b4d8"
          emissive="#00b4d8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

// Orbiting Career Milestone Node
const CareerNode = ({
  data,
  index,
  isActive,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.7;
      meshRef.current.rotation.x += delta * 0.35;
    }
  });

  const isHighlighted = isActive || hovered;

  return (
    <group position={data.position}>
      {/* Node Geometry */}
      <mesh
        ref={meshRef}
        onClick={() => onSelect(index)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={isHighlighted ? 1.35 : 1}
      >
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isHighlighted ? 1.3 : 0.5}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Pulsing Beacon Halo for active / hovered node */}
      {isHighlighted && (
        <mesh scale={1.75}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      )}

      {/* Floating 3D Milestone Label */}
      <Html distanceFactor={9} position={[0, 0.65, 0]} center>
        <button
          type="button"
          onClick={() => onSelect(index)}
          className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer shadow-lg ${
            isHighlighted
              ? "bg-[#151030] text-white border-white/60 scale-105 shadow-[#915eff]/40"
              : "bg-black/75 text-secondary border-white/10 hover:border-white/30"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: data.color,
              boxShadow: isHighlighted ? `0 0 8px ${data.color}` : "none",
            }}
          />
          <span>{data.title}</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">
            ({data.period})
          </span>
        </button>
      </Html>
    </group>
  );
};

// Subtle Quantum Particle Field
const QuantumParticles = () => {
  const count = 45;
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 1.5;
      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  const pointsRef = useRef();

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.08;
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
        color="#b08eff"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};

const CareerNexusStage = ({ activeMilestone, onSelectMilestone }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-4, -4, -4]} color="#915eff" intensity={1.5} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <QuantumCore />
        <QuantumParticles />

        {milestonesData.map((milestone, index) => (
          <CareerNode
            key={milestone.title}
            data={milestone}
            index={index}
            isActive={activeMilestone === index}
            onSelect={onSelectMilestone}
          />
        ))}
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minPolarAngle={Math.PI / 2 - 0.3}
      />
    </>
  );
};

const CareerCanvas = ({ activeMilestone, onSelectMilestone }) => {
  return (
    <div className="relative w-full max-w-4xl h-[280px] sm:h-[340px] mx-auto my-6 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#151030]/60 to-black/60 shadow-2xl backdrop-blur-sm group">
      {/* 3D Header Overlay Badge */}
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse" />
        <span className="text-[12px] font-semibold uppercase tracking-wider text-secondary">
          Interactive 3D Career Nexus
        </span>
      </div>

      <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] text-secondary pointer-events-none bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
        <span>Drag to rotate · Click nodes to inspect</span>
      </div>

      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <CareerNexusStage
            activeMilestone={activeMilestone}
            onSelectMilestone={onSelectMilestone}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default CareerCanvas;
