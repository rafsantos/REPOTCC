var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
if (kernel == null)
	var kernel = new Kernel();
var table = document.getElementById("tblKer");
updateTable(kernel,table)
//////////////////////////////////////////////////

const inputElement = document.getElementById("image");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
	//const fileList = this.files; /* now you can work with the file list */
	console.log(this.files[0]);
	image.load(window.URL.createObjectURL(this.files[0]), imageLoaded);
}




//////////////////////////////////////////

/////////////////
image = new RafImage();
image.load("gato.jpg", imageLoaded);
console.log(image)



function imageLoaded() {
	processar();
}





/////////////////////////////////////////////////
///Tabela com o kernel
function updateTable(kernel,table) {

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
function aumentarKernel(){
	var tbodyRef = document.getElementById("kernelInTbl").getElementsByTagName('tbody')[0];
	// Insert a row at the end of table
var newRow = tbodyRef.insertRow();
// Insert a cell at the end of the row
var newCell = newRow.insertCell();

// Append a text node to the cell
newCell.appendChild();
}