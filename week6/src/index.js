import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { gsap } from "gsap";
import randomColor from "randomcolor"; // https://github.com/davidmerfield/randomColor

// app
const app = document.querySelector("#app");

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// perspective camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 100);

// axis helper -> X: red, Y: green, Z: blue
const axesHelper = new THREE.AxesHelper(5);
axesHelper.position.y = 0.001;
scene.add(axesHelper);

// light
const ambientLight = new THREE.AmbientLight("white", 0.2);
const hemisphereLight = new THREE.HemisphereLight("#ffffff", "#ff00ff", 0.8);
const directionalLight = new THREE.DirectionalLight("white", 0.8);
directionalLight.position.set(-1, 1, 1);
scene.add(ambientLight, directionalLight, hemisphereLight);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;
controls.zoomSpeed = 0.5;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.target = new THREE.Vector3(0, 0, 0);

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

// spheres
const sphereGeometry = new THREE.SphereGeometry(2, 128, 128);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "black",
  roughness: 0.8,
  metalness: 0.2,
});

for (let i = 0; i < 1000; i++) {
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
  const x = 100 - Math.random() * 200;
  const y = 100 - Math.random() * 200;
  const z = 100 - Math.random() * 200;
  sphereMesh.position.set(x, y, z);

  // adding custome properties to use later
  sphereMesh.name = "sphere";
  sphereMesh.isAnimating = false;

  scene.add(sphereMesh);
}

const onPointerMove = (event) => {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  console.log(pointer);
};
window.addEventListener("pointermove", onPointerMove);

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// intersected object
let INTERSECTED;

// animate
const animate = () => {
  requestAnimationFrame(animate);

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  // something intersected!
  if (intersects.length > 0) {
    if (
      // look for raycasted sphere
      intersects[0].object.name === "sphere" &&
      INTERSECTED !== intersects[0].object
    ) {
      // reset previous intersected object color
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      // assign currently intersected object
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0x00ffff);
    }
  }
  // nothing intersected
  else {
    // reset previous intersected object color
    if (INTERSECTED)
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    // release variable
    INTERSECTED = null;
  }

  renderer.render(scene, camera);
  controls.update();
};

animate();

const onClick = () => {
  if (!INTERSECTED) return;

  if (INTERSECTED.isAnimating) {
    gsap.to(INTERSECTED.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: true,
    });
    gsap.to(INTERSECTED.material.color, {
      r: 0,
      g: 0,
      b: 0,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: true,
    });

    INTERSECTED.isAnimating = false;
  } else {
    gsap.to(INTERSECTED.scale, {
      x: "random(0, 3)",
      y: "random(0, 3)",
      z: "random(0, 3)",
      duration: "random(2, 5)",
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    const c = randomColor({
      hue: "#0000FF",
      luminosity: "bright",
    });
    const { r, g, b } = new THREE.Color(c);
    gsap.to(INTERSECTED.material.color, {
      r,
      g,
      b,
      duration: 1,
      ease: "power2.inOut",
    });

    INTERSECTED.isAnimating = true;
  }
};
window.addEventListener("click", onClick);

/* 
//////////////////////////////////////////////////////////////////////////////
*/

const button = document.querySelector("#bg-button");

const onButtonClick = () => {
  const c = randomColor({
    luminosity: "bright",
  });
  const { r, g, b } = new THREE.Color(c);
  gsap.to(scene.background, {
    r,
    g,
    b,
    duration: 1,
    ease: "linear",
  });
};
button.addEventListener("click", onButtonClick);
