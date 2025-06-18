import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

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
// scene.fog = new THREE.FogExp2(0x000000, 0.0007);

// perspective camera ( fov, aspect, near, far )
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
// // orthographic camera ( left, right, top, bottom, near, far )
// const camera = new THREE.OrthographicCamera(
//   window.innerWidth / -2,
//   window.innerWidth / 2,
//   window.innerHeight / 2,
//   window.innerHeight / -2,
//   0,
//   3000
// );
camera.position.set(200, 100, 400);
camera.lookAt(0, 0, 0);

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.y = 0.01; // above the ground slightly
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.1);
scene.add(ambientLight);
console.log("ambientLight", ambientLight);

// directional light
const dirLight = new THREE.DirectionalLight(0x0000ff);
dirLight.position.set(-100, 100, 0);
scene.add(dirLight);
const dirLighthelper = new THREE.DirectionalLightHelper(dirLight, 10);
scene.add(dirLighthelper);

// point light ( color, intensity, distance, decay )
const pointLight = new THREE.PointLight(0xff0000, 2, 200, 0.1);
pointLight.position.set(-200, 100, 0);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

// area light ( color, intensity, width, height )
const rectLight = new THREE.RectAreaLight(0x00ff00, 3, 50, 100);
rectLight.position.set(0, 50, 200);
scene.add(rectLight);
const rectLightHelper = new RectAreaLightHelper(rectLight);
scene.add(rectLightHelper);

// spot light ( color, intensity, distance, angle, penumbra, decay )
const spotLight = new THREE.SpotLight(0xffff00, 3);
spotLight.distance = 300;
spotLight.angle = Math.PI * 0.1;
spotLight.penumbra = 0.3;
spotLight.decay = 0.1;
spotLight.position.set(100, 100, -300);
spotLight.target.position.set(0, 0, -200);
scene.add(spotLight, spotLight.target);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// hemisphere light ( skyColor, groundColor, intensity )
const hemiLight = new THREE.HemisphereLight(0x000000, 0x00ffff, 1);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);
const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
scene.add(hemiLightHelper);

// control
const controls = new OrbitControls(camera, renderer.domElement); // orbit control
// const controls = new MapControls(camera, renderer.domElement); // map control
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.3;
controls.enableZoom = true;
controls.zoomSpeed = 0.5;
controls.minDistance = 10;
controls.maxDistance = 1000;

// // FirstPersonControl
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 100;
// controls.lookSpeed = 0.02;
// const clock = new THREE.Clock(); // requires delta time value in update()

/**
 * ----------------------------------------------------------------------------------------
 * objects, you don't need to modify for week2
 */

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
  color: 0xffffff,
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

/**
 * ----------------------------------------------------------------------------------------
 */

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // camera.left = window.innerWidth / -2; // orthographic camera
  // camera.right = window.innerWidth / 2; // orthographic camera
  // camera.top = window.innerHeight / 2; // orthographic camera
  // camera.bottom = window.innerHeight / -2; // orthographic camera
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);

// animate
const animate = () => {
  controls.update();
  // controls.update(clock.getDelta()); // for first person control

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
