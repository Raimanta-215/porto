import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Essaye ces valeurs pour être "dans" la chambre et voir le sol
camera.position.set(-15, 10, -20); 
// Force la caméra à regarder le centre de la pièce
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer({ antialias: false });
const pixelScale = 0.5;
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
renderer.domElement.style.imageRendering = 'pixelated';
renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);


renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5; // Monte à 2.0 ou 3.0 si tout est trop sombre !


// --- LUMIÈRES : AMBIANCE SOLEIL COUCHANT ---

// 1. La lumière d'ambiance (Les ombres)
// Au coucher du soleil, les ombres ne sont pas noires, mais légèrement bleutées/violacées.
const ambientLight = new THREE.AmbientLight(0x2b3a55, 0.1); 
scene.add(ambientLight);

// 2. Le Soleil (DirectionalLight)
// Un bel orange vif (0xff8833) avec une très forte intensité (15)
const sunLight = new THREE.DirectionalLight(0xff8833, 5); 

// --- ATTENTION : À TOI DE RÉGLER CES COORDONNÉES ---
// Position du soleil (Imagine qu'il est loin dehors) (z,y,x)
sunLight.position.set(50, 30, -50); 

// Vers où le soleil pointe (Le centre de ta fenêtre ou de ta chambre)
sunLight.target.position.set(50, 30, 0); 

scene.add(sunLight);
scene.add(sunLight.target); // Il faut toujours ajouter la cible d'une DirectionalLight à la scène

// --- CONTRÔLES SOURIS ---
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// --- L'ASSISTANT MAGIQUE POUR LA LUMIÈRE ---
// Le chiffre 2 à la fin, c'est la taille du dessin (tu peux l'agrandir)
const lightHelper = new THREE.DirectionalLightHelper(sunLight, 5);
scene.add(lightHelper);

// --- LA BOUSSOLE 3D ---
// Le chiffre 5 correspond à la longueur des lignes en mètres
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);