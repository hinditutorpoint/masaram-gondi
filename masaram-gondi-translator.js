/**
 * Masaram Gondi Transliterator jQuery Plugin - Enhanced
 * Based on Keyman keyboard by Rajesh Kumar Dhuriya
 * Converts between ITRANS/Roman/Hindi and Masaram Gondi script (U+11D00–U+11D5F)
 * 
 * @author Rajesh Kumar Dhuriya
 * @version 4.0.0
 * @license MIT
 */

(function ($) {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CSS STYLES (Injected once)
    // ═══════════════════════════════════════════════════════════════════════════

    const CSS_INJECTED_KEY = 'masaram-css-injected';

    function injectStyles() {
        if ($(document).data(CSS_INJECTED_KEY)) return;

        const styles = `
            /* Masaram Translator Wrapper */
            .masaram-wrapper {
                position: relative;
                width: 100%;
            }

            /* Toolbar Styles */
            .masaram-toolbar {
                position: absolute;
                top: -32px;
                right: 0;
                display: flex;
                gap: 4px;
                z-index: 100;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease, visibility 0.2s ease;
            }

            .masaram-wrapper:focus-within .masaram-toolbar,
            .masaram-wrapper:hover .masaram-toolbar {
                opacity: 1;
                visibility: visible;
            }

            .masaram-toolbar .btn {
                padding: 4px 8px;
                font-size: 12px;
                line-height: 1;
                border-radius: 4px;
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                color: #495057;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .masaram-toolbar .btn:hover {
                background: #e9ecef;
                border-color: #adb5bd;
            }

            .masaram-toolbar .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .masaram-toolbar .btn i {
                font-size: 14px;
            }

            /* Stats Bar Styles */
            .masaram-stats {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 12px;
                padding: 4px 8px;
                font-size: 12px;
                color: #6c757d;
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-top: none;
                border-radius: 0 0 4px 4px;
            }

            .masaram-stats .stat-item {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .masaram-stats .stat-value {
                font-weight: 600;
                color: #495057;
            }

            .masaram-stats .stat-warning {
                color: #fd7e14;
            }

            .masaram-stats .stat-danger {
                color: #dc3545;
            }

            .masaram-stats .stat-success {
                color: #198754;
            }

            /* Virtual Keyboard Styles */
            .masaram-keyboard {
                display: none;
                width: 100%;
                padding: 8px;
                background: linear-gradient(145deg, #f0f0f0, #e6e6e6);
                border: 1px solid #ccc;
                border-radius: 8px;
                margin-top: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
            }

            .masaram-keyboard.active {
                display: block;
                animation: slideDown 0.2s ease;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .masaram-keyboard-row {
                display: flex;
                justify-content: center;
                gap: 4px;
                margin-bottom: 4px;
            }

            .masaram-keyboard-row:last-child {
                margin-bottom: 0;
            }

            .masaram-key {
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 36px;
                height: 40px;
                padding: 4px 8px;
                font-size: 16px;
                font-family: 'Noto Sans Masaram Gondi', 'Arial Unicode MS', sans-serif;
                background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
                border: 1px solid #bbb;
                border-radius: 6px;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
                transition: all 0.1s ease;
                flex: 1;
                max-width: 50px;
            }

            .masaram-key:hover {
                background: linear-gradient(180deg, #f5f5f5 0%, #eee 100%);
                border-color: #999;
            }

            .masaram-key:active,
            .masaram-key.active {
                background: linear-gradient(180deg, #e0e0e0 0%, #d5d5d5 100%);
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
                transform: translateY(1px);
            }

            .masaram-key.special {
                background: linear-gradient(180deg, #5a6268 0%, #495057 100%);
                color: #fff;
                border-color: #454d55;
                min-width: 60px;
                font-size: 12px;
            }

            .masaram-key.special:hover {
                background: linear-gradient(180deg, #6c757d 0%, #5a6268 100%);
            }

            .masaram-key.space {
                flex: 4;
                max-width: 200px;
            }

            .masaram-key.backspace,
            .masaram-key.enter {
                flex: 1.5;
                max-width: 80px;
            }

            .masaram-key-label {
                font-size: 10px;
                color: #888;
                position: absolute;
                top: 2px;
                left: 4px;
            }

            .masaram-keyboard-section {
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid #ddd;
            }

            .masaram-keyboard-section:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }

            .masaram-keyboard-section-title {
                font-size: 11px;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 6px;
                padding-left: 4px;
            }

            /* Keyboard Tabs */
            .masaram-keyboard-tabs {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 2px solid #ddd;
            }

            .masaram-keyboard-tab {
                padding: 6px 12px;
                font-size: 12px;
                background: #e9ecef;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .masaram-keyboard-tab:hover {
                background: #dee2e6;
            }

            .masaram-keyboard-tab.active {
                background: #0d6efd;
                color: #fff;
                border-color: #0d6efd;
            }

            /* Responsive Keyboard */
            @media (max-width: 576px) {
                .masaram-key {
                    min-width: 28px;
                    height: 36px;
                    font-size: 14px;
                    padding: 2px 4px;
                }

                .masaram-key.special {
                    font-size: 10px;
                    min-width: 45px;
                }

                .masaram-keyboard {
                    padding: 6px;
                }

                .masaram-keyboard-row {
                    gap: 2px;
                }

                .masaram-toolbar {
                    top: -28px;
                }

                .masaram-toolbar .btn {
                    padding: 3px 6px;
                }
            }

            @media (max-width: 400px) {
                .masaram-key {
                    min-width: 24px;
                    height: 32px;
                    font-size: 12px;
                }
            }

            /* Toast Notification */
            .masaram-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 12px 24px;
                background: #333;
                color: #fff;
                border-radius: 8px;
                font-size: 14px;
                z-index: 10000;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }

            .masaram-toast.show {
                opacity: 1;
                transform: translateY(0);
            }

            .masaram-toast.success {
                background: #198754;
            }

            .masaram-toast.error {
                background: #dc3545;
            }

            /* Mode Indicator */
            .masaram-mode-indicator {
                position: absolute;
                top: 4px;
                left: 8px;
                font-size: 10px;
                padding: 2px 6px;
                background: #e9ecef;
                border-radius: 3px;
                color: #495057;
                pointer-events: none;
                opacity: 0.8;
            }
        `;

        $('<style>')
            .attr('id', 'masaram-translator-styles')
            .html(styles)
            .appendTo('head');

        $(document).data(CSS_INJECTED_KEY, true);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UNICODE CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════════

    const MARKS = {
        halanta: '𑵄',
        virama: '𑵅',
        anusvara: '𑵀',
        visarga: '𑵁',
        sukun: '𑵂',
        chandrabindu: '𑵃',
        repha: '𑵆',
        rakar: '𑵇',
    };

    const HINDI_MARKS = {
        halanta: '्',
        anusvara: 'ं',
        visarga: 'ः',
        chandrabindu: 'ँ',
        nukta: '़',
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // KEYBOARD LAYOUTS
    // ═══════════════════════════════════════════════════════════════════════════

    const KEYBOARD_LAYOUTS = {
        // Gondi Vowels
        vowels: {
            title: 'Vowels / स्वर',
            rows: [
                ['𑴀', '𑴁', '𑴂', '𑴃', '𑴄', '𑴅'],
                ['𑴆', '𑴈', '𑴉', '𑴋', '𑴇'],
            ]
        },

        // Gondi Vowel Signs (Matras)
        matras: {
            title: 'Matras / मात्राएँ',
            rows: [
                ['𑴱', '𑴲', '𑴳', '𑴴', '𑴵'],
                ['𑴺', '𑴼', '𑴽', '𑴿', '𑴶'],
            ]
        },

        // Gondi Consonants
        consonants: {
            title: 'Consonants / व्यंजन',
            rows: [
                ['𑴌', '𑴍', '𑴎', '𑴏', '𑴐'],
                ['𑴑', '𑴒', '𑴓', '𑴔', '𑴕'],
                ['𑴖', '𑴗', '𑴘', '𑴙', '𑴚'],
                ['𑴛', '𑴜', '𑴝', '𑴞', '𑴟'],
                ['𑴠', '𑴡', '𑴢', '𑴣', '𑴤'],
                ['𑴥', '𑴦', '𑴧', '𑴨', '𑴭'],
                ['𑴩', '𑴪', '𑴫', '𑴬'],
            ]
        },

        // Special Characters
        special: {
            title: 'Special / विशेष',
            rows: [
                ['𑴮', '𑴯', '𑴰'],
                ['𑵀', '𑵁', '𑵂', '𑵃'],
                ['𑵄', '𑵅', '𑵆', '𑵇'],
            ]
        },

        // Numbers
        numbers: {
            title: 'Numbers / अंक',
            rows: [
                ['𑵐', '𑵑', '𑵒', '𑵓', '𑵔'],
                ['𑵕', '𑵖', '𑵗', '𑵘', '𑵙'],
            ]
        },

        // ITRANS keyboard for en-gonm mode
        itrans: {
            title: 'ITRANS Keys',
            rows: [
                ['a', 'aa', 'i', 'ii', 'u', 'uu'],
                ['e', 'ai', 'o', 'au', 'ri'],
                ['k', 'kh', 'g', 'gh', 'ng'],
                ['ch', 'chh', 'j', 'jh', 'ny'],
                ['T', 'Th', 'D', 'Dh', 'N'],
                ['t', 'th', 'd', 'dh', 'n'],
                ['p', 'ph', 'b', 'bh', 'm'],
                ['y', 'r', 'l', 'v', 'w'],
                ['sh', 'Sh', 's', 'h'],
            ]
        },

        // Hindi keyboard for hi-gonm mode
        hindi: {
            title: 'Hindi / हिंदी',
            rows: [
                ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'],
                ['ए', 'ऐ', 'ओ', 'औ', 'ऋ'],
                ['क', 'ख', 'ग', 'घ', 'ङ'],
                ['च', 'छ', 'ज', 'झ', 'ञ'],
                ['ट', 'ठ', 'ड', 'ढ', 'ण'],
                ['त', 'थ', 'द', 'ध', 'न'],
                ['प', 'फ', 'ब', 'भ', 'म'],
                ['य', 'र', 'ल', 'व', 'श'],
                ['ष', 'स', 'ह', 'ा', 'ि'],
                ['ी', 'ु', 'ू', 'े', 'ै'],
                ['ो', 'ौ', '्', 'ं', 'ः'],
            ]
        },

        // Punctuation
        punctuation: {
            title: 'Punctuation',
            rows: [
                ['।', '॥', ',', '?', '!'],
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // MAPPING TABLES (Same as before)
    // ═══════════════════════════════════════════════════════════════════════════

    const INDEPENDENT_VOWELS = {
        'a': '𑴀', 'aa': '𑴁', 'A': '𑴁', 'ā': '𑴁',
        'i': '𑴂', 'ii': '𑴃', 'I': '𑴃', 'ī': '𑴃', 'ee': '𑴃',
        'u': '𑴄', 'uu': '𑴅', 'U': '𑴅', 'ū': '𑴅', 'oo': '𑴅',
        'e': '𑴆', 'E': '𑴆', 'ē': '𑴆',
        'ai': '𑴈', 'aI': '𑴈',
        'o': '𑴉', 'O': '𑴉', 'ō': '𑴉',
        'au': '𑴋', 'aU': '𑴋',
    };

    const VOWEL_SIGNS = {
        'aa': '𑴱', 'A': '𑴱', 'ā': '𑴱',
        'i': '𑴲', 'ii': '𑴳', 'I': '𑴳', 'ī': '𑴳', 'ee': '𑴳',
        'u': '𑴴', 'uu': '𑴵', 'U': '𑴵', 'ū': '𑴵', 'oo': '𑴵',
        'e': '𑴺', 'ē': '𑴺',
        'ai': '𑴼', 'aI': '𑴼', 'ei': '𑴼',
        'o': '𑴽', 'ō': '𑴽',
        'au': '𑴿', 'aU': '𑴿', 'ou': '𑴿',
        'R': '𑴶', 'ṛ': '𑴶', 'ri': '𑴶',
    };

    const CONSONANTS = {
        'k': '𑴌', 'K': '𑴍', 'kh': '𑴍',
        'g': '𑴎', 'G': '𑴏', 'gh': '𑴏',
        'F': '𑴐', 'ng': '𑴐', 'ṅ': '𑴐',
        'c': '𑴑', 'ch': '𑴑',
        'C': '𑴒', 'chh': '𑴒', 'Ch': '𑴒',
        'j': '𑴓', 'J': '𑴔', 'jh': '𑴔',
        'Y': '𑴕', 'ny': '𑴕', 'ñ': '𑴕',
        'T': '𑴖', 'ṭ': '𑴖',
        'Th': '𑴗', 'ṭh': '𑴗',
        'D': '𑴘', 'ḍ': '𑴘',
        'Dh': '𑴙', 'ḍh': '𑴙',
        'N': '𑴚', 'ṇ': '𑴚',
        't': '𑴛', 'th': '𑴜',
        'd': '𑴝', 'dh': '𑴞',
        'n': '𑴟',
        'p': '𑴠', 'P': '𑴡', 'ph': '𑴡',
        'b': '𑴢', 'B': '𑴣', 'bh': '𑴣',
        'm': '𑴤',
        'y': '𑴥', 'r': '𑴦',
        'l': '𑴧', 'L': '𑴭',
        'v': '𑴨', 'w': '𑴨', 'W': '𑴨',
        'sh': '𑴩', 'ś': '𑴩',
        'S': '𑴪', 'ss': '𑴪', 'ṣ': '𑴪', 'Sh': '𑴪',
        's': '𑴫', 'h': '𑴬',
        'x': '𑴮', 'X': '𑴯', 'Z': '𑴰',
    };

    const NUKTA_CONSONANTS = {
        'q': '𑴌' + MARKS.sukun,
        'z': '𑴓' + MARKS.sukun,
        'f': '𑴡' + MARKS.sukun,
    };

    const NUMBERS = {
        '0': '𑵐', '1': '𑵑', '2': '𑵒', '3': '𑵓', '4': '𑵔',
        '5': '𑵕', '6': '𑵖', '7': '𑵗', '8': '𑵘', '9': '𑵙',
    };

    // Hindi Mappings
    const HINDI_VOWELS_TO_GONDI = {
        'अ': '𑴀', 'आ': '𑴁', 'इ': '𑴂', 'ई': '𑴃',
        'उ': '𑴄', 'ऊ': '𑴅', 'ऋ': '𑴇',
        'ए': '𑴆', 'ऐ': '𑴈', 'ओ': '𑴉', 'औ': '𑴋',
    };

    const HINDI_MATRA_TO_GONDI = {
        'ा': '𑴱', 'ि': '𑴲', 'ी': '𑴳',
        'ु': '𑴴', 'ू': '𑴵', 'ृ': '𑴶',
        'े': '𑴺', 'ै': '𑴼', 'ो': '𑴽', 'ौ': '𑴿',
    };

    const HINDI_CONSONANTS_TO_GONDI = {
        'क': '𑴌', 'ख': '𑴍', 'ग': '𑴎', 'घ': '𑴏', 'ङ': '𑴐',
        'च': '𑴑', 'छ': '𑴒', 'ज': '𑴓', 'झ': '𑴔', 'ञ': '𑴕',
        'ट': '𑴖', 'ठ': '𑴗', 'ड': '𑴘', 'ढ': '𑴙', 'ण': '𑴚',
        'त': '𑴛', 'थ': '𑴜', 'द': '𑴝', 'ध': '𑴞', 'न': '𑴟',
        'प': '𑴠', 'फ': '𑴡', 'ब': '𑴢', 'भ': '𑴣', 'म': '𑴤',
        'य': '𑴥', 'र': '𑴦', 'ल': '𑴧', 'ळ': '𑴭',
        'व': '𑴨', 'श': '𑴩', 'ष': '𑴪', 'स': '𑴫', 'ह': '𑴬',
        'क्ष': '𑴮', 'ज्ञ': '𑴯', 'त्र': '𑴰',
    };

    const HINDI_NUKTA_TO_GONDI = {
        'क़': '𑴌' + MARKS.sukun, 'ख़': '𑴍' + MARKS.sukun,
        'ग़': '𑴎' + MARKS.sukun, 'ज़': '𑴓' + MARKS.sukun,
        'ड़': '𑴘' + MARKS.sukun, 'ढ़': '𑴙' + MARKS.sukun,
        'फ़': '𑴡' + MARKS.sukun,
    };

    const HINDI_NUMBERS_TO_GONDI = {
        '०': '𑵐', '१': '𑵑', '२': '𑵒', '३': '𑵓', '४': '𑵔',
        '५': '𑵕', '६': '𑵖', '७': '𑵗', '८': '𑵘', '९': '𑵙',
    };

    // Reverse Mappings
    const GONDI_VOWELS_TO_HINDI = {
        '𑴀': 'अ', '𑴁': 'आ', '𑴂': 'इ', '𑴃': 'ई',
        '𑴄': 'उ', '𑴅': 'ऊ', '𑴇': 'ऋ',
        '𑴆': 'ए', '𑴈': 'ऐ', '𑴉': 'ओ', '𑴋': 'औ',
    };

    const GONDI_MATRA_TO_HINDI = {
        '𑴱': 'ा', '𑴲': 'ि', '𑴳': 'ी',
        '𑴴': 'ु', '𑴵': 'ू', '𑴶': 'ृ',
        '𑴺': 'े', '𑴼': 'ै', '𑴽': 'ो', '𑴿': 'ौ',
    };

    const GONDI_CONSONANTS_TO_HINDI = {
        '𑴌': 'क', '𑴍': 'ख', '𑴎': 'ग', '𑴏': 'घ', '𑴐': 'ङ',
        '𑴑': 'च', '𑴒': 'छ', '𑴓': 'ज', '𑴔': 'झ', '𑴕': 'ञ',
        '𑴖': 'ट', '𑴗': 'ठ', '𑴘': 'ड', '𑴙': 'ढ', '𑴚': 'ण',
        '𑴛': 'त', '𑴜': 'थ', '𑴝': 'द', '𑴞': 'ध', '𑴟': 'न',
        '𑴠': 'प', '𑴡': 'फ', '𑴢': 'ब', '𑴣': 'भ', '𑴤': 'म',
        '𑴥': 'य', '𑴦': 'र', '𑴧': 'ल', '𑴭': 'ळ',
        '𑴨': 'व', '𑴩': 'श', '𑴪': 'ष', '𑴫': 'स', '𑴬': 'ह',
        '𑴮': 'क्ष', '𑴯': 'ज्ञ', '𑴰': 'त्र',
    };

    const GONDI_VOWELS_TO_ENGLISH = {
        '𑴀': 'a', '𑴁': 'aa', '𑴂': 'i', '𑴃': 'ee',
        '𑴄': 'u', '𑴅': 'oo', '𑴇': 'ri',
        '𑴆': 'e', '𑴈': 'ai', '𑴉': 'o', '𑴋': 'au',
    };

    const GONDI_MATRA_TO_ENGLISH = {
        '𑴱': 'aa', '𑴲': 'i', '𑴳': 'ee',
        '𑴴': 'u', '𑴵': 'oo', '𑴶': 'ri',
        '𑴺': 'e', '𑴼': 'ai', '𑴽': 'o', '𑴿': 'au',
    };

    const GONDI_CONSONANTS_TO_ENGLISH = {
        '𑴌': 'k', '𑴍': 'kh', '𑴎': 'g', '𑴏': 'gh', '𑴐': 'ng',
        '𑴑': 'ch', '𑴒': 'chh', '𑴓': 'j', '𑴔': 'jh', '𑴕': 'ny',
        '𑴖': 'T', '𑴗': 'Th', '𑴘': 'D', '𑴙': 'Dh', '𑴚': 'N',
        '𑴛': 't', '𑴜': 'th', '𑴝': 'd', '𑴞': 'dh', '𑴟': 'n',
        '𑴠': 'p', '𑴡': 'ph', '𑴢': 'b', '𑴣': 'bh', '𑴤': 'm',
        '𑴥': 'y', '𑴦': 'r', '𑴧': 'l', '𑴭': 'L',
        '𑴨': 'v', '𑴩': 'sh', '𑴪': 'Sh', '𑴫': 's', '𑴬': 'h',
        '𑴮': 'ksh', '𑴯': 'gya', '𑴰': 'tra',
    };

    const GONDI_NUMBERS_TO_ARABIC = {
        '𑵐': '0', '𑵑': '1', '𑵒': '2', '𑵓': '3', '𑵔': '4',
        '𑵕': '5', '𑵖': '6', '𑵗': '7', '𑵘': '8', '𑵙': '9',
    };

    const GONDI_NUMBERS_TO_HINDI = {
        '𑵐': '०', '𑵑': '१', '𑵒': '२', '𑵓': '३', '𑵔': '४',
        '𑵕': '५', '𑵖': '६', '𑵗': '७', '𑵘': '८', '𑵙': '९',
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    const VOWEL_CHARS = 'aāiīuūeēoōAIUEO';

    function isVowel(c) {
        return VOWEL_CHARS.includes(c);
    }

    function isConsonantStart(word, pos) {
        if (pos >= word.length) return false;
        for (let len = 3; len >= 1; len--) {
            if (pos + len <= word.length) {
                const substr = word.substring(pos, pos + len);
                if (CONSONANTS[substr] || NUKTA_CONSONANTS[substr]) {
                    return true;
                }
            }
        }
        return false;
    }

    function isRepha(word, pos) {
        if (pos >= word.length || word[pos] !== 'r') return false;
        const nextPos = pos + 1;
        return nextPos < word.length && isConsonantStart(word, nextPos);
    }

    function matchConsonant(word, start) {
        for (let len = 2; len >= 1; len--) {
            if (start + len <= word.length) {
                const substr = word.substring(start, start + len);
                if (NUKTA_CONSONANTS[substr]) {
                    return [NUKTA_CONSONANTS[substr], len];
                }
            }
        }
        for (let len = 3; len >= 1; len--) {
            if (start + len <= word.length) {
                const substr = word.substring(start, start + len);
                if (CONSONANTS[substr]) {
                    return [CONSONANTS[substr], len];
                }
            }
        }
        return [null, 0];
    }

    function matchVowelSign(word, start) {
        for (let len = 3; len >= 1; len--) {
            if (start + len <= word.length) {
                const substr = word.substring(start, start + len);
                if (VOWEL_SIGNS[substr]) {
                    return [VOWEL_SIGNS[substr], len];
                }
            }
        }
        return [null, 0];
    }

    function matchIndependentVowel(word, start) {
        for (let len = 3; len >= 1; len--) {
            if (start + len <= word.length) {
                const substr = word.substring(start, start + len);
                if (INDEPENDENT_VOWELS[substr]) {
                    return [INDEPENDENT_VOWELS[substr], len];
                }
            }
        }
        return [null, 0];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // TRANSLITERATION ENGINES
    // ═══════════════════════════════════════════════════════════════════════════

    function transliterateEnglishToGondi(word) {
        if (!word) return '';

        let buffer = '';
        let i = 0;
        let hasConsonant = false;
        let hasVowel = false;

        while (i < word.length) {
            const char = word[i];

            if (NUMBERS[char]) {
                if (hasConsonant && !hasVowel) buffer += MARKS.halanta;
                buffer += NUMBERS[char];
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === '.') {
                if (hasConsonant && !hasVowel) buffer += MARKS.halanta;
                let dotCount = 1;
                while (i + dotCount < word.length && word[i + dotCount] === '.') dotCount++;
                if (dotCount >= 3) { buffer += '॥'; i += 3; }
                else if (dotCount >= 2) { buffer += '।'; i += 2; }
                else { buffer += '।'; i++; }
                hasConsonant = false;
                hasVowel = false;
                continue;
            }

            if (char === 'M' && hasVowel) {
                buffer += MARKS.anusvara;
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === 'ṃ' || char === 'ṁ') {
                buffer += MARKS.anusvara;
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === 'H' && hasVowel) {
                buffer += MARKS.visarga;
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === 'ḥ') {
                buffer += MARKS.visarga;
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === 'r' && hasVowel && isRepha(word, i)) {
                buffer += MARKS.repha;
                hasConsonant = false;
                hasVowel = false;
                i++;
                continue;
            }

            if (char === 'r' && hasConsonant && !hasVowel) {
                const nextPos = i + 1;
                if (nextPos < word.length) {
                    const next = word[nextPos];
                    if (next === 'a') {
                        const afterA = nextPos + 1;
                        if (afterA < word.length) {
                            const afterAChar = word[afterA];
                            if (afterAChar === 'a' || afterAChar === 'A') {
                                buffer += MARKS.rakar + '𑴱'; i = afterA + 1; hasVowel = true; continue;
                            } else if (afterAChar === 'i' || afterAChar === 'I') {
                                buffer += MARKS.rakar + '𑴼'; i = afterA + 1; hasVowel = true; continue;
                            } else if (afterAChar === 'u' || afterAChar === 'U') {
                                buffer += MARKS.rakar + '𑴿'; i = afterA + 1; hasVowel = true; continue;
                            }
                        }
                        buffer += MARKS.rakar; i = nextPos + 1; hasVowel = true; continue;
                    }
                    const [vowelSign, vowelLen] = matchVowelSign(word, nextPos);
                    if (vowelSign) {
                        buffer += MARKS.rakar + vowelSign; i = nextPos + vowelLen; hasVowel = true; continue;
                    }
                    if (isConsonantStart(word, nextPos)) {
                        buffer += MARKS.virama + '𑴦'; hasConsonant = true; hasVowel = false; i++; continue;
                    }
                }
                buffer += MARKS.rakar; hasVowel = true; i++; continue;
            }

            const [consonant, consonantLen] = matchConsonant(word, i);
            if (consonant) {
                if (hasConsonant && !hasVowel) buffer += MARKS.virama;
                buffer += consonant;
                i += consonantLen;
                hasConsonant = true;
                hasVowel = false;

                if (i < word.length) {
                    if (word[i] === 'a') {
                        const nextPos = i + 1;
                        if (nextPos < word.length) {
                            const next = word[nextPos];
                            if (next === 'a' || next === 'A') { buffer += '𑴱'; i = nextPos + 1; hasVowel = true; continue; }
                            else if (next === 'i' || next === 'I') { buffer += '𑴼'; i = nextPos + 1; hasVowel = true; continue; }
                            else if (next === 'u' || next === 'U') { buffer += '𑴿'; i = nextPos + 1; hasVowel = true; continue; }
                            else if (next === 'e') { buffer += '𑵃'; i = nextPos + 1; hasVowel = true; continue; }
                        }
                        i++; hasVowel = true; continue;
                    }
                    const [vowelSign, vowelLen] = matchVowelSign(word, i);
                    if (vowelSign) { buffer += vowelSign; i += vowelLen; hasVowel = true; continue; }
                }
                continue;
            }

            if (!hasConsonant || hasVowel) {
                const [vowel, vowelLen] = matchIndependentVowel(word, i);
                if (vowel) {
                    if (hasConsonant && !hasVowel) buffer += MARKS.halanta;
                    buffer += vowel; i += vowelLen; hasConsonant = false; hasVowel = true; continue;
                }
            }

            if (i + 1 < word.length && word.substring(i, i + 2) === 'MM') {
                buffer += MARKS.chandrabindu; i += 2; continue;
            }

            if (hasConsonant && !hasVowel) buffer += MARKS.halanta;
            buffer += char;
            hasConsonant = false;
            hasVowel = false;
            i++;
        }

        if (hasConsonant && !hasVowel) buffer += MARKS.halanta;
        return buffer;
    }

    function transliterateHindiToGondi(text) {
        if (!text) return '';
        let result = '';
        let i = 0;

        while (i < text.length) {
            const char = text[i];
            const twoChar = i + 1 < text.length ? text.substring(i, i + 2) : '';
            const threeChar = i + 2 < text.length ? text.substring(i, i + 3) : '';

            if (HINDI_NUKTA_TO_GONDI[twoChar]) { result += HINDI_NUKTA_TO_GONDI[twoChar]; i += 2; continue; }
            if (HINDI_CONSONANTS_TO_GONDI[threeChar]) { result += HINDI_CONSONANTS_TO_GONDI[threeChar]; i += 3; continue; }
            if (HINDI_NUMBERS_TO_GONDI[char]) { result += HINDI_NUMBERS_TO_GONDI[char]; i++; continue; }
            if (HINDI_CONSONANTS_TO_GONDI[char]) { result += HINDI_CONSONANTS_TO_GONDI[char]; i++; continue; }
            if (HINDI_VOWELS_TO_GONDI[char]) { result += HINDI_VOWELS_TO_GONDI[char]; i++; continue; }
            if (HINDI_MATRA_TO_GONDI[char]) { result += HINDI_MATRA_TO_GONDI[char]; i++; continue; }
            if (char === HINDI_MARKS.halanta) { result += MARKS.virama; i++; continue; }
            if (char === HINDI_MARKS.anusvara) { result += MARKS.anusvara; i++; continue; }
            if (char === HINDI_MARKS.visarga) { result += MARKS.visarga; i++; continue; }
            if (char === HINDI_MARKS.chandrabindu) { result += MARKS.chandrabindu; i++; continue; }
            result += char; i++;
        }
        return result;
    }

    function transliterateGondiToHindi(text) {
        if (!text) return '';
        let result = '';
        let i = 0;

        while (i < text.length) {
            const char = text[i];
            if (GONDI_NUMBERS_TO_HINDI[char]) { result += GONDI_NUMBERS_TO_HINDI[char]; i++; continue; }
            if (GONDI_CONSONANTS_TO_HINDI[char]) { result += GONDI_CONSONANTS_TO_HINDI[char]; i++; continue; }
            if (GONDI_VOWELS_TO_HINDI[char]) { result += GONDI_VOWELS_TO_HINDI[char]; i++; continue; }
            if (GONDI_MATRA_TO_HINDI[char]) { result += GONDI_MATRA_TO_HINDI[char]; i++; continue; }
            if (char === MARKS.virama || char === MARKS.halanta) { result += HINDI_MARKS.halanta; i++; continue; }
            if (char === MARKS.anusvara) { result += HINDI_MARKS.anusvara; i++; continue; }
            if (char === MARKS.visarga) { result += HINDI_MARKS.visarga; i++; continue; }
            if (char === MARKS.chandrabindu) { result += HINDI_MARKS.chandrabindu; i++; continue; }
            if (char === MARKS.sukun) { result += HINDI_MARKS.nukta; i++; continue; }
            if (char === MARKS.repha) { result += 'र्'; i++; continue; }
            if (char === MARKS.rakar) { result += '्र'; i++; continue; }
            result += char; i++;
        }
        return result;
    }

    function transliterateGondiToEnglish(text) {
        if (!text) return '';
        let result = '';
        let i = 0;
        let lastWasConsonant = false;

        while (i < text.length) {
            const char = text[i];
            if (GONDI_NUMBERS_TO_ARABIC[char]) { result += GONDI_NUMBERS_TO_ARABIC[char]; lastWasConsonant = false; i++; continue; }
            if (GONDI_CONSONANTS_TO_ENGLISH[char]) {
                if (lastWasConsonant) result += 'a';
                result += GONDI_CONSONANTS_TO_ENGLISH[char]; lastWasConsonant = true; i++; continue;
            }
            if (GONDI_VOWELS_TO_ENGLISH[char]) {
                if (lastWasConsonant) result += 'a';
                result += GONDI_VOWELS_TO_ENGLISH[char]; lastWasConsonant = false; i++; continue;
            }
            if (GONDI_MATRA_TO_ENGLISH[char]) { result += GONDI_MATRA_TO_ENGLISH[char]; lastWasConsonant = false; i++; continue; }
            if (char === MARKS.virama || char === MARKS.halanta) { lastWasConsonant = false; i++; continue; }
            if (char === MARKS.anusvara) { result += 'M'; lastWasConsonant = false; i++; continue; }
            if (char === MARKS.visarga) { result += 'H'; lastWasConsonant = false; i++; continue; }
            if (char === MARKS.chandrabindu) { result += 'MM'; lastWasConsonant = false; i++; continue; }
            if (char === MARKS.sukun) { i++; continue; }
            if (char === MARKS.repha || char === MARKS.rakar) { result += 'r'; lastWasConsonant = false; i++; continue; }
            if (char === '।') { if (lastWasConsonant) result += 'a'; result += '.'; lastWasConsonant = false; i++; continue; }
            if (char === '॥') { if (lastWasConsonant) result += 'a'; result += '..'; lastWasConsonant = false; i++; continue; }
            if (/\s/.test(char)) { if (lastWasConsonant) result += 'a'; result += char; lastWasConsonant = false; i++; continue; }
            if (lastWasConsonant) result += 'a';
            result += char; lastWasConsonant = false; i++;
        }
        if (lastWasConsonant) result += 'a';
        return result;
    }

    function transliterate(input, mode) {
        if (!input) return '';
        mode = mode || 'en-gonm';

        const parts = input.split(/(\s+)/);
        return parts.map(part => {
            if (part.trim() === '') return part;
            switch (mode) {
                case 'en-gonm': case 'itrans-gonm': return transliterateEnglishToGondi(part);
                case 'hi-gonm': case 'hindi-gonm': case 'devanagari-gonm': return transliterateHindiToGondi(part);
                case 'gonm-en': case 'gonm-itrans': case 'gonm-english': return transliterateGondiToEnglish(part);
                case 'gonm-hi': case 'gonm-hindi': case 'gonm-devanagari': return transliterateGondiToHindi(part);
                default: return transliterateEnglishToGondi(part);
            }
        }).join('');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PLUGIN DEFAULTS
    // ═══════════════════════════════════════════════════════════════════════════

    const defaults = {
        source: null,
        target: null,
        mode: 'en-gonm',
        liveTranslate: true,
        debounceDelay: 100,

        // Stats options
        stat: false,
        maxLength: 500,

        // Toolbar options
        tool: false,
        toolButtons: ['undo', 'redo', 'save', 'share'],

        // Keyboard options
        keyboard: false,
        keyboardLayout: 'auto', // auto, gondi, itrans, hindi
        keyboardAutoHide: true,
        keyboardHideDelay: 300,

        // Callbacks
        onTranslate: null,
        onInit: null,
        onError: null,
        onSave: null,
        onShare: null,
        onKeyPress: null,

        // Data attribute
        autoDetect: true,
        dataAttribute: 'masaram-translator',
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PLUGIN CONSTRUCTOR
    // ═══════════════════════════════════════════════════════════════════════════

    function MasaramTranslator(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = 'masaramTranslator';

        // History for undo/redo
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;

        // Keyboard state
        this.keyboardVisible = false;
        this.hideTimeout = null;

        this.init();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PLUGIN PROTOTYPE
    // ═══════════════════════════════════════════════════════════════════════════

    MasaramTranslator.prototype = {

        init: function () {
            const self = this;

            // Inject CSS
            injectStyles();

            // Resolve elements
            this.$source = this.resolveElement(this.options.source) || this.$element;
            this.$target = this.resolveElement(this.options.target);

            if (!this.$target && this.options.autoDetect) {
                this.$target = this.findPairedElement();
            }

            if (!this.$target || this.$target.length === 0) {
                this.handleError('Target element not found');
                return;
            }

            this.mode = this.options.mode;

            // Wrap source element
            this.wrapElement();

            // Build UI components
            if (this.options.tool) this.buildToolbar();
            if (this.options.stat) this.buildStats();
            if (this.options.keyboard) this.buildKeyboard();

            // Bind events
            if (this.options.liveTranslate) this.bindLiveTranslate();
            if (this.options.keyboard) this.bindKeyboardEvents();

            // Set max length
            if (this.options.maxLength) {
                this.$source.attr('maxlength', this.options.maxLength);
            }

            // Store instance
            this.$source.data('masaramTranslator', this);

            // Initial translation
            if (this.$source.val()) {
                this.translate();
                this.pushHistory(this.$source.val());
            }

            // Callback
            if (typeof this.options.onInit === 'function') {
                this.options.onInit.call(this, this.$source, this.$target);
            }
        },

        resolveElement: function (selector) {
            if (!selector) return null;
            if (selector instanceof $) return selector;
            if (selector.nodeType) return $(selector);
            if (typeof selector === 'string') {
                let $el = $(selector);
                if ($el.length) return $el;
                $el = $('#' + selector);
                if ($el.length) return $el;
                $el = $('[name="' + selector + '"]');
                if ($el.length) return $el;
                $el = $('[data-' + this.options.dataAttribute + '="' + selector + '"]');
                if ($el.length) return $el;
            }
            return null;
        },

        findPairedElement: function () {
            const sourceId = this.$source.attr('id') || this.$source.attr('name');
            const dataAttr = this.options.dataAttribute;
            const targetSelector = this.$source.data(dataAttr + '-target');
            if (targetSelector) return this.resolveElement(targetSelector);
            const $paired = $('[data-' + dataAttr + '-source="' + sourceId + '"]');
            if ($paired.length) return $paired;
            if (this.$source.data(dataAttr) === 'input' || this.$source.data(dataAttr) === 'source') {
                return $('[data-' + dataAttr + '="output"], [data-' + dataAttr + '="target"]');
            }
            return null;
        },

        // ───────────────────────────────────────────────────────────────────────
        // WRAPPER
        // ───────────────────────────────────────────────────────────────────────

        wrapElement: function () {
            if (this.$source.parent().hasClass('masaram-wrapper')) {
                this.$wrapper = this.$source.parent();
            } else {
                this.$source.wrap('<div class="masaram-wrapper"></div>');
                this.$wrapper = this.$source.parent();
            }
        },

        // ───────────────────────────────────────────────────────────────────────
        // TOOLBAR
        // ───────────────────────────────────────────────────────────────────────

        buildToolbar: function () {
            const self = this;
            const buttons = this.options.toolButtons;

            const $toolbar = $('<div class="masaram-toolbar"></div>');

            const buttonConfig = {
                undo: {
                    icon: 'bi-arrow-counterclockwise',
                    title: 'Undo (Ctrl+Z)',
                    action: function () { self.undo(); }
                },
                redo: {
                    icon: 'bi-arrow-clockwise',
                    title: 'Redo (Ctrl+Y)',
                    action: function () { self.redo(); }
                },
                save: {
                    icon: 'bi-download',
                    title: 'Save/Download',
                    action: function () { self.save(); }
                },
                share: {
                    icon: 'bi-share',
                    title: 'Share',
                    action: function () { self.share(); }
                },
                copy: {
                    icon: 'bi-clipboard',
                    title: 'Copy Output',
                    action: function () { self.copyOutput(); }
                },
                clear: {
                    icon: 'bi-x-circle',
                    title: 'Clear All',
                    action: function () { self.clear(); }
                }
            };

            buttons.forEach(function (btnName) {
                const config = buttonConfig[btnName];
                if (config) {
                    const $btn = $('<button type="button" class="btn btn-sm" title="' + config.title + '">' +
                        '<i class="bi ' + config.icon + '"></i></button>');
                    $btn.on('click', config.action);

                    if (btnName === 'undo') self.$undoBtn = $btn;
                    if (btnName === 'redo') self.$redoBtn = $btn;

                    $toolbar.append($btn);
                }
            });

            this.$toolbar = $toolbar;
            this.$wrapper.prepend($toolbar);
            this.updateToolbarState();
        },

        updateToolbarState: function () {
            if (this.$undoBtn) {
                this.$undoBtn.prop('disabled', this.historyIndex <= 0);
            }
            if (this.$redoBtn) {
                this.$redoBtn.prop('disabled', this.historyIndex >= this.history.length - 1);
            }
        },

        // ───────────────────────────────────────────────────────────────────────
        // STATS BAR
        // ───────────────────────────────────────────────────────────────────────

        buildStats: function () {
            const $stats = $('<div class="masaram-stats"></div>');

            $stats.html(`
                <span class="stat-item">
                    <span class="stat-label">Length:</span>
                    <span class="stat-value stat-length">0</span>
                </span>
                <span class="stat-item">
                    <span class="stat-label">Remaining:</span>
                    <span class="stat-value stat-remaining">${this.options.maxLength}</span>
                </span>
            `);

            this.$stats = $stats;
            this.$wrapper.append($stats);
            this.updateStats();
        },

        updateStats: function () {
            if (!this.$stats) return;

            const currentLength = this.$source.val().length;
            const maxLength = this.options.maxLength;
            const remaining = maxLength - currentLength;
            const percentage = (currentLength / maxLength) * 100;

            this.$stats.find('.stat-length').text(currentLength);
            const $remaining = this.$stats.find('.stat-remaining');
            $remaining.text(remaining);

            // Color coding
            $remaining.removeClass('stat-success stat-warning stat-danger');
            if (percentage >= 90) {
                $remaining.addClass('stat-danger');
            } else if (percentage >= 75) {
                $remaining.addClass('stat-warning');
            } else {
                $remaining.addClass('stat-success');
            }
        },

        // ───────────────────────────────────────────────────────────────────────
        // VIRTUAL KEYBOARD
        // ───────────────────────────────────────────────────────────────────────

        buildKeyboard: function () {
            const self = this;
            const $keyboard = $('<div class="masaram-keyboard"></div>');

            // Tabs
            const $tabs = $('<div class="masaram-keyboard-tabs"></div>');
            const tabs = this.getKeyboardTabs();

            tabs.forEach(function (tab, index) {
                const $tab = $('<button type="button" class="masaram-keyboard-tab' +
                    (index === 0 ? ' active' : '') + '">' + tab.label + '</button>');
                $tab.data('tab', tab.key);
                $tab.on('click', function () {
                    $tabs.find('.masaram-keyboard-tab').removeClass('active');
                    $(this).addClass('active');
                    self.renderKeyboardContent(tab.key);
                });
                $tabs.append($tab);
            });

            $keyboard.append($tabs);

            // Content area
            const $content = $('<div class="masaram-keyboard-content"></div>');
            $keyboard.append($content);

            this.$keyboard = $keyboard;
            this.$keyboardContent = $content;
            this.$wrapper.append($keyboard);

            // Render initial content
            this.renderKeyboardContent(tabs[0].key);
        },

        getKeyboardTabs: function () {
            const mode = this.mode;

            if (mode === 'en-gonm' || mode === 'itrans-gonm') {
                return [
                    { key: 'itrans', label: 'ITRANS' },
                    { key: 'gondi', label: 'Gondi' },
                    { key: 'numbers', label: '123' },
                ];
            } else if (mode === 'hi-gonm' || mode === 'hindi-gonm') {
                return [
                    { key: 'hindi', label: 'हिंदी' },
                    { key: 'gondi', label: 'Gondi' },
                    { key: 'numbers', label: '123' },
                ];
            } else if (mode === 'gonm-en' || mode === 'gonm-hi') {
                return [
                    { key: 'gondi', label: 'Gondi' },
                    { key: 'vowels', label: 'Vowels' },
                    { key: 'numbers', label: '123' },
                ];
            }

            return [
                { key: 'gondi', label: 'Gondi' },
                { key: 'vowels', label: 'Vowels' },
                { key: 'numbers', label: '123' },
            ];
        },

        renderKeyboardContent: function (tabKey) {
            const self = this;
            const $content = this.$keyboardContent;
            $content.empty();

            let layouts = [];

            switch (tabKey) {
                case 'itrans':
                    layouts = [KEYBOARD_LAYOUTS.itrans];
                    break;
                case 'hindi':
                    layouts = [KEYBOARD_LAYOUTS.hindi];
                    break;
                case 'gondi':
                    layouts = [KEYBOARD_LAYOUTS.consonants, KEYBOARD_LAYOUTS.special];
                    break;
                case 'vowels':
                    layouts = [KEYBOARD_LAYOUTS.vowels, KEYBOARD_LAYOUTS.matras];
                    break;
                case 'numbers':
                    layouts = [KEYBOARD_LAYOUTS.numbers, KEYBOARD_LAYOUTS.punctuation];
                    break;
                default:
                    layouts = [KEYBOARD_LAYOUTS.consonants];
            }

            layouts.forEach(function (layout) {
                const $section = $('<div class="masaram-keyboard-section"></div>');
                if (layout.title) {
                    $section.append('<div class="masaram-keyboard-section-title">' + layout.title + '</div>');
                }

                layout.rows.forEach(function (row) {
                    const $row = $('<div class="masaram-keyboard-row"></div>');

                    row.forEach(function (key) {
                        const $key = $('<button type="button" class="masaram-key" data-key="' + key + '">' + key + '</button>');
                        $key.on('click touchend', function (e) {
                            e.preventDefault();
                            self.insertKey(key);
                        });
                        $row.append($key);
                    });

                    $section.append($row);
                });

                $content.append($section);
            });

            // Add control row
            const $controlRow = $('<div class="masaram-keyboard-row"></div>');
            $controlRow.append(
                $('<button type="button" class="masaram-key special backspace" data-key="backspace"><i class="bi bi-backspace"></i></button>')
                    .on('click touchend', function (e) { e.preventDefault(); self.backspace(); }),
                $('<button type="button" class="masaram-key special space" data-key="space">Space</button>')
                    .on('click touchend', function (e) { e.preventDefault(); self.insertKey(' '); }),
                $('<button type="button" class="masaram-key special enter" data-key="enter"><i class="bi bi-arrow-return-left"></i></button>')
                    .on('click touchend', function (e) { e.preventDefault(); self.insertKey('\n'); })
            );
            $content.append($controlRow);
        },

        bindKeyboardEvents: function () {
            const self = this;

            // Show keyboard on focus
            this.$source.on('focus.masaramKeyboard', function () {
                clearTimeout(self.hideTimeout);
                self.showKeyboard();
            });

            // Hide keyboard on blur with delay
            if (this.options.keyboardAutoHide) {
                this.$source.on('blur.masaramKeyboard', function () {
                    self.hideTimeout = setTimeout(function () {
                        self.hideKeyboard();
                    }, self.options.keyboardHideDelay);
                });

                // Keep keyboard visible when clicking on it
                this.$keyboard.on('mousedown touchstart', function (e) {
                    clearTimeout(self.hideTimeout);
                });
            }

            // Handle keyboard shortcuts
            this.$source.on('keydown.masaramKeyboard', function (e) {
                if (e.ctrlKey || e.metaKey) {
                    if (e.key === 'z') {
                        e.preventDefault();
                        if (e.shiftKey) self.redo();
                        else self.undo();
                    } else if (e.key === 'y') {
                        e.preventDefault();
                        self.redo();
                    }
                }
            });
        },

        showKeyboard: function () {
            if (this.$keyboard) {
                this.$keyboard.addClass('active');
                this.keyboardVisible = true;
            }
        },

        hideKeyboard: function () {
            if (this.$keyboard) {
                this.$keyboard.removeClass('active');
                this.keyboardVisible = false;
            }
        },

        toggleKeyboard: function () {
            if (this.keyboardVisible) {
                this.hideKeyboard();
            } else {
                this.showKeyboard();
            }
        },

        insertKey: function (key) {
            const $input = this.$source;
            const input = $input[0];
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = $input.val();

            // Check max length
            if (this.options.maxLength && text.length >= this.options.maxLength && start === end) {
                return;
            }

            const newText = text.substring(0, start) + key + text.substring(end);
            $input.val(newText);

            // Set cursor position
            const newPos = start + key.length;
            input.selectionStart = input.selectionEnd = newPos;

            // Trigger input event
            $input.trigger('input');

            // Callback
            if (typeof this.options.onKeyPress === 'function') {
                this.options.onKeyPress.call(this, key);
            }
        },

        backspace: function () {
            const $input = this.$source;
            const input = $input[0];
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = $input.val();

            let newText, newPos;

            if (start !== end) {
                // Delete selection
                newText = text.substring(0, start) + text.substring(end);
                newPos = start;
            } else if (start > 0) {
                // Delete character before cursor
                newText = text.substring(0, start - 1) + text.substring(start);
                newPos = start - 1;
            } else {
                return;
            }

            $input.val(newText);
            input.selectionStart = input.selectionEnd = newPos;
            $input.trigger('input');
        },

        // ───────────────────────────────────────────────────────────────────────
        // HISTORY (UNDO/REDO)
        // ───────────────────────────────────────────────────────────────────────

        pushHistory: function (value) {
            // Remove any redo history
            if (this.historyIndex < this.history.length - 1) {
                this.history = this.history.slice(0, this.historyIndex + 1);
            }

            // Don't push if same as last
            if (this.history.length > 0 && this.history[this.history.length - 1] === value) {
                return;
            }

            this.history.push(value);

            // Limit history size
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }

            this.historyIndex = this.history.length - 1;
            this.updateToolbarState();
        },

        undo: function () {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                const value = this.history[this.historyIndex];
                this.$source.val(value);
                this.translate();
                this.updateToolbarState();
            }
            return this;
        },

        redo: function () {
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                const value = this.history[this.historyIndex];
                this.$source.val(value);
                this.translate();
                this.updateToolbarState();
            }
            return this;
        },

        // ───────────────────────────────────────────────────────────────────────
        // SAVE & SHARE
        // ───────────────────────────────────────────────────────────────────────

        save: function () {
            const outputText = this.$target.val();

            if (!outputText) {
                this.showToast('Nothing to save!', 'error');
                return;
            }

            // Create download
            const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gondi-text-' + Date.now() + '.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast('File downloaded!', 'success');

            if (typeof this.options.onSave === 'function') {
                this.options.onSave.call(this, outputText);
            }

            return this;
        },

        share: function () {
            const self = this;
            const outputText = this.$target.val();

            if (!outputText) {
                this.showToast('Nothing to share!', 'error');
                return;
            }

            // Try Web Share API
            if (navigator.share) {
                navigator.share({
                    title: 'Masaram Gondi Text',
                    text: outputText,
                }).then(function () {
                    self.showToast('Shared successfully!', 'success');
                }).catch(function (err) {
                    // Fallback to copy
                    self.copyToClipboard(outputText);
                });
            } else {
                // Fallback to copy
                this.copyToClipboard(outputText);
            }

            if (typeof this.options.onShare === 'function') {
                this.options.onShare.call(this, outputText);
            }

            return this;
        },

        copyOutput: function () {
            const outputText = this.$target.val();
            if (!outputText) {
                this.showToast('Nothing to copy!', 'error');
                return;
            }
            this.copyToClipboard(outputText);
            return this;
        },

        copyToClipboard: function (text) {
            const self = this;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function () {
                    self.showToast('Copied to clipboard!', 'success');
                }).catch(function () {
                    self.fallbackCopy(text);
                });
            } else {
                this.fallbackCopy(text);
            }
        },

        fallbackCopy: function (text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showToast('Copied to clipboard!', 'success');
        },

        showToast: function (message, type) {
            // Remove existing toast
            $('.masaram-toast').remove();

            const $toast = $('<div class="masaram-toast ' + (type || '') + '">' + message + '</div>');
            $('body').append($toast);

            setTimeout(function () {
                $toast.addClass('show');
            }, 10);

            setTimeout(function () {
                $toast.removeClass('show');
                setTimeout(function () {
                    $toast.remove();
                }, 300);
            }, 2500);
        },

        // ───────────────────────────────────────────────────────────────────────
        // LIVE TRANSLATE
        // ───────────────────────────────────────────────────────────────────────

        bindLiveTranslate: function () {
            const self = this;
            let debounceTimer;
            let lastValue = this.$source.val();

            this.$source.on('input.masaramTranslator keyup.masaramTranslator', function () {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function () {
                    const currentValue = self.$source.val();

                    // Update stats
                    if (self.options.stat) {
                        self.updateStats();
                    }

                    // Translate
                    self.translate();

                    // Push to history if changed significantly
                    if (currentValue !== lastValue) {
                        self.pushHistory(currentValue);
                        lastValue = currentValue;
                    }
                }, self.options.debounceDelay);
            });
        },

        translate: function (text) {
            const inputText = text !== undefined ? text : this.$source.val();
            const outputText = transliterate(inputText, this.mode);

            this.$target.val(outputText);

            if (typeof this.options.onTranslate === 'function') {
                this.options.onTranslate.call(this, inputText, outputText, this.mode);
            }

            this.$source.trigger('masaram:translated', [inputText, outputText, this.mode]);

            return outputText;
        },

        // ───────────────────────────────────────────────────────────────────────
        // PUBLIC API
        // ───────────────────────────────────────────────────────────────────────

        setMode: function (mode) {
            this.mode = mode;

            // Rebuild keyboard tabs if needed
            if (this.options.keyboard && this.$keyboard) {
                this.$keyboard.remove();
                this.buildKeyboard();
            }

            this.translate();
            return this;
        },

        getMode: function () {
            return this.mode;
        },

        getOutput: function () {
            return this.$target.val();
        },

        setInput: function (text) {
            this.$source.val(text);
            this.translate();
            if (this.options.stat) this.updateStats();
            this.pushHistory(text);
            return this;
        },

        clear: function () {
            this.$source.val('');
            this.$target.val('');
            this.history = [];
            this.historyIndex = -1;
            if (this.options.stat) this.updateStats();
            this.updateToolbarState();
            this.$source.focus();
            return this;
        },

        destroy: function () {
            this.$source.off('.masaramTranslator .masaramKeyboard');
            if (this.$toolbar) this.$toolbar.remove();
            if (this.$stats) this.$stats.remove();
            if (this.$keyboard) this.$keyboard.remove();
            this.$source.unwrap('.masaram-wrapper');
            this.$source.removeData('masaramTranslator');
        },

        handleError: function (message) {
            console.error('MasaramTranslator:', message);
            if (typeof this.options.onError === 'function') {
                this.options.onError.call(this, message);
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // JQUERY PLUGIN WRAPPER
    // ═══════════════════════════════════════════════════════════════════════════

    $.fn.masaramTranslator = function (options) {
        const args = arguments;

        if (typeof options === 'string') {
            const methodName = options;
            const methodArgs = Array.prototype.slice.call(args, 1);
            let returnValue;

            this.each(function () {
                const instance = $(this).data('masaramTranslator');
                if (instance && typeof instance[methodName] === 'function') {
                    returnValue = instance[methodName].apply(instance, methodArgs);
                }
            });

            return returnValue !== undefined ? returnValue : this;
        }

        return this.each(function () {
            if (!$(this).data('masaramTranslator')) {
                new MasaramTranslator(this, options);
            }
        });
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // STATIC METHODS
    // ═══════════════════════════════════════════════════════════════════════════

    $.masaramTranslator = {
        version: '4.0.0',

        translate: function (text, mode) {
            return transliterate(text, mode);
        },

        autoInit: function (options) {
            const dataAttr = (options && options.dataAttribute) || 'masaram-translator';

            $('[data-' + dataAttr + '="input"], [data-' + dataAttr + '="source"], [data-' + dataAttr + '="true"]').each(function () {
                const $source = $(this);
                const mode = $source.data(dataAttr + '-mode') || $source.data('mode') || 'en-gonm';
                const targetSelector = $source.data(dataAttr + '-target') || $source.data('target');
                const stat = $source.data(dataAttr + '-stat') !== undefined ? $source.data(dataAttr + '-stat') : false;
                const maxLength = $source.data(dataAttr + '-maxlength') || 500;
                const tool = $source.data(dataAttr + '-tool') !== undefined ? $source.data(dataAttr + '-tool') : false;
                const keyboard = $source.data(dataAttr + '-keyboard') !== undefined ? $source.data(dataAttr + '-keyboard') : false;

                $source.masaramTranslator($.extend({}, options, {
                    target: targetSelector,
                    mode: mode,
                    stat: stat,
                    maxLength: maxLength,
                    tool: tool,
                    keyboard: keyboard
                }));
            });
        },

        init: function (source, target, mode, options) {
            const $source = $(source);
            return $source.masaramTranslator($.extend({}, options, {
                target: target,
                mode: mode || 'en-gonm'
            }));
        },

        modes: ['en-gonm', 'hi-gonm', 'gonm-en', 'gonm-hi']
    };

    // Auto-init on document ready
    $(document).ready(function () {
        $.masaramTranslator.autoInit();
    });

})(jQuery);