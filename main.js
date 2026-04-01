import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';

// --- DATA ---
const activitiesData = {
    "1": { titre: "Développement Web Advanced", status: "STABLE", heures: 10, contexte: "Détails du web...", apprentissage: "React, Three.js...", reflexion: "Ma réflexion sur le web..." },
    "2": { titre: "Cyber-sécurité Offensive", status: "ENCRYPTED", heures: 8, contexte: "Audit de vulnérabilité...", apprentissage: "Kali, Pentest...", reflexion: "Ma réflexion sur la sécurité..." },
    // Ajoute les autres ID ici (3, 4, 5, 6)
};

// --- LOGIQUE COMMUNE (3D) ---
const init3D = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    const geo = new THREE.IcosahedronGeometry(2, 0);
    const mat = new THREE.MeshPhongMaterial({ color: 0x10b981, wireframe: true });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);
    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    };
    animate();
};

// --- LOGIQUE PAGE ACCUEIL ---
const grid = document.getElementById('themes-grid');
if (grid) {
    Object.keys(activitiesData).forEach(id => {
        const item = activitiesData[id];
        const card = document.createElement('div');
        card.className = 'theme-card';
        card.onclick = () => window.location.href = `detail.html?id=${id}`;
        card.innerHTML = `<h3>${item.titre}</h3><p>${item.status}</p>`; // Personnalise le HTML ici
        grid.appendChild(card);
    });
}

// --- LOGIQUE PAGE DÉTAIL ---
const params = new URLSearchParams(window.location.search);
const currentId = params.get('id');
if (currentId && document.getElementById('title')) {
    const data = activitiesData[currentId];
    if (data) {
        document.getElementById('title').innerText = data.titre;
        document.getElementById('status').innerText = `STATUS: ${data.status}`;
        // ... Injecte les autres champs (context, learning, etc.)
    }
    document.getElementById('back-btn').onclick = () => window.location.href = 'index.html';
}

init3D();
lucide.createIcons();