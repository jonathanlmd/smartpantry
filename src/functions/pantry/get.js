import bcryptjs from "bcryptjs";

async function get(request, response) {
  const pHash1 = await bcryptjs.hash("pantryA", 1);

  return response.json({
    hello: "world",
    pantryHash: Buffer.from(pHash1).toString("base64"),
  });
}

export default get;
