import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";
import Stats from "stats.js";
import { gsap } from "gsap";

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
scene.add(torusKnotMesh);
controls.target.copy(torusKnotMesh.position);
raycastObjects.push(torusKnotMesh);

// sphere
const sphereGroup = new THREE.Group();
const SphereGeometry = new THREE.SphereGeometry(0.3, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.8,
  metalness: 0.2,
});

// stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// back sphere position & scale
const count = 10;
const gap = 2;

for (let i = -count; i <= count; i++) {
  const sphereMesh = new THREE.Mesh(SphereGeometry, sphereMaterial.clone());
  sphereMesh.position.set(i * gap, 2, -10);
  sphereMesh.initialPosition = sphereMesh.position.clone();
  sphereMesh.name = "sphere";
  raycastObjects.push(sphereMesh);
}
scene.add(...raycastObjects);

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

  // something intersected!
  if (intersects.length > 0) {
    if (
      // look for raycasted sphere
      intersects[0].object !== INTERSECTED
    ) {
      // reset previous intersected object's color
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      // assign currently intersected object
      INTERSECTED = intersects[0].object;
      // store current emmissive hexcolor (to reset later, in above step)
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      // set emmissive hexcolor to cyan
      INTERSECTED.material.emissive.setHex(0x00ffff);
    }
  }
  // nothing intersected
  else {
    // reset previous intersected object's color
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    // release variable
    INTERSECTED = null;
  }

  renderer.render(scene, camera);
  controls.update();
};
renderer.setAnimationLoop(animate);

const onClick = () => {
  // if no intersected objects, return
  if (!INTERSECTED) return;

  // if it was animating, reset animation
  if (INTERSECTED.isAnimating) {
    // spheres

    if (INTERSECTED.name === "sphere") {
      gsap.to(INTERSECTED.position, {
        y: INTERSECTED.initialPosition.y,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
      gsap.to(INTERSECTED.scale, {
        y: 1,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
    }

    // torus knot
    if (INTERSECTED.name === "torusKnot") {
      gsap.to(INTERSECTED.rotation, {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
    }

    INTERSECTED.isAnimating = false;
  }
  // animate
  else {
    if (INTERSECTED.name === "sphere") {
      gsap.to(INTERSECTED.position, {
        y: 9,
        duration: "random(3, 10)",
        ease: "power2.inOut",
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
      });
      gsap.to(INTERSECTED.scale, {
        y: "random(1, 4)",
        duration: "random(3, 10)",
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true,
        yoyo: true,
      });
    }

    if (INTERSECTED.name === "torusKnot") {
      gsap.to(INTERSECTED.rotation, {
        y: Math.PI * 2,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
      });
    }

    INTERSECTED.isAnimating = true;
  }
};
window.addEventListener("click", onClick);
