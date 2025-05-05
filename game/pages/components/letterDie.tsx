import * as THREE from 'three';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function makeLettersTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const step = canvas.width / 20;
  const letters = "ABCDEFGHIJKLMNOPQRSTW";
  for (let i = 0; i < 20; i++) {
    ctx.fillText((letters[i]).toString(), step * i + step / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const LetterDie = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [rotationActive, setRotationActive] = useState(false);
  const points = [
    new THREE.Vector3(0.9, 0.3, -0.55), // A
    new THREE.Vector3(0.9, -0.95, -0.55), // B
    new THREE.Vector3(0.9, -2.2, -0.55), // C
    new THREE.Vector3(0.9, -3.45, -0.55), // D
    new THREE.Vector3(0.9, -4.7, -0.55), // E
    new THREE.Vector3(0.9, -0.3, 0.55), // F
    new THREE.Vector3(-0.2, 0.3, 0.55), // G
    new THREE.Vector3(1.55, -3.65, -1.95), // H
    new THREE.Vector3(0.4, -3.15, -1.6), // I
    new THREE.Vector3(-0.9, -2.6, -1.95), // J
    new THREE.Vector3(0.9, 0.3, -3.65), // K
    new THREE.Vector3(0.9, -0.95, -3.65), // L
    new THREE.Vector3(0.9, -2.2, -3.7), // M
    new THREE.Vector3(0.9, -3.45, -3.7), // N
    new THREE.Vector3(2.2, 1.55, 1.35), // O
    new THREE.Vector3(3, 2.85, 0.55), // P
    new THREE.Vector3(0.9, -0.3, -2.6), // R
    new THREE.Vector3(-0.9, -2.6, 1.2), // S
    new THREE.Vector3(0.4, -3.15, -4.7), // T
    new THREE.Vector3(-1.55, 0.5, -1.95), // W
  ];
  const [counter, setCounter] = useState(0);

  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1);
    const color = new THREE.Vector3(0.11, 0.1, 0.56);
    const colors: number[] = [];
    const uv: number[] = [];

    // Make triangular faces using vertices for icosahedron shape
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 3; j++) {
        colors.push(color.x, color.y, color.z);
      }
      uv.push(
        (0.067 + i) / 20, 0.25,
        (0.933 + i) / 20, 0.25,
        (0.5 + i) / 20, 1
      );
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    console.log("index:", geometry.getIndex());
    console.log("faces:", geometry.getAttribute('faces'));

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: makeLettersTexture(),
    });

    return { geometry, material };
  }, []);

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // rotate
  useFrame(() => {
    if (rotationActive) {
        if (counter < 100) {
            meshRef.current.rotateX(45);
            meshRef.current.rotateY(45);
            setCounter(counter + 1);
        } else {
            setCounter(0);
            setRotationActive(false);
            // end in a random position and make this the die result, to simplify rotation logic
            const rotatePoint = points[getRandomInt(0,19)];
            meshRef.current.rotation.x = rotatePoint.x;
            meshRef.current.rotation.y = rotatePoint.y;
            meshRef.current.rotation.z = rotatePoint.z;
        }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={new THREE.Vector3(0,0,0)}
      geometry={geometry}
      material={material}
      onClick={() => setRotationActive(!rotationActive)}
    />
  );
};

export default LetterDie;
