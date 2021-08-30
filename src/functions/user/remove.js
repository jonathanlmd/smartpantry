import { User } from "../../db/models.js";

async function remove(request, response) {
  const { userId } = request.params;
  const res = await User.deleteOne({ _id: userId });

  if (res.deletedCount === 0) {
    return response.status(400).json({
      message: "Intern error.",
    });
  }

  return response.json({
    message: "User was deleted.",
  });
}

export default remove;
