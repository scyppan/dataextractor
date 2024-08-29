let teamplayers = [];

function setupForTeam() {
    let tables = document.getElementsByClassName('standard_tabelle');
    let playertable = tables[0];
    let tbody = playertable.children[0];
    let tbodyrows = tbody.children;

    let teamtable = tables[1];
    let teamtbody = teamtable.children[0];
    let teamtbodyrows = teamtbody.children;

    let teamnation = getTeamNation(teamtbodyrows);
    let currentdefaultpos = "GK"; 

    for (let i = 0; i < tbodyrows.length; i++) {
        if (isHeaderRow(tbodyrows[i])) { 
            currentdefaultpos = processPosition(tbodyrows[i], currentdefaultpos);
        } else {
            processPlayerRow(tbodyrows[i], currentdefaultpos, teamnation);
        }
    }

    createPlayerInfoPanel();
}

function getTeamNation(teamtbodyrows) {
    let teamnation = "Côte d’Ivoire";  // Default value

    for (let j = 0; j < teamtbodyrows.length; j++) {
        if (teamtbodyrows[j].children[0].textContent.includes("Country")) {
            teamnation = teamtbodyrows[j].children[1].textContent.trim();
            break; 
        }
    }
    return teamnation;
}

function isHeaderRow(row) {
    return row.children.length === 1;
}

function processPosition(row, currentdefaultpos) {
    let procdefpos = processdefaultpos(row.children[0].textContent);
    return procdefpos === "stop" ? currentdefaultpos : procdefpos;
}

function processPlayerRow(row, currentdefaultpos, teamnation) {

    let nationality=row.children[4].textContent;
    if (nationality==''){
        nationality==teamnation;
    }

    let player = {
        url: row.children[2].children[0].href,
        playerName: row.children[2].children[0].textContent,
        nationality: nationality,
        dob: row.children[5].textContent,
        position1: currentdefaultpos
    };
    teamplayers.push(player);
}

function processdefaultpos(val) {
    switch (val) {
        case "Goalkeeper": return "GK";
        case "Defender": return "CB";
        case "Midfielder": return "CM";
        case "Forward": return "ST";
        default: return "stop";
    }
}

function createPlayerInfoPanel() {
    const panel = document.createElement('div');
    panel.id = "playerInfoPanel";

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '-';
    toggleButton.onclick = function() {
        const table = document.getElementById('playerDataTable');
        if (table.style.display === 'none') {
            table.style.display = 'table';
            toggleButton.textContent = '-';
        } else {
            table.style.display = 'none';
            toggleButton.textContent = '+';
        }
    };
    toggleButton.style.cssText = 'float: right;';
    panel.appendChild(toggleButton);

    const table = document.createElement('table');
    table.id = 'playerDataTable';
    table.style.width = '100%';
    table.border = '1';

    const headers = ['nat', 'given', 'sur', 'jersey', 'nick', 'transferval', 'ovr', 'pos1', 'pos2', 'pos3', 'pos4', 'foot', 'weakfoot', 'birthdate', 'height', 'weight', 'attwrkrate', 'defwrkrate', 'skillmoves', 'playerid'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    panel.appendChild(table);
    document.body.insertBefore(panel, document.body.firstChild);

    populatePlayerData();
    adjustColumnWidths(table);
}

function populatePlayerData() {
    const tbody = document.getElementById('playerDataTable').getElementsByTagName('tbody')[0];

    teamplayers.forEach(player => {
        const row = document.createElement('tr');
        const playerData = {
            nat: player.nationality || "Côte d’Ivoire",
            given: player.givenName || '',
            sur: player.surname || '',
            jersey: player.jersey || '',
            nick: player.nick || '',
            transferval: player.transferval || '{Ignore}',
            ovr: player.ovr || 62,
            pos1: player.position1 || 'CM',
            pos2: player.pos2 || '',
            pos3: player.pos3 || '',
            pos4: player.pos4 || '',
            foot: player.foot || "Right",
            weakfoot: player.weakfoot || "Average",
            birthdate: player.dob || "01/01/2000",
            height: player.height || 180,
            weight: player.weight || 80,
            attwrkrate: player.attwrkrate || 1,
            defwrkrate: player.defwrkrate || 1,
            skillmoves: player.skillmoves || 1,
            playerid: player.playerid || 0
        };

        Object.values(playerData).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}
