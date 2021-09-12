import { encodeBase64, generateHash } from "../../providers/hashProvider.js";

async function get(request, response) {
  const pHash1 = await generateHash(process.env.PANTRY_APP_KEY);
  console.log(pHash1);

  return response.json({
    hello: "world",
    pantryHash: await encodeBase64(pHash1),
  });
}

export default get;
