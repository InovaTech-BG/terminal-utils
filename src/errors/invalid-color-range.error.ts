export class InvalidColorRangeError extends Error {
	private _8bitColor = {
		is: false,
		value: -1,
	};
	private _r = {
		is: false,
		value: -1,
	};
	private _g = {
		is: false,
		value: -1,
	};
	private _b = {
		is: false,
		value: -1,
	};

	constructor(
		wrongColor:
			| number
			| {
					r: number;
					g: number;
					b: number;
			  },
	) {
		super("The color is out of the range: 0-255");

		if (typeof wrongColor === "number") {
			this._8bitColor = {
				is: true,
				value: wrongColor,
			};
		} else {
			this._r = {
				is: true,
				value: wrongColor.r,
			};
			this._g = {
				is: true,
				value: wrongColor.g,
			};
			this._b = {
				is: true,
				value: wrongColor.b,
			};
		}
	}

	get is8BitColor() {
		return this._8bitColor.is;
	}

	get eightBitColor() {
		return this._8bitColor.value;
	}

	get rgb() {
		return {
			r: this._r.value,
			g: this._g.value,
			b: this._b.value,
		};
	}

	get isRGB() {
		return this._r.is || this._g.is || this._b.is;
	}

	get r() {
		return this._r.value;
	}

	get g() {
		return this._g.value;
	}

	get b() {
		return this._b.value;
	}

	markR() {
		this._r.is = true;
	}

	markG() {
		this._g.is = true;
	}

	markB() {
		this._b.is = true;
	}
}
