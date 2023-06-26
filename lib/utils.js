
function RafImage(width, height) {
	// properties
	this.image = null;
	this.canvas = null;
	this.ctx = null;
	this.data = null;

	if (width != null) {
		this.create(width, height);
	}
}



RafImage.prototype.create = function (width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = width;
	this.canvas.height = height;
	this.ctx = this.canvas.getContext("2d");
	this.imageData = this.ctx.getImageData(0, 0, width, height);
	this.width = width;
	this.height = height;
};

RafImage.prototype.load = function (url, callback) {
	this.onload = callback;
	this.image = new Image();
	var ref = this;
	this.image.onload = function () { ref.callbackImageLoaded(ref) };
	this.image.crossOrigin = "anonymous";
	this.image.src = url;
};

RafImage.prototype.callbackImageLoaded = function (RafImage) {
	RafImage.width = RafImage.image.width;
	RafImage.height = RafImage.image.height;
	RafImage.canvas = document.createElement('canvas');
	RafImage.canvas.width = RafImage.image.width;
	RafImage.canvas.height = RafImage.image.height;
	RafImage.ctx = RafImage.canvas.getContext("2d");
	RafImage.ctx.drawImage(RafImage.image, 0, 0);

	this.imageData = RafImage.ctx.getImageData(0, 0, RafImage.getWidth(), RafImage.getHeight());

	if (RafImage.onload != null) {
		RafImage.onload();
	}
};

RafImage.prototype.clone = function () {
	var image = new RafImage(this.getWidth(), this.getHeight());
	return image;
};

RafImage.prototype.getA = function (x, y) {
	var start = ((y * this.getWidth()) + x) * 4;
	return this.imageData.data[start + 3];
};

RafImage.prototype.setAlphaComponent = function (x, y, alpha) {
	var start = ((y * this.getWidth()) + x) * 4;
	this.imageData.data[start + 3] = alpha;
};

RafImage.prototype.getR = function (x, y) {
	var start = ((y * this.getWidth()) + x) * 4;
	return this.imageData.data[start];
};

RafImage.prototype.getG = function (x, y) {
	var start = ((y * this.getWidth()) + x) * 4;
	return this.imageData.data[start + 1];
};

RafImage.prototype.getB = function (x, y) {
	var start = ((y * this.getWidth()) + x) * 4;
	return this.imageData.data[start + 2];
};

RafImage.prototype.getArrayXY = function (array, x, y) {
	var start = ((y * this.getWidth()) + x);
	return array[start];
};

RafImage.prototype.getColor = function (x, y) {
	var start = ((y * this.getWidth()) + x) * 4;

	return 0x100000000 +
		(this.imageData.data[start + 3] << 24) +
		(this.imageData.data[start] << 16) +
		(this.imageData.data[start + 1] << 8) +
		(this.imageData.data[start + 2]);
};

RafImage.prototype.setBinaryColor = function (x, y, value) {
	var pos = ((y * this.getWidth()) + x);
	this.arrBinaryColor[pos] = value;
};

RafImage.prototype.getBinaryColor = function (x, y) {
	var pos = ((y * this.getWidth()) + x);
	return this.arrBinaryColor[pos];
};

RafImage.prototype.setIntColor = function (x, y, alpha, r, g, b) {
	var start = ((y * this.getWidth()) + x) * 4;
	this.imageData.data[start] = r;
	this.imageData.data[start + 1] = g;
	this.imageData.data[start + 2] = b;
	this.imageData.data[start + 3] = alpha;
};

RafImage.prototype.getWidth = function () {
	return this.width;
};

RafImage.prototype.getHeight = function () {
	return this.height;
};

RafImage.prototype.draw = function (canvas, x, y) {
	if (x == null) { x = 0; }
	if (y == null) { y = 0; }
	canvas.getContext("2d").putImageData(this.imageData, x, y);
};



RafImage.prototype.peb = function (image) {
	imageOut = image.clone()

	for (let y = 0; y < image.height; y++) {
		for (let x = 0; x < image.width; x++) {
			//Red - 30% / Green - 59% / Blue - 11%
			r = image.getR(x, y);
			g = image.getG(x, y);
			b = image.getB(x, y);
			peb = Math.ceil((r * 0.3) + (g * 0.59) + (b * 0.11));
			imageOut.setIntColor(x, y, 255, peb, peb, peb);
		}
	}
	return imageOut;
}


// Funções que separam e retornam as matrizes RGB e grava no atributo da imagem a matriz separada
// Obtem Array com 
RafImage.prototype.getArrayR = function () {
	// Crio os atributos R,G,B para guardar os vetores de valores
	var r = new Uint8ClampedArray(this.getHeight() * this.getWidth());
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			r[start] = this.imageData.data[start*4]
		}
	}
	return r;
}

RafImage.prototype.getArrayG = function () {
	// Crio os atributos R,G,B para guardar os vetores de valores
	var g = new Uint8ClampedArray(this.getHeight() * this.getWidth());
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			g[start] = this.imageData.data[start*4 + 1]
		}
	}
	return g;
}

RafImage.prototype.getArrayB = function () {
	// Crio os atributos R,G,B para guardar os vetores de valores
	var b = new Uint8ClampedArray(this.getHeight() * this.getWidth());
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			b[start] = this.imageData.data[start*4 + 2]
		}
	}
	return b;
}

RafImage.prototype.setArrayR = function (r) {
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			this.imageData.data[start * 4] = r[start];
		}
	}
}

RafImage.prototype.setArrayG = function (g) {
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			this.imageData.data[start * 4 + 1] = g[start + 1];
		}
	}
}

RafImage.prototype.setArrayB = function (b) {
	for (let y = 0; y < this.getHeight(); y++) {
		for (let x = 0; x < this.getWidth(); x++) {
			var start = (x + y * this.getWidth());
			this.imageData.data[start * 4 + 2] = b[start + 2];
		}
	}
}

/////////////////////////
// Objeto Kernel. construtor, normalização, etc.
function Kernel(ker) {
	if (Array.isArray(ker)) {
		if (Math.sqrt(ker.length) % 1 === 0) {
			this.kernel = ker;
		}
	}
	if (ker == null) {
		this.kernel =
			[-1, 0, 1,
			-1, 0, 1,
			-1, 0, 1];
	}
	//Tenho que normalizar o Kernel para preservar brilho da imagem
	//Normalizando Kernel (soma dos elementos = 1)
	//Se a soma dos elementos é 0, retorno
	this.soma = this.kernel.reduce((b, c) => b + c) == 0 ? 1 : this.kernel.reduce((b, c) => b + c);
	this.kernel = this.kernel.map(a => (a / this.soma));
	this.length = this.kernel.length;
	this.dim = Math.sqrt(this.kernel.length);
}


//////////
