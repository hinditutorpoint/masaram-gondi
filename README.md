# Masaram Gondi Transliterator

A powerful jQuery plugin for converting English (ITRANS) and Hindi text to Masaram Gondi script. Features include virtual keyboard, undo/redo, character statistics, and more.

![Masaram Gondi Transliterator](https://img.shields.io/badge/Masaram_Gondi-Transliterator-blue)
![Version](https://img.shields.io/badge/version-4.0.0-green)
![License](https://img.shields.io/badge/license-MIT-yellow)
![jQuery](https://img.shields.io/badge/jQuery-Plugin-blue)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Translation Modes](#translation-modes)
- [Character Map](#character-map)
- [ITRANS Reference](#itrans-reference)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Multi-Mode Translation**: Support for English (ITRANS) ↔ Gondi and Hindi ↔ Gondi bidirectional conversion
- **Virtual Keyboard**: Built-in responsive virtual keyboard with touch support for mobile devices
- **Undo/Redo**: Full history support with undo/redo functionality and keyboard shortcuts
- **Character Stats**: Real-time character count and remaining limit display with visual indicators
- **Save & Share**: Download as text file or share via Web Share API with one click
- **Mobile Friendly**: Fully responsive design with touch-optimized keyboard for mobile devices

## 🎯 Demo

Try the live demo at: [https://hinditutorpoint.github.io/masaram-gondi/](https://hinditutorpoint.github.io/masaram-gondi/)

Or open `index.html` in your browser to see the demo.

## 📦 Installation

### Step 1: Include Dependencies

Add jQuery and Bootstrap Icons to your HTML:

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Bootstrap Icons (for toolbar) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">

<!-- Gondi Font (optional but recommended) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Masaram+Gondi&display=swap" rel="stylesheet">
```

### Step 2: Include Plugin

Add the plugin script to your page:

```html
<!-- Gondi Font (optional but recommended) -->
<script src="https://cdn.jsdelivr.net/gh/hinditutorpoint/masaram-gondi/masaram-gondi-translator.js"></script>
<!-- OR -->
<script src="masaram-gondi-translator.js"></script>
```

### Step 3: Create HTML Elements

Add input and output fields:

```html
<input type="text" id="inputField" placeholder="Type here...">
<textarea id="outputField" readonly></textarea>
```

### Step 4: Initialize Plugin

Initialize with your desired options:

```javascript
$(function() {
    $('#inputField').masaramTranslator({
        target: '#outputField',
        mode: 'en-gonm',
        stat: true,
        maxLength: 500,
        tool: true,
        keyboard: true
    });
});
```

## 🚀 Usage Examples

### Basic Usage

```javascript
// Simple initialization
$('#inputField').masaramTranslator({
    target: '#outputField',
    mode: 'en-gonm'  // English to Gondi
});

// Hindi to Gondi
$('#hindiInput').masaramTranslator({
    target: '#gondiOutput',
    mode: 'hi-gonm'
});
```

### All Features Enabled

```javascript
$('#inputField').masaramTranslator({
    target: '#outputField',
    mode: 'en-gonm',
    
    // Stats bar
    stat: true,
    maxLength: 500,
    
    // Toolbar
    tool: true,
    toolButtons: ['undo', 'redo', 'save', 'share', 'copy', 'clear'],
    
    // Virtual keyboard
    keyboard: true,
    keyboardAutoHide: true,
    keyboardHideDelay: 300,
    
    // Real-time translation
    liveTranslate: true,
    debounceDelay: 100
});
```

### Using Data Attributes (Auto-Init)

```html
<!-- Input field with data attributes -->
<input type="text" 
       data-masaram-translator="input"
       data-masaram-translator-target="#output"
       data-masaram-translator-mode="en-gonm"
       data-masaram-translator-stat="true"
       data-masaram-translator-maxlength="300"
       data-masaram-translator-tool="true"
       data-masaram-translator-keyboard="true"
       placeholder="Type here...">

<!-- Output field -->
<textarea id="output" readonly></textarea>

<!-- Plugin auto-initializes on page load! -->
```

> **Tip:** When using data attributes, the plugin automatically initializes on document ready!

### Multiple Instances

```javascript
// English to Gondi translator
$('#enInput').masaramTranslator({
    target: '#enOutput',
    mode: 'en-gonm',
    stat: true,
    keyboard: true
});

// Hindi to Gondi translator
$('#hiInput').masaramTranslator({
    target: '#hiOutput',
    mode: 'hi-gonm',
    stat: true,
    keyboard: true
});

// Gondi to English translator
$('#gonmInput').masaramTranslator({
    target: '#gonmOutput',
    mode: 'gonm-en',
    stat: true,
    keyboard: true
});
```

### With Callbacks

```javascript
$('#inputField').masaramTranslator({
    target: '#outputField',
    mode: 'en-gonm',
    stat: true,
    tool: true,
    keyboard: true,
    
    // Callback after initialization
    onInit: function($source, $target) {
        console.log('Translator initialized!');
    },
    
    // Callback after each translation
    onTranslate: function(input, output, mode) {
        console.log('Translated:', input, '→', output);
        // Update character count elsewhere
        $('#charCount').text(output.length);
    },
    
    // Callback on save
    onSave: function(text) {
        console.log('Saved:', text);
    },
    
    // Callback on share
    onShare: function(text) {
        console.log('Shared:', text);
    },
    
    // Callback on virtual key press
    onKeyPress: function(key) {
        console.log('Key pressed:', key);
    },
    
    // Callback on error
    onError: function(message) {
        alert('Error: ' + message);
    }
});

// Listen to custom event
$('#inputField').on('masaram:translated', function(e, input, output, mode) {
    console.log('Translation event fired!');
});
```

## 📚 API Reference

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `source` | String | `null` | Source input selector (ID, class, or name) |
| `target` | String | `null` | Target output selector (required) |
| `mode` | String | `'en-gonm'` | Translation mode: `en-gonm`, `hi-gonm`, `gonm-en`, `gonm-hi` |
| `liveTranslate` | Boolean | `true` | Enable real-time transliteration on input |
| `debounceDelay` | Number | `100` | Debounce delay in milliseconds |
| `stat` | Boolean | `false` | Show character count stats bar |
| `maxLength` | Number | `500` | Maximum input character limit |
| `tool` | Boolean | `false` | Show toolbar with action buttons |
| `toolButtons` | Array | `['undo','redo','save','share']` | Toolbar buttons to show |
| `keyboard` | Boolean | `false` | Show virtual keyboard |
| `keyboardAutoHide` | Boolean | `true` | Auto-hide keyboard on blur |
| `keyboardHideDelay` | Number | `300` | Keyboard hide delay in milliseconds |
| `onInit` | Function | `null` | Callback after initialization |
| `onTranslate` | Function | `null` | Callback after each translation |
| `onSave` | Function | `null` | Callback after save/download |
| `onShare` | Function | `null` | Callback after share |
| `onKeyPress` | Function | `null` | Callback on virtual key press |
| `onError` | Function | `null` | Callback on error |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setMode` | `mode` (String) | this | Change translation mode |
| `getMode` | - | String | Get current mode |
| `setInput` | `text` (String) | this | Set input text and translate |
| `getOutput` | - | String | Get translated output |
| `translate` | `text` (optional) | String | Perform translation |
| `undo` | - | this | Undo last change |
| `redo` | - | this | Redo last undone change |
| `clear` | - | this | Clear input and output |
| `save` | - | this | Download output as text file |
| `share` | - | this | Share via Web Share API |
| `copyOutput` | - | this | Copy output to clipboard |
| `showKeyboard` | - | - | Show virtual keyboard |
| `hideKeyboard` | - | - | Hide virtual keyboard |
| `toggleKeyboard` | - | - | Toggle keyboard visibility |
| `destroy` | - | - | Remove plugin instance |

### Static Methods

```javascript
// Direct translation (static method - no DOM)
const result = $.masaramTranslator.translate('namaste', 'en-gonm');
console.log(result); // 𑴟𑴤𑴫𑵄𑴛𑴺
```

## 🔄 Translation Modes

| Mode | Description | Example |
|------|-------------|---------|
| `en-gonm` | English → Gondi | `namaste` → `𑴟𑴤𑴫𑵄𑴛𑴺` |
| `hi-gonm` | हिंदी → Gondi | `नमस्ते` → `𑴟𑴤𑴫𑵄𑴛𑴺` |
| `gonm-en` | Gondi → English | `𑴟𑴤𑴫𑵄𑴛𑴺` → `namaste` |
| `gonm-hi` | Gondi → हिंदी | `𑴟𑴤𑴫𑵄𑴛𑴺` → `नमस्ते` |

## 🔤 Character Map

Masaram Gondi Unicode characters (U+11D00–U+11D5F)

### Vowels

| Latin | Gondi | Description |
|-------|-------|-------------|
| `a` | 𑴀 | Short a |
| `aa` / `A` / `ā` | 𑴁 | Long aa |
| `i` | 𑴂 | Short i |
| `ii` / `I` / `ee` / `ī` | 𑴃 | Long ii |
| `u` | 𑴄 | Short u |
| `uu` / `U` / `oo` / `ū` | 𑴅 | Long uu |
| `e` | 𑴆 | e |
| `ai` | 𑴈 | ai |
| `o` | 𑴉 | o |
| `au` | 𑴋 | au |

### Consonants

| Latin | Gondi | Latin | Gondi |
|-------|-------|-------|-------|
| `k` | 𑴌 | `kh` | 𑴍 |
| `g` | 𑴎 | `gh` | 𑴏 |
| `ng` | 𑴐 | `ch` | 𑴑 |
| `chh` | 𑴒 | `j` | 𑴓 |
| `jh` | 𑴔 | `ny` | 𑴕 |
| `T` | 𑴖 | `Th` | 𑴗 |
| `D` | 𑴘 | `Dh` | 𑴙 |
| `N` | 𑴚 | `t` | 𑴛 |
| `th` | 𑴜 | `d` | 𑴝 |
| `dh` | 𑴞 | `n` | 𑴟 |
| `p` | 𑴠 | `ph` | 𑴡 |
| `b` | 𑴢 | `bh` | 𑴣 |
| `m` | 𑴤 | `y` | 𑴥 |
| `r` | 𑴦 | `l` | 𑴧 |
| `v` / `w` | 𑴨 | `sh` | 𑴩 |
| `Sh` | 𑴪 | `s` | 𑴫 |
| `h` | 𑴬 | `L` | 𑴭 |

### Matras (Vowel Signs)

| Latin | Gondi | Latin | Gondi |
|-------|-------|-------|-------|
| `aa` | 𑴱 | `i` | 𑴲 |
| `ii` | 𑴳 | `u` | 𑴴 |
| `uu` | 𑴵 | `ri` | 𑴶 |
| `e` | 𑴺 | `ai` | 𑴼 |
| `o` | 𑴽 | `au` | 𑴿 |

### Numbers

| Arabic | Gondi |
|--------|-------|
| 0 | 𑵐 |
| 1 | 𑵑 |
| 2 | 𑵒 |
| 3 | 𑵓 |
| 4 | 𑵔 |
| 5 | 𑵕 |
| 6 | 𑵖 |
| 7 | 𑵗 |
| 8 | 𑵘 |
| 9 | 𑵙 |

### Special Characters

| Latin | Gondi | Description |
|-------|-------|-------------|
| `x` | 𑴮 | Ksha |
| `X` | 𑴯 | Gya |
| `Z` | 𑴰 | Tra |
| `M` | 𑵀 | Anusvara |
| `H` | 𑵁 | Visarga |
| `MM` | 𑵃 | Chandrabindu |
| `..` | । | Danda |
| `...` | ॥ | Double Danda |
| `..` | 𑵄 | Halanta |
| `..` | 𑵅 | Virama |
| `..` | 𑵆 | Repha |
| `..` | 𑵇 | Rakar |

## 📝 ITRANS Reference

### Vowels

| ITRANS | Gondi | Description |
|--------|-------|-------------|
| `a` | 𑴀 | Short a |
| `aa` / `A` | 𑴁 | Long aa |
| `i` | 𑴂 | Short i |
| `ii` / `I` / `ee` | 𑴃 | Long ii |
| `u` | 𑴄 | Short u |
| `uu` / `U` / `oo` | 𑴅 | Long uu |
| `e` | 𑴆 | e |
| `ai` | 𑴈 | ai |
| `o` | 𑴉 | o |
| `au` | 𑴋 | au |

### Special Keys

| ITRANS | Gondi | Description |
|--------|-------|-------------|
| `M` | 𑵀 | Anusvara (after vowel) |
| `H` | 𑵁 | Visarga (after vowel) |
| `MM` | 𑵃 | Chandrabindu |
| `..` | । | Danda |
| `...` | ॥ | Double Danda |
| `x` | 𑴮 | Ksha |
| `X` | 𑴯 | Gya |
| `Z` | 𑴰 | Tra |

> **Tip:** Use CAPITAL letters for aspirated consonants (kh=K, gh=G, etc.) and retroflex consonants (T, Th, D, Dh, N).

## 🤝 Support

If you find this project useful, please consider giving it a ⭐ on GitHub. It helps others discover this project and motivates us to keep improving!

### GitHub

[![GitHub stars](https://img.shields.io/github/stars/hinditutorpoint/masaram-gondi?style=social)](https://github.com/hinditutorpoint/masaram-gondi)

- **Star on GitHub**: [https://github.com/hinditutorpoint/masaram-gondi](https://github.com/hinditutorpoint/masaram-gondi)
- **Fork**: [https://github.com/hinditutorpoint/masaram-gondi/fork](https://github.com/hinditutorpoint/masaram-gondi/fork)
- **Report Issue**: [https://github.com/hinditutorpoint/masaram-gondi/issues](https://github.com/hinditutorpoint/masaram-gondi/issues)

### Buy Me a Coffee

Love this project? Your support helps cover hosting, development time, and keeps the coffee flowing!

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg)](https://buymeacoffee.com/hinditutorpoint)

### Other Ways to Support

- **Share**: Spread the word! Share this project on social media and with your friends
- **Contribute**: Found a bug or have a feature idea? Contributions are always welcome!
- **Feedback**: Your feedback helps us improve. Let us know what you think!

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Author**: Rajesh Kumar Dhuriya
- **Based on**: Keyman keyboard by Rajesh Kumar Dhuriya
- **Font**: Noto Sans Masaram Gondi by Google Fonts
- **Unicode Range**: U+11D00–U+11D5F

## 🌐 Links

- [Wikipedia - Masaram Gondi](https://en.wikipedia.org/wiki/Masaram_Gondi)
- [Unicode Chart](https://unicode.org/charts/PDF/U11D00.pdf)
- [Learn Masaram Gondi](https://gondidarshan.org)

---

**Made with ❤️ by [Rajesh Kumar Dhuriya](https://github.com/hinditutorpoint)**

© 2024-25 Masaram Gondi Transliterator. MIT License.
