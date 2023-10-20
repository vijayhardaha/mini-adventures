/**
 * Import packages.
 */
import pretty from "pretty";
import { TABLE_TIMES, TABLE_UPTO } from "./lib/const.js";
import { generateHtmlTable, generateTxtTable, generateNumbers } from "./lib/table.js";
import { generateFilePath, isEmpty, makeFile } from "./lib/utils.js";

// An asynchronous self-invoking function to generate and save multiplication tables
(async () => {
    try {
        // Record the start time for performance measurement
        const startTime = performance.now();

        // Generate an array of numbers from 1 to TABLE_UPTO
        const multiplicands = generateNumbers(TABLE_TIMES);

        // Generate an array of numbers from 1 to TABLE_TIMES
        const multipliers = generateNumbers(TABLE_UPTO);

        // Generate multiplication tables as a 2D array
        const tables = multiplicands.map((multiplicand) => multipliers.map((multiplier) => multiplier * multiplicand));

        // Generate file paths for text and HTML tables
        const txtFilePath = await generateFilePath("txt");
        const htmlFilePath = await generateFilePath("html");

        // Generate the HTML-based table representation from the data and write it to a file
        if (!isEmpty(htmlFilePath) && !isEmpty(tables)) {
            makeFile(htmlFilePath, pretty(generateHtmlTable(tables)));
        }

        // Generate the text-based table representation from the data and write it to a file
        if (!isEmpty(txtFilePath) && !isEmpty(tables)) {
            makeFile(txtFilePath, generateTxtTable(tables));
        }

        // Record the end time for performance measurement
        const endTime = performance.now();
        const runTime = endTime - startTime;

        // Log the total runtime to the console
        // eslint-disable-next-line no-console
        console.log(`Runtime: ${runTime}`);
    } catch (e) {
        // Handle and log any errors
        const errorMessage = e.message || e.error || e;
        // eslint-disable-next-line no-console
        console.error(`Error: ${errorMessage}`);
    }
})();
