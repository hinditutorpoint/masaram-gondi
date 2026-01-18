# Masaram Gondi Direct Typing Plugin

A professional jQuery plugin for typing in Masaram Gondi script with ITRANS/Hindi input, virtual keyboard, smart suggestions, and complete Unicode support (U+11D00–U+11D5F).

![Masaram Gondi Direct Typing](https://img.shields.io/badge/Masaram_Gondi-Direct_Typing-blue)
![Version](https://img.shields.io/badge/version-5.7.0-green)
![License](https://img.shields.io/badge/license-MIT-yellow)
![jQuery](https://img.shields.io/badge/jQuery-3.0%2B-blue)
![Unicode](https://img.shields.io/badge/Unicode-U%2B11D00--U%2B11D5F-purple)

## 📋 Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Keyboard Layouts](#keyboard-layouts)
- [ITRANS Input Reference](#itrans-input-reference)
- [Masaram Gondi Characters](#masaram-gondi-characters)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Dual Input Modes**: Type in English (ITRANS) or Hindi (Devanagari) and get instant Gondi output with intelligent transliteration
- **3D Virtual Keyboard**: Realistic QWERTY-style keyboard with 3D effects, fully responsive for mobile, tablet, and desktop
- **Smart Suggestions**: Get word suggestions as you type with support for custom dictionary and RESTful API integration
- **Translation Panel**: View input, Gondi, and Hindi translations side by side in a beautiful, interactive panel
- **State Persistence**: All settings automatically saved to localStorage - mode, keyboard, suggestions state preserved
- **Fully Responsive**: Works perfectly on all devices with touch-optimized UI, bottom sheets, and adaptive layouts
- **Context Menu**: Right-click or long-press for quick access to copy, paste, mode switch, keyboard toggle, and more
- **Edit Mode Support**: Load existing Gondi text from database and continue editing seamlessly with preserved content
- **Dark Mode Ready**: Automatic dark mode support based on system preferences with beautiful color schemes
- **Accessibility First**: Full keyboard navigation, focus indicators, reduced motion support, and screen reader friendly
- **Zero Configuration**: Just add `data-masaram-gondi` attribute to any input/textarea and you're ready to go!
- **100% Unicode**: Uses official Masaram Gondi Unicode block (U+11D00–U+11D5F) - future-proof and standard

## 🎯 Live Demo

Try the live demo at: [https://hinditutorpoint.github.io/masaram-gondi/](https://hinditutorpoint.github.io/masaram-gondi/)

Or open `index.html` in your browser to see the interactive demo with multiple input modes, virtual keyboard, and smart suggestions.

## 📦 Installation

### Prerequisites

- jQuery 3.0+
- A font that supports Masaram Gondi Unicode (U+11D00–U+11D5F) - [Noto Sans Masaram Gondi](https://fonts.google.com/noto/specimen/Noto+Sans+Masaram+Gondi)

### Step 1: Include Dependencies

```html
<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Gondi Font (Google Fonts) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Masaram+Gondi&display=swap" rel="stylesheet">
```

### Step 2: Include Plugin Files

```html
<!-- Plugin CSS -->
<link rel="stylesheet" href="css/masaram.css">

<!-- Plugin JavaScript (Core Engine) -->
<script src="js/masaram-gondi-core.js"></script>

<!-- Plugin JavaScript (UI Components) -->
<script src="js/masaram-gondi-plugin.js"></script>
```

### Step 3: Add to Your HTML

```html
<input type="text" data-masaram-gondi data-keyboard="true" placeholder="Type here...">
```

**That's it!** The plugin will auto-initialize on page load. No JavaScript needed!

## 🚀 Usage Examples

### HTML Attributes (Zero Configuration)

```html
<!-- Basic Input with Virtual Keyboard -->
<input type="text" data-masaram-gondi data-keyboard="true" placeholder="Type here...">

<!-- English (ITRANS) Input with Smart Suggestions -->
<input type="text" data-masaram-gondi data-mode="en" data-keyboard="true" data-suggestions="true" placeholder="Try: namaste, gondi, dhanyavaad">

<!-- Hindi (Devanagari) Input Mode -->
<input type="text" data-masaram-gondi data-mode="hi" data-keyboard="true" data-keyboard-layout="hindi" placeholder="नमस्ते, गोंडी, धन्यवाद">

<!-- Virtual Keyboard with Auto-Show -->
<input type="text" data-masaram-gondi data-keyboard="true" data-keyboard-auto-show="true" placeholder="Click here to show keyboard">

<!-- Textarea with All Features -->
<textarea data-masaram-gondi data-keyboard="true" data-suggestions="true" rows="5" placeholder="Type your story in Gondi..."></textarea>

<!-- With Translation Panel -->
<input type="text" data-masaram-gondi data-translate="true" data-keyboard="true" placeholder="Type to see translations">
```

### JavaScript Initialization

```javascript
// Basic initialization
$('#myInput').masaramGondi();

// With options
$('#myInput').masaramGondi({
    mode: 'en',              // 'en' or 'hi'
    keyboard: true,          // Enable virtual keyboard
    keyboardLayout: 'itrans', // 'itrans', 'hindi', or 'gondi'
    suggestions: true,       // Enable word suggestions
    translate: true,         // Enable translation panel
    persistKey: 'my-unique-input', // localStorage key for state persistence
    
    // Callbacks
    onInput: function(char, buffer, gondi) {
        console.log('Typed:', char);
    },
    onChange: function(buffer, gondi) {
        console.log('Gondi:', gondi);
    }
});
```

### Custom Suggestions

```javascript
$('#myInput').masaramGondi({
    suggestions: true,
    suggestionsData: {
        'gondi': 'गोंडी',
        'bhasha': 'भाषा',
        'lipi': 'लिपि',
        'aakhar': 'अक्षर'
    }
});
```

### API Suggestions (RESTful)

```javascript
$('#myInput').masaramGondi({
    suggestionsApi: '/api/suggestions',
    suggestionsApiMethod: 'GET',
    suggestionsApiParam: 'q',
    suggestionsApiDebounce: 300,
    suggestionsApiTransform: function(response) {
        return response.data.map(item => ({
            roman: item.word,
            hindi: item.devanagari,
            gondi: item.gondi
        }));
    }
});
```

## 📚 API Reference

### Instance Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `getValue()` | - | Get Roman buffer (input text) |
| `getGondiValue()` | - | Get Gondi output text |
| `setValue(text)` | text | Set Roman buffer value |
| `setGondiValue(text)` | text | Set Gondi value directly (for edit) |
| `clear()` | - | Clear all content |
| `setMode(mode)` | 'en' or 'hi' | Switch mode |
| `getMode()` | - | Get current mode |
| `showKeyboard()` | - | Show virtual keyboard |
| `hideKeyboard()` | - | Hide virtual keyboard |
| `toggleKeyboard()` | - | Toggle keyboard visibility |
| `enableKeyboard()` | - | Enable keyboard |
| `disableKeyboard()` | - | Disable keyboard |
| `enableSuggestions()` | - | Enable suggestions |
| `disableSuggestions()` | - | Disable suggestions |
| `addSuggestion(r, h)` | roman, hindi | Add custom suggestion |
| `destroy()` | - | Destroy plugin instance |

### Static Methods

```javascript
// English to Gondi
var gondi = $.masaramGondi.transliterate('namaste', 'en');

// Hindi to Gondi (shorthand)
var gondi = $.masaramGondi.t('नमस्ते', 'hi');

// Global function (shorthand)
var gondi = transliterate('gondi');
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mode` | String | 'en' | Input mode: 'en' (ITRANS) or 'hi' (Hindi) |
| `keyboard` | Boolean | false | Enable virtual keyboard |
| `keyboardLayout` | String | 'itrans' | Keyboard layout: 'itrans', 'hindi', 'gondi' |
| `keyboardAutoShow` | Boolean | true | Auto-show keyboard on focus |
| `keyboardAutoHide` | Boolean | true | Auto-hide keyboard on blur |
| `suggestions` | Boolean | true | Enable word suggestions |
| `suggestionsApi` | String | null | API endpoint for suggestions |
| `translate` | Boolean | false | Enable translation panel |
| `popup` | Boolean | true | Enable context menu |
| `persistState` | Boolean | true | Save settings to localStorage |
| `persistKey` | String | 'default' | localStorage key name |

## ⌨️ Keyboard Layouts

### ITRANS Layout
- Standard English QWERTY layout with ITRANS transliteration scheme
- Shift key for capitals
- Perfect for English users
- Phonetic input scheme

### Hindi Layout (हिंदी)
- Devanagari script layout for Hindi-speaking users
- Hindi consonants & vowels
- Matra row for modifiers
- Direct Hindi to Gondi
- Special conjuncts (क्ष, त्र)

### Gondi Layout (𑴦𑴺𑴎𑴲)
- Native Masaram Gondi script layout for direct input
- Direct Gondi characters
- Vowels & marks rows
- Unicode U+11D00–11D5F
- Visual reference layout

## � ITRANS Input Reference

### Vowels

| Category | Input Examples | Output Examples |
|----------|----------------|-----------------|
| **Vowels** | `a aa i ii u uu e ai o au` | 𑴀 𑴁 𑴂 𑴃 𑴄 𑴅 𑴆 𑴈 𑴉 𑴋 |

### Consonants

| Category | Input Examples | Output Examples |
|----------|----------------|-----------------|
| **Velars** | `k kh g gh ng` | 𑴌 𑴍 𑴎 𑴏 𑴐 |
| **Palatals** | `ch chh j jh ny` | 𑴑 𑴒 𑴓 𑴔 𑴕 |
| **Retroflexes** | `T Th D Dh N` | 𑴖 𑴗 𑴘 𑴙 𑴚 |
| **Dentals** | `t th d dh n` | 𑴛 𑴜 𑴝 𑴞 𑴟 |
| **Labials** | `p ph b bh m` | 𑴠 𑴡 𑴢 𑴣 𑴤 |
| **Semivowels** | `y r l v` | 𑴥 𑴦 𑴧 𑴨 |
| **Sibilants** | `sh Sh s h` | 𑴩 𑴪 𑴫 𑴬 |
| **Special** | `M (ं) H (ः) .N (ँ)` | 𑵀 𑵁 𑵃 |
| **Numbers** | `0 1 2 3 4 5 6 7 8 9` | 𑵐 𑵑 𑵒 𑵓 𑵔 𑵕 𑵖 𑵗 𑵘 𑵙 |

## � Masaram Gondi Characters

Masaram Gondi Unicode characters (U+11D00–U+11D5F)

### Independent Vowels (11 characters)

| Character | Unicode | Name | ITRANS |
|-----------|---------|------|--------|
| 𑴀 | U+11D00 | LETTER A | `a` |
| 𑴁 | U+11D01 | LETTER AA | `aa, A` |
| 𑴂 | U+11D02 | LETTER I | `i` |
| 𑴃 | U+11D03 | LETTER II | `ii, I` |
| 𑴄 | U+11D04 | LETTER U | `u` |
| 𑴅 | U+11D05 | LETTER UU | `uu, U` |
| 𑴆 | U+11D06 | LETTER E | `e` |
| 𑴇 | U+11D07 | LETTER VOCALIC R | `Ri, RRi` |
| 𑴈 | U+11D08 | LETTER AI | `ai` |
| 𑴉 | U+11D09 | LETTER O | `o` |
| 𑴋 | U+11D0B | LETTER AU | `au` |

### Consonants (36 characters)

| Character | Unicode | Name | ITRANS |
|-----------|---------|------|--------|
| 𑴌 | U+11D0C | LETTER KA | `k` |
| 𑴍 | U+11D0D | LETTER KHA | `kh` |
| 𑴎 | U+11D0E | LETTER GA | `g` |
| 𑴏 | U+11D0F | LETTER GHA | `gh` |
| 𑴐 | U+11D10 | LETTER NGA | `ng` |
| 𑴑 | U+11D11 | LETTER CA | `ch, c` |
| 𑴒 | U+11D12 | LETTER CHA | `chh` |
| 𑴓 | U+11D13 | LETTER JA | `j` |
| 𑴔 | U+11D14 | LETTER JHA | `jh` |
| 𑴕 | U+11D15 | LETTER NYA | `ny` |
| 𑴖 | U+11D16 | LETTER TTA | `T` |
| 𑴗 | U+11D17 | LETTER TTHA | `Th` |
| 𑴘 | U+11D18 | LETTER DDA | `D` |
| 𑴙 | U+11D19 | LETTER DDHA | `Dh` |
| 𑴚 | U+11D1A | LETTER NNA | `N` |
| 𑴛 | U+11D1B | LETTER TA | `t` |
| 𑴜 | U+11D1C | LETTER THA | `th` |
| 𑴝 | U+11D1D | LETTER DA | `d` |
| 𑴞 | U+11D1E | LETTER DHA | `dh` |
| 𑴟 | U+11D1F | LETTER NA | `n` |
| 𑴠 | U+11D20 | LETTER PA | `p` |
| 𑴡 | U+11D21 | LETTER PHA | `ph` |
| 𑴢 | U+11D22 | LETTER BA | `b` |
| 𑴣 | U+11D23 | LETTER BHA | `bh` |
| 𑴤 | U+11D24 | LETTER MA | `m` |
| 𑴥 | U+11D25 | LETTER YA | `y` |
| 𑴦 | U+11D26 | LETTER RA | `r` |
| 𑴧 | U+11D27 | LETTER LA | `l` |
| 𑴨 | U+11D28 | LETTER VA | `v` |
| 𑴩 | U+11D29 | LETTER SHA | `sh` |
| 𑴪 | U+11D2A | LETTER SSA | `Sh, S` |
| 𑴫 | U+11D2B | LETTER SA | `s` |
| 𑴬 | U+11D2C | LETTER HA | `h` |
| 𑴭 | U+11D2D | LETTER LLA | `L` |

### Diacritical Marks

| Character | Unicode | Name |
|-----------|---------|------|
| 𑵀 | U+11D40 | ANUSVARA |
| 𑵁 | U+11D41 | VISARGA |
| 𑵂 | U+11D42 | NUKTA |
| 𑵃 | U+11D43 | CHANDRABINDU |
| 𑵄 | U+11D44 | HALANTA |
| 𑵅 | U+11D45 | VIRAMA |
| 𑵆 | U+11D46 | REPHA |
| 𑵇 | U+11D47 | RAKAR |

### Numbers (0-9)

| Character | Unicode | Name |
|-----------|---------|------|
| 𑵐 | U+11D50 | DIGIT ZERO |
| 𑵑 | U+11D51 | DIGIT ONE |
| 𑵒 | U+11D52 | DIGIT TWO |
| 𑵓 | U+11D53 | DIGIT THREE |
| 𑵔 | U+11D54 | DIGIT FOUR |
| 𑵕 | U+11D55 | DIGIT FIVE |
| 𑵖 | U+11D56 | DIGIT SIX |
| 𑵗 | U+11D57 | DIGIT SEVEN |
| 𑵘 | U+11D58 | DIGIT EIGHT |
| 𑵙 | U+11D59 | DIGIT NINE |

## 🤝 Support

If you find this project useful, please consider giving it a ⭐ on GitHub. It helps others discover this project and motivates us to keep improving!

### GitHub

[![GitHub stars](https://img.shields.io/github/stars/hinditutorpoint/masaram-gondi?style=social)](https://github.com/hinditutorpoint/masaram-gondi)

- **Star on GitHub**: [https://github.com/hinditutorpoint/masaram-gondi](https://github.com/hinditutorpoint/masaram-gondi)
- **Fork**: [https://github.com/hinditutorpoint/masaram-gondi/fork](https://github.com/hinditutorpoint/masaram-gondi/fork)
- **Report Issue**: [https://github.com/hinditutorpoint/masaram-gondi/issues](https://github.com/hinditutorpoint/masaram-gondi/issues)

### Donate

Help preserve the Gondi language and empower millions of indigenous speakers!

#### Buy Me a Coffee
[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg)](https://buymeacoffee.com/hinditutorpoint)

#### PayPal
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.me/hinditutorpoint)

#### GitHub Sponsors
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-purple.svg)](https://github.com/sponsors/hinditutorpoint)

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

### Development Setup

```bash
# Clone the repository
git clone https://github.com/hinditutorpoint/masaram-gondi.git
cd masaram-gondi

# Open index.html in your browser to see the demo
# No build process required - just edit and refresh!
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Author**: Rajesh Kumar Dhuriya
- **Font**: Noto Sans Masaram Gondi by Google Fonts
- **Unicode Range**: U+11D00–U+11D5F

## 🌐 Resources

- [Wikipedia - Masaram Gondi](https://en.wikipedia.org/wiki/Masaram_Gondi)
- [Unicode Chart (PDF)](https://unicode.org/charts/PDF/U11D00.pdf)
- [Noto Sans Masaram Gondi Font](https://fonts.google.com/noto/specimen/Noto+Sans+Masaram+Gondi)
- [Documentation Wiki](https://github.com/hinditutorpoint/masaram-gondi/wiki)
- [Gondi Language (Wikipedia)](https://en.wikipedia.org/wiki/Gondi_language)
- [Masaram Script (Wikipedia)](https://en.wikipedia.org/wiki/Masaram_script)

---

**Made with ❤️ for the Gondi Community by [Rajesh Kumar Dhuriya](https://github.com/hinditutorpoint)**

© 2024-26 Masaram Gondi Direct Typing Plugin. MIT License.
