type Primitive = boolean | number | string | null | undefined;

declare global {
  interface Array {
    includes: (searchElement: any, fromIndex?: number) => boolean;
  }

  interface ReadonlyArray {
    includes: (searchElement: any, fromIndex?: number) => boolean;
  }
}
