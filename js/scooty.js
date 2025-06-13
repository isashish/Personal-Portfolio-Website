// Import required modules
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Setup container
const container = document.getElementById("scooty3D");
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(10, 10, 10);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040, 4);
scene.add(ambientLight);

// Orbit controls (disabled zoom/pan to fit card)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

// Load model (with original colors)
const loader = new GLTFLoader();
loader.load(
  "../models/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(3.5, 3.5, 3.5);
    model.position.set(0, 3, 0); // ⬅️ Move the model upward by increasing the Y-value

    scene.add(model);

    const mixer = new THREE.AnimationMixer(model);
    if (gltf.animations.length > 0) {
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
    }

    const clock = new THREE.Clock();

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    animate();
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
