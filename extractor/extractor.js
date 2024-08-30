let player=null;

function extractTableData() {
    const playerNameElement = document.querySelector('h2[itemprop="name"]');
    const playerName = playerNameElement ? playerNameElement.innerText.trim() : 'unknown_player';
    const table = document.querySelector('.standard_tabelle.yellow');
    if (!table) {
        console.log("No table found.");
        return;
    }

    const rows = table.querySelectorAll('tr');
    let dataObj = { playerName };

    rows.forEach(row => {
        const keyElement = row.querySelector('td:first-child b');
        const valueElement = row.querySelector('td:last-child');

        if (!keyElement || !valueElement) return;

        const key = keyElement.textContent.replace(/:/g, '').trim();
        let value = valueElement.textContent.trim();

        const span = valueElement.querySelector('span[itemprop="nationality"]');
        if (span) {
            value = span.textContent.trim();
        }

        dataObj[key] = value;
    });

    player=dataObj;
    return player;
    
    //processPlayer();
    //downloadDataAsJson(JSON.stringify(dataObj), `${playerName.replace(/[\s\W]+/g, '_')}.json`);
}
