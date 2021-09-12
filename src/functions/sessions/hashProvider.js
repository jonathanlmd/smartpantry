import { hash, compare } from "bcryptjs";

export function generateHash(payload) {
  return hash(payload, 9);
}

export function compareHash(payload, hashed) {
  return compare(payload, hashed);
}
