import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// Milestone coordinates positioned accurately on sphere surface of radius ~1.76
const milestonesData = [
  {
    id: "abyssinia-software",
    title: "Abyssinia Software",
    company: "Abyssinia Software Technology",
    role: "Full Stack Developer",
    period: "2025 - Present",
    location: "Addis Ababa, ET",
    color: "#915eff",
    position: [1.33, 0.63, 0.96],
    status: "Active Role",
    year: "2025",
  },
  {
    id: "freelance-developer",
    title: "Independent / Products",
    company: "Freelance & Products",
    role: "Full-Stack Products",
    period: "2023 - 2024",
    location: "Remote / Global",
    color: "#00cea8",
    position: [-1.41, 0.78, -0.71],
    status: "Completed",
    year: "2023",
  },
  {
    id: "jit-developer",
    title: "Jimma Institute",
    company: "Jimma Institute of Technology",
    role: "Web Developer",
    period: "2022 - 2024",
    location: "Jimma, ET",
    color: "#00b4d8",
    position: [0.33, -1.24, 1.2],
    status: "Completed",
    year: "2022",
  },
];

// 3D Milestone Beacon Pin mounted normally on the sphere surface
const GlobeMilestonePin = ({
  data,
  index,
  isActive,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();
  const gemRef = useRef();

  // Compute orientation quaternion so pin points radially outward
  const quaternion = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3(...data.position).normalize();
    return new THREE.Quaternion().setFromUnitVectors(up, normal);
  }, [data.position]);

  const isHighlighted = isActive || hovered;

  useFrame((state, delta) => {
    // Rotating satellite gem
    if (gemRef.current) {
      gemRef.current.rotation.y += delta * (isHighlighted ? 2.0 : 0.8);
      gemRef.current.rotation.x += delta * 0.4;
    }
    // Pulsing radar wave ring on sphere surface
    if (ringRef.current) {
      const scale = 1 + ((state.clock.elapsedTime * 1.5 + index * 0.6) % 1) * 0.8;
      ringRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group position={data.position} quaternion={quaternion}>
      {/* Anchor base on sphere surface */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isHighlighted ? 2.0 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Surface Radar Ring (flat on surface) */}
      <mesh
        ref={ringRef}
        position={[0, 0.03, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.08, 0.18, 24]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={isHighlighted ? 0.7 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Radiant Beacon Stem */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.018, 0.024, 0.32, 16]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isHighlighted ? 1.8 : 0.6}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Faceted Top Diamond Gem */}
      <mesh
        ref={gemRef}
        position={[0, 0.38, 0]}
        scale={isHighlighted ? 1.35 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isHighlighted ? 2.5 : 1.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Halo on Active */}
      {isHighlighted && (
        <mesh position={[0, 0.38, 0]} scale={1.6}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Floating 3D Frosted Glass HTML Badge */}
      <Html distanceFactor={7.5} position={[0, 0.65, 0]} center>
        <button
          type="button"
          onClick={() => onSelect(index)}
          className={`px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xl select-none ${
            isHighlighted
              ? "bg-[#181138]/95 text-white border border-[#915eff] shadow-[0_0_15px_rgba(145,94,255,0.5)] scale-105"
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
          <span className="text-[10px] text-white/70 hidden sm:inline">
            ({data.year})
          </span>
        </button>
      </Html>
    </group>
  );
};

// 3D Luminous Trajectory Laser Arc connecting milestones with travelling energy photon
const CareerTrajectoryArc = ({ startPos, endPos, color, speed = 0.35, elevation = 2.3 }) => {
  const photonRef = useRef();

  // Create quadratic 3D bezier arc elevated above sphere surface
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(elevation);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPos, endPos, elevation]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 48, 0.014, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (photonRef.current) {
      const t = (state.clock.elapsedTime * speed) % 1;
      const point = curve.getPoint(t);
      photonRef.current.position.copy(point);
    }
  });

  return (
    <group>
      {/* Laser Arc Tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Travelling Photon Pulse */}
      <mesh ref={photonRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Ambient Quantum Stardust Constellation
const QuantumStardust = () => {
  const count = 75;
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.1 + Math.random() * 1.5;
      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  const pointsRef = useRef();

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.03;
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

// Gyroscopic Equatorial & Orbital Latitude Laser Rings
const GyroscopeRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.07;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Primary Equatorial Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.08, 0.012, 16, 96]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={1.0}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Secondary Counter-Rotating Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.25, 0.01, 16, 96]} />
        <meshStandardMaterial
          color="#00cea8"
          emissive="#00cea8"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
};

// Main 3D Rotating Career Sphere Model
const CareerSphereGlobe = ({ activeMilestone, onSelectMilestone }) => {
  const globeGroupRef = useRef();

  // Gentle subtle continuous spin for the globe
  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* 1. Core Obsidian Metallic Sphere */}
      <mesh>
        <sphereGeometry args={[1.72, 48, 48]} />
        <meshStandardMaterial
          color="#0c0824"
          roughness={0.22}
          metalness={0.92}
        />
      </mesh>

      {/* 2. Geodesic Wireframe Lattice Atmosphere */}
      <mesh>
        <icosahedronGeometry args={[1.82, 2]} />
        <meshStandardMaterial
          color="#7c4dff"
          emissive="#915eff"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* 3. Trajectory Arcs connecting career path */}
      {/* Jimma (2022) -> Freelance (2023) */}
      <CareerTrajectoryArc
        startPos={milestonesData[2].position}
        endPos={milestonesData[1].position}
        color="#00b4d8"
        speed={0.4}
        elevation={2.25}
      />
      {/* Freelance (2023) -> Abyssinia Software (2025) */}
      <CareerTrajectoryArc
        startPos={milestonesData[1].position}
        endPos={milestonesData[0].position}
        color="#915eff"
        speed={0.4}
        elevation={2.3}
      />

      {/* 4. Surface Milestone Beacon Pins */}
      {milestonesData.map((milestone, idx) => (
        <GlobeMilestonePin
          key={milestone.title}
          data={milestone}
          index={idx}
          isActive={activeMilestone === idx}
          onSelect={onSelectMilestone}
        />
      ))}
    </group>
  );
};

// Unified 3D Scene Assembly with Lighting & Float Dynamics
const CareerSphereScene = ({ activeMilestone, onSelectMilestone }) => {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 5]} intensity={1.7} />
      <directionalLight position={[-6, -4, -5]} intensity={0.6} />
      <pointLight position={[0, 0, 0]} color="#915eff" intensity={2.0} distance={4} />
      <pointLight position={[5, -2, 3]} color="#00cea8" intensity={1.4} />

      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.25}>
        <GyroscopeRings />
        <QuantumStardust />
        <CareerSphereGlobe
          activeMilestone={activeMilestone}
          onSelectMilestone={onSelectMilestone}
        />
      </Float>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.65}
        enableDamping
        dampingFactor={0.06}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={Math.PI / 2 - 0.35}
      />
    </>
  );
};

const CareerCanvas = ({ activeMilestone, onSelectMilestone }) => {
  const [isVisible, setIsVisible] = useState(true);
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
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl h-[320px] sm:h-[380px] mx-auto my-6 rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#151030]/80 via-[#100d25]/80 to-black/80 shadow-2xl backdrop-blur-xl group"
    >
      {/* 3D Header Overlay Eyebrow */}
      <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse shadow-[0_0_8px_#915eff]" />
        <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-secondary">
          Interactive 3D Career Sphere
        </span>
      </div>

      {/* Desktop Hint Pill */}
      <div className="absolute top-3.5 right-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] text-secondary pointer-events-none bg-black/50 px-3 py-1 rounded-full border border-white/[0.08] backdrop-blur-md">
        <span>Drag to rotate 360° • Click pins to inspect milestone</span>
      </div>

      <CanvasErrorBoundary>
        <Canvas
          frameloop={isVisible ? "always" : "demand"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <CareerSphereScene
            activeMilestone={activeMilestone}
            onSelectMilestone={onSelectMilestone}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default CareerCanvas;
