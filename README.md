# @tapston/react-native-styles
## Make your styles very similar for any device screen 📱

### Installation

`yarn add @tapston/react-native-styles`

### Usage
- Import
```js
import RNStyles from '@tapston/react-native-styles';
```
- Initialize you config for RNStyles in index.js
```js
// If you need your own config
RNStyles.init({
  designWidth: 428, // default 414
  designHeight: 926, // default 896
  minimalFactor: 1, // default 1
});

// designWidth - Width of your design. Default value is 414 (iPhone 12 Pro Max).
// designHeight - Height of your design. Default value is 896 (iPhone 12 Pro Max).
// minimalFactor - Factor is the value all numeric styles are multiplied by. Default minimal factor is 1.
```
- Create your style
```js
const myStyles = RNStyles.create({
  // Get a rectangle if the screen of your device is not square
  container: {
    width: 100,
    height: 100,
  },
  // Square with average relativity to width and height
  squareContainer: {
    square: 100,
  },
});
```
- If you want static values for style use string value instead of number value
```js
{
  width: '100', // Width will be equal to 100 on all devices
  height: 100, //  Height will be different depending on the size of a device
}
```
- If you want to change ALL the sizes entire your project just change minimalFactor in constructor
```js
{
  ...,
  minimalFactor: 1.2, // to increase the size of all elements by 20%
}
```
