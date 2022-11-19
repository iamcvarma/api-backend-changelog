import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const verifyPassword = (password,hash)=>{
    return bcrypt.compare(password,hash)
}


export const hashPassword = (password)=>{
    return bcrypt.hash(password,5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

//auth middleware

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.send({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.send({ message: "invalid token " });
    return;
  }

  try {
    const user = jwt.verify(token,process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    res.status(401)
    res.sent({message:'invalid token'})
    return
  }
};
