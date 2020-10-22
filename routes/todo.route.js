const { Router } = require("express");
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller");

const router = Router();

router.route("/")
  .get(getTodos)
  .post(createTodo);

router.route("/:id")
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
