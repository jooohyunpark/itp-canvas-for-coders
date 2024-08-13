import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";
import Stats from "stats.js";

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
  2000
);
camera.position.set(0, 5, 20);

// light
const rectLight = new THREE.RectAreaLight("#ffffff", 5, 50, 10);
rectLight.position.set(0, 5, -15);
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
controls.minDistance = 1;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI * 0.5;

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
  color: "gray",
  roughness: 0.2,
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

// torusknot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0,
  metalness: 0,
});
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.position.y = 5;
scene.add(torusKnotMesh);
controls.target.copy(torusKnotMesh.position);

// sphere
const sphereGroup = new THREE.Group();
const SphereGeometry = new THREE.SphereGeometry(0.3, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0,
  metalness: 0,
});
const sphereMesh = new THREE.Mesh(SphereGeometry, sphereMaterial);
sphereMesh.position.set(5, 5, 0);
sphereGroup.add(sphereMesh);
scene.add(sphereGroup);

// stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// animate
const animate = (timestamp) => {
  // timestamp - convert millisecond to second
  timestamp *= 0.001;

  // aniamte objects
  torusKnotMesh.rotation.y = Math.PI * 0.1 * timestamp;
  sphereGroup.rotation.y = Math.PI * -0.12 * timestamp;
  sphereMesh.position.y = 5 + Math.cos(timestamp);

  /**
   * h — hue value between 0.0 and 1.0
   * s — saturation value between 0.0 and 1.0
   * l — lightness value between 0.0 and 1.0
   */
  // rectLight.color.setHSL(Math.abs(Math.cos(timestamp * 0.1)), 1, 0.5);

  renderer.render(scene, camera);
  controls.update();
  stats.update();
};
renderer.setAnimationLoop(animate);
