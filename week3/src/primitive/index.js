import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import helvetiker_regular from "three/examples/fonts/helvetiker_regular.typeface.json";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// perspective camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(20, 10, 15);
scene.add(camera);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;
controls.minDistance = 10;

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// material
const material = new THREE.MeshNormalMaterial();

// plane
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMesh = new THREE.Mesh(planeGeometry, material);
scene.add(planeMesh);

// box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.position.z = -5;
scene.add(boxMesh);

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.z = -10;
scene.add(sphereMesh);

// cynlinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
cylinderMesh.position.z = -15;
scene.add(cylinderMesh);

// torusknot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 16);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnotMesh.position.z = -20;
scene.add(torusKnotMesh);

// text
const fontLoader = new FontLoader();
fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello three.js!", {
    font: font,
    size: 70,
    height: 5,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1.5,
  });

  const textMesh = new THREE.Mesh(textGeometry, material);
  textMesh.scale.setScalar(0.03);
  textMesh.position.z = -25;
  scene.add(textMesh);
});

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
