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

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.y = 0.001;
scene.add(axesHelper);

// grid
const gridHelper = new THREE.GridHelper(100, 100, "#444444", "#cccccc");
scene.add(gridHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
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
const boxMaterial = new THREE.MeshStandardMaterial({ color: "white" });
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

const fisthGroup = new THREE.Group();

loader.load("/fish.glb", function (gltf) {
  console.log("fish gltf: ", gltf);

  fisthGroup.add(gltf.scene);

  gltf.scene.position.set(0, 10, 10);
  gltf.scene.scale.setScalar(5);

  // initiate animation mixer
  mixer = new THREE.AnimationMixer(gltf.scene);
  mixer.clipAction(gltf.animations[0]).play();
  mixer.clipAction(gltf.animations[0]).timeScale = 0.3;

  // rotate fishgroup
  gsap.to(fisthGroup.rotation, {
    y: Math.PI * 2,
    duration: 60,
    repeat: -1,
    ease: "none",
  });

  scene.add(fisthGroup);
});

/**
 * Positional Audio
 */

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio(listener);
const sound2 = new THREE.PositionalAudio(listener);

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("/forest.mp3", function (buffer) {
  sound.setBuffer(buffer);
  sound.setVolume(0.7);
  sound.setRefDistance(5); // the distance at which the volume reduction starts taking effect
  sound.setRolloffFactor(1); // value describing how quickly the volume is reduced as the source moves away from the listener
  sound.setLoop(true);
  console.log(sound);
});
audioLoader.load("/rain.mp3", function (buffer) {
  sound2.setBuffer(buffer);
  sound2.setVolume(1);
  sound2.setRefDistance(10);
  sound2.setRolloffFactor(5);
  sound2.setLoop(true);
});

// start playing on user interaction - https://developer.chrome.com/blog/autoplay/#webaudio
const play = () => {
  if (sound.buffer && !sound.isPlaying) sound.play();
  if (sound2.buffer && !sound2.isPlaying) sound2.play();
};
window.addEventListener("click", play);

// sphere
const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);

const sphereMesh = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshStandardMaterial({
    color: "#00ff00",
    roughness: 0.5,
  })
);
sphereMesh.position.set(25, 5, -25);
sphereMesh.add(sound);
scene.add(sphereMesh);

const sphereMesh2 = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshStandardMaterial({
    color: "#0000ff",
    roughness: 0.5,
  })
);
sphereMesh2.position.set(-25, 5, -25);
sphereMesh2.add(sound2);
scene.add(sphereMesh2);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// add clock for delta time
const clock = new THREE.Clock();

// animate
const animate = () => {
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
  controls.update();
};

renderer.setAnimationLoop(animate);
