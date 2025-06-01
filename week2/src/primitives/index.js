import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry";
import { FontLoader } from "three/addons/loaders/FontLoader";

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
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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

// material
const material = new THREE.MeshNormalMaterial();

// plane
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMesh = new THREE.Mesh(planeGeometry, material);
scene.add(planeMesh);

// circle
const circlegeometry = new THREE.CircleGeometry(1, 64);
const circleMesh = new THREE.Mesh(circlegeometry, material);
circleMesh.position.z = -5;
scene.add(circleMesh);

// box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.position.z = -10;
scene.add(boxMesh);

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.z = -15;
scene.add(sphereMesh);

// cone
const coneGeometry = new THREE.ConeGeometry(1, 2, 64);
const coneMesh = new THREE.Mesh(coneGeometry, material);
coneMesh.position.z = -20;
scene.add(coneMesh);

// cynlinder
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 64);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
cylinderMesh.position.z = -25;
scene.add(cylinderMesh);

// torusknot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnotMesh.position.z = -30;
scene.add(torusKnotMesh);

// text
const fontLoader = new FontLoader();
fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
  const text = "Hello world!";

  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 70,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1.5,
  });

  const textMesh = new THREE.Mesh(textGeometry, material);
  textMesh.scale.setScalar(0.03);
  textMesh.position.z = -35;
  scene.add(textMesh);
});

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// animate
const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
};

animate();
