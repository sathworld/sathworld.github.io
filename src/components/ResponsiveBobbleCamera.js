import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";

export function ResponsiveBobbleCamera({ 
  offsetX = 0, 
  offsetY = 0, 
  offsetZ = 0, 
  lookAtX = 0,
  lookAtY = 0,
  lookAtZ = 0,
  intensity = 0.2, 
  smoothness = 0.05 
}) {
  const [scrollY, setScrollY] = useState(0);
  const [fov, setFov] = useState(50);
  const { camera } = useThree();
  const initialCameraState = useRef(null);
  
  useEffect(() => {
    const updateScrollY = () => {
      // The r3f-vite-starter uses a global ref on the window object.
      // We will check for it here.
      const wrapper = window.scrollWrapperRef?.current;
      if (wrapper) {
        const newScrollY = wrapper.scrollTop;
        setScrollY(newScrollY);
      } else {
        // Fallback to window scroll if the wrapper is not found
        setScrollY(window.scrollY);
      }
    };
    
    updateScrollY();
    
    const wrapper = window.scrollWrapperRef?.current;
    const scrollTarget = wrapper || window;

    scrollTarget.addEventListener("scroll", updateScrollY, { passive: true });
    
    return () => {
      scrollTarget.removeEventListener("scroll", updateScrollY);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setFov(30); // Mobile
      } else if (width < 768) {
        setFov(30); // Tablet
      } else if (width < 1200) {
        setFov(30); // Smaller desktop
      } else {
        setFov(30); // Large desktop
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [camera, fov]);
  
  useFrame(() => {
    if (!initialCameraState.current) {
      initialCameraState.current = {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
        },
        rotation: {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z
        }
      };
    }
    
    const currentScrollY = scrollY;
    
    const bobbleX = Math.sin(currentScrollY * 0.008) * intensity;
    const bobbleY = Math.cos(currentScrollY * 0.008) * intensity * 0.5;
    
    const targetX = initialCameraState.current.position.x + offsetX + bobbleX;
    const targetY = initialCameraState.current.position.y + offsetY + bobbleY - currentScrollY/8000;
    const targetZ = initialCameraState.current.position.z + offsetZ;
    
    camera.position.x += (targetX - camera.position.x) * smoothness;
    camera.position.y += (targetY - camera.position.y) * smoothness;
    camera.position.z += (targetZ - camera.position.z) * smoothness;
    
    camera.lookAt(lookAtX, lookAtY, lookAtZ);
  });
  
  return null;
}
