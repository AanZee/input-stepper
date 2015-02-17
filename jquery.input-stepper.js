// jquery.input-stepper.js
// ------------------------------------------------------
// Author: Jeroen Ransijn - Aan Zee
;(function (root, $, undefined) {

	var pluginName = "inputStepper";
	var defaults = {
		selectorButtonIncrease: '[data-input-stepper-increase]',
		selectorButtonDecrease: '[data-input-stepper-decrease]',
		dataAttributeIncrease: 'input-stepper-increase',
		dataAttributeDecrease: 'input-stepper-decrease',
		classNameDisabled: 'is-disabled',
		selectorInput: 'input',
		initialValue: null,
		min: 0,
		max: Infinity
	};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		return this.init();
	}

	Plugin.prototype = {

		init: function () {
			var _this = this;

			// Cache elements
			this.$el = $(this.element);
			this.$input = this.$el.find(this.options.selectorInput);
			this.$decreaseButton = this.$el.find(this.options.selectorButtonDecrease);
			this.$increaseButton = this.$el.find(this.options.selectorButtonIncrease);

			this.min = this.$input.attr('min') || this.options.min;
			this.max = this.$input.attr('max') || this.options.max;

			this.initialValue = this.getValue() || this.options.initialValue || this.min;

			this.setValue(this.initialValue, true);
			this.checkState();

			this.$input.attr('pattern', '[0-9]*');

			// Bind events
			this.$input.on('keydown', this.onKeyDown.bind(this) );

			this.$input.on('change', this.onChange.bind(this) );

			this.$increaseButton.on('click', function (e) {
				e.preventDefault();
				_this.increase( $(this).data( _this.options.dataAttributeIncrease ) || 1 );
			});
			this.$decreaseButton.on('click', function (e) {
				e.preventDefault();
				_this.decrease( $(this).data('input-stepper-decrease') || 1 );
			});

			return this;
		},

		onChange: function (e) {
			if (this.getValue() === '') {
				this.setValue( this.initialValue );
			} else {
				this.setValue( this.getValue() );
			}

			return this;
		},

		onKeyDown: function (e) {
			// Inspired by:
			// http://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery

			// Allow: backspace, delete, tab, escape, enter and .
			var isEnterKey = e.keyCode == 13;

			if (isEnterKey) {
				this.setValue(this.getValue());
				return e.preventDefault();
			}

			var isSomeKeys = $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1;
			// Allow: keyboard shortcuts
			var isMeta = e.metaKey || e.altKey || e.ctrlKey;
			// Allow: home, end, left, right
			var isHomeEndLeftRight = (e.keyCode >= 35 && e.keyCode <= 39);

			var isUpKey = e.keyCode == 38;
			var isDownKey = e.keyCode == 40;

			if (isUpKey) this.increase( (e.shiftKey ? 10 : 1) );
			if (isDownKey) this.decrease( (e.shiftKey ? 10 : 1) );

			if (isSomeKeys || isMeta || isHomeEndLeftRight) return;

			// Ensure that it is a number and stop the keypress
			if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
				// Numbers 0-9
				this.setValue(this.getValue());
			}
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) ) {

				e.preventDefault();
			}

			return this;
		},

		getValue: function () {
			return this.$input.val();
		},

		setValue: function (amount, isSilent) {
			amount = parseInt(amount, 10);

			if (this.amount === parseInt(amount, 10) ) return;

			this._setValue(amount, isSilent);
		},

		_setValue: function (amount, isSilent) {
			if (amount !== '') {
				this.amount = parseInt(amount, 10);
			} else {
				this.amount = this.initialValue;
			}

			if (this.amount >= this.max) {
				this.amount = parseInt(this.max, 10);
			}

			if (this.amount <= this.min) {
				this.amount = parseInt(this.min, 10);
			}

			if ( ! isSilent) {
				this.$input.val(this.amount).trigger('change');
			} else {
				this.$input.val(this.amount);
			}

			this.checkState();

			return this;
		},

		setMin: function (min) {
			this.min = parseInt(min, 10);
			this._setValue(this.getValue());
		},

		setMax: function (max) {
			this.max = parseInt(max, 10);
			this._setValue(this.getValue());
		},

		increase: function (amount) {
			if (this.$increaseButton.hasClass( this.options['classNameDisabled'] )) return;
			var newAmount = parseInt(this.amount + (amount || 1), 10);

			this.setValue(newAmount);
			this.$input.trigger('increase', [amount, this]);

			return this;
		},

		decrease: function (amount) {
			if (this.$decreaseButton.hasClass( this.options['classNameDisabled'] )) return;
			var newAmount = parseInt(this.amount - (amount || 1), 10);

			this.setValue(newAmount);
			this.$input.trigger('decrease', [amount, this]);

			return this;
		},

		disableButton: function ($button) {
			$button.addClass( this.options['classNameDisabled'] ).attr('disabled', true);
			return this;
		},

		enableButton: function ($button) {
			$button.removeClass( this.options['classNameDisabled'] ).attr('disabled', false);
			return this;
		},

		checkState: function () {
			if (this.amount <= this.min) {
				this.disableButton( this.$decreaseButton );
			} else {
				this.enableButton( this.$decreaseButton );
			}

			if (this.amount >= this.max) {
				this.disableButton( this.$increaseButton );
			} else {
				this.enableButton( this.$increaseButton );
			}

			return this;
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( ! $.data(this, "plugin-" + pluginName)) {
				$.data(this, "plugin-" + pluginName,
					new Plugin( this, options ));
				}
		});
	};

})(window, jQuery);
