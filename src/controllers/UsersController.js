const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  /**
   * index - GET para listar vários registros
   * show - GET para exibir um registro especifico.
   * create - POST para criar um novo registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para excluir um registro.
   */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = ?", [email]);

    if (checkUserExists) {
      throw new AppError("Este e-mail já está sendo utilizado.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]);

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email} = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = ?", [id]);

    if(!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = ?", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está sendo utilizado.");
    }

    user.name = name;
    user.email = email;

    await database.run(
      "UPDATE users SET name = ?, email = ?, updated_at = ? WHERE id = ?",
      [name, email, new Date(), id]);

    response.json();
  }
}

module.exports = UsersController;
