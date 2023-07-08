import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff");

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(100, 200, 400);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.3;
controls.enableZoom = true;
controls.zoomSpeed = 0.3;

// directional light
const dirLight1 = new THREE.DirectionalLight("#ffff00");
dirLight1.position.set(-100, 100, 100);
const dirLight1helper = new THREE.DirectionalLightHelper(dirLight1, 10);
scene.add(dirLight1, dirLight1helper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xcccccc);
scene.add(ambientLight);

// sphere
const sphereGeometry = new THREE.SphereGeometry(10, 128, 128);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x000000,
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
