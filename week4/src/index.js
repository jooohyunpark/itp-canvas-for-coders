import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace; // optional with post-processing
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// perspective camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

camera.position.set(0, 5, 20);
scene.add(camera);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.set(0, 0.1, 0);
scene.add(axesHelper);

// rect light
const rectLight = new THREE.RectAreaLight("#ffffff", 5, 20, 10);
rectLight.position.set(0, 5, -10);
rectLight.rotation.set(0, Math.PI, 0);

scene.add(rectLight, new RectAreaLightHelper(rectLight));

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.3;
controls.enableZoom = true;
controls.zoomSpeed = 0.5;
controls.minDistance = 10;
controls.maxDistance = 1000;

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// floor
const floorGeometry = new THREE.BoxGeometry(2000, 0.1, 2000);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.1,
  metalness: 0,
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floorMesh);

// cone
const coneGeometry = new THREE.ConeGeometry(1, 3, 128);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.8,
  metalness: 0,
});
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.y = 1.5;
scene.add(coneMesh);

//
// const SphereGeometry = new THREE.SphereGeometry(1, 128, 128);
// const sphereMaterial = new THREE.MeshStandardMaterial({
//   color: "#002408",
//   roughness: 0.8,
//   metalness: 0.2,
// });
// const sphereMesh = new THREE.Mesh(SphereGeometry, sphereMaterial);
// sphereMesh.position.y = 5;
// scene.add(sphereMesh);

//
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.8,
  metalness: 0,
});
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.position.y = 5;
scene.add(torusKnotMesh);
controls.target.copy(torusKnotMesh.position);

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
