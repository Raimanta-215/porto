import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

  
  
 function TreeJS() { 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 10000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

//   const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//   const cube = new THREE.Mesh( geometry, material );
//   scene.add( cube );

    const ambientLight = new THREE.AmbientLight( 0x404040 ); // Soft white light
    scene.add( ambientLight ); 

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

  camera.position.z = 5;
    const loader = new GLTFLoader();

  loader.load( '/retro_room.glb',
    function ( gltf ) {
        scene.add ( gltf.scene );
    }, undefined , function (error){
        console.error( 'An error happened', error );
    }
);

 function animate() {
   renderer.render( scene, camera );
//   cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
}





renderer.setAnimationLoop( animate );

 };

 export default TreeJS;