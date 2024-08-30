async function fetchplayers() {

    playerinfoloading();
    
    const results = [];

    const iframe = document.createElement('iframe');
    iframe.classList.add('myliliframe');
    document.body.prepend(iframe);

    for (const player of teamplayers) {

        console.log(player);
        
        document.getElementById('playerInfoPanel').innerHTML+="<br>" + 'Processing: ' + player.given + ' ' + player.sur, player.url + '...';

        // Create a promise that resolves when the iframe finishes loading
        await new Promise((resolve, reject) => {
            iframe.onload = async function () {
                try {
                    const result = await getplayerdata(iframe.contentDocument, player.url); // Pass the iframe's document to the function
                    console.log("result");
                    results.push(result);
                    resolve(); // Resolve the promise to move on to the next player
                } catch (error) {
                    console.error('Error extracting data for player:', player.given + ' ' + player.sur, error);
                    resolve(); // Resolve on error to continue processing
                }
            };

            iframe.onerror = function (error) {
                console.error('Error loading iframe for player:', player.given + ' ' + player.sur, error);
                resolve(); // Resolve on error to continue processing
            };

            // Set the iframe's source to the player's URL
            iframe.src = player.url;
        });
    }

    // Log the results after all players have been processed
    console.log('All players processed:', results);
    
    updateTeamPlayers(results);
    iframe.remove();
    destroyPlayerInfoPanel();
    createPlayerInfoPanel();

}

async function getplayerdata(iframeDocument, playerurl) {
    const playerNameElement = iframeDocument.querySelector('h2[itemprop="name"]');
    const playerName = playerNameElement ? playerNameElement.innerText.trim() : 'unknown_player';
    const table = iframeDocument.querySelector('.standard_tabelle.yellow');
    if (!table) {
        console.log("No table found.");
        return;
    }

    const rows = table.querySelectorAll('tr');
    let dataObj = { playerName, pageurl:playerurl};

    rows.forEach(row => {
        const keyElement = row.querySelector('td:first-child b');
        const valueElement = row.querySelector('td:last-child');

        if(!valueElement){console.error(row)}

        if (!keyElement || !valueElement) return;

        const key = keyElement.textContent.replace(/:/g, '').trim();
        console.log("KEY", key);

        let value = valueElement.textContent.trim();

        if(key=='Position(s)'){
            console.log("VALUE ELEMENT", valueElement);
            value=valueElement.innerHTML;
        }

        const span = valueElement.querySelector('span[itemprop="nationality"]');
        if (span) {
            value = span.textContent.trim();
        }

        dataObj[key] = value;
    });

    return dataObj;
}

function playerinfoloading() {
    const panel = document.getElementById('playerInfoPanel');
    panel.classList.add('infopanelfetching');
    if (panel) {
        panel.innerHTML="fetching players... This will take a little while.";
    } else {
        console.log('Player Info Panel not found');
    }
}

function destroyPlayerInfoPanel() {
    const panel = document.getElementById('playerInfoPanel');
    panel.classList.remove('infopanelfetching');
    if (panel) {
        panel.remove();  // This removes the panel and all of its child elements from the DOM
        console.log('Player Info Panel destroyed');
    } else {
        console.log('Player Info Panel not found');
    }
}

function updateTeamPlayers(results){

    results.forEach(result=>{
        updatePlayer(result);
    });

}

function updatePlayer(result) {
    let thisplayer = teamplayers.find(player => player.url === result.pageurl);

    if (thisplayer) {
        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                processKVP(thisplayer, key, result[key]);
            }
        }
    }
}

function processKVP(player, key, value) {
    switch (key) {
        case 'playerName':
            player.playerName = processPlayerName(value);
            break;
            case 'Born':
                let [day, month, year] = value.split('.');
                player.dob = `${year}-${month}-${day}`;
                break;            
        case 'Place of birth':
            if(player.placeholdernationality=='default'|| player.placeholdernationality=='teamnation'){
                let parts = value.split(/[\s,]+/);
                let lastItem = parts[parts.length - 1];
                let matchingbirthplace = findMatchingNation(lastItem);

                if(matchingbirthplace!='not found'){
                    player.placeholdernationality=='birthplace';
                    player.nationality=matchingbirthplace;
                }
            }
            break;
        case 'Nationality':
            if(player.placeholdernationality!='none'){
                let matchingnat=findMatchingNation(value);
                if(matchingnat!='not found'){
                    player.nationality=matchingnat;
                    player.placeholdernationality='none';
                }
            }
            break;
        case 'Height':
            player.height = returninrange(149,206,parseInt(value.replace(' cm', '')));
            break;
        case 'Weight':
            player.weight = returninrange(46, 105,parseInt(value.replace(' kg', '')));
            break;
        case 'Position(s)':
            processPositions(player, value);
        break;
        case 'Foot':
            processFeet(player, value)
        break;
        default:
            console.log(`Unknown key: ${key}`);
            break;
    }
}

function processPositions(player, value) {
    let positions = [];

    if (value.includes('<br>')) {
        positions = value.split('<br>').map(pos => pos.trim()); // Split by <br> and trim each part
        console.log('positions', positions);
    } else {
        positions = [value];
    }

    switch (positions.length) {
        case 0:
            if (!(player.position1placeholder === 'teamlevel' || player.position1placeholder === 'default')) {
                player.position1 = 'CM';
                player.position1placeholder = 'default';
                player.position2 = '';
                player.position3 = '';
                player.position4 = '';
            }
            break;
        case 1:
            player.position1 = findPositionFromvalue(positions[0]);
            player.position1placeholder = 'none';
            player.position2 = '';
            player.position3 = '';
            player.position4 = '';
            break;
        case 2:
            player.position1 = findPositionFromvalue(positions[0]);
            player.position1placeholder = 'none';
            player.position2 = findPositionFromvalue(positions[1]);
            player.position3 = '';
            player.position4 = '';
            break;
        case 3:
            player.position1 = findPositionFromvalue(positions[0]);
            player.position1placeholder = 'none';
            player.position2 = findPositionFromvalue(positions[1]);
            player.position3 = findPositionFromvalue(positions[2]);
            player.position4 = ''; // Make sure position4 is empty
            break;
        case 4:
            player.position1 = findPositionFromvalue(positions[0]);
            player.position1placeholder = 'none';
            player.position2 = findPositionFromvalue(positions[1]);
            player.position3 = findPositionFromvalue(positions[2]);
            player.position4 = findPositionFromvalue(positions[3]);
            break;
        // Add cases beyond 4 if needed
    }
}

function processFeet(player, value){
    switch(value){
        case "right": player.foot="Right"; break;
        case "left": player.foot="Left"; break;
        case "both":
            player.foot="Right"
            player.weakfoot="Good"
            if(randbetween(0,1)==1){
                player.foot="Left";
            }
            if(randbetween(0,1)==1){
                player.weakfoot="Excellent";
            }
        break;
    }
}

function findPositionFromvalue(value){
    switch(value){
        case "Goalkeeper": return "GK";
        case "Defender": return "CB";
        case "Left Back": return "LB";
        case "Center Back": return "CB";
        case "Right Back": return "RB";
        case "Right Winger": return "RW";
        case "Left Winger": return "LW";
        case "Defensive Midfielder": return "CDM";
        case "Offensive Midfielder": return "CAM";
        case "Central Midfielder": return "CM";
        case "Right Midfielder": return "RM";
        case "Left Midfielder": return "LM";
        case "Centre Forward": return "ST";
        default: 
        return "";
    }
}