# Three JS landscape viewer

A lightweight web application built with Three.js that loads a 3D model, plays a smooth cinematic intro camera animation, and transitions into interactive first-person look controls.

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

# Debug interface
<img src="./static/debug.jpg" width="100%"/>
You can enable a debug interface by getting the contents of "debug.js" file and place it in the end of the main file. This will give you some interface to change things like colors and light position, which can be very useful when you change the model to something else.


Original boilerplate by <h4>by Anderson Mancini</h4>
