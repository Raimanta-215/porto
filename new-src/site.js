// site.js

document.getElementById('btn-go-3d').addEventListener('click', () => {
    const siteDiv = document.getElementById('site-classique');
    
    // 1. On lance le fondu (ça devient transparent)
    siteDiv.style.opacity = '0';
    
    // 2. On attend 1 seconde que le fondu soit fini, puis on l'enlève pour pouvoir cliquer sur la 3D !
    setTimeout(() => {
        siteDiv.style.display = 'none';
    }, 1000);
});

const data = [
        { name: "CISCO Intro Cyber", type: "Formation (Dist)", hours: 6 },
        { name: "Travail Matériel Réseau", type: "Technique", hours: 4 },
        { name: "Cyber Challenge Part 1", type: "Hackathon", hours: 10 },
        { name: "Cyber Challenge Part 2", type: "Hackathon", hours: 10 },
        { name: "Job Étudiant", type: "Expérience", hours: 10 },
        { name: "Hackathon", type: "Challenge", hours: 10 },
        { name: "Blender 3D", type: "Formation (Dist)", hours: 5 },
        { name: "Philippe Boxho", type: "Conférence", hours: 2 },
        { name: "Open Source ULB", type: "Conférence", hours: 4 }
    ];

    const body = document.getElementById('table-body');
    let total = 0;

    data.forEach(item => {
        const row = `<tr><td>${item.name}</td><td>${item.type}</td><td>${item.hours}h</td></tr>`;
        body.innerHTML += row;
        total += item.hours;
    });

    document.getElementById('total-hours').innerText = total + "h";