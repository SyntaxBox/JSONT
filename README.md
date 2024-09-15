# JSONT (JSON Translate)

**JSONT** is a simple web application designed to facilitate translation of JSON files. It allows users to edit and translate JSON files using the Monaco Editor, with support for drag-and-drop functionality and saving shortcuts.

You can access it via <https://jsont.syntaxbox.dev>

## Features

- **Monaco Editor** for editing JSON files
- Translation powered by **google-translate-api-x**
- **Drag-and-Drop** support for easy file import
- **Keyboard shortcut**: `Ctrl + S` to save the translated JSON file
- Language specification required before translating
- Translation is triggered by clicking the **Translate** button

## Getting Started

1. **Edit JSON**: Load or paste your JSON file into the Monaco Editor.
2. **Select Language**: Specify the language you want to translate your JSON content into.
3. **Translate**: Click the **Translate** button to translate the JSON file into the specified language.
4. **Save**: Use `Ctrl + S` to save your translated JSON file.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/syntaxbox/jsont.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the project:

   3.1 Dev Server:

   ```bash
   npm run dev
   ```

   3.2 Production Server:

   ```bash
   npm run build && npm start
   ```

## Contributing

Contributions are welcome! If you’d like to contribute to **jsont**.
