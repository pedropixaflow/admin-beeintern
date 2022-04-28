$("form").on("submit", function () {
    const button = document.querySelector("button[type='submit']")
    button.setAttribute("disabled", "disabled")
})