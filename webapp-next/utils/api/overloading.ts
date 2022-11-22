import type { DataResponses } from "../types/api-types";

// credits goes to https://stackoverflow.com/a/50375286
// function intersection producec - functin overloads
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type IsNever<T> = [T] extends [UnionToIntersection<T>] ? true : false;

type Values<T> = T[keyof T];

/**
 * Generate all possible combinations of allowed arguments
 */
type AllOverloads<Mappings, Keys extends string> = {
  [Prop in Keys]: Prop extends keyof Mappings
    ? undefined extends Mappings[Prop]
      ? (route: Prop, params?: Mappings[Prop]) => Promise<DataResponses<Prop>>
      : (route: Prop, params: Mappings[Prop]) => Promise<DataResponses<Prop>>
    : (route: Prop) => Promise<DataResponses<Prop>>;
};

/**
 * Convert all allowed combinations to function overload
 */
export type Overloading<
  Mappings,
  Keys extends string
> = keyof Mappings extends Keys
  ? UnionToIntersection<Values<AllOverloads<Mappings, Keys>>>
  : never;
