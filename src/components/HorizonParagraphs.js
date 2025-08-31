import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
//import { useControls } from 'leva';

// Default paragraph content (can be overridden via props)
// Converted to object configs so each can have its own spatial / visual settings.
// Dummy numbers provided for position (x,y,z) and rotation (rx,ry,rz); tweak as desired.
const defaultParagraphs = [
  {
    text: 'Truth or false; It\'s the logic that dictates it all; Rising edge ticks the clock; Stimulates you flip-flop; Generate; Oscillate; Let your essence fill the gates Multiplex; Process registration; Truth or false; It\'s the logic that dictates it all; Rising edge ticks the clock; Stimulates you flip-flop; Generate; Oscillate; Let your essence fill the gates Multiplex; Process registration',
    position: [ -30, -14, 26 ],
    rotation: [ 0, Math.PI * 0.9, Math.PI / 4 ],
    maxWidth: 200,
    align: 'center'
  },
  {
    text: 'Execution, execution, execution, execution; Execution, execution, execution, execution; Execution, execution, execution, execution; Execution, execution, execution, execution; Execution, execution, execution, execution',
    position: [ -23.2, 10, 3.5 ],
    rotation: [ -Math.PI * 0.25, Math.PI * 0.25,  Math.PI * 0.05],
    maxWidth: 85,
    align: 'center'
  },
  {
    text: 'Stand up; Gallop on; Nothing can be done by feeling so sorry for myself; Hero~; On a plastic horse; Fighting like it\'s real; With a cardboard sword; I know; Successful or not, I am who I am; I am my biggest fan; I am my biggest fan; I am my enemy and my friend; Hero~; Gonna prove my version of justice; Is more just than yours; Uno; Remaining on this stage, I am the only one; I am my biggest fan; I am my biggest fan; I am my enemy and my friend',
    position: [ -4, -10, 50 ],
    rotation: [ 0, Math.PI * 0.95, 0.42 ],
    fontSize: 1,
    maxWidth: 150
  },
  {
    text: 'Delete Delete Delete Delete Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete); Delete Delete Delete Delete Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete); Delete Delete Delete Delete Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete) Delete (Delete)',
    position: [ -70, -25, -10 ],
    rotation: [ -Math.PI * 0.25, Math.PI * 0.25,  Math.PI * 0.05],
    maxWidth: 210,
    align: 'right'
  },
  {
    text: '2.71 8281 8284 5904 5235 3602 8747 1352 6624 9775 7247 0936 9995 9574 9669 6762 7724 0766 3035 3547 5945 7138 2178 5251 6642 74',
    position: [ -50, 2, -17 ],
    rotation: [ -Math.PI * 0.25, Math.PI * 0.29,  Math.PI * 0.04],
    maxWidth: 85,
    align: 'right'
  },
  {
    text: 'GIVE ME LIFE; GIVE ME LIGHT; GIVE ME FIRE; GIVE ME STORM; GIVE ME TREES; GIVE ME STARS; GIVE ME FLOWERS; GIVE ME BEES; GIVE ME RICE; GIVE ME RICE; GIVE ME RICE; GIVE ME RICE',
    position: [ -20, -14, 26 ],
    rotation: [ 0.3, Math.PI * 0.6, Math.PI / 4 ],
    maxWidth: 200,
    align: 'center'
  },
  {
    text: 'You\'re doing what you love, isn\'t that enough? Isn\'t that enough; A genius perfect job, isn\'t that enough? Isn\'t that enough; Again and again, you locked me down, I locked me down, we staked me to the ground',
    position: [ -70, -25, -10 ],
    rotation: [ -Math.PI * 0.3, Math.PI * 0.3,  Math.PI * 0.05],
    maxWidth: 200,
    align: 'right'
  }
];

