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
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.002);

// camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(0, 0, 200);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.enableZoom = true;
controls.minDistance = 50;
controls.maxDistance = 1000;
controls.maxPolarAngle = Math.PI / 2;

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
const directionalLight2 = new THREE.DirectionalLight(0x00ff00, 1);
directionalLight.position.set(1, 1, 0);
directionalLight.position.set(-1, -1, -1);
scene.add(ambientLight, directionalLight, directionalLight2);

// mesh
const geometry = new THREE.TorusKnotGeometry(10, 3, 256, 32);
const standardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const normalMaterial = new THREE.MeshNormalMaterial();

const count = 19;
for (let i = -Math.floor(count / 2); i < Math.ceil(count / 2); i++) {
  const mesh = new THREE.Mesh(
    geometry,
    i === 0 ? normalMaterial : standardMaterial
  );
  mesh.position.z = i * 100;
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
