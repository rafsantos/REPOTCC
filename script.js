// Processar imagem com um Kernel
 function convolucao(image, ker) {
	var ker = ker.kernel;
	var dim = Math.sqrt(ker.length);
	imageOut = image.clone()
	const pad = Math.floor(dim / 2);
	//const cw = image.width + pad * 2; // add padding
	//const ch = image.height + pad * 2;

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
};

// Transformar imagem em Preto e Branco

 function pretoeBranco(image) {
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
};