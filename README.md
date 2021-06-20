# @tapston/react-native-styles

### Make your styles very similar for any device screen 📱


## Installation

`yarn add @tapston/react-native-styles`


## Usage
- Import
```js
import RNStyles from '@tapston/react-native-styles';
```
- Initialize you config for RNStyles in index.js
```js
// If you need your own config:
RNStyles.init({
  designWidth: 428, // default value is 428
  designHeight: 926, // default value is 926
  minimalFactor: 1, // default value is 1
});
// designWidth - Width of your design. Default value is 414 (iPhone 12 Pro Max).
// designHeight - Height of your design. Default value is 896 (iPhone 12 Pro Max).
// minimalFactor - Factor is the value all numeric styles are multiplied by. The default minimal factor is 1.
```
## Create your styles
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
### Static values
If you want your value to be static, use a string value instead of a number
```js
{
  width: '100', // Width will be equal to 100 on all devices
  height: 100, //  Height will depend on the size of a device
}
```
### screenHeight or screenWidth
If you want to use screenHeight or screenWidth in your project, please look at the example:
```js
// In your global styles.js file:
const { width, height } = Dimensions.get('window');
export const screenWidth = width;
export const screenHeight = height;
// In your screen-view.js file:
import { screenWidth, screenHeight } from '../../styles';
...
{
  width: `${screenWidth / 2}`,
  height: `${screenHeight + 24}`,
}
```
### Factor (multiplier)
If you want to change all the sizes of the entire project, change minimalFactor in the constructor
```js
{
  ...,
  minimalFactor: 1.2, // To increase the size of all elements by 20%
}
```
### Percents
```js
  block: {
    width: '75%',
  },
```
### Media queries
```js
  block: {
    width: '75%',
    '@media (min-width: 375) and ios': {
      width: '50%',
      height: 36,
      borderRadius: '6',
    },
  },
```
  Media queries can operate with the following values:
  - media type: ios/android
  - width, min-width, max-width
  - height, min-height, max-height
  - orientation (landscape/portrait)
  - aspect-ratio
  - direction (ltr/rtl)
### Math operations
```js
  container: {
    maxWidth: 4 * (192 + (96/2)),
  },
```
## Q&A
If you have any troubles with 'react-native-extended-stylesheet', try to:
`yarn add react-native-extended-stylesheet`
