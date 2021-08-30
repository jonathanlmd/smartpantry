async function get(request, response) {
  return response.json({ hello: "world" });
}

export default get;
