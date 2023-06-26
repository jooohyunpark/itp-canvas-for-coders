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
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(400, 200, 0);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

controls.enableZoom = true;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// lights
const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(1, 1, 1);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x0000ff);
dirLight2.position.set(-1, -1, -1);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// mesh
const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  flatShading: true,
});
for (let i = 0; i < 500; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 1600 - 800;
  mesh.position.y = 0;
  mesh.position.z = Math.random() * 1600 - 800;
  scene.add(mesh);
}

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
