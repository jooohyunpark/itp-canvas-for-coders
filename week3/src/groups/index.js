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
  1000
);
camera.position.set(20, 10, 20);

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-1, 1, 1);
scene.add(ambientLight, directionalLight);

// control
const controls = new OrbitControls(camera, renderer.domElement);
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

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshNormalMaterial();

// groups
const earthGroup = new THREE.Group();
const sunGroup = new THREE.Group();

// moon
const moon = new THREE.Mesh(geometry, material);
moon.scale.setScalar(1 / 4);
moon.position.z = -10;

// earth
const earth = new THREE.Mesh(geometry, material);
earthGroup.add(earth, moon);

earthGroup.scale.setScalar(1 / 4);
earthGroup.position.z = -10;

// sun
const sun = new THREE.Mesh(geometry, material);
sunGroup.add(sun, earthGroup);

scene.add(sunGroup);

/**
 * scene > sunGroup > sun / (earthGroup > earth / moon)
 */

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// animate
const animate = (timestamp) => {
  timestamp *= 0.001;
  // earthGroup.rotation.y = Math.PI * timestamp * 0.1;
  // sunGroup.rotation.y = Math.PI * timestamp * 0.1;

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();
