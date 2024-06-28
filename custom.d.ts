declare module 'geotiff' {
  export function fromArrayBuffer(buffer: ArrayBuffer): Promise<GeoTIFF>;

  export interface GeoTIFF {
    getImage(index?: number): Promise<GeoTIFFImage>;
  }

  export interface GeoTIFFImage {
    readRasters(options?: any): Promise<Float32Array[]>;
    getWidth(): number;
    getHeight(): number;
    getBoundingBox(): [number, number, number, number];
  }
}
