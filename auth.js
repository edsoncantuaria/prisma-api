function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (token !== process.env.API_SECRET) {
    return res.status(403).json({ error: "Token inválido" });
  }

  next();
}

module.exports = autenticar;
