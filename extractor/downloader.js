function downloadTableData() {
    const headers = ['nat', 'given', 'sur', 'jersey', 'nick', 'transferval', 'ovr', 'pos1', 'pos2', 'pos3', 'pos4', 'foot', 'weakfoot', 'birthdate', 'height', 'weight', 'attwrkrate', 'defwrkrate', 'skillmoves', 'playerid'];
    const theadString = headers.join('\t');
    const tbody = document.querySelector('#playerDataTable tbody');
    if (!tbody) {
        console.error('Table body not found.');
        return;
    }

    let dataString = theadString + '\n'; // Start with the header
    Array.from(tbody.rows).forEach(row => {
        const rowData = Array.from(row.cells).map(cell => {
            const select = cell.querySelector('select');
            const input = cell.querySelector('input');
            if (select) {
                return select.options[select.selectedIndex].text.trim();
            } else if (input) {
                return input.value.trim();
            }
            return cell.textContent.trim();
        }).join('\t');
        dataString += rowData + '\n';
    });

    const blob = new Blob([dataString], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playerData.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
