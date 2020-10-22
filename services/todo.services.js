const Todo = require("../models/todo.models");
const HttpError = require("../utils/error");

exports.getTodoById = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) throw new HttpError(404, "Item not found.");
  return todo;
};

exports.updateTodo = async (id, body) => {
    const todo = await Todo.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
    if (!todo) throw new HttpError(400, "Item not found.");
    return todo;
};

exports.deleteTodoById = async (id) => {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) throw new HttpError(400, "Item not found.");
}