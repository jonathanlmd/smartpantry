import { User } from "../../db/models.js";

async function insert(request, response) {
  const { name, pantryName, pantryId } = request.body;
  const user = new User({
    name,
    pantry: {
      uuid: pantryId,
      name: pantryName,
      items: [],
    },
  });

  const savedUser = await user.save();

  if (!savedUser) {
    return response.status(400).json({
      message: "Intern error.",
    });
  }

  return response.json(savedUser);
}

export default insert;
