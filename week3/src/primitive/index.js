import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

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
  3000
);
camera.position.set(20, 20, 40);
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
planeMesh.position.z = -5;
scene.add(boxMesh);

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.z = -10;
scene.add(sphereMesh);

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
