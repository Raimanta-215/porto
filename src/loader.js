import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// 1. On importe le DRACOLoader
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export let roomObject = null;

export function loadRoomAndEnvironment(scene, camera, renderer) {
// 1. Charger le HDR (On le garde juste pour les petits reflets tamisés)
// 1. Charger le HDR
    const rgbeLoader = new RGBELoader();
    
    console.log("▶️ Début du chargement du fichier HDRI...");

    rgbeLoader.load(
        'river_alcove_1k.hdr', 
        
        // Fonction 1 : SUCCÈS (Le fichier a été trouvé et lu)
        (texture) => {
            console.log("✅ HDRI téléchargé avec succès !");
            texture.mapping = THREE.EquirectangularReflectionMapping;
            
            // Applique les reflets sur la chambre
            scene.environment = texture;
            console.log("✅ scene.environment appliqué (Les meubles vont briller).");
            
            // SI TU VEUX VOIR L'IMAGE EN FOND, remets cette ligne :
            scene.background = texture; 
            console.log("✅ scene.background appliqué (Tu devrais voir le ciel derrière).");
            
            // On garde l'intensité basse pour ton coucher de soleil
            scene.environmentIntensity = 0.5; 
        },

        // Fonction 2 : PROGRESSION (Pratique pour les gros fichiers)
        (xhr) => {
            // Attention : xhr.total peut être à 0 sur certains serveurs, on gère l'erreur
            if (xhr.total > 0) {
                console.log(`⏳ HDRI en cours : ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
            } else {
                console.log(`⏳ HDRI en cours : ${xhr.loaded} octets téléchargés...`);
            }
        },

        // Fonction 3 : ERREUR (Le plus important pour ton débuggage)
        (error) => {
            console.error("❌ ERREUR CRITIQUE : Le HDRI n'a pas pu être chargé !");
            console.error("Cause probable : Le fichier s'appelle différemment, n'est pas au bon endroit, ou n'a pas été envoyé sur GitHub.");
            console.error("Détails de l'erreur :", error);
        }
    );
    
    const dracoLoader = new DRACOLoader();
    // On lui donne le lien vers les fichiers de décodage (la même version 0.160.0 que ton Three.js)
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');

    const loader = new GLTFLoader();
    // 3. On attache le décodeur au GLTFLoader
    loader.setDRACOLoader(dracoLoader);

    loader.load('Chambre.glb', (gltf) => {
        const room = gltf.scene;
        roomObject = gltf.scene; // On stocke la chambre ici
        scene.add(roomObject);
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

