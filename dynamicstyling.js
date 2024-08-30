function adjustColumnWidths(table) {
    if (!table) return;  // Exit if no table is provided

    const rows = table.rows;
    let max_widths = [];

    // Loop through rows and then columns to find the max width required
    for (let row of rows) {
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells[i];

            // Temporarily set white-space to nowrap to measure max content width
            cell.style.whiteSpace = 'nowrap';

            // Update max_widths array with the maximum width found
            const cellWidth = cell.offsetWidth;
            max_widths[i] = Math.max(max_widths[i] || 0, cellWidth);
        }
    }

    // Apply the max widths to the header cells and all other cells in the column
    for (let i = 0; i < rows[0].cells.length; i++) {
        for (let row of rows) {
            row.cells[i].style.width = `${max_widths[i]}px`;
        }
    }

    // Reset white-space property for all cells if necessary
    for (let row of rows) {
        for (let cell of row.cells) {
            cell.style.whiteSpace = 'normal';
        }
    }
}