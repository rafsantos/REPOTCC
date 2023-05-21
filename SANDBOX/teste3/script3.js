var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");


//////////////////////////////////////////////////

image = new RafImage();

image.load("lena.png", imageLoaded);

function imageLoaded(){
imageOut = image.clone()
image.draw(canvas1)

var kernel = [1/9  , 1/9  , 1/9 ,
			  1/9  , 1/9  , 1/9 ,
			  1/9  , 1/9  , 1/9 ];

let dim = Math.sqrt(kernel.length);

for (let y = 0; y < image.height; y++) {
  for (let x = 0; x < image.width; x++) {

	var r = 0;
	var g = 0;
	var b = 0;

	for (let ky = 0; ky < dim ; ky ++){
		for (let kx = 0; kx < dim ; kx ++){
			
			i = (ky) * dim + (kx); //kernel

			r = r + image.getR(x+i,y+i) * kernel[i]
			g = g + image.getG(x+i,y+i) * kernel[i]
			b = b + image.getB(x+i,y+i) * kernel[i]			

		}
	}
	imageOut.setIntColor(x,y,255,r,g,b);
  }
}

console.log(imageOut.imageData)
imageOut.draw(canvas2)
//imageOut.draw(canvas2)
}



