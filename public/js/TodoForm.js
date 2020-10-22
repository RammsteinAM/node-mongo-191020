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
                <div class="form-button-container">
                    <div class="form-button">
                        <i class="fa ${isEditForm ? 'fa-save' : 'fa-plus-square'} icon"></i>
                        <input class="button" type="submit" title="${isEditForm ? 'Save Todo' : 'Add Todo'}" value="" />
                    </div>
                ${isEditForm ?
                    '<div class="form-button"><button data-id="'+ this.id +'" data-action="cancel" class="button" type="button" title="Cancel" value="" /><i class="fa fa-close icon"></i></div>'
                    : ''
                }
                </div>
                </div>
            </form>
        </div>
        `;
    }
}