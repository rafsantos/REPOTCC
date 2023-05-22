var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
if (kernel == null)
	var kernel = new Kernel();

//////////////////////////////////////////////////

const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	//const fileList = this.files; /* now you can work with the file list */
	console.log(this.files[0]);
	image.load(window.URL.createObjectURL(this.files[0]), imageLoaded);
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
	updateTable(this); //Atualiza visualização em tela
}

//////////////////////////////////////////

/////////////////
image = new RafImage();
image.load("gato.jpg", imageLoaded);
console.log(image)



function imageLoaded() {
	processar();
}


function processar() {

	var ker = kernel.kernel;
	var dim = kernel.dim;

	console.log(image)
	imageOut = image.clone()

	canvas1.width = image.width;
	canvas1.height = image.height;
	image.draw(canvas1)


	const pad = Math.floor(dim / 2);
	const width = image.width;
	const height = image.height;

	let pix, i, r, g, b;
	const w = width;
	const h = height;
	const cw = w + pad * 2; // add padding
	const ch = h + pad * 2;

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
	canvas2.width = imageOut.width;
	canvas2.height = imageOut.height;
	imageOut.draw(canvas2)
	//imageOut.draw(canvas2)
}


/////////////////////////////////////////////////
///Tabela com o kernel
function updateTable(kernel) {
	let table = document.getElementById("tabela");
	table.setAttribute('border', '1');
	var tbl = "<tbody>"
	for (let ky = 0; ky < Math.sqrt(kernel.length); ky++) {
		tbl += "<tr>"  //criar nova linha
		console.log(tbl)
		for (let kx = 0; kx < Math.sqrt(kernel.length); kx++) {
			tbl += "<td>" + kernel.kernel[ky * kernel.dim + kx] + "</td>" //cada celula da linha
		}
		tbl += "</tr>" //fecha cada linha
	}
	tbl += "</tbody>"
	table.innerHTML = tbl
}

/////////////////////////////////
// Lendo os valores para um Kernel novo de entrada
function formIn() {
	console.log("form enviado");
	let kernVals = document.getElementsByName("kernelIn");
	var newKernel = []
	for (kernVal of kernVals) {
		console.log(kernVal.value);
		(isNaN(kernVal.value) || !kernVal.value) ? newKernel.push(0) : newKernel.push(parseInt(kernVal.value));
	}
	console.log(newKernel);
	kernel = new Kernel(newKernel);

}

