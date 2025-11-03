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
camera.position.set(0, 20, 50);

// axes helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.y = 0.001;
scene.add(axesHelper);

// grid
const gridHelper = new THREE.GridHelper(100, 100, "#444444", "#cccccc");
scene.add(gridHelper);

// ambient light
const ambientLight = new THREE.AmbientLight("white", 2);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.set(-1, 1, 1);
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

// box
const boxGeometry = new THREE.BoxGeometry(2, 4, 2);
const boxMaterial = new THREE.MeshStandardMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = 2;
boxMesh.rotation.y = Math.PI * 0.25;
scene.add(boxMesh);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

/**
 * 3D Model
 */

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
  // resource URL
  "/banana.glb",
  // called when the resource is loaded
  function (gltf) {
    console.log(`banana gltf: `, gltf);

    scene.add(gltf.scene);

    gltf.scene.position.y = 4.2;
    gltf.scene.scale.setScalar(0.75);

    gltf.scene.traverse(function (el) {
      console.log("traverse: ", el);

      if (el.isMesh) {
        console.log("isMesh: ", el);
      }
    });
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

/**
 * 3D Model - Animation Mixer
 */

let mixer;

const fishGroup = new THREE.Group();

loader.load("/fish.glb", function (gltf) {
  console.log("fish gltf: ", gltf);

  gltf.scene.position.set(0, 10, 10);
  gltf.scene.scale.setScalar(5);

  // initiate animation mixer
  mixer = new THREE.AnimationMixer(gltf.scene);

  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
  action.timeScale = 0.3;

  // rotate fishgroup
  gsap.to(fishGroup.rotation, {
    y: Math.PI * 2,
    duration: 60,
    repeat: -1,
    ease: "none",
  });

  fishGroup.add(gltf.scene);
  scene.add(fishGroup);
});

/**
 * Positional Audio
 */

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create the PositionalAudio object (passing in the listener)
const waterSound = new THREE.PositionalAudio(listener);
const forestSound = new THREE.PositionalAudio(listener);

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("/forest.mp3", function (buffer) {
  forestSound.setBuffer(buffer);
  forestSound.setVolume(0.5);
  forestSound.setRefDistance(5); // the distance at which the volume reduction starts taking effect
  forestSound.setRolloffFactor(2); // value describing how quickly the volume is reduced as the source moves away from the listener
  forestSound.setLoop(true);
  console.log(forestSound);
});
audioLoader.load("/underwater.mp3", function (buffer) {
  waterSound.setBuffer(buffer);
  waterSound.setVolume(1);
  waterSound.setRefDistance(5);
  waterSound.setRolloffFactor(2);
  waterSound.setLoop(true);
});

// start playing on user interaction - https://developer.chrome.com/blog/autoplay/#webaudio
const play = () => {
  if (forestSound.buffer && !forestSound.isPlaying) forestSound.play();
  if (waterSound.buffer && !waterSound.isPlaying) waterSound.play();
};
window.addEventListener("click", play);

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
const waterSphereMaterial = new THREE.MeshStandardMaterial({
  color: "#0000ff",
  roughness: 0.5,
});
const forestSphereMaterial = new THREE.MeshStandardMaterial({
  color: "#00ff00",
  roughness: 0.5,
});
const waterSphereMesh1 = new THREE.Mesh(sphereGeometry, waterSphereMaterial);
waterSphereMesh1.position.set(25, 5, -25);
waterSphereMesh1.add(waterSound); // add the sound to the mesh

const waterSphereMesh2 = new THREE.Mesh(sphereGeometry, waterSphereMaterial);
waterSphereMesh2.position.set(-25, 5, 25);
waterSphereMesh2.add(waterSound);

scene.add(waterSphereMesh1, waterSphereMesh2);

const forestSphereMesh1 = new THREE.Mesh(sphereGeometry, forestSphereMaterial);
forestSphereMesh1.position.set(-25, 5, -25);
forestSphereMesh1.add(forestSound);

const forestSphereMesh2 = new THREE.Mesh(sphereGeometry, forestSphereMaterial);
forestSphereMesh2.position.set(25, 5, 25);
forestSphereMesh2.add(forestSound);

scene.add(forestSphereMesh1, forestSphereMesh2);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// Add clock for delta time
const clock = new THREE.Clock();

// animate
const animate = () => {
  // Get the time elapsed since the last frame, used for mixer update
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
  controls.update();
};

renderer.setAnimationLoop(animate);
