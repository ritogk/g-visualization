/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/ts/pages/GAnalys/services/trigonometric.ts":
/*!**************************************************************!*\
  !*** ./resources/ts/pages/GAnalys/services/trigonometric.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pointToAtan2": () => (/* binding */ pointToAtan2),
/* harmony export */   "rotate3dVector": () => (/* binding */ rotate3dVector),
/* harmony export */   "thetaToAngled": () => (/* binding */ thetaToAngled)
/* harmony export */ });
/**
 * 三角関数に関するモジュール
 */

/**
 * 指定された x-y 座標のアークタンジェントを返します。
 * アークタンジェントとは、x 軸から、原点 0 と x 座標、y 座標で表される点を結んだ直線までの角度のことです。
 * http://www.sourcenext.com/manual/pc_ofc_001233/Calc/function/mathematics/atan2.htm
 * @param
 * @return θ
 *
 */
function pointToAtan2(p) {
  var atan2 = Math.atan2(p.x, p.y); // 戻り値が正の数なら x 軸から反時計回りの角度を表し、負の数なら x 軸から時計回りの角度を表します。

  if (atan2 < 0) {
    return 360 + thetaToAngled(atan2);
  } else {
    return thetaToAngled(atan2);
  }
}
/**
 * θを角度に変換します、
 * @param θ
 * @param 角度
 */


function thetaToAngled(theta) {
  return theta / (Math.PI / 180);
}
/**
 * 3次元ベクトルの回転を行う。
 *
 * @param number $vector_x
 * @param number $vector_y
 * @param number $vector_z
 * @param number $angle_x
 * @param number $angle_y
 * @param number $angle_z
 * @return {x:number, y:number, z:number}
 */


var rotate3dVector = function rotate3dVector(vector_x, vector_y, vector_z, angle_x, angle_y, angle_z) {
  // ３次元回転行列の公式が右回りなのでマイナス角度の場合は変換処理を挟む。
  // z軸は0-360度なので変換は不要。
  if (angle_x < 0) {
    angle_x = 360 + angle_x;
  }

  if (angle_y < 0) {
    angle_y = 360 + angle_y;
  } // 角度→ラジアンに変換


  var razian_x = angle_x * (Math.PI / 180);
  var razian_y = angle_y * (Math.PI / 180);
  var razian_z = angle_z * (Math.PI / 180); // x軸周りに右回転した座標を取得する表現行列

  var matrix_x = [[1, 0, 0], [0, Math.cos(razian_x), -Math.sin(razian_x)], [0, Math.sin(razian_x), Math.cos(razian_x)]]; // // y軸周り右回転した座標を取得する表現行列

  var matrix_y = [[Math.cos(razian_y), 0, Math.sin(razian_y)], [0, 1, 0], [-Math.sin(razian_y), 0, Math.cos(razian_y)]]; // z軸周りに右回転した座標を取得する表現行列

  var matrix_z = [[Math.cos(razian_z), -Math.sin(razian_z), 0], [Math.sin(razian_z), Math.cos(razian_z), 0], [0, 0, 1]];
  /**
   * 回転行列を使ってベクトルの回転を行う。
   *
   * @param number[][] matrix
   * @param number[] vector
   * @return {x:number, y:number, z:number}
   */

  var calc = function calc(matrix, vector) {
    return {
      x: matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
      y: matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
      z: matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2]
    };
  }; // x軸回りの回転


  var rotational_vector = calc(matrix_x, [vector_x, vector_y, vector_z]); // y軸回りの回転

  rotational_vector = calc(matrix_y, [rotational_vector.x, rotational_vector.y, rotational_vector.z]); // z軸回りの回転

  rotational_vector = calc(matrix_z, [rotational_vector.x, rotational_vector.y, rotational_vector.z]);
  return {
    x: rotational_vector.x,
    y: rotational_vector.y,
    z: rotational_vector.z
  };
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************************!*\
  !*** ./resources/ts/pages/GAnalys/worker/vectorRotate.ts ***!
  \***********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_GAnalys_services_trigonometric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/pages/GAnalys/services/trigonometric */ "./resources/ts/pages/GAnalys/services/trigonometric.ts");
/**
 * 三次元ベクトルの回転処理
 * ※worker用
 */

var w = self;

w.onmessage = function (event) {
  var data = event.data;
  var rotate_acceration = (0,_pages_GAnalys_services_trigonometric__WEBPACK_IMPORTED_MODULE_0__.rotate3dVector)(data.x, data.y, data.z, data.angle_x, data.angle_y, data.angle_z);
  w.postMessage(rotate_acceration);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (w);
})();

/******/ })()
;