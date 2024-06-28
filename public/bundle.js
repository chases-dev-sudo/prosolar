/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction fetchGeoTiffFromServer(apiKey, address) {\n    return __awaiter(this, void 0, void 0, function () {\n        var response, data;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, fetch('/api/solar', {\n                        method: 'POST',\n                        headers: {\n                            'Content-Type': 'application/json'\n                        },\n                        body: JSON.stringify({ apiKey: apiKey, address: address })\n                    })];\n                case 1:\n                    response = _a.sent();\n                    if (!response.ok) {\n                        throw new Error(\"Error fetching GeoTIFF data: \".concat(response.statusText));\n                    }\n                    return [4 /*yield*/, response.json()];\n                case 2:\n                    data = _a.sent();\n                    return [2 /*return*/, data];\n            }\n        });\n    });\n}\nfunction generateSummary(data) {\n    var summary = \"\\n    Location: \".concat(data.name, \", \").concat(data.administrativeArea, \", \").concat(data.postalCode, \", \").concat(data.regionCode, \"\\n    Imagery Date: \").concat(data.imageryDate.year, \"-\").concat(data.imageryDate.month, \"-\").concat(data.imageryDate.day, \"\\n    Maximum Array Panels Count: \").concat(data.solarPotential.maxArrayPanelsCount, \"\\n    Maximum Array Area (m\\u00B2): \").concat(data.solarPotential.maxArrayAreaMeters2, \"\\n    Maximum Sunshine Hours Per Year: \").concat(data.solarPotential.maxSunshineHoursPerYear, \"\\n    Carbon Offset Factor (kg per MWh): \").concat(data.solarPotential.carbonOffsetFactorKgPerMwh, \"\\n    Roof Area (m\\u00B2): \").concat(data.solarPotential.wholeRoofStats.areaMeters2, \"\\n    Ground Area (m\\u00B2): \").concat(data.solarPotential.wholeRoofStats.groundAreaMeters2, \"\\n  \");\n    return summary;\n}\nfunction displaySolarInfo(data) {\n    var container = document.getElementById('canvas-container');\n    container.innerHTML = '';\n    var summary = generateSummary(data);\n    var summaryElement = document.createElement('pre');\n    summaryElement.textContent = summary;\n    container.appendChild(summaryElement);\n    var imageUrl = createImageUrl(data); // Function to create the image URL\n    var linkElement = document.createElement('a');\n    linkElement.href = imageUrl;\n    linkElement.textContent = 'View Solar Panel Configuration Image';\n    linkElement.target = '_blank';\n    container.appendChild(linkElement);\n}\nfunction createImageUrl(data) {\n    // Process the GeoTIFF data and generate the image URL\n    // For demonstration purposes, this function will return a dummy URL\n    // In a real application, you would generate the image URL based on the data\n    return 'https://dummyimage.com/600x400/000/fff';\n}\nfunction handleFormSubmit(event) {\n    return __awaiter(this, void 0, void 0, function () {\n        var apiKey, address, geoTiff, error_1;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    event.preventDefault();\n                    apiKey = document.getElementById('api-key').value;\n                    address = document.getElementById('address').value;\n                    _a.label = 1;\n                case 1:\n                    _a.trys.push([1, 3, , 4]);\n                    return [4 /*yield*/, fetchGeoTiffFromServer(apiKey, address)];\n                case 2:\n                    geoTiff = _a.sent();\n                    displaySolarInfo(geoTiff);\n                    return [3 /*break*/, 4];\n                case 3:\n                    error_1 = _a.sent();\n                    console.error('Error fetching GeoTIFF data:', error_1);\n                    return [3 /*break*/, 4];\n                case 4: return [2 /*return*/];\n            }\n        });\n    });\n}\ndocument.getElementById('solar-form').addEventListener('submit', handleFormSubmit);\n\n\n//# sourceURL=webpack://visualize-geotiff/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;