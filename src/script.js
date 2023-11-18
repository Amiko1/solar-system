import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

//planets
const planet = document.querySelectorAll(".planet");
const bio = document.querySelector(".planet-bio");
const bioName = document.querySelector(".bio__name");
const bioDesccription = document.querySelector(".bio__description");
const bioUnselect = document.querySelector(".bio__unselect");
const app = document.getElementById("app");
const loader = document.getElementById("loader");

console.log(bio, bioName, bioDesccription);
// initialize the scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cubeMap/");
const backgroundCubemap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");

// add stuff here
const shpereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(shpereGeometry, sunMaterial);
sun.scale.setScalar(5);

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});

const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});

const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});

const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});

const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

scene.add(sun);

const baseDistance = 10;
const baseRadius = 1;
const baseSpeed = 0.01;

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: baseDistance,
    speed: baseSpeed,
    material: mercuryMaterial,
    moons: [],
    bio: "Mercury is the smallest and innermost planet in our solar system. It is named after the Roman messenger god and is known for its extreme temperatures, ranging from scorching hot to freezing cold.",
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: baseDistance * 2,
    speed: baseSpeed / 1.3,
    material: venusMaterial,
    moons: [],
    bio: "Venus is the second planet from the Sun and is often called Earth's 'sister planet.' It has a thick atmosphere and experiences a runaway greenhouse effect, making it one of the hottest planets in our solar system.",
  },
  {
    name: "Earth",
    radius: 1,
    distance: baseDistance * 3,
    speed: baseSpeed / 1.6,
    material: earthMaterial,
    bio: "Earth is our home, a unique and vibrant planet teeming with life. It has a diverse climate, abundant water, and is the only known celestial body to support a wide variety of ecosystems.",
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: baseDistance * 4,
    speed: baseSpeed / 1.95,
    material: marsMaterial,
    bio: "Mars, often called the 'Red Planet,' is known for its rusty appearance. It has diverse geological features, including the largest volcano and canyon in the solar system.",
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 0.7,
    distance: baseDistance * 5,
    speed: baseSpeed / 3.6,
    material: jupiterMaterial,
    bio: "Jupiter is the largest planet in our solar system and a gas giant. It has a strong magnetic field and a system of rings. Jupiter's Great Red Spot is a massive storm that has been raging for centuries.",
    moons: [
      {
        name: "Io",
        radius: 0.15,
        distance: 2.5,
        speed: 0.03,
        color: 0xffcc00,
      },
      {
        name: "Europa",
        radius: 0.12,
        distance: 3.2,
        speed: 0.025,
        color: 0x99ccff,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 0.7,
    distance: baseDistance * 6,
    speed: baseSpeed / 5.2,
    material: saturnMaterial,
    bio: "Saturn is famous for its stunning ring system, which is composed of ice particles and rocky debris. It is a gas giant with a diverse collection of moons, including Titan, which has a thick atmosphere.",
    moons: [
      {
        name: "Titan",
        radius: 0.25,
        distance: 3.5,
        speed: 0.02,
        color: 0xcccccc,
      },
      {
        name: "Enceladus",
        radius: 0.1,
        distance: 4.2,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 0.7,
    distance: baseDistance * 7,
    speed: baseSpeed / 6.9,
    material: uranusMaterial,
    bio: "Uranus is an ice giant with a unique feature - it rotates on its side. It has a faint ring system and a collection of moons, including Miranda, which has a varied and unusual surface.",
    moons: [
      {
        name: "Titania",
        radius: 0.15,
        distance: 2.8,
        speed: 0.03,
        color: 0x99cc99,
      },
      {
        name: "Oberon",
        radius: 0.14,
        distance: 3.5,
        speed: 0.025,
        color: 0xcc99cc,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 0.7,
    distance: baseDistance * 8,
    speed: baseSpeed / 8.7,
    material: jupiterMaterial,
    bio: "Neptune is the eighth and farthest known planet from the Sun in our solar system. It is an ice giant with a faint ring system and a collection of moons, including Triton, which has a retrograde orbit.",
    moons: [
      {
        name: "Triton",
        radius: 0.18,
        distance: 2.5,
        speed: 0.03,
        color: 0x3366ff,
      },
      {
        name: "Proteus",
        radius: 0.1,
        distance: 3.2,
        speed: 0.025,
        color: 0xffffcc,
      },
    ],
  },
];

const circleGeometry = new THREE.TorusGeometry(1, 0.002, 2, 100);
const circleMaterial = new THREE.MeshBasicMaterial({ color: "grey" });

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(shpereGeometry, planet.material);
  const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
  circleMesh.rotation.x = Math.PI / 2;
  planetMesh.scale.setScalar(planet.radius);

  circleMesh.scale.setScalar(planet.distance);
  planetMesh.position.x = planet.distance;

  scene.add(circleMesh);

  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(shpereGeometry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;

  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(ambientLight);
scene.add(pointLight);
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;
camera.fov = 90;
camera.updateProjectionMatrix();

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");

app.style.visibility = "hidden";
loader.style.display = "block";
canvas.style.visibility = "hidden";

addEventListener("load", (event) => {
  app.style.visibility = "visible";
  loader.style.display = "none";
  canvas.style.visibility = "visible";
});

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

planet.forEach((item, index) => {
  item.addEventListener("click", () => {
    controls.target = planetMeshes[index].position;
    controls.maxDistance = 3;

    console.log();
    bio.style.display = "block";

    bioName.textContent = planets[index].name;
    bioDesccription.textContent = planets[index].bio;
  });
});

bioUnselect.addEventListener("click", () => {
  controls.maxDistance = 200;
  controls.minDistance = 20;
  controls.target = new THREE.Vector3(
    controls.target.x,
    controls.target.y,
    controls.target.z
  );
  bio.style.display = "none";
});

// render loop
const renderloop = () => {
  const elapsedTime = clock.getElapsedTime();

  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;

    planet.position.x =
      Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z =
      Math.cos(planet.rotation.y) * planets[planetIndex].distance;

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;

      moon.position.x =
        Math.sin(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) *
        planets[planetIndex].moons[moonIndex].distance;
    });
  });
  //add animation
  // earth.position.x = Math.sin(elapsedTime) * 10;
  // earth.position.z = Math.cos(elapsedTime) * 10;

  // moon.position.x = Math.sin(elapsedTime) * 2;
  // moon.position.z = Math.cos(elapsedTime) * 2;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
