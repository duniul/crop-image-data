# crop-image-data

[![](https://img.shields.io/npm/v/crop-image-data?color=brightgreen)](https://www.npmjs.com/package/crop-image-data)
[![](https://img.shields.io/bundlephobia/minzip/crop-image-data)](https://bundlephobia.com/result?p=crop-image-data)

✂️ Function for cropping an image through its [ImageData].

## Installation

| npm                           | yarn                        |
| ----------------------------- | --------------------------- |
| `npm install crop-image-data` | `yarn add crop-image-data`  |

## Usage

### `cropImageData(imageData, cropOptions)`

Creates a cropped version of an ImageData-instance. Does not mutate the recieved instance.

**Parameters:**

- `imageData` - the ImageData-instance instance to crop

- `cropOptions` - an object specifying the amount of pixels to crop from each side
  - `top` - number of pixels to crop from the top
  - `right` - number of pixels to crop from the right side
  - `bottom` - number of pixels to crop from the bottom
  - `left` - number of pixels to crop from the left side

**Return value:**

A new, cropped ImageData-instance.

**Examples:**

```js
import cropImageData from 'crop-image-data';

// crop 5 pixels on every side
const cropped = cropImageData(imageData, { top: 5, right: 5, bottom: 5, left: 5 });

// crop 50 pixels from the top
const croppedTop = cropImageData(imageData, { top: 50 });

// crop 10 pixels on each side
const croppedSides = cropImageData(imageData, { left: 10, right: 10 });
```

## Related packages

- [trim-image-data] - finds and trims whitespace (or a specified color) from an image using
  `crop-image-data`

[imagedata]: https://developer.mozilla.org/en-US/docs/Web/API/ImageData
[trim-image-data]: https://github.com/duniul/trim-image-data
