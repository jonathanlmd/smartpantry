import bcryptjs from "bcryptjs";

export function generateHash(payload) {
  return bcryptjs.hash(payload, 9);
}

export function compareHash(payload, hashed) {
  return bcryptjs.compare(payload, hashed);
}
