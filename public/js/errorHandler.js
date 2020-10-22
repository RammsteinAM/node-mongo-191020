export default async function wrapper(func, root) {
    try {
        await func();
    } catch (error) {
        root.innerHTML = `<div>${error}</div>`
    }
}