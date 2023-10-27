# Kabir Ke Dohe Translation

This repository contains a set of scripts that are designed to assist in the translation and manipulation of Kabir Ke Dohe, a collection of Hindi poetry written by the renowned poet Saint Kabir.

## Scripts

### translate.js

This script, `translate.js`, is used for translating Hindi text to Hinglish (a transliteration of Hindi in the Roman script). It reads input from a file located at `txts/hindi-text.txt` and produces the Hinglish translation.

### slug.js

The `slug.js` script takes the Hinglish text from `txts/english-text.txt` and slugifies it. Slugging involves converting text into a URL-friendly format, usually by replacing spaces with hyphens and removing special characters.

### words.js

The `words.js` script processes the `txts/english-text.txt` file and generates a unique array of words used in the English text. This can be helpful for various linguistic analysis and processing tasks.

## Usage

To use these scripts, you need to have [Node.js](https://nodejs.org/) installed on your system. Follow these steps:

1. Navigate to the repository's directory.

   ```bash
   cd kabir-ke-dohe-translation
   ```

2. Install the required dependencies (if any).

   ```bash
   npm install
   ```

3. Execute the desired script using npm. For example:

   - To translate Hindi to Hinglish:

     ```bash
     npm run translate-it
     ```

   - To slugify the Hinglish text:

     ```bash
     npm run slug-it
     ```

   - To create a unique word array:

     ```bash
     npm run word-it
     ```

## NPM Scripts

This repository includes npm scripts for convenient script execution:

- `translate-it`: Translates Hindi to Hinglish.
- `slug-it`: Slugifies the Hinglish text.
- `word-it`: Creates a unique word array from English text.

You can run these scripts with the following commands:

```bash
npm run translate-it
npm run slug-it
npm run word-it
```

## License

This repository is distributed under the MIT License. You can find the full license text in the [LICENSE](LICENSE) file.

## Author

This repository was created and is maintained by [Vijay Hardaha](https://twitter.com/vijayhardaha). If you have any questions or need assistance, feel free to contact the author.
