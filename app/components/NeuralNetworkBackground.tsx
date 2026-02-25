'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Optimized particle count for better performance
const PARTICLE_COUNT = 1500;
const LINE_COUNT = 150;

function NeuralField() {
  const ref = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate neural network-like particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Create clusters (neurons)
      const cluster = Math.floor(Math.random() * 5);
      const clusterOffset = cluster * 3 - 6;

      positions[i * 3] = (Math.random() - 0.5) * 15 + clusterOffset;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

      // Color gradient indigo to purple
      const t = Math.random();
      colors[i * 3] = 0.39 + t * 0.15; // R (indigo)
      colors[i * 3 + 1] = 0.3 + t * 0.2; // G
      colors[i * 3 + 2] = 0.85 + t * 0.15; // B (purple)
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();

      // Rotate entire system slowly
      ref.current.rotation.x = time * 0.03;
      ref.current.rotation.y = time * 0.02;

      // Mouse interaction - particles follow mouse with damping
      const targetX = mouseRef.current.x * 0.5;
      const targetY = mouseRef.current.y * 0.5;
      ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.01;
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.01;
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function ConnectingLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(LINE_COUNT * 2 * 3);
    const colors = new Float32Array(LINE_COUNT * 2 * 3);

    for (let i = 0; i < LINE_COUNT; i++) {
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 20;
      const z1 = (Math.random() - 0.5) * 10;

      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 3;

      positions[i * 6] = x1;
      positions[i * 6 + 1] = y1;
      positions[i * 6 + 2] = z1;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;

      const t = Math.random();
      for (let j = 0; j < 2; j++) {
        colors[i * 6 + j * 3] = 0.39 + t * 0.15;
        colors[i * 6 + j * 3 + 1] = 0.3 + t * 0.2;
        colors[i * 6 + j * 3 + 2] = 0.85 + t * 0.15;
      }
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();
      linesRef.current.rotation.z = time * 0.01;
      linesRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.1} />
    </lineSegments>
  );
}

function FloatingOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (orb1.current) {
      orb1.current.position.x = Math.sin(time * 0.3) * 5;
      orb1.current.position.y = Math.cos(time * 0.2) * 3;
      orb1.current.position.z = Math.sin(time * 0.4) * 2 - 3;
    }

    if (orb2.current) {
      orb2.current.position.x = Math.cos(time * 0.25) * 4;
      orb2.current.position.y = Math.sin(time * 0.35) * 4;
      orb2.current.position.z = Math.cos(time * 0.3) * 2 - 4;
    }

    if (orb3.current) {
      orb3.current.position.x = Math.sin(time * 0.2 + 2) * 6;
      orb3.current.position.y = Math.cos(time * 0.3 + 1) * 2;
      orb3.current.position.z = Math.sin(time * 0.25 + 2) * 3 - 2;
    }
  });

  return (
    <>
      <mesh ref={orb1}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
      <mesh ref={orb2}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
      <mesh ref={orb3}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </mesh>
    </>
  );
}

export default function NeuralNetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <NeuralField />
        <ConnectingLines />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
