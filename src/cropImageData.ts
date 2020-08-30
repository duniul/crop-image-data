import { CropOptions, ImageDataLike, ImageDataRegularArray } from './types';

function cropX(imageData: ImageDataRegularArray, cropCount: number, fromLeft: boolean) {
  const { data, width, height } = imageData;
  const dataLength = data.length;
  const rowLength = width * 4;
  const newWidth = width - cropCount;
  let newData: number[] = [];

  // loop through each row
  for (let x = 0; x < dataLength; x += rowLength) {
    // remove requested number of pixels from row
    const currentRow = data.slice(x, x + rowLength);
    const rowSlice = fromLeft
      ? currentRow.slice(cropCount * 4)
      : currentRow.slice(0, -(cropCount * 4));

    newData = [...newData, ...rowSlice];
  }

  return { data: newData, height, width: newWidth };
}

function cropY(imageData: ImageDataRegularArray, cropCount: number, fromTop: boolean) {
  const { data, width, height } = imageData;
  const boundCropCount = Math.min(height, cropCount);
  const indexCount = boundCropCount * width * 4;
  const newHeight = height - boundCropCount;
  const newData = fromTop ? data.slice(indexCount) : data.slice(0, -indexCount);

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

  if (top) newImageData = cropY(newImageData, top, true);
  if (right) newImageData = cropX(newImageData, right, false);
  if (bottom) newImageData = cropY(newImageData, bottom, false);
  if (left) newImageData = cropX(newImageData, left, true);

  const { data, height, width } = newImageData;
  return new ImageData(Uint8ClampedArray.from(data), width, height);
}
