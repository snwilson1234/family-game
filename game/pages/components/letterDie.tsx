'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


function makeLettersTexture() {
// TODO: add comments here to make this more clear, move things around so that the component is first in the file, etc..

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
  const letters = "ABCDEFGHIJKLMNOPRSTW";
  for (let i = 0; i < 20; i++) {
    ctx.fillText((letters[i]).toString(), step * i + step / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

type LetterDieProps = {
  sendRandomLetter : (letter: string) => void,
};

const LetterDie = ({
  sendRandomLetter
} : LetterDieProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [rotationActive, setRotationActive] = useState(false);
  const points = [
    { letter: "A", vect: new THREE.Vector3(0.9, 0.3, -0.55) }, // A
    { letter: "B", vect: new THREE.Vector3(0.9, -0.95, -0.55) }, // B
    { letter: "C", vect: new THREE.Vector3(0.9, -2.2, -0.55) }, // C
    { letter: "D", vect: new THREE.Vector3(0.9, -3.45, -0.55) }, // D
    { letter: "E", vect: new THREE.Vector3(0.9, -4.7, -0.55) }, // E
    { letter: "F", vect: new THREE.Vector3(0.9, -0.3, 0.55) }, // F
    { letter: "G", vect: new THREE.Vector3(-0.2, 0.3, 0.55) }, // G
    { letter: "H", vect: new THREE.Vector3(1.55, -3.65, -1.95) }, // H
    { letter: "I", vect: new THREE.Vector3(0.4, -3.15, -1.6) }, // I
    { letter: "J", vect: new THREE.Vector3(-0.9, -2.6, -1.95) }, // J
    { letter: "K", vect: new THREE.Vector3(0.9, 0.3, -3.65) }, // K
    { letter: "L", vect: new THREE.Vector3(0.9, -0.95, -3.65) }, // L
    { letter: "M", vect: new THREE.Vector3(0.9, -2.2, -3.7) }, // M
    { letter: "N", vect: new THREE.Vector3(0.9, -3.45, -3.7) }, // N
    { letter: "O", vect: new THREE.Vector3(2.2, 1.55, 1.35) }, // O
    { letter: "P", vect: new THREE.Vector3(3, 2.85, 0.55) }, // P
    { letter: "R", vect: new THREE.Vector3(0.9, -0.3, -2.6) }, // R
    { letter: "S", vect: new THREE.Vector3(-0.9, -2.6, 1.2) }, // S
    { letter: "T", vect: new THREE.Vector3(0.4, -3.15, -4.7) }, // T
    { letter: "W", vect: new THREE.Vector3(-1.55, 0.5, -1.95) }, // W
  ];
  const [counter, setCounter] = useState(0);

  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.5);
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
            meshRef.current.rotation.x = rotatePoint.vect.x;
            meshRef.current.rotation.y = rotatePoint.vect.y;
            meshRef.current.rotation.z = rotatePoint.vect.z;
            sendRandomLetter(rotatePoint.letter);
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
