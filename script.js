var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");


//////////////////////////////////////////////////

const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	//const fileList = this.files; /* now you can work with the file list */
	console.log(this.files[0]);
	image.load(window.URL.createObjectURL(this.files[0]), imageLoaded);
}
////////////////

var kernel = 
	[-1, 0, 1,
	-1, 0, 1,
	-1,0, 1];

	//Tenho que normalizar o Kernel para preservar brilho da imagem
	//Normalizando Kernel (soma dos elementos = 1)
	//Se a soma dos elementos é 0, retorno
	let soma = kernel.reduce((b, c) => b + c) == 0 ? 1 : kernel.reduce((b, c) => b + c)
	kernel = kernel.map(a => (a / soma))
	let dim = Math.sqrt(kernel.length);

/////////////////
image = new RafImage();
image.load("gato.jpg", imageLoaded);
console.log(image)

function imageLoaded() {
	console.log(image)
	imageOut = image.clone()

	canvas1.width = image.width;
	canvas1.height = image.height;
	image.draw(canvas1)


	const pad = Math.floor(dim / 2);

	const pixels = image.imageData.data;
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

					r += image.getR(x + kx, y + ky) * kernel[i];
					g += image.getG(x + kx, y + ky) * kernel[i];
					b += image.getB(x + kx, y + ky) * kernel[i];

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

let table = document.getElementById("tabela");
table.setAttribute('border', '1');
var tbl = "<tbody>"

for ( let ky = 0 ; ky < Math.sqrt(kernel.length) ; ky ++){
	tbl += "<tr>"  //criar nova linha
	console.log(tbl)
		for (let kx = 0 ; kx < Math.sqrt(kernel.length); kx++){
			tbl += "<td>" +  kernel[ky*dim + kx] + "</td>" //cada celula da linha
	}
	tbl += "</tr>" //fecha cada linha
}
tbl += "</tbody>"
table.innerHTML = tbl








