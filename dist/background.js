/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchWeatherData: () => (/* binding */ fetchWeatherData),
/* harmony export */   getWeatherIconUrl: () => (/* binding */ getWeatherIconUrl)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const OPEN_WEATHER_API_KEY = "194da7d471e0c8d52d3def5dbbd07a36";
const fetchWeatherData = (cityName, tempScale) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${tempScale !== null && tempScale !== void 0 ? tempScale : "metric"}&appid=${OPEN_WEATHER_API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    const data = yield response.json();
    return data;
});
function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStoredCities: () => (/* binding */ getStoredCities),
/* harmony export */   getStoredOptions: () => (/* binding */ getStoredOptions),
/* harmony export */   setStoredCities: () => (/* binding */ setStoredCities),
/* harmony export */   setStoredOptions: () => (/* binding */ setStoredOptions)
/* harmony export */ });
const setStoredCities = (cities) => {
    const vals = {
        cities,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};
function getStoredCities() {
    const keys = ["cities"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            var _a;
            resolve((_a = res.cities) !== null && _a !== void 0 ? _a : []);
        });
    });
}
const setStoredOptions = (options) => {
    const vals = {
        options,
    };
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve();
        });
    });
};
const getStoredOptions = () => {
    const keys = ["options"];
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res.options);
        });
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");


chrome.runtime.onInstalled.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCities)([]);
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredOptions)({
        hasOverlay: false,
        homeCity: "",
        tempScale: "metric",
    });
    chrome.contextMenus.create({
        contexts: ["selection"],
        title: "Add City to weather extension",
        id: "weatherExtension ",
    });
    chrome.alarms.create({
        periodInMinutes: 60,
    });
});
chrome.contextMenus.onClicked.addListener((event) => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredCities)().then((cities) => {
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setStoredCities)([...cities, event.selectionText]);
    });
});
chrome.alarms.onAlarm.addListener(() => {
    (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredOptions)().then((options) => {
        if (!options.homeCity) {
            return;
        }
        (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.fetchWeatherData)(options.homeCity, options.tempScale).then((data) => {
            const temp = Math.round(data.main.temp) +
                `${options.tempScale === "metric" ? "\u2103" : "\u2109"}`;
            chrome.action.setBadgeText({
                text: temp,
            });
        });
    });
});

})();

/******/ })()
;
//# sourceMappingURL=background.js.map