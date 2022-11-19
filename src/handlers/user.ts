import prisma from "../db";
import { createJWT, hashPassword, verifyPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const singIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    res.status(401);
    res.json({ message: "user not found" });
    return;
  }
  const isValid = await verifyPassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "wrong password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
