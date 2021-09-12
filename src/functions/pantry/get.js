import bcryptjs from "bcryptjs";

async function get(request, response) {
  const pHash1 = await bcryptjs.hash("pantryA", 1);
  const pHash2 = await bcryptjs.hash("pantryA", 1);
  console.log([pHash1, pHash2]);

  const res1 = await bcryptjs.compare("pantryA", pHash1);
  const res2 = await bcryptjs.compare("pantryA", pHash2);

  return response.json({
    hello: "world",
    compare: [res1, res2],
  });
}

export default get;
