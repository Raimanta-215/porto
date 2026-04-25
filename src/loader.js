import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// 1. On importe le DRACOLoader
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export function loadRoomAndEnvironment(scene, camera, renderer) {
    const rgbeLoader = new RGBELoader();
    // Attention au chemin : comme ton index.html est à la racine, 'river_alcove_1k.hdr' suffit
    rgbeLoader.load('river_alcove_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        
        scene.environment = texture; // Éclaire la scène
        scene.background = texture;  // <-- RAJOUTE CETTE LIGNE pour voir l'image derrière
        
        console.log("HDRI rechargé !");
    });
    // 2. On prépare le décodeur Draco
    const dracoLoader = new DRACOLoader();
    // On lui donne le lien vers les fichiers de décodage (la même version 0.160.0 que ton Three.js)
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');

    const loader = new GLTFLoader();
    // 3. On attache le décodeur au GLTFLoader
    loader.setDRACOLoader(dracoLoader);

    loader.load('Chambre.glb', (gltf) => {
        const room = gltf.scene;
        
        room.traverse((node) => {
            if (node.isMesh && node.material && node.material.map) {
                const tex = node.material.map;
                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                tex.generateMipmaps = false;
                tex.needsUpdate = true;
                renderer.initTexture(tex);
            }
        });

        scene.add(room);
        
        renderer.compile(scene, camera);
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0'; 
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    });
}

