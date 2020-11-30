import { Dimensions } from "./interfaces";

export function getVolume(d: Dimensions): number {
  return d.height*d.length*d.width
}

export function getAbsDiff(x: number, y: number): number {
  let diff = x - y;
  return Math.abs(diff);
}

export function isLess(x: number, y: number): boolean {
  if (x < y) { 
    return true 
  }
  return false
}