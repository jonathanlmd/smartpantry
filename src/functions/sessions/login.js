import { User, Pantry } from "../../db/models.js";
import { compareHash } from "../../providers/hashProvider.js";
import AppError from "../../errors/AppError.js";

async function login(request, response) {
  const { password, username } = request.body;
  console.log(password, username);

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

  let pantry = null;

  if (!!user?.pantry[0]?.id) {
    pantry = await Pantry.findById(user.pantry[0].id);
  }

  const { password: _, ...userWithoutPassword } = user._doc;

  return response.json({
    id: user._id,
    ...userWithoutPassword,
    hash: pantry ? pantry._doc.hash : null,
  });
}

export default login;
