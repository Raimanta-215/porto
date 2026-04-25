import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export function loadRoomAndEnvironment(scene, camera, renderer) {
    // 1. Charger le HDR
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('river_alcove_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
    });

    // 2. Charger la chambre
    const loader = new GLTFLoader();
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
        
        // Compilation et fin du chargement
        renderer.compile(scene, camera);
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0'; 
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    });
}