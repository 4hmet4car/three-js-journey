import Experience from './Experience/Experience.js';

const canvas = document.createElement('canvas');
canvas.classList.add('threejs');
document.body.appendChild(canvas);

const experience = new Experience(canvas);
