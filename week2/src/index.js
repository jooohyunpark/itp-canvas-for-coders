import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.001);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(100, 200, 400);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

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
controls.maxPolarAngle = Math.PI / 2;

// ambient light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
scene.add(ambientLight);

// directional light
const dirLight1 = new THREE.DirectionalLight("#ffff00");
dirLight1.position.set(-100, 100, 0);
scene.add(dirLight1);
const dirLight1helper = new THREE.DirectionalLightHelper(dirLight1, 10);
scene.add(dirLight1helper);

const dirLight2 = new THREE.DirectionalLight("#0000FF");
dirLight2.position.set(100, 50, -100);
scene.add(dirLight2);
const dirLight2helper = new THREE.DirectionalLightHelper(dirLight2, 10);
scene.add(dirLight2helper);

// point light
const pointLight = new THREE.PointLight(0xff0000, 1.5, 300);
pointLight.position.set(-200, 100, -200);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

// area light
const rectLight = new THREE.RectAreaLight(0x00ff00, 1, 30, 100);
rectLight.position.set(0, 0, 200);
scene.add(rectLight);
const rectLightHelper = new RectAreaLightHelper(rectLight);
scene.add(rectLightHelper);

// ground
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8,
  metalness: 0.2,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI * 0.5;
scene.add(groundMesh);

// spheres
const geometry = new THREE.SphereGeometry(5, 128, 128);
const material = new THREE.MeshPhongMaterial({
  color: 0x000000,
});
for (let i = 0; i < 30; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -i * 100;
  scene.add(mesh);
}

// big sphere
const sphereMesh = new THREE.Mesh(geometry, material);
sphereMesh.position.y = 100;
sphereMesh.scale.setScalar(5);
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
