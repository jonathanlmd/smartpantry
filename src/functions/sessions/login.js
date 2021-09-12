import { User } from "../../db/models.js";
import { compareHash } from "./hashProvider.js";

async function login(request, response) {
  const { password, username } = request.body;

  const user = await User.findOne({
    username,
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
