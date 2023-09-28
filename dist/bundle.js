/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\r\n    const yearPrice = \"$39.99\";\r\n    const yearlyAccessPrice = \"$0.48\";\r\n    const weeklyAccessPrice = \"$6.99\";\r\n    const userLanguage = navigator.language.slice(0, 2);\r\n    const urlParams = new URLSearchParams(window.location.search);\r\n    const lang = urlParams.get(\"lang\") || userLanguage;\r\n\r\n    function interpolateVariables(translation, variables) {\r\n        return translation.replace(/\\{\\{(\\w+)\\}\\}/g, (match, variableName) => {\r\n            return variables[variableName] || match;\r\n        });\r\n    }\r\n\r\n    function applyTranslations(translations) {\r\n        const elementsWithTranslations = document.querySelectorAll(\"[data-translate]\");\r\n        let isSecondTime = false;\r\n    \r\n        elementsWithTranslations.forEach((element) => {\r\n            const translationKey = element.getAttribute(\"data-translate\");\r\n            let replacedTranslation = translations[translationKey];\r\n    \r\n            if (translationKey === \"Just {{price}} per year\") {\r\n                replacedTranslation = interpolateVariables(replacedTranslation, { price: yearPrice });\r\n            }\r\n    \r\n            if (translationKey === \"{{price}} <br>per week\" && !isSecondTime) {\r\n                replacedTranslation = interpolateVariables(replacedTranslation, { price: yearlyAccessPrice });\r\n                isSecondTime = true;\r\n            }\r\n    \r\n            if (translationKey === \"{{price}} <br>per week\" && isSecondTime) {\r\n                replacedTranslation = interpolateVariables(replacedTranslation, { price: weeklyAccessPrice });\r\n            }\r\n    \r\n            element.innerHTML = replacedTranslation || translations[translationKey];\r\n        });\r\n    }\r\n\r\n    if (lang) {\r\n        document.documentElement.classList.add(`lang-${lang}`);\r\n        fetch(`data/${lang}.json`)\r\n            .then((response) => {\r\n                if (!response.ok) {\r\n                    document.documentElement.classList.add(`lang-en`);\r\n                    return fetch('data/en.json')\r\n                    .then((response) => response.json());\r\n                }\r\n                return response.json();\r\n            })\r\n            .then((translations) => {\r\n                applyTranslations(translations);\r\n            })\r\n            .catch((error) => {\r\n                console.error(`Error loading translations: ${error}`);\r\n            });\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://bp/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;