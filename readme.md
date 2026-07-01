# Three JS landscape viewer

A lightweight web application built with Three.js that loads a 3D model, plays a smooth cinematic intro camera animation, and transitions into interactive first-person look controls.

<div align="center">
<img width="852" height="464" alt="LandScape-ezgif com-optimize" src="https://github.com/user-attachments/assets/b60c79ef-275a-47f6-9e72-9cd428ecbbe1" />
</div>
# Features
Model Loading: Supports compressed GLTF/GLB models using the DRACO loader for optimal performance.

Cinematic Intro: Uses TWEEN.js to smoothly animate the camera's position and rotation when the page loads.

First-Person Look: Integrates PointerLockControls so users can click into the scene and look around naturally.

Responsive Design: Automatically updates the camera aspect ratio and renderer when the browser window is resized.


Resources: [Threejs](https://threejs.org/), [WebGL](https://github.com/KhronosGroup/WebGL), [webpack](https://webpack.js.org/) , [Babel](https://babeljs.io/ ), [ESLint](https://eslint.org/)

# Getting Started
Download and install Node.js on your computer (https://nodejs.org/en/download/).

Then, open VSCODE, drag the project folder to it. Open VSCODE terminal and install dependencies (you need to do this only in the first time)
```
npm install
```

Run this command in your terminal to open a local server at localhost:8080
```
npm run dev
```
Original boilerplate by Anderson Mancini
