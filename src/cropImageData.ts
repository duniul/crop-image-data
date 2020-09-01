import { CropOptions, ImageDataLike } from './types';

function cropX(imageData: ImageDataLike, { left = 0, right = 0 }: { left: number; right: number }) {
  const { data, width, height } = imageData;
  const dataLength = data.length;
  const newWidth = width - left - right;
  const rowLength = width * 4;
  const newRowLength = newWidth * 4;
  const leftCrop = left * 4;
  const newData: number[] = [];

  // loop through each row
  for (let x = 0; x < dataLength; x += rowLength) {
    const newRowStart = x + leftCrop;
    const newRowEnd = newRowStart + newRowLength;

    for (let i = newRowStart; i < newRowEnd; i += 4) {
      newData.push(data[i]);
      newData.push(data[i + 1]);
      newData.push(data[i + 2]);
      newData.push(data[i + 3]);
    }
  }

  return { data: newData, height, width: newWidth };
}

function cropY(imageData: ImageDataLike, { top = 0, bottom = 0 }: { top: number; bottom: number }) {
  const { data, width, height } = imageData;
  const rowLength = width * 4;
  const topIndex = top * rowLength;
  const bottomIndex = bottom * rowLength;
  const newHeight = height - top - bottom;
  const newDataEnd = data.length - bottomIndex;
  const newData = [];

  // save each index within the cropped area (avoid .slice() for performance)
  for (let i = topIndex; i < newDataEnd; i++) {
    newData.push(data[i]);
  }

  return { data: newData, height: newHeight, width };
}

export default function cropImageData(
  imageData: ImageDataLike,
  { top = 0, right = 0, bottom = 0, left = 0 }: CropOptions
) {
  if (imageData.height < top + bottom || imageData.width < left + right) {
    return new ImageData(1, 1);
  }

  let newImageData = {
    data: Array.from(imageData.data),
    width: imageData.width,
    height: imageData.height,
  };

  if (top || bottom) {
    newImageData = cropY(newImageData, { top, bottom });
  }

  if (left || right) {
    newImageData = cropX(newImageData, { left, right });
  }

  const { data, height, width } = newImageData;
  return new ImageData(Uint8ClampedArray.from(data as number[]), width, height);
}
