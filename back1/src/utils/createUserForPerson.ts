import { Transaction } from "sequelize";
import { User } from "../database/models/auth/User";

const DEFAULT_PASSWORD = "123456789";

interface PersonUserPayload {
  document?: string | null;
  email?: string | null;
  status?: "ACTIVO" | "INACTIVO";
  transaction: Transaction;
}

export const createUserForPerson = async ({
  document,
  email,
  status,
  transaction,
}: PersonUserPayload): Promise<void> => {
  if (!email) {
    throw new Error("El email es obligatorio para crear el usuario asociado.");
  }

  const username = document ?? email;
  if (!username) {
    throw new Error(
      "Se requiere documento o email para asignar el nombre de usuario."
    );
  }

  const existingUser = await User.findOne({
    where: { email },
    transaction,
  });

  if (existingUser) {
    throw new Error("Ya existe un usuario registrado con el email proporcionado.");
  }

  await User.create(
    {
      username,
      email,
      password: DEFAULT_PASSWORD,
      status: status ?? "ACTIVO",
    },
    { transaction }
  );
};

