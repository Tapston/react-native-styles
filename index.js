import { Dimensions, PixelRatio } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * @property {number} designWidth - Width of your design. Default value is 428 (iPhone 12 Pro Max).
 * @property {number} designHeight - Height of your design. Default value is 926 (iPhone 12 Pro Max).
 * @property {number} minimalFactor - Factor is the value all numeric styles are multiplied by. The default minimal factor is 1.
 */
const CONFIG = {
  designWidth: 428,
  designHeight: 926,
  minimalFactor: 1,
};

/**
 * Make your styles very similar for any device screen.
 *
 * If you want to create a square or a circle, use the square property in your styles instead of width and height.
 * Use paddingHorizontal and paddingVertical. The same with margins.
 *
 * @example
 *
 * const myStyles = StylesCreator.create({
 *   // Get a rectangle if the screen of your device is not square
 *   container: {
 *     width: 100,
 *     height: 100,
 *   },
 *   // Square with average relativity to width and height
 *   squareContainer: {
 *     square: 100,
 *   },
 * });
 */
class RNStyles {
  #designWidth = null;
  #designHeight = null;
  #minimalFactor = null;

  #factorWidth = null;
  #factorHeight = null;
  #factorAverage = null;
  
  #pluginInited = false;

  constructor() {
    this.init();
  }
  /**
   * @param {CONFIG} config - configuration of the module
   */

  init(config) {
    const { height, width } = Dimensions.get('window');

    this.#designWidth = config?.designWidth || CONFIG.designWidth;
    this.#designHeight = config?.designHeight || CONFIG.designHeight;
    this.#minimalFactor = config?.minimalFactor || CONFIG.minimalFactor;

    const factorWidth = width / this.#designWidth;
    this.#factorWidth =
      factorWidth < this.#minimalFactor
        ? (factorWidth + this.#minimalFactor) / 2
        : factorWidth;

    const factorHeight = height / this.#designHeight;
    this.#factorHeight =
      factorHeight < this.#minimalFactor
        ? (factorHeight + this.#minimalFactor) / 2
        : factorHeight;

    this.#factorAverage = (this.#factorWidth + this.#factorHeight) / 2;
    this.#pluginInited = true;
  }
  /**
   * Make number relative by width
   * @param {number} n - number to refactoring
   * @returns {number}
   */
  w(n) {
    return PixelRatio.roundToNearestPixel(this.#factorWidth * n);
  }

  /**
   * Make number relative by height
   * @param {number} n - number to refactoring
   * @returns {number}
   */
  h(n) {
    return PixelRatio.roundToNearestPixel(this.#factorHeight * n);
  }

  /**
   * Make number relative by average of width and height
   * @param {number} n - number to refactoring
   * @returns {number}
   */
  wh(n) {
    return PixelRatio.roundToNearestPixel(this.#factorAverage * n);
  }

  /**
   * Modifying styles with w, h and wh
   * @param {object} obj - styles object
   * @private
   */
  __modify(obj) {
    const getProp = (o, withFactorAverage = false) => {
      for (let prop in o) {
        if (typeof o[prop] === 'object') {
          getProp(o[prop], !!o[prop].useAverageFactor);
        } else {
          if (typeof o[prop] !== 'string') {
            switch (prop) {
              case 'useAverageFactor':
                delete o[prop];
                break;
              case 'fontSize':
              case 'lineHeight':
              case 'height':
              case 'paddingVertical':
              case 'paddingTop':
              case 'paddingBottom':
              case 'marginVertical':
              case 'marginTop':
              case 'marginBottom':
              case 'borderBottomLeftRadius':
              case 'borderBottomRighRadius':
              case 'borderTopLeftRadius':
              case 'borderTopRightRadius':
              case 'top':
              case 'bottom':
                if (!withFactorAverage) {
                  o[prop] = this.h(o[prop]);
                } else {
                  o[prop] = this.wh(o[prop]);
                }
                break;
              case 'paddingHorizontal':
              case 'width':
              case 'paddingLeft':
              case 'paddingRight':
              case 'marginHorizontal':
              case 'marginLeft':
              case 'marginRight':
              case 'right':
              case 'left':
              case 'minWidth':
                if (!withFactorAverage) {
                  o[prop] = this.w(o[prop]);
                } else {
                  o[prop] = this.wh(o[prop]);
                }
                break;
              case 'square':
                o.width = this.wh(o[prop]);
                o.height = this.wh(o[prop]);
                delete o[prop];
                break;
              case 'borderRadius':
                o[prop] = this.wh(o[prop]);
            }
          } else {
            if (!isNaN(o[prop])) {
              if (prop !== 'fontWeight') {
                o[prop] = Number(o[prop]);
              }
            }
          }
        }
      }
    };

    getProp(obj);

    return obj;
  }

  /**
   * Create object of EStyleSheet styles using UStyles
   * @param {object} obj - object of styles
   * @returns {EStyleSheet.AnyObject}
   */
  create(obj) {
    return EStyleSheet.create(this.__modify(obj));
  }
}

export default new RNStyles();

EStyleSheet.build();
