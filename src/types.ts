export interface ImageDataLike {
  data: Uint8ClampedArray | number[];
  height: number;
  width: number;
}

export interface ImageDataRegularArray extends ImageDataLike {
  data: number[];
}

export interface CropOptions {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
