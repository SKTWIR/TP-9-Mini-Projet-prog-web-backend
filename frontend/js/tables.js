async function loadPlayers() {
    const res = await fetch("http://localhost:3000/data/rosters");
    const players = await res.json();

    const table = document.getElementById("players-table");

    table.innerHTML = `
        <tr>
            <th>Nom</th><th>Poste</th><th>Age</th><th>Pays</th>
        </tr>
        ${players.map(p => `
            <tr>
                <td>${p["Player Name"]}</td>
                <td>${p["Position"]}</td>
                <td>${p["Age"]}</td>
                <td>${p["Nationality"]}</td>
            </tr>
        `).join("")}
    `;
}

function filterTable() {
    const search = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#players-table tr");

    rows.forEach((row, i) => {
        if (i === 0) return; 
        row.style.display = row.innerText.toLowerCase().includes(search) ? "" : "none";
    });
}

loadPlayers();
