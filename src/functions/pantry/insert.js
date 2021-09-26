import { compareHash, decodeBase64 } from "../../providers/hashProvider.js";
import AppError from "../../errors/AppError.js";
import { Pantry, User } from "../../db/models.js";

async function insert(request, response) {
  console.log(request.body);
  const { pantryHash, name, userId } = request.body;

  if (!pantryHash || !name || !userId) {
    throw new AppError("Dados faltando.", 400);
  }

  const decoded = await decodeBase64(pantryHash);
  console.log("Base64: ", pantryHash);
  console.log("Decoded: ", decoded);

  const hashRes = await compareHash(process.env.PANTRY_APP_KEY, decoded);

  if (!hashRes) {
    throw new AppError("Código inválido.", 400);
  }

  const pantry = new Pantry({
    name,
    hash: pantryHash,
    items: [],
  });

  const savedPantry = await pantry.save();

  if (!savedPantry) {
    throw new AppError("Erro ao criar a despensa.");
  }

  const user = await User.findById(userId);

  user.pantry.push({
    id: savedPantry._id,
    name,
  });

  const userResponse = await user.save();

  if (!userResponse) {
    throw new AppError("Erro ao vincular a despensa.");
  }

  return response.json({
    id: savedPantry._id,
    ...savedPantry._doc,
  });
}

export default insert;
