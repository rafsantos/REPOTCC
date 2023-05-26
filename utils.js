
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

RafImage.prototype.draw = function (canvas, x, y, alphaCombination) {
	if (x == null) { x = 0; }
	if (y == null) { y = 0; }
	canvas.getContext("2d").putImageData(this.imageData, x, y);
};


RafImage.prototype.convolucao = function (image, ker) {

	var ker = kernel.kernel;
	var dim = Math.sqrt(kernel);

	imageOut = image.clone()

	const pad = Math.floor(dim / 2);
	const cw = image.width + pad * 2; // add padding
	const ch = image.height + pad * 2;

	for (let y = pad; y < image.height - pad; y++) {
		for (let x = pad; x < image.width - pad; x++) {

			r = 0;
			g = 0;
			b = 0;

			for (let ky = -pad; ky <= pad; ky++) {
				for (let kx = -pad; kx <= pad; kx++) {

					i = (ky + pad) * dim + (kx + pad); //kernel

					r += image.getR(x + kx, y + ky) * ker[i];
					g += image.getG(x + kx, y + ky) * ker[i];
					b += image.getB(x + kx, y + ky) * ker[i];

				}
			}

			imageOut.setIntColor(x, y, 255, r, g, b);
		}
	}
	return imageOut;
}


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

// Processar imagem com um Kernel
function processar(image, kernel) {

	var ker = kernel.kernel;
	var dim = kernel.dim;

	imageOut = image.clone()

	const pad = Math.floor(dim / 2);
	const cw = image.width + pad * 2; // add padding
	const ch = image.height + pad * 2;

	for (let y = pad; y < image.height - pad; y++) {
		for (let x = pad; x < image.width - pad; x++) {

			r = 0;
			g = 0;
			b = 0;

			for (let ky = -pad; ky <= pad; ky++) {
				for (let kx = -pad; kx <= pad; kx++) {

					i = (ky + pad) * dim + (kx + pad); //kernel

					r += image.getR(x + kx, y + ky) * ker[i];
					g += image.getG(x + kx, y + ky) * ker[i];
					b += image.getB(x + kx, y + ky) * ker[i];

				}
			}

			imageOut.setIntColor(x, y, 255, r, g, b);
		}
	}

	return imageOut


}