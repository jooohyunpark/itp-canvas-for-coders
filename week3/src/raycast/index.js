import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

// raycast objects
const raycastObjects = [];

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
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

// cone
const coneGeometry = new THREE.ConeGeometry(1, 3, 128);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.8,
  metalness: 0,
});
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.y = 1.5;
scene.add(coneMesh);
raycastObjects.push(coneMesh);

// torusknot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
const torusKnotMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0,
  metalness: 0,
});
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.position.y = 5;
torusKnotMesh.name = "torusKnot";
controls.target.copy(torusKnotMesh.position);
scene.add(torusKnotMesh);
raycastObjects.push(torusKnotMesh);

// sphere
const SphereGeometry = new THREE.SphereGeometry(0.3, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.8,
  metalness: 0.2,
});

// back sphere position & scale
const count = 10;
const gap = 2;

for (let i = -count; i <= count; i++) {
  const sphereMesh = new THREE.Mesh(SphereGeometry, sphereMaterial.clone());
  sphereMesh.position.set(i * gap, 2, -10);
  sphereMesh.initialPosition = sphereMesh.position.clone();
  scene.add(sphereMesh);
  raycastObjects.push(sphereMesh);
}

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
};
window.addEventListener("pointermove", onPointerMove);

// intersected object
let INTERSECTED;

// animate
const animate = () => {
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(raycastObjects);

  // Reset previous intersected object's color
  if (INTERSECTED) {
    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }

  // Set new intersected object if any
  if (intersects.length > 0) {
    INTERSECTED = intersects[0].object;
    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    INTERSECTED.material.emissive.setHex(0x00ffff);
  }

  renderer.render(scene, camera);
  controls.update();
};
renderer.setAnimationLoop(animate);
