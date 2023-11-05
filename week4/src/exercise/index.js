import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";
import { gsap } from "gsap";

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

// sphere
const SphereGeometry = new THREE.SphereGeometry(1, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0,
  metalness: 0,
});
const sphereMesh = new THREE.Mesh(SphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 3, 0);
scene.add(sphereMesh);

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();

gsap.fromTo(
  sphereMesh.position,
  {
    x: -10,
  },
  {
    x: 10,
    duration: 3,
    repeat: -1,
    repeatDelay: 3,
    yoyo: true,
    ease: "power2.inOut",
  }
);
