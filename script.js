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
function energia(imagem, width, height) {
	// Populate the first row of the map by just copying the energies
	// from the energy map.
	if (imagem.constructor.name == "RafImage" && width == null && height == null) {
		var w = imagem.width;
		var h = imagem.height;
		var energiaMapa = imagem.getArrayR()
		var energiaTotal = new Array(h * w).fill(0);
	}

	if (imagem.constructor.name == "Array" && width != null && height != null) {
		if (imagem.length == width * height) {
			var w = width;
			var h = height;
			var energiaMapa = imagem;
			var energiaTotal = new Array(w * h);
			//console.log("Energia Array entrada" + imagem)

		}
	}

	//Para a primeira linha, eu apenas repito o mapa de energia
	for (let x = 0; x < w; x++) {
		energiaTotal[x] = energiaMapa[x]
	}


	//Para cada linha, a partir da segunda, até altura total da imagem
	for (let y = 1; y < h; y++) {
		//EM cada linha vou varrer todas as colunas
		for (let x = 0; x < w; x++) {
			// Vou agora encontrar a celula acima e adjacente com menor energia.
			//Inicializo variaveis auxiliares
			var menorEnergiaAnterior = Infinity;
			// Indice i vai de -1 a +1. Só celulars adjacentes
			for (let i = (x - 1); i <= (x + 1); i++) {
				if (i >= 0 && i < w && energiaMapa[i + (y - 1) * w] < menorEnergiaAnterior) {
					menorEnergiaAnterior = energiaMapa[i + (y - 1) * w];

				}
			}
			// Grava a Energia da Celula
			energiaTotal[x + y * w] = energiaMapa[x + y * w] + menorEnergiaAnterior;
		}
	}
	console.log(energiaTotal)
	return (energiaTotal);
};

function caminhoMenorEnergia(enTot, width, height) {
	//Encontrar onde termina o caminho de menor energia
	var w = width;
	var h = height;
	var enMin = Infinity;
	var enMinX = 0;
	for (let x = 0; x < w; x++) {
		const y = h - 1
		if (enTot[x + y * w] < enMin) {
			enMinX = x;
			enMin = enTot[x + y * w];
		}
	}
	// A partir da ultima linha, agora preciso montar o caminho de menor energia. Coordenadas
	var caminhoMenorEnergia = new Array();
	//começando de tras pra frente, com o 
	caminhoMenorEnergia.push(enMinX + (h - 1) * w);

	//A partir da penultima linha (h-2), vou subindo
	for (let y = h - 2; y >= 0; y--) {
		var enMin = Infinity;
		for (let x = enMinX - 1; x <= enMinX + 1; x++) {
			if (x >= 0 && x < w && enTot[x + y * w] < enMin) {
				minEnergiaAnterior = enTot[x + y * w]
				enMinX = x;
			}
		}
		//Vou inserir o endereço da linha anterior com menor energia no vetor
		caminhoMenorEnergia.push(enMinX + y * w)
	}
	console.log(caminhoMenorEnergia)
	return (caminhoMenorEnergia)
};

function desenhaCaminhoMenorEnergia(imagem, caminhoMenorEnergia) {

	caminhoMenorEnergia.forEach( a => imagem.imageData.data[4 * a] = 255)
	return imagem
	
}

