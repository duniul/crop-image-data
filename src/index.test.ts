import ImageData from '@canvas/image-data';
import { describe, expect, it } from 'vitest';
import cropImageData from './index.js';

// biome-ignore lint/suspicious/noExplicitAny: test override
(global as any).ImageData = ImageData;

it('does nothing if no crop bounds are passed', () => {
  const imageData = new ImageData(5, 5);
  expect(cropImageData(imageData, {})).toEqual(imageData);
});

describe('crops edges', () => {
  const p = [0, 0, 0, 0];

  // prettier-ignore
  const dataIn = [
    p, p, p, p, p, p,
    p, p, p, p, p, p,
    p, p, p, p, p, p,
    p, p, p, p, p, p,
    p, p, p, p, p, p,
    p, p, p, p, p, p,
  ].flat();

  const imageDataIn = new ImageData(Uint8ClampedArray.from(dataIn), 6, 6);

  it('crops top edge', () => {
    // prettier-ignore
    const expectedDataOut = [
      // p, p, p, p, p, p,
      // p, p, p, p, p, p,
      p, p, p, p, p, p,
      p, p, p, p, p, p,
      p, p, p, p, p, p,
      p, p, p, p, p, p,
    ].flat();

    const result = cropImageData(imageDataIn, { top: 2 });
    expect(Array.from(result.data)).toEqual(expectedDataOut);
    expect(result.height).toEqual(4);
    expect(result.width).toEqual(6);
  });

  it('crops right edge', () => {
    // prettier-ignore
    const expectedDataOut = [
      p, p, p, p, // p, p,
      p, p, p, p, // p, p,
      p, p, p, p, // p, p,
      p, p, p, p, // p, p,
      p, p, p, p, // p, p,
      p, p, p, p, // p, p,
    ].flat();

    const result = cropImageData(imageDataIn, { right: 2 });
    expect(Array.from(result.data)).toEqual(expectedDataOut);
    expect(result.height).toEqual(6);
    expect(result.width).toEqual(4);
  });

  it('crops bottom edge', () => {
    // prettier-ignore
    const expectedDataOut = [
      p, p, p, p, p, p,
      p, p, p, p, p, p,
      p, p, p, p, p, p,
      p, p, p, p, p, p,
      // p, p, p, p, p, p,
      // p, p, p, p, p, p,
    ].flat();

    const result = cropImageData(imageDataIn, { bottom: 2 });
    expect(Array.from(result.data)).toEqual(expectedDataOut);
    expect(result.height).toEqual(4);
    expect(result.width).toEqual(6);
  });

  it('crops left edge', () => {
    // prettier-ignore
    const expectedDataOut = [
      /* p, p, */ p, p, p, p,
      /* p, p, */ p, p, p, p,
      /* p, p, */ p, p, p, p,
      /* p, p, */ p, p, p, p,
      /* p, p, */ p, p, p, p,
      /* p, p, */ p, p, p, p,
    ].flat();

    const result = cropImageData(imageDataIn, { left: 2 });
    expect(Array.from(result.data)).toEqual(expectedDataOut);
    expect(result.height).toEqual(6);
    expect(result.width).toEqual(4);
  });

  it('crops all edges', () => {
    // prettier-ignore
    const expectedDataOut = [
      /* p, p, */ // p, p, p, p,
      /* p, p, */ p, p, // p, p,
      /* p, p, */ p, p, // p, p,
      /* p, p, */ // p, p, p, p,
      /* p, p, */ // p, p, p, p,
      /* p, p, */ // p, p, p, p,
    ].flat();

    const result = cropImageData(imageDataIn, { top: 1, right: 2, bottom: 3, left: 2 });
    expect(Array.from(result.data)).toEqual(expectedDataOut);
    expect(result.height).toEqual(2);
    expect(result.width).toEqual(2);
  });
});
