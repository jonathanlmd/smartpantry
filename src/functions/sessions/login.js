import { User } from "../../db/models.js";
import { compareHash } from "./hashProvider";

async function login(request, response) {
  const { password, user } = request.body;
  const user = await User.findOne({
    username: user,
  });

  const user = await User.findOne({
    username: user,
  });

  if (!user) {
    throw new Error("Email/password incorretos.", 401);
  }

  const passwordMatched = await compareHash(password, user.password);

  if (!passwordMatched) {
    throw new Error("Email/password incorretos.", 401);
  }

  return response.json(user);
}

export default login;
