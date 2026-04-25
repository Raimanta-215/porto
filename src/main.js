import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// --- 1. CONFIGURATION DE BASE ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);

// L'anti-aliasing doit absolument être sur false pour un look rétro
const renderer = new THREE.WebGLRenderer({ antialias: false }); 

// --- LE SECRET DE L'EFFET PS2 EST ICI ---
// On définit un multiplicateur de résolution (0.25 = très pixelisé, 0.5 = pixels moyens)
const pixelScale = 0.5; 

// 1. On force le canvas à prendre 100% de l'écran en CSS
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
// 2. On empêche le navigateur de lisser l'image quand il l'étire
renderer.domElement.style.imageRendering = 'pixelated'; 

// 3. On demande à Three.js de calculer une toute petite image. 
// Le 'false' à la fin est crucial : il empêche Three.js d'écraser le CSS qu'on vient de mettre !
renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);

// On force un pixelRatio de 1 (on ignore les écrans Retina/4K pour garder le côté brut)
renderer.setPixelRatio(1); 
// ----------------------------------------

renderer.outputColorSpace = THREE.SRGBColorSpace; 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

document.body.appendChild(renderer.domElement);

// --- 2. LUMIÈRES ---
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 20); 
pointLight.position.set(2, 4, 3);
scene.add(pointLight);

// --- 3. CONTRÔLES SOURIS ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- 4. CHARGEMENT DU HDR ---
const rgbeLoader = new RGBELoader();
rgbeLoader.load('river_alcove_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture; 
    scene.background = texture; 
    console.log("HDR chargé avec succès !");
});

// --- 5. CHARGEMENT DU MODÈLE BLENDER ---
const loader = new GLTFLoader();
loader.load('Chambre.glb', (gltf) => {
    const room = gltf.scene;
    
    // 1. On modifie tous les matériaux
    room.traverse((node) => {
        if (node.isMesh) {
            if (node.material) {
                node.material.roughness = 0.4; 
                node.material.metalness = 0.2;
            }
            
            if (node.material && node.material.map) {
                const tex = node.material.map;

                // --- TEXTURES : CHOIX DU STYLE ---
                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                tex.generateMipmaps = false;
                
                tex.needsUpdate = true;
                renderer.initTexture(tex);
            }
        }
    }); // <--- LA BOUCLE TRAVERSE DOIT ABSOLUMENT SE TERMINER ICI

    // 2. UNE FOIS la boucle terminée, on ajoute la chambre à la scène
    scene.add(room);
    
    // 3. On compile le tout pour le GPU (une seule fois)
    renderer.compile(scene, camera);
    console.log("Chambre chargée ET compilée sur le GPU !");

    // 4. On cache l'écran de chargement
    const loadingScreen = document.getElementById('loading-screen');
    
    // Petite sécurité au cas où l'élément n'existerait pas
    if (loadingScreen) {
        loadingScreen.style.opacity = '0'; 
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});
// --- 6. GESTION DU REDIMENSIONNEMENT ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Il faut bien penser à appliquer le pixelScale aussi quand on redimensionne la fenêtre
    renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
});

// --- 7. BOUCLE DE RENDU ---
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

animate();