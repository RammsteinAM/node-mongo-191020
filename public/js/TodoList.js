import { BASE_URL } from "./constants.js";

export default class TodoList {
    async fetchTodos() {
        const res = await fetch(BASE_URL);
        const resJson = await res.json();
        if (!resJson.success){
            throw Error();
        }
        return resJson.data;
    }
    
    generateTodoElement(todoItem) {
        return `
        <div class="todo-card" data-id="${todoItem._id}">
            <div class="card-content">${todoItem.text}</div>
            <div class="card-control-container"> 
            <button data-action="edit" data-id="${todoItem._id}" title="Edit"><i class="fa fa-pencil icon"></i></button>
            <button data-action="delete" data-id="${todoItem._id}" title="Delete"><i class="fa fa-trash-o icon"></i></button>
            </div>
        </div>
        `;
    }

    async renderTodos() {
        const todos = await this.fetchTodos();
        let todosHtml = "";
        todos.forEach(todo => {
            todosHtml += this.generateTodoElement(todo);
        });
        return todosHtml;
    }

    async render() {
        const todos = await this.renderTodos();
        return todos;
    }
}