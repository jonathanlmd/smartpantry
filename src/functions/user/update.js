import { User } from "../../db/models.js";

async function update(request, response) {
  const { name, pantryName, pantryId } = request.body;
  const { userId } = request.params;
  const user = await User.findById(userId);

  user.name = name;
  user.pantry.name = pantryName;
  user.pantry.uuid = pantryId;

  const savedUser = await user.save();

  if (!savedUser) {
    return response.status(400).json({
      message: "Intern error.",
    });
  }

  return response.json(savedUser);
}

export default update;
