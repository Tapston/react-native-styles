import { Dimensions, PixelRatio } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * @property {number} designWidth - Width of design. Default is 414 (iPhone 11 Pro Max).
 * @property {number} designHeight - Height of design. Default is 896 (iPhone 11 Pro Max).
 * @property {number} minimalFactor - Factor is the value that all numeric styles are multiplied by. Default minimal factor is 1
 */
const CONFIG = {
  designWidth: 414,
  designHeight: 896,
  minimalFactor: 1.2,
};

/**
 * Make your styles very similar for any device screen.
 * The class makes numeric styles relative to device width and height.
 *
 * Create new class instance and use the instance in your code.
 *
 * If you want to create square or circle, use square property in your styles instead of width and height.
 * Use paddingHorizontal and paddingVertical. The same with margins.
 *
 * @example
 *
 * // You need only one instance for entire code
 * const StylesCreator = new UStyles();
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
export default class RNStyles {
  #designWidth = null;
  #designHeight = null;
  #minimalFactor = null;

  #factorWidth = null;
  #factorHeight = null;
  #factorAverage = null;

  /**
   * @param {CONFIG} config - configuration of the module
   */
  constructor(config) {
    const { height, width } = Dimensions.get('window');

    this.#designWidth = config?.designWidth || CONFIG.designWidth;
    this.#designHeight = config?.designHeight ||  CONFIG.designHeight;
    this.#minimalFactor = config?.minimalFactor || CONFIG.minimalFactor;

    const factorWidth = width / this.#designWidth;
    this.#factorWidth = factorWidth < this.#minimalFactor ? (factorWidth + this.#minimalFactor) / 2 : factorWidth;

    const factorHeight = height / this.#designHeight;
    this.#factorHeight =  factorHeight < this.#minimalFactor ? (factorHeight + this.#minimalFactor) / 2 : factorHeight;

    this.#factorAverage = (this.#factorWidth + this.#factorHeight) / 2;
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
              case 'borderRightWidth':
                o[prop] = o[prop];
                break;
              case 'useAverageFactor':
                delete o[prop];
                break;
              case 'staticWidth':
                o.width = o[prop];
                delete o[prop];
                break;
              case 'staticHeight':
                o.height = o[prop];
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

EStyleSheet.build();
