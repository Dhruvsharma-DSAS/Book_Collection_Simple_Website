import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

export const Book3D = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    
    // Smooth Parallax tilt based on cursor position
    const targetY = (state.mouse.x * Math.PI) / 8 + Math.PI / 6
    const targetX = (-state.mouse.y * Math.PI) / 8
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05)
  })

  return (
    <group position={[0, 0.5, 0]}>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          {/* Simulated 3D Book Geometry */}
          <boxGeometry args={[3, 4.2, 0.6]} />
          
          {/* Cover Material (EyePagE Green) */}
          <meshStandardMaterial 
            color={hovered ? "#D4A017" : "#2D6A4F"} 
            metalness={0.6} 
            roughness={0.15} 
            emissive={hovered ? "#D4A017" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
          
          {/* Title on Sparkly Book Cover */}
          <Text
            position={[0, 0.5, 0.31]}
            fontSize={0.45}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            EyePagE
          </Text>

          <Text
            position={[0, -0.4, 0.31]}
            fontSize={0.15}
            color="rgba(255,255,255,0.7)"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            textAlign="center"
          >
            Every Page is a New Vision
          </Text>
          
          {/* Page Edges Detail */}
          <mesh position={[1.45, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.55, 4.1]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
          </mesh>
        </mesh>
      </Float>

      {/* Simple shadow ground plane instead of reflector */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </group>
  )
}

