///////////////////////////////////////////////
///// Script de controle da página
//////////////////////////////////////////////
// Inicialização

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
if (kernel == null)
	var kernel = new Kernel();
var table = document.getElementById("tblKer");
updateTable(kernel,table)

// Imagem inicial padrão da página
image = new RafImage();
image.load("gato.jpg", atualizaImagem);
function atualizaImagem() {
	canvas1.width = image.width;
	canvas1.height = image.height;
	image.draw(canvas1)
	
	processar(image,kernel.kernel);

	canvas2.width = imageOut.width;
	canvas2.height = imageOut.height;
	canvas3.width = imageOut.width;
	canvas3.height = imageOut.height;
	imageOut.draw(canvas2)

	imagePeB = imageOut.clone().peb;
	imagePeB = imageOut.peb(imageOut);
	imagePeB.draw(canvas3);
}


// Botão para enviar imagem customizada
const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	console.log(this.files[0]);
	image.load(window.URL.createObjectURL(this.files[0]), atualizaImagem);
}

/////////////////////////////////////////////////
///Tabela com o kernel
function updateTable(kernel,table) {

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
function aumentarKer(){
	var tbl = document.getElementById("kerInTbl");
	//Insere uma nova coluna ao final de cada linha
		for (row of tbl.rows){
		row.insertCell(row.length);
	}
	//Aumenta uma nova linha
	// Insere uma linha ao final da tabela
	row = tbl.insertRow(tbl.rows.length)
	n =  tbl.rows.length
	for (i = 0 ; i < n ; i++){
		tbl.rows[n-1].insertCell(i);
	}
	
	


// Append a text node to the cell
newCell.appendChild('teste');
}