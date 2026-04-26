import * as THREE from 'three';
import { roomObject } from './loader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export const cameraMovement = {
    target: null,
    lookAt: new THREE.Vector3(),
    currentObject: null //  NOUVEAU : On mémorise la cible actuelle
};

// La liste stricte des objets interactifs
const interactiveObjects = [
    'Object_7', 
    'MonitorOn_MonitorOn_0', 
    'Chassi_Material004_0',
    'Chassi_plastico_preto010_0', // J'ai ajouté tes nouveaux objets
    'Chassi_Acrilico002_0'
];

// ✅ NOUVEAU : La fonction centrale qui gère le mouvement
export function focusOnObject(targetName, targetMesh) {
    cameraMovement.currentObject = targetName;
    const targetPos = new THREE.Vector3();
    targetMesh.getWorldPosition(targetPos);

    // 1. La caméra REGARDE l'objet
    cameraMovement.lookAt.copy(targetPos);

    // 2. On place la caméra DEVANT l'objet (UN SEUL SWITCH ICI !)
    switch (targetName) {
        case 'Object_7':
            // J'ai mis tes nouvelles coordonnées ici
            cameraMovement.target = new THREE.Vector3(targetPos.x - 1, targetPos.y + 1, targetPos.z - 2);
            break;
        case 'MonitorOn_MonitorOn_0':
            cameraMovement.target = new THREE.Vector3(targetPos.x + 1, targetPos.y + 1, targetPos.z - 4);
            break;
        case 'Chassi_Material004_0':
        case 'Chassi_plastico_preto010_0':
        case 'Chassi_PlasticoPreto018_0':
        case 'Chassi_Acrilico002_0':
            cameraMovement.target = new THREE.Vector3(targetPos.x - 3, targetPos.y + 1, targetPos.z - 1);
            break;
        default:
            console.log(`Cible 3D non gérée pour la caméra : ${targetName}`);
    }
}

export function setupInteractions(scene, camera) {
    window.addEventListener('pointerdown', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (roomObject) {
            const intersects = raycaster.intersectObjects(roomObject.children, true);
            
            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object;

                let currentObj = clickedMesh;
                let foundInteractiveName = null;
                let targetMesh = null;

                while (currentObj) {
                    if (interactiveObjects.includes(currentObj.name)) {
                        foundInteractiveName = currentObj.name;
                        targetMesh = currentObj;
                        break;
                    }
                    currentObj = currentObj.parent;
                }

                if (foundInteractiveName && targetMesh) {
                    console.log("Cible interactive détectée (Clic 3D) :", foundInteractiveName);
                    // ✅ On appelle la fonction centrale !
                    focusOnObject(foundInteractiveName, targetMesh);
                } else {
                    console.log("Clic ignoré. Objet touché :", clickedMesh.name);
                }
            }
        }
    });
}