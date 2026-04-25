import { scene, camera, renderer, controls } from './scene.js';
import { loadRoomAndEnvironment } from './loader.js';

// On lance le chargement
loadRoomAndEnvironment(scene, camera, renderer);

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const pixelScale = 1;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
});

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

animate();