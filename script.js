///////////////////////////////////////////////
///// Script de controle da página
//////////////////////////////////////////////
// Inicialização

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
if (kernel == null)
	var kernel = new Kernel();
var table = document.getElementById("tblKer");
updateTable(kernel, table)

// Imagem inicial padrão da página
image = new RafImage();
image.load("gato.jpg", atualizaImagem);
function atualizaImagem() {
	canvas1.width = image.width;
	canvas1.height = image.height;
	image.draw(canvas1)

	processar(image, kernel.kernel);

	canvas2.width = imageOut.width;
	canvas2.height = imageOut.height;
	canvas3.width = imageOut.width;
	canvas3.height = imageOut.height;
	imageOut.draw(canvas2)

	imagePeB = imageOut.clone().peb;
	imagePeB = imageOut.peb(imageOut);
	imagePeB.draw(canvas3);
}

// Transformar imagem em Preto e Branco

<<<<<<< HEAD
// Botão para enviar imagem customizada
const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	console.log(this.files[0]);
	image.load(window.URL.createObjectURL(this.files[0]), atualizaImagem);
}

/////////////////////////////////////////////////
///Tabela com o kernel
function updateTable(kernel, table) {

	var tbl = "<tbody>"
	for (let ky = 0; ky < Math.sqrt(kernel.length); ky++) {
		tbl += "<tr>"  //criar nova linha
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
function frmIn() {
	let kernVals = document.getElementsByName("kerInCell");
	console.log(kernVals)
	var newKernel = []
	for (kernVal of kernVals) {
		(isNaN(kernVal.value) || !kernVal.value) ? newKernel.push(0) : newKernel.push(parseInt(kernVal.value));
	}
	kernel = new Kernel(newKernel);
}

/////////////////////////////////
// Aumentar Kernel entrada
function aumentarKer() {
	var tbl = document.getElementById("kerInTbl");
	//Insere uma nova coluna ao final de cada linha
	for (row of tbl.rows) {
		var input = document.createElement("input");
		input.setAttribute('type', 'text');
		input.setAttribute('size', '3');
		input.setAttribute('name', 'kerInCell');
		var cell = row.insertCell(row.length);
		cell.appendChild(input);
	}
	//Aumenta uma nova linha
	// Insere uma linha ao final da tabela
	row = tbl.insertRow(tbl.rows.length)
	n = tbl.rows.length
	for (i = 0; i < n; i++) {
		var input = document.createElement("input");
		input.setAttribute('type', 'text');
		input.setAttribute('size', '3');
		input.setAttribute('name', 'kerInCell');
		var cell = tbl.rows[n - 1].insertCell(i);
		cell.appendChild(input);
	}
}
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
>>>>>>> 59dcc6c60a6f089d16ea0595ad8caad036e8c0c4
