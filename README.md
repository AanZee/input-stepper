# jquery.input-stepper.js
> Lightweight input stepper for real world usage


## Features
- Works on input type="text"
- Only supports positive integers (0 - Infinity)
- Set initial values in the markup or Javascript
- Optionally configure min/max values with attributes
- Supports keyboard interaction (increase/decrease by 10 by holding shift)
- Enables number pad on mobile browsers

## Install
Download and include the javascript file.
```html
<script src="jquery.input-stepper.js"></script>
```

## Basic usage
Check out `index.html` for all examples.

```html
<div class="input-stepper">
	<button data-input-stepper-decrease>-</button>
	<input type="text">
	<button data-input-stepper-increase>+</button>
</div>
```

Call the input stepper plugin on the desired selector

```javascript
$('.input-stepper').inputStepper();
```


## Advanced usage

```html
<div class="input-stepper-advanced">
	<button class="decrease" data-decrease>-1</button>
	<button class="decrease" data-decrease="5">-5</button>
	<button class="decrease" data-decrease="10">-10</button>
	<input type="text" value="50" min="25" max="75">
	<button class="increase" data-increase>+1</button>
	<button class="increase" data-increase="5">+5</button>
	<button class="increase" data-increase="10">+10</button>
</div>
```

Call the input stepper plugin on the desired selector

```javascript
$('.input-stepper-advanced').inputStepper({
	selectorButtonIncrease: '.increase',
	selectorButtonDecrease: '.decrease',
	dataAttributeIncrease: 'increase',
	dataAttributeDecrease: 'decrease'
});
```

## Default settings
The input stepper can be called with a number of options. The defaults of each option are listed below

```javascript
$('.input-stepper').inputStepper({

	// Values in the markup always overwrite this settings
	initialValue: null,
	min: 0,
	max: Infinity

	// The selector for the input
	selectorInput: 'input',

	// Selectors for the increase/decrease buttons
	selectorButtonIncrease: '[data-input-stepper-increase]',
	selectorButtonDecrease: '[data-input-stepper-decrease]',

	// Optional data attribtus to check for how much to increase/decrease
	dataAttributeIncrease: 'input-stepper-increase',
	dataAttributeDecrease: 'input-stepper-decrease',

	// Classname added to increase/decrease buttons when they are disabled
	// The disabled property is also set
	classNameDisabled: 'is-disabled'
});
```

## Custom events on the input element
If your application listens change events on the input element, it can now also listen to increase/decrease events on the input element.

```html
<div class="input-stepper">
	<button data-input-stepper-decrease>-</button>
	<input id="some-input" type="text">
	<button data-input-stepper-increase>+</button>
</div>
```

```javascript
$('#some-input').on('increase', function (e, amount, plugin) {
	alert('increase with: ' + amount);
});

$('#some-input').on('decrease', function (e, amount, plugin) {
	alert('decrease with: ' + amount);
});
```

## Authors
This plugin is released by Aan Zee and is mainly developed by (Jeroen Ransijn)[https://github.com/jeroenransijn]
