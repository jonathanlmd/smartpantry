import bcryptjs from "bcryptjs";

export async function generateHash(payload) {
  return bcryptjs.hash(payload, 9);
}

export async function decodeBase64(payload) {
  return Buffer.from(payload).toString("base64");
}

export async function compareHash(payload, hashed) {
  return bcryptjs.compare(payload, hashed);
}
