import * as THREE from 'three';
import { roomObject } from './loader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// ✅ On utilise un objet pour que la référence soit partagée correctement
export const cameraMovement = {
    target: null,
    lookAt: new THREE.Vector3()
};

export function setupInteractions(scene, camera) {
    window.addEventListener('pointerdown', (event) => {
        // Correction pour le PixelScale : On utilise clientX/Y normalement
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (roomObject) {
            // On vérifie que roomObject.children existe
            const intersects = raycaster.intersectObjects(roomObject.children, true);
            
            if (intersects.length > 0) {
                const targetMesh = intersects[0].object;

                console.log("Objet cliqué :", targetMesh.name);

                const targetPos = new THREE.Vector3();
                targetMesh.getWorldPosition(targetPos);

                // ✅ On met à jour les propriétés de l'objet exporté
                cameraMovement.target = new THREE.Vector3(targetPos.x - 2, targetPos.y + 1 , targetPos.z - 1);
                cameraMovement.lookAt.copy(targetPos);
            }
        }
    });
}