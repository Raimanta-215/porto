function TroisD() {
  return (
    <div>
      <h1>Page Trois D</h1>
      <p>Bienvenue sur la page Trois D !</p>
      <model-viewer
        src="/src/assets/HappyPlace.glb"
        alt="Description de votre modèle 3D"
        camera-controls
      ></model-viewer>
    </div>
  );
}

export default TroisD;