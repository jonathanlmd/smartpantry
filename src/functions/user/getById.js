import { User } from "../../db/models.js";

async function getById(request, response) {
  const { userId } = request.params;
  const user = await User.findById(userId);

  if (!user) {
    return response.status(401).json({
      message: "Usuário não encontrado.",
    });
  }

  return response.json(user);
}

export default getById;
