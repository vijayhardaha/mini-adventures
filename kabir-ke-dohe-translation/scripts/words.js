/**
 * Import packages.
 */
import fs from "fs";

const outputFilePath = "txts/english-text.txt"; // Path to the input file
const wordsFilePath = "txts/words-text.txt"; // Path to the output file

/**
 * Process the output file by slugifying its content and writing it to a new file.
 */
(async () => {
    try {
        // Read the content of the output file
        const fileContents = await fs.promises.readFile(outputFilePath, "utf-8");
        // Split the content into lines
        const lines = fileContents.split("\n");

        // Extract words from lines and filter out non-alphanumeric characters
        const words = lines.flatMap((line) => {
            // Split the line into words (split by spaces)
            const wordsList = line.split(/\s+/);

            // Filter out commands and special characters using a regular expression
            return wordsList.filter((word) => !/[^a-zA-Z0-9\s]/.test(word));
        });

        // Convert the words to lowercase
        const lowerCaseWords = words.map((word) => word.toLowerCase());

        // Sort the lowercase words and remove duplicates
        const sortedUniqueWords = [...new Set(lowerCaseWords)].sort();

        // Join the processed words into a string with each word on a new line
        const wordsOutput = sortedUniqueWords.join("\n");

        // Write the processed data to a new file
        await fs.promises.writeFile(wordsFilePath, wordsOutput, "utf-8");

        console.log(`Words data has been written to ${wordsFilePath}`);
    } catch (error) {
        console.error("Error:", error);
    }
})();
