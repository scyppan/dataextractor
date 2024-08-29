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

function createTextCell(value) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    cell.appendChild(input);
    return cell;
}

function createNumberCell(value, min, max) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.value = value;
    input.min = min;
    input.max = max;
    cell.appendChild(input);
    return cell;
}

function createSelectCell(selectedValue, options) {
    const cell = document.createElement('td');
    const select = document.createElement('select');

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (option === selectedValue) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    cell.appendChild(select);
    return cell;
}

function getTransferValueOptions() {
    return [
        '{Ignore}', 'Less 3k', '€3k-€4.9k', '€5k-€6.9k', '€7k-€9.9k',
        '€10k-€24.9k', '€25k-€37.4k', '€37.5k-€49.9k', '€50k-€74.9k',
        '€75k-€99.9k', '€100k-€124.9k', '€125k-€149.9k', '€150k-€174.9k',
        '€175k-€199.9k', '€200k-€224.9k', '€225k-€274.9k', '€275k-€349.9k',
        '€350k-€449.9k', '€450k-€549.9k', '€550k-€649.9k', '€650k-€949.9k',
        '€950k-€1.32m', '€1.33m-€1.65m', '€1.66m-€1.99m', '€2m-€2.49m',
        '€2.5m-€3.49m', '€3.5m-€4.99m', '€5m-€6.99m', '€7m-€8.99m',
        '€9m-€11.99m', '€12m-€14.99m', '€15m-€19.99m', '€20m-€24.99m',
        '€25m-€29.99m', '€30m-€49.99m', '€50m-€91.99m', '€92m-€103.99m',
        '€104m-€108.99m', '€109m-€116.49m', '€116.5m-€129.9m', 'Greater €130m'
    ];
}

function getPositionOptions(includeBlank = false) {
    const positions = [
        '{none}', 'GK', 'SW', 'RWB', 'RB', 'RCB', 'CB', 'LCB', 'LB', 'LWB',
        'RDM', 'CDM', 'LDM', 'RM', 'RCM', 'CM', 'LCM', 'LM', 'RAM', 'CAM',
        'LAM', 'RF', 'CF', 'LF', 'RW', 'RS', 'ST', 'LS', 'LW'
    ];
    if (includeBlank) {
        positions.unshift(''); // Adds a blank option
    }
    return positions;
}

function getFootOptions() {
    return ['Right', 'Left'];
}

function getWeakFootOptions() {
    return ['Terrible', 'Bad', 'Average', 'Good', 'Excellent'];
}

function processPlayerRow(row, currentdefaultpos, teamnation) {

    console.log(teamnation);
    // Normalize the teamnation to match with the predefined nations
    //const normalizedTeamNation = findMatchingNation(teamnation);

    let playerName= processPlayerName(row.children[2].children[0].textContent);

    let player = {
        url: row.children[2].children[0].href,
        given: playerName.given,
        sur: playerName.sur,
        jersey: playerName.jersey,
        nick: playerName.nick,
        nationality: findMatchingNation(row.children[4].textContent, teamnation) || normalizedTeamNation,
        dob: row.children[5].textContent,
        position1: currentdefaultpos
    };

    teamplayers.push(player);
}

function findMatchingNation(inputNation, teamnation) {
    //console.log("inputnation", inputNation);

    const nationList = nations();
    let natname = 'Côte d’Ivoire'; // Default value

    // Normalize the input and teamnation for comparison
    const normalizedInput = inputNation.toLowerCase().trim();
    const normalizedTeamnation = teamnation.toLowerCase().trim();

    // Check if inputNation exactly matches or contains any nation in allNations
    const matchedNation = nationList.find(nationObj => 
        nationObj.nation.toLowerCase() === normalizedInput || 
        normalizedInput.includes(nationObj.nation.toLowerCase()) ||
        nationObj.nation.toLowerCase().includes(normalizedInput)
    );

    if (matchedNation) {
        //console.log("I matched the inputnation");
        natname = matchedNation.nation;
    } else {
        // If no match, then check teamnation in the same way
        const matchedTeamNation = nationList.find(nationObj => 
            nationObj.nation.toLowerCase() === normalizedTeamnation || 
            normalizedTeamnation.includes(nationObj.nation.toLowerCase()) ||
            nationObj.nation.toLowerCase().includes(normalizedTeamnation)
        );

        if (matchedTeamNation) {
            //console.log("I matched the teamnation");
            natname = matchedTeamNation.nation;
        } else {
            //console.log("no match");
        }
    }

    return natname;
}

function getFilteredNationOptions() {
    const excludeNations = ["ExcludeNation1", "ExcludeNation2", "ExcludeNation3"]; // Replace with actual names
    const nationList = nations();
    return nationList
        .filter(nationObj => !excludeNations.includes(nationObj.nation))
        .map(nationObj => nationObj.nation);
}

function processPlayerName(playername){
    let parts=playername.split(' ');

    switch(parts.length){
        case 0:
            return {
                given: '',
                sur: '',
                jersey: '',
                nick: ''
            };
        case 1:
            return {
                given: parts[0].trim(),
                sur: parts[0].trim(),
                jersey: parts[0].trim(),
                nick: parts[0].trim()
            };
        case 2:
            return {
                given: parts[0].trim(),
                sur: parts[1].trim(),
                jersey: parts[1].trim(),
                nick: ''
            };
        default:
            let given='';
            for(let i=0;i<parts.length;i++){
                if(i!=parts.length-1){
                    given+=' ' + parts[i].trim();
                }
            }
            
            return {
                given: given.trim(),
                sur: parts[parts.length-1],
                jersey: parts[parts.length-1],
                nick: ''
            };
    }
}


function populatePlayerData() {
    const tbody = document.getElementById('playerDataTable').getElementsByTagName('tbody')[0];
    const nationOptions = getFilteredNationOptions();

    teamplayers.forEach(player => {
        const row = document.createElement('tr');

        // Use the filtered nation options for the nationality select cell
        row.appendChild(createSelectCell(player.nationality || "Côte d’Ivoire", nationOptions));
        row.appendChild(createTextCell(player.given || ''));
        row.appendChild(createTextCell(player.sur || ''));
        row.appendChild(createTextCell(player.jersey || ''));
        row.appendChild(createTextCell(player.nick || ''));
        row.appendChild(createSelectCell(player.transferval || '{Ignore}', getTransferValueOptions()));
        row.appendChild(createNumberCell(player.ovr || 62, 1, 99));
        row.appendChild(createSelectCell(player.position1 || 'CM', getPositionOptions()));
        row.appendChild(createSelectCell(player.position2 || '', getPositionOptions(true)));
        row.appendChild(createSelectCell(player.position3 || '', getPositionOptions(true)));
        row.appendChild(createSelectCell(player.position4 || '', getPositionOptions(true)));
        row.appendChild(createSelectCell(player.foot || "Right", getFootOptions()));
        row.appendChild(createSelectCell(player.weakfoot || "Average", getWeakFootOptions()));
        row.appendChild(createTextCell(player.dob || "01/01/2000"));
        row.appendChild(createNumberCell(player.height || 180, 149, 206));
        row.appendChild(createNumberCell(player.weight || 80, 46, 105));
        row.appendChild(createNumberCell(player.attwrkrate || 1, 0, 2));
        row.appendChild(createNumberCell(player.defwrkrate || 1, 0, 2));
        row.appendChild(createNumberCell(player.skillmoves || 1, 0, 4));
        row.appendChild(createNumberCell(player.playerid || 0, 0, 280000));

        tbody.appendChild(row);
    });
}