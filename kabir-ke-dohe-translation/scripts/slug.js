/**
 * Import packages.
 */
import fs from "fs";
import slugify from "slugify";
import latinize from "latinize";

const outputFilePath = "txts/english-text.txt"; // Path to the input file
const slugsFilePath = "txts/slug-text.txt"; // Path to the output file

/**
 * Slugify a text string using the slugify and latinize libraries.
 *
 * @param {string} text - The input text to be slugified.
 * @returns {string} - The slugified text.
 */
const slugifyText = (text) => {
    // Normalize the text using latinize and slugify it
    const normalizedText = latinize(text.toLowerCase());
    return slugify(normalizedText, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        trim: true,
    });
};

/**
 * Process the output file by slugifying its content and writing it to a new file.
 */
(async () => {
    try {
        // Read the content of the output file
        const fileContents = await fs.promises.readFile(outputFilePath, "utf-8");
        const lines = fileContents.split("\n");

        const slugifiedData = lines.map((line, index) => {
            const slugifiedLine = slugifyText(line);
            return slugifiedLine;
        });

        const slugifiedOutput = slugifiedData.join("\n");

        // Write the slugified data to a new file
        await fs.promises.writeFile(slugsFilePath, slugifiedOutput, "utf-8");

        console.log(`Slugified data has been written to ${slugsFilePath}`);
    } catch (error) {
        console.error("Error:", error);
    }
})();
