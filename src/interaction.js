import * as THREE from 'three';
import { roomObject } from './loader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function setupInteractions(scene, camera) {
    window.addEventListener('pointerdown', (event) => {
        // Calcul des coordonnées
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (roomObject) {
            const intersects = raycaster.intersectObjects(roomObject.children, true);
            
            if (intersects.length > 0) {
                const target = intersects[0].object; // ✅ [0] added
                console.log("🎯 OBJET TOUCHÉ :", target.name || "Objet sans nom");
            } else {
                console.log("💨 Le laser a tiré dans le vide.");
            }
        }
    });
}