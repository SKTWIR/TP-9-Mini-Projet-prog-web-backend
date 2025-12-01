import fs from "fs";
import csv from "csv-parser";

function loadCSV(path) {
    return new Promise((resolve, reject) => {
        const list = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on("data", row => list.push(row))
            .on("end", () => resolve(list))
            .on("error", reject);
    });
}

export async function loadRosters() {
    const men = await loadCSV("./backend/data/df_mens_rosters_21_23.csv");
    const women = await loadCSV("./backend/data/df_womens_rosters_21_23.csv");
    return [...men, ...women];
}
