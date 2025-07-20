import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  
 function TreeJS() { 

  useEffect(() => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
 
  camera.position.set(3, 3, 2);
    const dir = new THREE.Vector3(-0.9, -0.32, -0.71).normalize();

    const target = new THREE.Vector3().addVectors(camera.position, dir);
    camera.lookAt(target);
    camera.far = 5000;
    camera.updateProjectionMatrix();
    const ambientLight = new THREE.AmbientLight( 0x404040 ); // Soft white light
    scene.add( ambientLight ); 

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );
    const loader = new GLTFLoader();


    let clickableMeshes = [];

loader.load('/retro_room.glb', function(gltf) {
  scene.add(gltf.scene);
  console.log("✅ Modèle chargé !");
  
   gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      // ✅ Forcer la mise à jour de la géométrie
      obj.geometry.computeBoundingBox();
      obj.geometry.computeBoundingSphere();

      // ✅ S'assurer que le raycaster voit bien les 2 faces
      obj.material.side = THREE.DoubleSide;

      clickableMeshes.push(obj);
    }
  });

  // ✅ Important : mettre à jour les matrices mondiales
  gltf.scene.updateMatrixWorld(true);
  
  });


document.addEventListener("click", (event) => {
  // 1. Convertir la souris en coordonnées normalisées
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  console.log(mouse.x, mouse.y);


  // 2. Raycaster pour détecter les objets cliqués
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (!intersects.length) return; // rien cliqué
 console.log("Intersects:", intersects);
  // 3. Trouver uniquement "Cube015"
  const hit = intersects.find(hit => hit.object.name.includes("Cube015"));
  if (!hit) return; // tu n'as pas cliqué sur Cube015

  const obj = hit.object;

  // 4. Récupérer la position monde du mesh cliqué
  const pos = obj.getWorldPosition(new THREE.Vector3());

  // 5. Placer la caméra DEVANT l'objet
  const distance = 1;   // distance devant
  const height = 0;   // un peu plus haut

  // Direction avant fixe 
  const forward = new THREE.Vector3(0, -1, 0); 
  const forwardWorld = forward.applyQuaternion(obj.getWorldQuaternion(new THREE.Quaternion()));

  // Position caméra = devant + un peu en hauteur
  camera.position.copy(pos.clone().add(forwardWorld.multiplyScalar(distance)));
  camera.position.y += height;

  // 6. Regarder le centre exact du mesh
  camera.lookAt(pos);
});




 function animate() {
   renderer.render( scene, camera );
//   cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
}




renderer.setAnimationLoop( animate );

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
 }, []);

 return null;
 };

 export default TreeJS;