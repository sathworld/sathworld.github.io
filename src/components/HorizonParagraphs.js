import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Default paragraph content (can be overridden via props)
const defaultParagraphs = [
  'I build systems across the hardware / software boundary — from HDL on FPGAs to firmware and full‑stack tooling.',
  'My focus: efficient digital design, embedded reliability, and intuitive developer UX.',
  'Toolbox highlights: Verilog / SystemVerilog, VHDL, C / C++, Python, Rust (learning), React, Three.js.',
  'Passions: high‑performance data paths, timing closure, low‑latency pipelines, and elegant human interfaces.',
  'Below you\'ll find selected projects spanning hardware acceleration, automation, and visualization.'
];

export function HorizonParagraphs({
  paragraphs = defaultParagraphs,
  gap = 14,          // distance between planes along +Z
  startZ = 12,       // first plane Z
  fadeDistance = 70, // distance over which to fade out
  baseY = 2,         // vertical positioning
  width = 22,        // max text width units
  fontSize = 1.1,
  darkMode = false
}) {
  const groupRef = useRef();
  const planes = useMemo(() => paragraphs.map((text, i) => ({ text, z: startZ + i * gap })), [paragraphs, gap, startZ]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() / 4000;
    groupRef.current.position.y = baseY + Math.sin(t) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, baseY, 0]}>
      {planes.map(({ text, z }, idx) => {
        const dist = z - startZ;
        const fade = 1 - dist / fadeDistance;
        const opacity = THREE.MathUtils.clamp(fade, 0, 1);
        const scale = 1 - Math.min(dist / (fadeDistance * 1.2), 0.65) * 0.4;
        return (
          <ParagraphBoard
            key={idx}
            text={text}
            position={[0, 0, z]}
            maxWidth={width}
            fontSize={fontSize * scale}
            opacity={opacity}
            dark={darkMode}
          />
        );
      })}
    </group>
  );
}

function ParagraphBoard({ text, position, maxWidth, fontSize, opacity, dark }) {
  const textRef = useRef();
  const bgRef = useRef();
  const padding = 0.75;

  useFrame(() => {
    if (textRef.current && bgRef.current) {
      const size = textRef.current.geometry.boundingBox;
      if (size) {
        const w = (size.max.x - size.min.x) + padding * 2;
        const h = (size.max.y - size.min.y) + padding * 2;
        bgRef.current.scale.set(w, h, 1);
      }
    }
  });

  const bgColor = dark ? '#14081f' : '#ffffff';
  const edge = dark ? '#6f3fae' : '#b37ce8';
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: bgColor, transparent: true, opacity: opacity * 0.55, side: THREE.DoubleSide }), [bgColor, opacity]);
  const borderMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity: opacity * 0.4 }), [edge, opacity]);

  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      <mesh ref={bgRef} material={material} position={[0, 0, -0.01]}>
        <planeGeometry args={[1, 1]} />
      </mesh>
      <Text
        ref={textRef}
        fontSize={fontSize}
        maxWidth={maxWidth}
        lineHeight={1.25}
        letterSpacing={0}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={dark ? '#f3e9ff' : '#2a1a40'}
        outlineWidth={0.015}
        outlineColor={dark ? '#402060' : '#d8c2f2'}
        fillOpacity={opacity}
        outlineOpacity={opacity * 0.9}
      >{text}</Text>
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1, 1)]} />
        <primitive object={borderMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}
