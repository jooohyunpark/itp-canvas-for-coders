import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// perspective camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(20, 10, 20);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.y = 0.001;
scene.add(axesHelper);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// control
const controls = new OrbitControls(camera, renderer.domElement);
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

// directional light
const directionalLight = new THREE.DirectionalLight("white", 1.5);
directionalLight.position.set(-5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default
// directionalLight.shadow.camera.top = 10;
// directionalLight.shadow.camera.bottom = -10;
// directionalLight.shadow.camera.left = -10;
// directionalLight.shadow.camera.right = 10;

//Create a helper for the shadow camera (optional)
const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(shadowHelper);

// floor
const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: "#ccc",
  roughness: 0.8,
  side: THREE.DoubleSide,
});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = Math.PI * 0.5;
floorMesh.receiveShadow = true;
scene.add(floorMesh);

// Instantiate a loader
const loader = new GLTFLoader();

// create banna group
const bananaGroup = new THREE.Group();

// Load a glTF resource
loader.load(
  // resource URL
  "/banana.glb",
  // called when the resource is loaded
  function (gltf) {
    bananaGroup.add(gltf.scene);

    gltf.scene.position.y = 4.2;
    gltf.scene.scale.setScalar(0.75);

    gltf.scene.traverse(function (el) {
      if (el.isMesh) {
        el.castShadow = true;
        el.receiveShadow = true;
      }
    });

    // target directional light to banana object
    directionalLight.target = gltf.scene;
    scene.add(directionalLight.target);
  }
);

// box
const boxGeometry = new THREE.BoxGeometry(2, 4, 2);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.8,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = 2;
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
bananaGroup.add(boxMesh);
scene.add(bananaGroup);

// torusknot
const torusKnotMesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 128, 64),
  new THREE.MeshNormalMaterial()
);
torusKnotMesh.scale.setScalar(0.5);
torusKnotMesh.position.set(0, 5, -5);
torusKnotMesh.castShadow = true;
scene.add(torusKnotMesh);

/**
 * //////////////////////////////////////////////////////////////////////////////
 */

// animate
const animate = (time) => {
  requestAnimationFrame(animate);

  time *= 0.001;

  bananaGroup.rotation.y = Math.PI * time * 0.1;
  torusKnotMesh.rotation.y = Math.PI * time * -0.1;

  renderer.render(scene, camera);
  controls.update();
};

animate();
