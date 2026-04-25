import { scene, camera, renderer, controls } from './scene.js';
import { loadRoomAndEnvironment } from './loader.js';
import { setupInteractions } from './interaction.js';
import { cameraMovement } from './interaction.js';
// On lance le chargement
loadRoomAndEnvironment(scene, camera, renderer);


setupInteractions(scene, camera);

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const pixelScale = 0.5;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
});

// Boucle d'animation

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // ✅ On vérifie si une cible a été définie dans l'objet cameraMovement
    if (cameraMovement.target) {
        camera.position.lerp(cameraMovement.target, 0.05);
        controls.target.lerp(cameraMovement.lookAt, 0.05);

        // ✅ Condition d'arrêt plus souple pour éviter de boucler à l'infini
        if (camera.position.distanceTo(cameraMovement.target) < 0.1) {
            cameraMovement.target = null; // On stoppe le mouvement
            console.log("Arrivé à destination");
        }
    }

    renderer.render(scene, camera);
}

animate();