const { body, validationResult } = require("express-validator");

const validarUsuario = [
  body("nome")
    .isLength({ min: 2 })
    .withMessage("Nome deve ter pelo menos 2 letras"), //tipo ana?
  body("email").isEmail().withMessage("Email inválido"),
  body("idade")
    .isInt({ min: 0 })
    .withMessage("Idade deve ser um número inteiro positivo"),

  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  },
];

module.exports = validarUsuario;
