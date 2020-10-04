# @tapston/react-native-styles
## Make your styles very similar for any device screen 📱

### Installation

`yarn add @tapston/react-native-styles`

### Usage
- Import
```js
import RNStyles from 'react-native-responsive-styles';
```
- Define a new instance of RNStyles
```js
// You need only one instance for entire code
const StylesCreator = new RNStyles({
  designWidth: 414,
  designHeight: 896,
  minimalFactor: 1,
});

// designWidth - Width of design. Default is 414 (iPhone 11 Pro Max).
// designHeight - Height of design. Default is 896 (iPhone 11 Pro Max).
// minimalFactor - Factor is the value that all numeric styles are multiplied by. Default minimal factor is 1.
```
- Create your style
```js
const myStyles = StylesCreator.create({
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
- If you want to change ALL the sizes entire your project just change minimalFactor in constructor
```js
{
  ...,
  minimalFactor: 1.2, // To increase the size of all elements by 20%
}
```
