function setupForPlayer(){
    console.clear();
    alert("settingup for player");


    (function() {
        function addButton() {
            const playerNameElement = document.querySelector('h2[itemprop="name"]');
            if (!playerNameElement) {
                console.log("Player name element not found.");
                return;
            }

            const span = document.createElement('span');
            span.style.display = 'inline-flex';
            span.style.alignItems = 'center';
            span.style.gap = '10px';

            while (playerNameElement.firstChild) {
                span.appendChild(playerNameElement.firstChild);
            }

            const button = document.createElement('button');
            button.innerHTML = '<img src="https://scyppan.com/wp-content/uploads/2024/08/icon.png" alt="Download Data" style="width: 20px; height: 20px;">';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.padding = '5px';
            button.style.background = '#c8d0de';
            button.style.border = '1px solid gray';
            button.style.borderRadius = '7px';
            button.style.cursor = 'pointer';
            button.style.transition = 'background-color 0.3s ease';

            button.onmouseover = function() {
                button.style.backgroundColor = '#51678a';
            };
            button.onmouseout = function() {
                button.style.backgroundColor = '#c8d0de';
            };

            button.onclick = extractTableData;
            span.appendChild(button);
            playerNameElement.appendChild(span);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addButton);
        } else {
            addButton();
        }
    })();

}