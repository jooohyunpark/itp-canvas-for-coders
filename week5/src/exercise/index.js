import "./style.css";
import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";

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
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(20, 20, 20);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.y = 0.001;
scene.add(axesHelper);

// grid
const gridHelper = new THREE.GridHelper(100, 100, "#444444", "#cccccc");
scene.add(gridHelper);

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
controls.minDistance = 10;
controls.maxDistance = 100;
controls.target = new THREE.Vector3(0, 4, 0);

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

// Instantiate a loader
const loader = new GLTFLoader();

// animation mixer
let mixer;

const fisthGroup = new THREE.Group();

// https://sketchfab.com/3d-models/emperor-angelfish-3dc2d360d98c485496899121792ebcce
loader.load("/fish.glb", function (gltf) {
  console.log("fish gltf: ", gltf);

  fisthGroup.add(gltf.scene);

  // initiate animation mixer
  mixer = new THREE.AnimationMixer(gltf.scene);
  mixer.clipAction(gltf.animations[0]).play();

  gltf.scene.position.set(0, 10, 10);
  gltf.scene.scale.setScalar(5);
});

gsap.to(fisthGroup.rotation, {
  y: Math.PI * 2,
  duration: 60,
  repeat: -1,
});
scene.add(fisthGroup);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// add clock for delta time
const clock = new THREE.Clock();

// animate
const animate = () => {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
  controls.update();
};

animate();
