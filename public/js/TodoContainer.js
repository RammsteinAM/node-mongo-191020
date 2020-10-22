import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { BASE_URL } from "./constants.js";

export default class TodoContainer {
    async renderTodos() {
        const todos = await (new TodoList()).render();
        const createTodoForm = new TodoForm(BASE_URL, "POST", null);
        const form = createTodoForm.render();
        return `<main><div class="todo-container" id="todo-container">${form}${todos}</div></main>`;
    }

    async render() {
        const todos = await this.renderTodos();
        return todos
    }
}