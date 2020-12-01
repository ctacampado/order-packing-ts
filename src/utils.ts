import { Dimensions } from "./interfaces";

export function getVolume(d: Dimensions): number {
  return d.height*d.length*d.width;
}

// returns absolute value for the difference of 2 numbers
export function absDiff(x: number, y: number): number {
  return Math.abs(x - y);
}

// integer division
export function simpleDiv(x: number, y: number): number {
  return Math.floor(x/y);
}

export function isLess(x: number, y: number): boolean {
  if (x < y) { 
    return true;
  }
  return false;
}