/**
 * HorizonParagraphs
 * paragraphs: array of either plain strings OR config objects:
 *   {
 *     text: string (required if object)
 *     position?: [number, number, number]  // overrides auto layout (relative to group)
 *     rotation?: [number, number, number]  // custom rotation (default faces camera + slight roll)
 *     maxWidth?: number                    // overrides global width
 *     fontSize?: number                    // overrides global base font size (before distance scaling)
 *     noAutoScale?: boolean                // disable distance-based scale attenuation
 *     noFade?: boolean                     // disable distance-based opacity fade
 *     align?: 'left' | 'center' | 'right'   // per-item alignment override
 *   }
 */
export function HorizonParagraphs({
  paragraphs = defaultParagraphs,
  gap = 14,
  startZ = 4,
  fadeDistance = 70,
  baseY = 2,
  width = 70,
  fontSize = 0.8,
  darkMode = false,
  align = 'left' // global default alignment
}) {
  const groupRef = useRef();
  // Leva controls for second paragraph (index 1)
//   const { p2x, p2y, p2z, r2x, r2y, r2z } = useControls('Horizon Paragraph 2', {
//     p2x: { value: 0, min: -50, max: 50, step: 0.1 },
//     p2y: { value: 0, min: -50, max: 50, step: 0.1 },
//     p2z: { value: 0, min: -50, max: 50, step: 0.1 },
//     r2x: { value: 0, min: -1, max: 1, step: 0.01 },
//     r2y: { value: 0, min: -1, max: 1, step: 0.01 },
//     r2z: { value: 0, min: -1, max: 1, step: 0.01 }
//   });
  const planes = useMemo(() => paragraphs.map((entry, i) => {
    if (typeof entry === 'string') {
      return { text: entry, z: startZ + i * gap, index: i };
    }
    const text = entry.text ?? '';
    const autoZ = startZ + i * gap;
    const z = entry.position ? entry.position[2] : (entry.z ?? autoZ);
    return { ...entry, text, z, index: i };
  }), [paragraphs, gap, startZ]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() / 4000;
    groupRef.current.position.y = baseY + Math.sin(t) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, baseY, 0]}>
      {planes.map((cfg, idx) => {
        const { text, z, position, rotation, maxWidth: localWidth, fontSize: localFont, noAutoScale, noFade, align: itemAlign } = cfg;
        // Override position / rotation for second paragraph via Leva
        // const effectivePosition = idx === 10 ? [p2x, p2y, p2z] : (position || [0, 0, z]);
        // const effectiveRotation = idx === 10 ? [r2x * Math.PI, r2y * Math.PI, r2z * Math.PI] : rotation;
        const effectivePosition = position || [0, 0, z];
        const effectiveRotation = rotation || [0, 0, 0];
        const zForCalc = effectivePosition[2];
        const dist = zForCalc - startZ;
        const fade = 1 - dist / fadeDistance;
        const autoOpacity = THREE.MathUtils.clamp(fade, 0, 1);
        const opacity = noFade ? 1 : autoOpacity;
        const scaleFactor = noAutoScale ? 1 : (1 - Math.min(dist / (fadeDistance * 1.2), 0.65) * 0.4);
        return (
          <ParagraphBoard
            key={idx}
            text={text}
            position={effectivePosition}
            rotation={effectiveRotation}
            maxWidth={localWidth || width}
            fontSize={(localFont || fontSize) * scaleFactor}
            opacity={opacity}
            dark={darkMode}
            align={itemAlign || align}
          />
        );
      })}
    </group>
  );
}

function ParagraphBoard({ text, position, rotation, maxWidth, fontSize, opacity, dark, align }) {
  const textRef = useRef();
  const anchorX = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';

  return (
    <group position={position} rotation={rotation || [0, Math.PI, Math.PI/8]}>
      <Text
        ref={textRef}
        fontSize={fontSize}
        maxWidth={maxWidth}
        lineHeight={0}
        letterSpacing={0}
        textAlign={align}
        anchorX={anchorX}
        anchorY="middle"
        fillOpacity={dark ? opacity * 0.15 : 0.1}
      >{text}</Text>
    </group>
  );
}
