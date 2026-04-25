import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

export const renderer = new THREE.WebGLRenderer({ antialias: false });
const pixelScale = 0.35;
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
renderer.domElement.style.imageRendering = 'pixelated';
renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
const pointLight = new THREE.PointLight(0xffffff, 20); 
pointLight.position.set(2, 4, 3);
scene.add(ambientLight, pointLight);

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;