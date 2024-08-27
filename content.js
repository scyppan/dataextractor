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

    downloadDataAsJson(JSON.stringify(dataObj), `${playerName.replace(/[\s\W]+/g, '_')}.json`);
}

function downloadDataAsJson(jsonData, fileName) {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function addButton() {
    const playerNameElement = document.querySelector('h2[itemprop="name"]');
    if (!playerNameElement) {
        console.log("Player name element not found.");
        return;
    }

    // Create a span wrapper to align the button with the text
    const span = document.createElement('span');
    span.style.display = 'inline-flex'; // Use inline-flex to keep elements inline
    span.style.alignItems = 'center'; // Align items vertically
    span.style.gap = '10px'; // Gap between text and button

    // Reparent the player name into the new span
    while (playerNameElement.firstChild) {
        span.appendChild(playerNameElement.firstChild);
    }

    // Create button
    const button = document.createElement('button');
    button.innerHTML = '<img src="https://scyppan.com/wp-content/uploads/2024/08/icon.png" alt="Download Data" style="width: 20px; height: 20px;">';
    button.style.display = 'flex'; // Use flex to center contents
    button.style.alignItems = 'center'; // Align items vertically
    button.style.justifyContent = 'center'; // Center items horizontally
    button.style.padding = '5px'; // Add some padding for better visual spacing
    button.style.background = '#c8d0de'; // Set background to baby blue
    button.style.border = '1px solid gray';
    button.style.borderRadius = '7px'; // Set background to baby blue
    button.style.cursor = 'pointer'; // Ensure cursor changes to pointer on hover
    button.style.transition = 'background-color 0.3s ease'; // Smooth transition for the hover effect

    // Add hover effect
    button.onmouseover = function() {
        button.style.backgroundColor = '#51678a'; // Change to a slightly darker blue on hover
    };

    button.onmouseout = function() {
        button.style.backgroundColor = '#c8d0de'; // Revert back to the original color
    };

    button.onclick = extractTableData;

    // Append button to span
    span.appendChild(button);

    // Replace original h2 content with new span
    playerNameElement.appendChild(span);
}



// Run addButton when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
} else {
    addButton();
}
