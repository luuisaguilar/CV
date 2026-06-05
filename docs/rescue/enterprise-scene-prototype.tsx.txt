'use client'

import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  RoundedBox,
  Sphere,
  Torus,
} from '@react-three/drei'
import * as THREE from 'three'

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor
}

function CameraRig() {
  const { camera, pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    camera.position.x = lerp(camera.position.x, 0.35 + pointer.x * 0.25, 0.04)
    camera.position.y = lerp(camera.position.y, 1.9 + pointer.y * 0.12 + Math.sin(t * 0.45) * 0.03, 0.04)
    camera.lookAt(0.9, 0.65, 0)
  })

  return null
}

function NeonArc({ position, rotation, scale = 1, color = '#7c3aed' }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Torus args={[1.3, 0.03, 16, 100, Math.PI * 1.35]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
      </Torus>
    </group>
  )
}

function ScreenUI({ variant = 'main' }: { variant?: 'main' | 'vertical' | 'code' }) {
  const blocks = useMemo(() => {
    if (variant === 'vertical') {
      return [
        { y: 0.34, w: 0.75, h: 0.12, x: -0.02, color: '#5b8cff' },
        { y: 0.12, w: 0.78, h: 0.08, x: 0.01, color: '#d6dbff' },
        { y: -0.02, w: 0.78, h: 0.08, x: 0.01, color: '#d6dbff' },
        { y: -0.16, w: 0.75, h: 0.08, x: -0.01, color: '#d6dbff' },
        { y: -0.3, w: 0.6, h: 0.18, x: -0.08, color: '#eef2ff' },
      ]
    }

    if (variant === 'code') {
      return [
        { y: 0.32, w: 0.84, h: 0.1, x: 0, color: '#111827' },
        { y: 0.12, w: 0.72, h: 0.05, x: -0.06, color: '#60a5fa' },
        { y: 0.02, w: 0.8, h: 0.05, x: 0.02, color: '#a78bfa' },
        { y: -0.08, w: 0.76, h: 0.05, x: -0.01, color: '#60a5fa' },
        { y: -0.18, w: 0.66, h: 0.05, x: -0.08, color: '#a78bfa' },
        { y: -0.34, w: 0.84, h: 0.22, x: 0, color: '#0b1020' },
      ]
    }

    return [
      { y: 0.34, w: 0.82, h: 0.11, x: 0, color: '#60a5fa' },
      { y: 0.16, w: 0.42, h: 0.16, x: -0.2, color: '#c4b5fd' },
      { y: 0.16, w: 0.34, h: 0.16, x: 0.26, color: '#7c3aed' },
      { y: -0.06, w: 0.82, h: 0.08, x: 0, color: '#dbeafe' },
      { y: -0.18, w: 0.82, h: 0.08, x: 0, color: '#e9d5ff' },
      { y: -0.32, w: 0.58, h: 0.1, x: -0.12, color: '#dbeafe' },
    ]
  }, [variant])

  return (
    <group>
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[1.7, 1]} />
        <meshStandardMaterial color="#fff7e6" emissive="#fff2cf" emissiveIntensity={0.45} />
      </mesh>

      {blocks.map((block, index) => (
        <mesh key={index} position={[block.x, block.y, 0.01]}>
          <planeGeometry args={[block.w, block.h]} />
          <meshStandardMaterial color={block.color} emissive={block.color} emissiveIntensity={0.18} />
        </mesh>
      ))}
    </group>
  )
}

function Monitor({ position, rotation, scale = 1, vertical = false, code = false }: any) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={vertical ? [1.05, 1.85, 0.08] : [1.85, 1.08, 0.08]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.5} />
      </RoundedBox>

      <group position={[0, 0, 0.043]} scale={vertical ? [0.52, 0.93, 1] : [0.93, 0.93, 1]}>
        <ScreenUI variant={code ? 'code' : vertical ? 'vertical' : 'main'} />
      </group>

      <mesh position={[0, vertical ? -1.05 : -0.66, -0.02]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#111827" metalness={0.45} roughness={0.45} />
      </mesh>

      <RoundedBox args={[0.42, 0.04, 0.22]} radius={0.02} smoothness={2} position={[0, vertical ? -1.44 : -1.05, 0.02]}>
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.55} />
      </RoundedBox>
    </group>
  )
}

