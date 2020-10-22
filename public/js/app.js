import TodoContainer from "./TodoContainer.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import wrapper from "./errorHandler.js"
import { BASE_URL } from "./constants.js";

const root = document.getElementById("root");

class App {
  async getTodoItem(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error("Unable to find the item.");
    }
    return resJson;
  }

  editTempData = {};
  
  async createTodo(text) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const resJson = await res.json();
    if (!resJson.success) {      
      throw Error("Failed to create Todo.");
    }
    this.render();
  }

  async startEditingTodoItem(id) {
    const card = document.querySelector(`*[data-id="${id}"]`);
    const todo = await this.getTodoItem(id);
    if (!todo.success) {
      throw Error("Failed to edit Todo.");
    }
    const editTodoForm = new TodoForm(
      BASE_URL,
      "PUT",
      id,
      todo.data.text
    );
    const form = editTodoForm.render();
    this.editTempData[id] = card.outerHTML;
    card.outerHTML = form;
  }

  cancelEdit(id) {
    const card = document.querySelector(`*[data-id="${id}"]`);
    card.outerHTML = this.editTempData[id];
    delete this.editTempData[id];
  }

  async updateTodo(_id, text) {
    const res = await fetch(`${BASE_URL}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const resJson = await res.json();
    if (!resJson.success) {
      throw Error("Operation failed.");
    }
    const card = document.querySelector(`*[data-id="${_id}"]`);
    const todoList = new TodoList();
    const todoElement = todoList.generateTodoElement({_id, text});
    card.outerHTML = todoElement;
  }

  async deleteTodoItem(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });    
    const resJson = await res.json();    
    if (!resJson.success) {
      throw Error("Unable to delete Todo.");
    }
    const card = document.querySelector(`*[data-id="${id}"]`);
    card.remove();
  }

  async attachListeners() {
    const rootElement = document.getElementById("root");
    rootElement.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      const id = e.target.dataset.id;
      switch (action) {
        case "edit":
          wrapper(() => this.startEditingTodoItem(id), root);
          break;
        case "delete":
          wrapper(() => this.deleteTodoItem(id), root);
          break;
        case "cancel":
          this.cancelEdit(id);
          break;
      }
    });
    rootElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = e.target.id.value;
      const text = e.target.text.value;
      if (!id) {
        wrapper(() => this.createTodo(text), root);
      } else {
        wrapper(() => this.updateTodo(id, text), root);
      }
    });
  }

  async render() {
    const todoContainer = new TodoContainer();
    root.innerHTML = await todoContainer.render();
  }
}

const app = new App();
app.render();
app.attachListeners();
