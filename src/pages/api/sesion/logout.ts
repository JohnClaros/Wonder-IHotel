import { NextApiRequest, NextApiResponse } from "next";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  // Si usas cookies para mantener la sesión
  res.setHeader("Set-Cookie", "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;");

  // Responder con un estado 200 indicando que el logout fue exitoso
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
};

export default logout;