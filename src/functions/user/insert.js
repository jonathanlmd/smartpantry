import { User } from "../../db/models.js";
import { generateHash } from "../../providers/hashProvider.js";
import AppError from "../../errors/AppError.js";

async function insert(request, response) {
  const { username, password } = request.body;

  const hashedPass = await generateHash(password);

  const existentUser = await User.findOne({
    username,
  });

  if (existentUser) {
    throw new AppError("Usuário já existe.", 400);
  }

  const user = new User({
    username,
    password: hashedPass,
  });

  const savedUser = await user.save();

  if (!savedUser) {
    return response.status(400).json({
      message: "Erro interno.",
    });
  }

  const { password: _, ...userWithoutPassword } = savedUser._doc;

  return response.json({
    id: savedUser._id,
    ...userWithoutPassword,
  });
}

export default insert;
