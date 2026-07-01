/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'


/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement('div')
document.body.appendChild(container)

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('#c8f0f9')

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true}) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 85)
camera.position.set(34,16,-20)
scene.add(camera)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})

/////////////////////////////////////////////////////////////////////////
///// CREATE POINTER LOCK CONTROLS
const controls = new PointerLockControls(camera, renderer.domElement);

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96)
sunLight.position.set(-5,38,7)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
loader.load('models/gltf/landup.glb', function (gltf) {

    scene.add(gltf.scene)
})

/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.unlock() //unlock pointer controls to animate the camera

    // Set starting position (change these values)
    camera.position.set(10, 20, 10) // START position (x, y, z)

    // Set starting rotation (look direction at start)
    camera.lookAt(0, 0, 0) // Look at center at start

    // Store the starting rotation
    const startRotation = {
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z
    }

    // Set the target look-at point
    const targetLookAt = new THREE.Vector3(1.15, 1.5, 0)

    // Calculate what the end rotation should be
    const tempCamera = camera.clone()
    tempCamera.position.set(-1.29, 2.10, 1.28) // end position
    tempCamera.lookAt(targetLookAt)

    const endRotation = {
        x: tempCamera.rotation.x,
        y: tempCamera.rotation.y,
        z: tempCamera.rotation.z
    }

    // Animate position
    new TWEEN.Tween(camera.position).to({
        x: -1.29,
        y: 2.10,
        z: 1.28
    }, 6500)
        .delay(1000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .start()

    // Animate rotation smoothly at the same time
    new TWEEN.Tween(startRotation).to(endRotation, 6500)
        .delay(1000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(() => {
            camera.rotation.x = startRotation.x
            camera.rotation.y = startRotation.y
            camera.rotation.z = startRotation.z
        })
        .start()
        .onComplete(function () {
            setupPointerControls()
            TWEEN.remove(this)
        })
}

introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// SETUP POINTER LOCK CONTROLS
function setupPointerControls(){
    document.addEventListener('click', () => {
        controls.lock()
    })

    controls.addEventListener('unlock', () => {
        console.log('Controls unlocked')
    })
}

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function rendeLoop() {

    TWEEN.update() // update animations

    renderer.render(scene, camera) // render the scene using the camera

    requestAnimationFrame(rendeLoop) //loop the render function

}

rendeLoop() //start rendering


