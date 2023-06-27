var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
if (kernel == null)
	var kernel = new Kernel();
var tabelKernel = document.getElementById("tblKer");
atualizaTabelaKernel(kernel,tabelKernel)
//////////////////////////////////////////////////


/////////////////
imagemOriginal = new RafImage();
imagemOriginal.load("./lib/gato.jpg", imageLoaded);

// Após terminar de carregar uma nova imagem essa função é chamada
function imageLoaded() {
	//cria uma imagem de saida e grava
	console.log("Nova Imagem carregada")
	canvas1.setAttribute("width",imagemOriginal.width)
	canvas1.setAttribute("height",imagemOriginal.height)
	imagemOriginal.draw(canvas1)

	var imagemSaida = convolucao(imagemOriginal,kernel);
	canvas2.setAttribute("width",imagemSaida.width)
	canvas2.setAttribute("height",imagemSaida.height)
	imagemSaida.draw(canvas2)

	var imagemSaidaPeb = pretoeBranco(imagemSaida)
	canvas3.setAttribute("width",imagemSaidaPeb.width)
	canvas3.setAttribute("height",imagemSaidaPeb.height)
	imagemSaidaPeb.draw(canvas3)
}

/////////////////////////////////////////////////
///Tabela com o kernel
function atualizaTabelaKernel(kernel,table) {

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
	var newKernel = []
	for (kernVal of kernVals) {
		(isNaN(kernVal.value) || !kernVal.value) ? newKernel.push(0) : newKernel.push(parseInt(kernVal.value));
	}
	kernel = new Kernel(newKernel);
	console.log(kernel)
}


// Botão de carregar nova imagem
const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	imagemOriginal.load(window.URL.createObjectURL(this.files[0]), imageLoaded);
}



/////////////////////////////////
// Aumentar Kernel entrada
function aumentarKernel(){
	var tbodyRef = document.getElementById("kernelInTbl").getElementsByTagName('tbody')[0];
	// Insert a row at the end of table
var newRow = tbodyRef.insertRow();
// Insert a cell at the end of the row
var newCell = newRow.insertCell();

// Append a text node to the cell
newCell.appendChild();
}