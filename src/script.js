import Experience from './Experience/Experience.js';

const canvas = document.createElement('canvas');
canvas.classList.add('threejs');
document.body.appendChild(canvas);

let experience = new Experience(canvas);

async function destroyAll() {
  await experience.destroy();
  experience = null;
  canvas.remove();
}

window.destroyAll = destroyAll;
