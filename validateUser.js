const { body, validationResult } = require("express-validator");

const validarUsuario = [
  body("nome")
    .isLength({ min: 2 })
    .withMessage("Nome deve ter pelo menos 2 letras"), //tipo ana?
  body("email").isEmail().withMessage("Email inválido"),
  body("idade")
    .isInt({ min: 1, max: 60 })
    .withMessage("A idade deve ser um número entre 1 e 60 anos"),

  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  },
];

module.exports = validarUsuario;
