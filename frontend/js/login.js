async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.role === "admin") location.href = "admin.html";
    else if (data.role === "user") location.href = "dashboard.html";
}

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    alert("Utilisateur créé !");
}
