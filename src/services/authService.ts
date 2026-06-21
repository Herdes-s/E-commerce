import type { User, AuthCredentials } from "../stores/useAuthStore";

export const loginApi = async ({
  email,
  //   password,
}: AuthCredentials): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email) {
    throw new Error("Nome e e-mail são obrigatórios");
  }

  return { id: crypto.randomUUID(), name: email.split("@")[0], email };
};

export const createAccountApi = async ({
  name,
  email,
  //   password,
}: AuthCredentials): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!name || !email) {
    throw new Error("Nome e e-mail são obrigatórios");
  }

  return { id: crypto.randomUUID(), name, email };
};
