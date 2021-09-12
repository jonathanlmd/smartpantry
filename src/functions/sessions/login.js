import { User } from "../../db/models.js";
import { compareHash } from "../../providers/hashProvider.js";
import AppError from "../../errors/AppError.js";

async function login(request, response) {
  const { password, username } = request.body;

  const user = await User.findOne({
    username,
  });

  if (!user) {
    throw new AppError("Email/password incorretos.", 401);
  }

  const passwordMatched = await compareHash(password, user.password);

  if (!passwordMatched) {
    throw new AppError("Email/password incorretos.", 401);
  }

  return response.json(user);
}

export default login;
