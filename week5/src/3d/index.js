import "./style.css";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls";

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
camera.position.set(20, 10, 20);
scene.add(camera);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// control
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

/* 
//////////////////////////////////////////////////////////////////////////////
*/

// geometry
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);

// MeshNormalMaterial
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
mesh.position.y = 5;
scene.add(mesh);

// floor
const floorGeometry = new THREE.BoxGeometry(2000, 0.1, 2000);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  roughness: 0.2,
  metalness: 0,
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floorMesh);

/* 
//////////////////////////////////////////////////////////////////////////////
*/

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
