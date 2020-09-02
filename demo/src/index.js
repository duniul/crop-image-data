import cropImageData from 'crop-image-data';
import './styles.css';
import { loadCanvasFromFile } from './utils/canvas';

const canvas = document.getElementById('canvas');
const fileInput = document.getElementById('file-input');
const cropButton = document.getElementById('crop-button');

const topInput = document.getElementById('top-input');
const rightInput = document.getElementById('right-input');
const bottomInput = document.getElementById('bottom-input');
const leftInput = document.getElementById('left-input');
let loadedImageData;

function enableElements() {
  document.querySelectorAll('input,button').forEach(element => (element.disabled = false));
}

fileInput.addEventListener('change', async event => {
  const file = event.target.files?.[0];

  if (file) {
    loadedImageData = await loadCanvasFromFile(canvas, file);
    enableElements();
  }
});

cropButton.addEventListener('click', async () => {
  if (loadedImageData) {
    const croppedImageData = cropImageData(loadedImageData, {
      top: topInput.value,
      right: rightInput.value,
      bottom: bottomInput.value,
      left: leftInput.value,
    });

    canvas.width = croppedImageData.width;
    canvas.height = croppedImageData.height;
    canvas.getContext('2d').putImageData(croppedImageData, 0, 0);
  }
});