function Desk() {
  return (
    <group position={[0.9, -0.55, 0]}>
      <RoundedBox args={[4.9, 0.14, 1.45]} radius={0.03} smoothness={4} position={[0, 0.78, 0]}>
        <meshStandardMaterial color="#c99a6b" roughness={0.85} metalness={0.04} />
      </RoundedBox>

      <RoundedBox args={[1.2, 1.65, 1.28]} radius={0.03} smoothness={4} position={[1.86, -0.05, 0.02]}>
        <meshStandardMaterial color="#f3f4f6" roughness={0.92} metalness={0.03} />
      </RoundedBox>

      {[-0.34, 0.06, 0.46].map((y, index) => (
        <mesh key={index} position={[2.24, y, 0.66]}>
          <boxGeometry args={[0.86, 0.02, 0.02]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}

      <mesh position={[-2.14, -0.05, 0.52]}>
        <boxGeometry args={[0.1, 1.62, 0.1]} />
        <meshStandardMaterial color="#111827" metalness={0.25} roughness={0.65} />
      </mesh>

      <mesh position={[-2.14, -0.05, -0.52]}>
        <boxGeometry args={[0.1, 1.62, 0.1]} />
        <meshStandardMaterial color="#111827" metalness={0.25} roughness={0.65} />
      </mesh>
    </group>
  )
}

function Cabinet() {
  return (
    <group position={[-1.28, -1.0, 0.18]}>
      <RoundedBox args={[0.86, 1.26, 0.78]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#111827" roughness={0.42} metalness={0.35} />
      </RoundedBox>

      <mesh position={[0.12, 0, 0.392]}>
        <planeGeometry args={[0.48, 1.05]} />
        <meshPhysicalMaterial color="#12345c" transmission={0.35} roughness={0.18} metalness={0.1} transparent opacity={0.72} />
      </mesh>

      <mesh position={[0.02, 0.05, 0.24]}>
        <boxGeometry args={[0.28, 0.74, 0.1]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#1d4ed8" emissiveIntensity={1.25} />
      </mesh>

      {[0.3, 0.02, -0.26].map((y, index) => (
        <mesh key={index} position={[-0.2, y, -0.16]}>
          <boxGeometry args={[0.18, 0.11, 0.42]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Keyboard() {
  return (
    <group position={[0.62, 0.1, 0.3]}>
      <RoundedBox args={[1.02, 0.07, 0.34]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#111827" roughness={0.55} metalness={0.18} />
      </RoundedBox>

      <mesh position={[-0.18, 0.04, 0]}>
        <boxGeometry args={[0.46, 0.02, 0.27]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      <mesh position={[0.26, 0.04, 0]}>
        <boxGeometry args={[0.34, 0.02, 0.27]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  )
}

function Mouse() {
  return (
    <group position={[1.62, 0.11, 0.34]} rotation={[0, 0.15, 0]}>
      <Sphere args={[0.11, 24, 24]} scale={[1.15, 0.55, 1.45]}>
        <meshStandardMaterial color="#111827" roughness={0.45} metalness={0.25} />
      </Sphere>
    </group>
  )
}

function Bottle() {
  return (
    <group position={[2.18, 0.42, 0.48]}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.66, 32]} />
        <meshStandardMaterial color="#c7d2da" metalness={0.85} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.13, 24]} />
        <meshStandardMaterial color="#111827" roughness={0.42} metalness={0.45} />
      </mesh>
    </group>
  )
}

function Headphones() {
  return (
    <group position={[-2.2, 0.34, 0.55]}>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.42, 12]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <mesh position={[0, 0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.18, 0.03, 16, 42, Math.PI]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.55} metalness={0.18} />
      </mesh>

      <Sphere args={[0.09, 24, 24]} position={[-0.17, 0.28, 0]} scale={[1.05, 1.2, 0.58]}>
        <meshStandardMaterial color="#111827" roughness={0.45} metalness={0.12} />
      </Sphere>
      <Sphere args={[0.09, 24, 24]} position={[0.17, 0.28, 0]} scale={[1.05, 1.2, 0.58]}>
        <meshStandardMaterial color="#111827" roughness={0.45} metalness={0.12} />
      </Sphere>
    </group>
  )
}

function Plant({ position, scale = 1 }: any) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.15, 0.14, 24]} />
        <meshStandardMaterial color="#b9b2ab" roughness={0.9} />
      </mesh>

      {[
        [-0.05, 0.16, 0.03, -0.4],
        [0.04, 0.22, -0.02, 0.2],
        [-0.02, 0.28, -0.04, 0.6],
        [0.08, 0.18, 0.05, -0.7],
        [-0.08, 0.2, -0.06, 0.5],
      ].map(([x, y, z, rz], index) => (
        <mesh key={index} position={[x as number, y as number, z as number]} rotation={[0.2, 0, rz as number]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#3f8a4d" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Cable({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, Math.min(start[1], end[1]) - 0.2, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end),
    ])
  }, [start, end])

  return (
    <mesh>
      <tubeGeometry args={[curve, 24, 0.01, 8, false]} />
      <meshStandardMaterial color="#111827" roughness={0.8} />
    </mesh>
  )
}

function CableSet() {
  return (
    <group>
      <Cable start={[0.65, 0.55, -0.36]} end={[-0.2, -0.58, -0.18]} />
      <Cable start={[1.18, 0.32, 0.26]} end={[0.56, -0.72, 0.02]} />
      <Cable start={[-0.24, 0.42, 0.5]} end={[-0.92, -0.64, 0.28]} />
    </group>
  )
}

function SetupMonitors() {
  return (
    <group position={[0.86, 0.88, 0]}>
      <Monitor position={[-1.7, 0.28, 0.08]} rotation={[0, 0.08, 0]} vertical />
      <Monitor position={[1.68, 0.28, 0.08]} rotation={[0, -0.08, 0]} vertical />
      <Monitor position={[0, 0.82, 0]} scale={1.1} />
      <Monitor position={[0, -0.36, 0]} scale={1.1} code />
    </group>
  )
}

function DeskScene() {
  return (
    <group>
      <Desk />
      <Cabinet />
      <SetupMonitors />
      <Keyboard />
      <Mouse />
      <Bottle />
      <Headphones />
      <Plant position={[-1.68, 0.18, 0.48]} scale={0.92} />
      <Plant position={[-2.42, 0.34, 0.22]} scale={1.18} />
      <CableSet />
    </group>
  )
}

function LanaPlaceholder() {
  const group = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const tail = useRef<THREE.Group>(null)
  const ears = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const px = state.pointer.x
    const py = state.pointer.y

    if (!group.current || !head.current || !tail.current || !ears.current) return

    group.current.position.y = -1.53 + Math.sin(t * 1.6) * 0.015
    group.current.rotation.z = Math.sin(t * 1.2) * 0.01

    head.current.rotation.y = lerp(head.current.rotation.y, px * 0.3, 0.04)
    head.current.rotation.x = lerp(head.current.rotation.x, -0.08 + py * 0.15, 0.04)

    tail.current.rotation.z = Math.sin(t * 4.6) * 0.38 + 0.35
    ears.current.rotation.x = Math.sin(t * 2.5) * 0.06
  })

  return (
    <group ref={group} position={[0.34, -1.53, 0.16]} rotation={[0, -0.16, 0]}>
      <Sphere args={[0.42, 24, 24]} scale={[1.72, 0.82, 1.05]}>
        <meshStandardMaterial color="#3b3637" roughness={0.88} />
      </Sphere>

      <mesh position={[-0.46, -0.15, 0.26]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.08, 0.08, 0.44, 18]} />
        <meshStandardMaterial color="#ccb39a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.12, -0.16, 0.32]} rotation={[0, 0, -0.04]}>
        <cylinderGeometry args={[0.08, 0.08, 0.42, 18]} />
        <meshStandardMaterial color="#ccb39a" roughness={0.9} />
      </mesh>
      <mesh position={[0.66, -0.12, -0.2]} rotation={[0, 0, 0.24]}>
        <cylinderGeometry args={[0.08, 0.08, 0.36, 18]} />
        <meshStandardMaterial color="#b7987a" roughness={0.9} />
      </mesh>
      <mesh position={[0.9, -0.12, -0.3]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.08, 0.08, 0.34, 18]} />
        <meshStandardMaterial color="#b7987a" roughness={0.9} />
      </mesh>

      <group ref={head} position={[-0.92, 0.08, 0.16]}>
        <Sphere args={[0.28, 24, 24]} scale={[1.02, 0.92, 0.94]}>
          <meshStandardMaterial color="#232323" roughness={0.88} />
        </Sphere>

        <Sphere args={[0.14, 20, 20]} position={[-0.18, -0.02, 0.17]} scale={[1.3, 0.74, 0.9]}>
          <meshStandardMaterial color="#ddd3cc" roughness={0.92} />
        </Sphere>

        <mesh position={[-0.28, -0.02, 0.28]}>
          <sphereGeometry args={[0.03, 18, 18]} />
          <meshStandardMaterial color="#111827" />
        </mesh>

        <mesh position={[-0.2, 0.06, 0.15]}>
          <sphereGeometry args={[0.025, 18, 18]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[-0.2, 0.08, -0.12]}>
          <sphereGeometry args={[0.025, 18, 18]} />
          <meshStandardMaterial color="#111827" />
        </mesh>

        <group ref={ears}>
          <mesh position={[-0.02, 0.24, -0.15]} rotation={[0.15, 0.08, -0.3]}>
            <coneGeometry args={[0.09, 0.22, 4]} />
            <meshStandardMaterial color="#222" roughness={0.95} />
          </mesh>
          <mesh position={[-0.04, 0.26, 0.16]} rotation={[-0.1, 0.14, -0.18]}>
            <coneGeometry args={[0.09, 0.22, 4]} />
            <meshStandardMaterial color="#222" roughness={0.95} />
          </mesh>
        </group>

        <mesh position={[-0.48, -0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.12, 0.02, 10, 24]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.12} />
        </mesh>
      </group>

      <group ref={tail} position={[1.02, 0.05, -0.04]} rotation={[0, 0, 0.42]}>
        <mesh rotation={[0.12, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.06, 0.64, 12]} />
          <meshStandardMaterial color="#b79a7e" roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}

function Scene3D() {
  return (
    <Canvas shadows camera={{ position: [0.35, 1.9, 6], fov: 32 }}>
      <color attach="background" args={['#060316']} />
      <fog attach="fog" args={['#060316', 7, 14]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ffffff" castShadow />
      <spotLight position={[1.5, 4.4, 3]} intensity={25} angle={0.32} penumbra={0.8} color="#8b5cf6" />
      <pointLight position={[-1.6, -0.25, 0.6]} intensity={22} distance={4.5} color="#2563eb" />
      <pointLight position={[2.5, 1.4, 1.2]} intensity={14} distance={4.2} color="#7c3aed" />

      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      <CameraRig />

      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.05}>
        <DeskScene />
      </Float>

      <LanaPlaceholder />

      <NeonArc position={[1.65, 0.22, -1.2]} rotation={[0.2, -0.25, 0.4]} scale={0.95} color="#7c3aed" />
      <NeonArc position={[1.2, -0.45, -0.75]} rotation={[1.25, 0.12, -0.2]} scale={0.85} color="#06b6d4" />

      <ContactShadows position={[0, -1.95, 0]} opacity={0.45} scale={10} blur={2.8} far={4.2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#16141f" roughness={0.96} />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

function CTAButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button
      className={[
        'rounded-2xl px-6 py-3 text-sm font-semibold transition-all',
        primary
          ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20'
          : 'border border-white/15 bg-white/5 text-white/90 hover:bg-white/10',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default function PortfolioHero3DSetupLana() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050214] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(124,58,237,0.18),transparent_22%),radial-gradient(circle_at_72%_58%,rgba(6,182,212,0.12),transparent_18%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-300">
            <span className="h-px w-10 bg-violet-400/70" />
            Hi there, I&apos;m
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Luis Angel
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Aguilar
            </span>
          </h1>

          <p className="mt-5 text-xl font-semibold text-white/80 sm:text-2xl">
            Project Manager · Business Systems · AI Automation Builder
          </p>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
            Hero 3D MVP replacing the abstract sphere with a stylized version of your real setup and Lana under the desk.
            This scene is built with procedural geometry so you can iterate fast before replacing pieces with final GLB assets.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton primary>View Projects</CTAButton>
            <CTAButton>Download CV</CTAButton>
            <CTAButton>Get in Touch</CTAButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/65">
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Sonora, Mexico</span>
          </div>
        </div>

        <div className="relative h-[620px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-2xl shadow-violet-950/30 backdrop-blur-sm">
          <Scene3D />

          <div className="pointer-events-none absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/65 backdrop-blur-md">
            Setup blockout + Lana placeholder
          </div>

          <div className="pointer-events-none absolute bottom-5 right-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 backdrop-blur-md">
            Mouse movement subtly affects Lana and camera
          </div>
        </div>
      </div>
    </section>
  )
}
