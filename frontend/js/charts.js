async function loadStats() {
    const res = await fetch("http://localhost:3000/data/stats");
    return res.json();
}

async function loadComplex() {
    const res = await fetch("http://localhost:3000/admin/complex-stats");
    return res.json();
}

/* BAR + PIE (USER) */
if (document.getElementById("barChart")) {
    loadStats().then(stats => {
        new Chart(barChart, {
            type: "bar",
            data: {
                labels: Object.keys(stats.positions),
                datasets: [{
                    data: Object.values(stats.positions),
                    backgroundColor: "blue"
                }]
            }
        });

        new Chart(pieChart, {
            type: "pie",
            data: {
                labels: Object.keys(stats.nationalities),
                datasets: [{
                    data: Object.values(stats.nationalities)
                }]
            }
        });
    });
}

/* RADAR (ADMIN) */
if (document.getElementById("radarChart")) {
    loadComplex().then(players => {

        const labels = ["Attack", "Block", "Serve"];

        new Chart(radarChart, {
            type: "radar",
            data: {
                labels,
                datasets: players.slice(0, 5).map(p => ({
                    label: p.Player,
                    data: [p.Attack, p.Block, p.Serve]
                }))
            }
        });
    });
}
