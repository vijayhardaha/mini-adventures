/**
 * Import packages.
 */
import { isEmpty } from "./utils.js";

/**
 * Generate an array of numbers from 1 to a given length.
 *
 * @param {Number} length - Length of the array.
 * @returns {Array} - An array of numbers.
 */
export const generateNumbers = (length) => {
    if (isEmpty(length) || typeof length !== "number") {
        throw new Error("Invalid length. Length must be a non-empty number.");
    }

    return Array.from({ length }, (_, i) => i + 1);
};

/**
 * Generates an HTML table from a 2D array of data.
 *
 * @param {Array<Array<any>>} data - The data to be displayed in the table.
 * @returns {string} - An HTML table representing the provided data.
 */
export const generateHtmlTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid data. Data must be a non-empty array of arrays.");
    }

    // Map each row of data to a <tr> element with <td> cells.
    const tableRows = data.map((rowData) => {
        if (!Array.isArray(rowData) || rowData.length === 0) {
            throw new Error("Invalid row data. Each row must be a non-empty array.");
        }
        const cells = rowData
            .map((cellData) => `<td>${cellData}</td>`) // Wrap each data element in <td>
            .join(""); // Join the <td> elements into a single string.
        return `<tr>${cells}</tr>`; // Wrap the row in <tr> tags.
    });

    // eslint-disable-next-line max-len
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Table</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"><style>body{font-family:'Poppins',sans-serif;}</style></head><body><div class="container"><div class="row"><div class="col-12"><table class="table table-bordered text-center mt-5"><tbody>${tableRows.join("")}</tbody></table></div></div></div></body></html>`; // Wrap all rows in html tags
};

/**
 * Generates a text-based table from an array of arrays (currently a placeholder).
 *
 * @param {Array<Array<any>>} data - The data to be displayed in the table.
 * @returns {string} - A text-based table (currently a placeholder 'x').
 */
export const generateTxtTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid data. Data must be a non-empty array of arrays.");
    }

    // Extract the first row as the header and all rows.
    const firstRow = data[0];
    const rows = data;

    // Calculate the maximum width of each column.
    const columnWidths = firstRow.map((_, colIndex) => Math.max(...rows.map((row) => String(row[colIndex]).length)));

    // Function to create a row of the table.
    function createRow(row) {
        return `| ${row
            .map((cell, colIndex) => cell.toString().padEnd(columnWidths[colIndex]))
            .join(" | ")} |`;
    }

    // Create rows of the table.
    const table = rows.map(createRow);

    return table.join("\n"); // Join the rows with newline characters to form the complete table.
};
