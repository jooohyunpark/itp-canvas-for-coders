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
scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.001);

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
controls.minDistance = 100;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI / 2;
controls.target = new THREE.Vector3(0, 10, 0);

// directional light
const dirLight1 = new THREE.DirectionalLight("#ffff00");
dirLight1.position.set(-100, 100, 100);
const dirLight1helper = new THREE.DirectionalLightHelper(dirLight1, 10);
scene.add(dirLight1, dirLight1helper);

const dirLight2 = new THREE.DirectionalLight("#0000FF");
dirLight2.position.set(100, 100, -100);
const dirLight2helper = new THREE.DirectionalLightHelper(dirLight2, 10);
scene.add(dirLight2, dirLight2helper);

// point light
const pointLight = new THREE.PointLight(0xff0000, 1.5, 300);
pointLight.position.set(-200, 20, -200);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);
scene.add(pointLight, pointLightHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// ground
const floorGeometry = new THREE.PlaneGeometry(10000, 10000);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0x000000,
  side: THREE.DoubleSide,
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI * 0.5;
scene.add(floorMesh);

// cylinders
const cylinderHeight = 30;
const geometry = new THREE.CylinderGeometry(0, 10, cylinderHeight, 128, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});

for (let i = 0; i < 500; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 2000 - 1000;
  mesh.position.y = cylinderHeight / 2;
  mesh.position.z = Math.random() * 2000 - 1000;
  scene.add(mesh);
}

// sphere
const sphereGeometry = new THREE.SphereGeometry(50, 128, 128);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x000000,
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.y = 200;
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
