import { Transaction } from "sequelize";
import { User } from "../database/models/auth/User";

const DEFAULT_PASSWORD = "123456789";

interface PersonUserPayload {
  document?: string | null;
  email?: string | null;
  status?: "ACTIVO" | "INACTIVO";
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  transaction: Transaction;
}

const normalize = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const noAccents = trimmed
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return noAccents.replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
};

const buildUsername = (
  firstName?: string | null,
  lastName?: string | null,
  fullName?: string | null,
  document?: string | null,
  email?: string | null
): string => {
  const normalizedFirst = firstName ? normalize(firstName) : "";
  const normalizedLast = lastName ? normalize(lastName) : "";

  if (normalizedFirst && normalizedLast) {
    return `${normalizedFirst}_${normalizedLast}`;
  }

  const normalizedFull = fullName ? normalize(fullName) : "";
  if (normalizedFull) {
    return normalizedFull;
  }

  if (document) {
    return document.trim();
  }

  if (email) {
    return email.split("@")[0] || email;
  }

  throw new Error("No se pudo generar un nombre de usuario válido.");
};

export const createUserForPerson = async ({
  document,
  email,
  status,
  firstName,
  lastName,
  fullName,
  transaction,
}: PersonUserPayload): Promise<void> => {
  if (!email) {
    throw new Error("El email es obligatorio para crear el usuario asociado.");
  }

  const username = buildUsername(firstName, lastName, fullName, document, email);

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
