// Processar imagem com um Kernel
function convolucao(image, ker) {
	var ker = ker.kernel;
	var dim = Math.sqrt(ker.length);
	imageOut = image.clone()
	const pad = Math.floor(dim / 2);
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

// Energias
function energia(imagem) {
	// Populate the first row of the map by just copying the energies
	// from the energy map.
	energiaMapa = imagem.imageData.data;
	var w = imagem.width;
	var h = imagem.height
	console.log(imagem)
	//Primeira linha eu repito a energia total
	var EnergiaTotal = new Array(h * w).fill(0);
	console.log(EnergiaTotal)
	for (let x = 0; x < w; x++) {
		EnergiaTotal[x] = energiaMapa[4 * x]
	}

	// Seguindo para as demais linhas
	//Para cada linha, a partir da segunda, até altura total da imagem
	for (let y = 1; y < h; y++) {
		//EM cada linha vou varrer todas as colunas
		for (let x = 0; x < w; x++) {
			// Vou agora encontrar a celula acima e adjacente com menor energia.
			//Inicializo variaveis auxiliares
			var minPrevEnergy = Infinity;
			var minPrevX = x;
			// Indice i vai de -1 a +1. Só celulars adjacentes
			for (let i = (x - 1); i <= (x + 1); i++) {
				// Vejo se i leva a celulas dentro da imagem. 
				if (i >= 0 && i < w && energiaMapa[ (x*(y-1) + x + i) * 4] < minPrevEnergy) {
					minPrevEnergy = energiaMapa[ (x*(y-1) + x + i) * 4];
					minPrevX = i;
				}
			}

			// Grava a Energia da Celula
			EnergiaTotal[y * w + x] += minPrevEnergy
		}
	}
	console.log(EnergiaTotal.reduce(function (p, v) { return (p > v ? p : v) }));


};
