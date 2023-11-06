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
camera.position.set(20, 5, 10);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

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

/* 
//////////////////////////////////////////////////////////////////////////////
*/

// image 1
const imageTexture1 = new THREE.TextureLoader().load(
  "/hubble_telescope_picture.jpg"
);
imageTexture1.colorSpace = THREE.SRGBColorSpace;

const imageMaterial1 = new THREE.MeshBasicMaterial({
  map: imageTexture1,
  side: THREE.DoubleSide,
});
const sphereGeometry = new THREE.SphereGeometry(3, 128, 128);
const sphereMesh = new THREE.Mesh(sphereGeometry, imageMaterial1);
scene.add(sphereMesh);

// image 2 - repeat
const imageTexture2 = new THREE.TextureLoader().load("/inka_niclas.jpg");
imageTexture2.colorSpace = THREE.SRGBColorSpace;
imageTexture2.wrapS = THREE.RepeatWrapping;
imageTexture2.wrapT = THREE.RepeatWrapping;
imageTexture2.repeat.set(2, 2);

const imageMaterial2 = new THREE.MeshBasicMaterial({
  map: imageTexture2,
  side: THREE.DoubleSide,
});

const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxMesh = new THREE.Mesh(boxGeometry, imageMaterial2);
boxMesh.position.z = -10;
scene.add(boxMesh);

// video
const videoElement = document.getElementById("video-texture");
videoElement.play();
const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.colorSpace = THREE.SRGBColorSpace;
const videoMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  map: videoTexture,
  side: THREE.DoubleSide,
});

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMesh = new THREE.Mesh(planeGeometry, videoMaterial);
planeMesh.position.z = -20;
scene.add(planeMesh);

const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 64);
const torusMesh = new THREE.Mesh(torusGeometry, videoMaterial);
torusMesh.position.z = -30;
scene.add(torusMesh);

/* 
//////////////////////////////////////////////////////////////////////////////
*/

// animate
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
};

animate();
