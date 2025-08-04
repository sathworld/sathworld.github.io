import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Model as ChildrenOfTheCity } from './ChildrenOfTheCity';
import { ResponsiveBobbleCamera } from './ResponsiveBobbleCamera';
import { useTheme } from '../utils/theme';
// import { useControls } from 'leva';

const ThreeBackground = () => {
  const { isDarkMode } = useTheme();
  // const { offsetX, offsetY, offsetZ, intensity, smoothness, lookAtX, lookAtY, lookAtZ } = useControls({
  //   offsetX: { value: 3, min: -20, max: 20, step: 0.1 },
  //   offsetY: { value: -5, min: -20, max: 20, step: 0.1 },
  //   offsetZ: { value: -1.5, min: -20, max: 20, step: 0.1 },
  //   intensity: { value: 5, min: 0, max: 10, step: 0.1 },
  //   smoothness: { value: 0.03, min: 0.01, max: 0.1, step: 0.001 },
  //   lookAtX: { value: 0, min: -10, max: 10, step: 0.1 },
  //   lookAtY: { value: 0, min: -10, max: 10, step: 0.1 },
  //   lookAtZ: { value: 0, min: -10, max: 10, step: 0.1 },
  // });

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [13, 5, -6.5]
        }}
      >
        <Suspense fallback={null}>
          <ResponsiveBobbleCamera 
            offsetX={3}
            offsetY={-5}
            offsetZ={-1.5} 
            intensity={5} 
            smoothness={0.03}
            lookAtX={0}
            lookAtY={0}
            lookAtZ={0}
          />
          {isDarkMode ? (
                <fogExp2 attach="fog" args={["#0B000E", 0.07]} />
            ) : (
                <fogExp2 attach="fog" args={["#FFFFFF", 0.05]} />
            )}
          
          
          <pointLight 
            position={[0.5, 3.7, 0.2]} 
            intensity={10.3} 
            color="#ffffff" 
            distance={3.4} 
            decay={1}
          />

          <ChildrenOfTheCity/>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
