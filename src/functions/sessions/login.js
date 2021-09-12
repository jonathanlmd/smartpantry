import { User } from "../../db/models.js";
import { compareHash } from "../../providers/hashProvider.js";
import AppError from "../../errors/AppError.js";

async function login(request, response) {
  const { password, username } = request.body;

  const user = await User.findOne({
    username,
  });

  if (!user) {
    throw new AppError("Usuário/Senha incorretos.", 401);
  }

  const passwordMatched = await compareHash(password, user.password);

  if (!passwordMatched) {
    throw new AppError("Usuário/Senha incorretos.", 401);
  }

  const { password: _, ...userWithoutPassword } = user._doc;

  return response.json({
    id: user._id,
    ...userWithoutPassword,
  });
}

export default login;
