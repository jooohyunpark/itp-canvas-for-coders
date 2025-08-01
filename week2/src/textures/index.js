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

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight("white", 3);
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

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// image 1
const imageTexture1 = new THREE.TextureLoader().load(
  "/hubble_telescope_picture.jpg"
);
imageTexture1.colorSpace = THREE.SRGBColorSpace; // Textures containing color data should be annotated with THREE.SRGBColorSpace or THREE.LinearSRGBColorSpace.

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

// video 1
const videoElement1 = document.getElementById("video-texture-1");
videoElement1.play();
const videoTexture1 = new THREE.VideoTexture(videoElement1);
videoTexture1.colorSpace = THREE.SRGBColorSpace;
const videoMaterial1 = new THREE.MeshLambertMaterial({
  color: "white",
  map: videoTexture1,
  side: THREE.DoubleSide,
});

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMesh = new THREE.Mesh(planeGeometry, videoMaterial1);
planeMesh.position.z = -20;
scene.add(planeMesh);

// video 2
const videoElement2 = document.getElementById("video-texture-2");
videoElement2.play();
const videoTexture2 = new THREE.VideoTexture(videoElement2);
videoTexture2.colorSpace = THREE.SRGBColorSpace;
const videoMaterial2 = new THREE.MeshLambertMaterial({
  color: "white",
  map: videoTexture2,
  side: THREE.DoubleSide,
});

const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 64);
const torusMesh = new THREE.Mesh(torusGeometry, videoMaterial2);
torusMesh.position.z = -30;
scene.add(torusMesh);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// animate
const animate = () => {
  renderer.render(scene, camera);
  controls.update();
};
renderer.setAnimationLoop(animate);
