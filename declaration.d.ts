type Primitive = bigint | boolean | number | string | symbol | null | undefined;

interface Array {
  includes: (searchElement: Primitive, fromIndex?: number) => boolean;
}

interface ReadonlyArray {
  includes: (searchElement: Primitive, fromIndex?: number) => boolean;
}

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
