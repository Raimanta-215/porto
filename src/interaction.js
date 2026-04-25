import * as THREE from 'three';
import { roomObject } from './loader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function setupInteractions(scene, camera) {
    
    window.addEventListener('pointerdown', (event) => {
        
        // 1. Position de la souris
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 2. On lance le laser
        raycaster.setFromCamera(mouse, camera);

        // 3. On vérifie si on touche la chambre
        if (roomObject) {
            // UNE SEULE déclaration ici
            const intersects = raycaster.intersectObjects(roomObject.children, true);
            
            if (intersects.length > 0) {
                // On prend le premier objet touché
                const objetTouche = intersects.object;
                
                if (objetTouche && objetTouche.isMesh) {
                    const nomObjet = objetTouche.name !== "" ? objetTouche.name : "Objet sans nom";
                    console.log("👉 Tu as touché :", nomObjet);
                }
            } else {
                console.log("💨 Le laser n'a rien touché dans la chambre.");
            }
        }
    });
}