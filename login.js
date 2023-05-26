const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;


    if (username < 1 || password < 1) {
        alert('You must enter username or password')
        return
    }

    if (username === "Hamza" && password === "1234") {
        alert("You have successfully logged in.");
        // location.reload();
        window.location.href = `index.html`
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})