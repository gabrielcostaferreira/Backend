import sqlite3 from "sqlite3";
import { open } from "sqlite";
function postController(app) {
  app.get("/postagens", listar);
  app.get("/postagens/titulo/:titulo", buscarPorPost);
  app.post("/postagens", inserir);
  app.delete("/postagens/titulo/:titulo", deletar);
  app.put("/postagens/titulo/:titulo", atualizar);
  function listar(req, res) {
    // this is a top-level await
    (async () => {
      // open the database
      const db = await open({
        filename: "./src/infra/blog.db",
        driver: sqlite3.Database,
      });
      const result = await db.all("SELECT * FROM Postagens");
      res.send(result);
    })();
  }
  function inserir(req, res) {
    (async () => {
      // open the database
      const db = await open({
        filename: "./src/infra/blog.db",
        driver: sqlite3.Database,
      });
      const userAdd = req.body;
      console.log(userAdd);
      const result = await db.run(
        `INSERT INTO Postagens(titulo,descricao,tag,url) 
                VALUES(?,?,?,?)`,
        [userAdd.titulo, userAdd.descricao, userAdd.tag, userAdd.url]
      );
    })();

    res.send("Post inserido com sucesso");
  }
  function buscarPorPost(req, res) {
    // Busca o post na lista de postagens

    (async () => {
      // open the database
      const db = await open({
        filename: "./src/infra/blog.db",
        driver: sqlite3.Database,
      });
      const busca = req.params.titulo;
      const result = await db.all(
        `SELECT * FROM Postagens where titulo like ?`,
        busca
      );
      if (!result) {
        res.status(404).send("Post não encontrado");
      }
      // Se o post for encontrado, devolve a postagem
      res.send(result);
    })();
  }

  function deletar(req, res) {
    (async () => {
      // open the database
      const db = await open({
        filename: "./src/infra/blog.db",
        driver: sqlite3.Database,
      });
      const busca = req.params.titulo;
      const result = await db.all(
        `DELETE FROM Postagens where titulo like ?`,
        busca
      );
      if (!result) {
        res.status(404).send("Post não encontrado");
      }
      // Se o usuario for encontrado, devolve o usuario
    })();
    res.send({ mensagem: "Post deletado" })
  }

  function atualizar(req, res) {
    (async () => {
      // open the database
      const db = await open({
        filename: "./src/infra/blog.db",
        driver: sqlite3.Database,
      });
      const busca = req.params.titulo;
      const result = await db.all(
        `UPDATE Postagens SET titulo=?, descricao=?, tag=?, url=?  
            where titulo like ?`,
        req.body.titulo,
        req.body.descricao,
        req.body.tag,
        req.body.url,
        busca
      );
      if (!result) {
        res.status(404).send("Post não encontrado");
      }
      res.send({ mensagem: "Post alterado com sucesso" });
    })();
  }
}
export default postController;
