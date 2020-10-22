const HttpError = require("../utils/error");
const asyncWrapper = require("../utils/asyncWrapper");
const Todo = require("../models/todo.models");
const todoService = require("../services/todo.services");

exports.getTodos = asyncWrapper(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
  });
});

exports.getTodo = asyncWrapper(async (req, res) => {
  const todo = await todoService.getTodoById(req.params.id);
  res.status(200).json({
    success: true,
    data: todo,
  });
});

exports.createTodo = asyncWrapper(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({
    success: true,
    data: todo,
  });
});

exports.updateTodo = asyncWrapper(async (req, res) => {
  const todo = await todoService.updateTodo(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: todo,
  });
});

exports.deleteTodo = asyncWrapper(async (req, res) => {
  const todo = await todoService.deleteTodoById(req.params.id);
  res.status(200).json({
    success: true,
    data: {}
  });
});
