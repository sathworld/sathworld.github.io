import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';


const modelPathPCB = `${process.env.PUBLIC_URL}/models/pcb.glb`;
const ModelPCB = (props) => {
    const { nodes, materials } = useGLTF(modelPathPCB)
    return (
      <group {...props} dispose={null} rotation={[0, Math.PI * 5 / 4, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Node1.geometry}
          material={materials['#181818FF']}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Node2.geometry}
            material={materials['#447766FF']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Node3.geometry}
            material={materials['#F5F5F2FF']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Node4.geometry}
            material={materials['#F2CB7CFF']}
          />
        </mesh>
      </group>
    )
  }

useGLTF.preload(modelPathPCB)



export const ModelViewer = () => {
    return (
        <div className="h-[600px] w-full">
            <Canvas camera={{ position: [0, 50, 0] }}>
                <ambientLight intensity={0.3} />
                <pointLight
                    position={[-5, 50, 0]}  // Make sure the light is close to the model
                    intensity={1.5}         // Increase the intensity to make sure it affects the model
                    decay={0.02}               // Make the light intensity decay with distance
                    distance={70}           // Set a max range for the light's effect
                    castShadow             // Ensure the point light casts shadows
                />
                <ModelPCB />
                <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                //maxPolarAngle={Math.PI / 3}  // Optional: restrict vertical rotation
                minDistance={20}              // Optional: prevent zooming too close
                maxDistance={50}             // Optional: prevent zooming too far
                />
            </Canvas>
        </div>
    );
};