export default class TodoForm {
    constructor(action, method, id, text) {
        this.action = action;
        this.method = method;
        this.id = id;
        this.text = text;
    }

    render() {
        const isEditForm = this.method === "PUT"
        return `
        <div class="todo-card" ${isEditForm ? 'data-id=' + this.id : ''} >
            <form action="${this.action}">
                <div class="form-container">
                <textarea class="todo-text" name="text" rows="5">${this.text || ""}</textarea><br/>
                <input type="hidden" name="id" value="${this.id || ""}" />
                <i class="fa ${isEditForm ? 'fa-save' : 'fa-plus-square'} icon"></i>
                <input class="submit-button" type="submit" title="${isEditForm ? 'Save Todo' : 'Add Todo'}" value="" />
                </div>
            </form>
        </div>
        `;
    }
}