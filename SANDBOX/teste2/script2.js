var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

function RafImage(width, height){
	// properties
	this.image = null;
	this.canvas = null;
	this.ctx=null;
	this.data = null;
		
	if(width != null){
		this.create(width, height);
	}
}

RafImage.prototype.create = function(width, height){
	this.canvas = document.createElement('canvas');
	this.canvas.width = width;
	this.canvas.height = height;
	this.ctx = this.canvas.getContext("2d");
	this.imageData = this.ctx.getImageData(0, 0, width, height);
	this.width = width;
	this.height = height;
};

RafImage.prototype.load = function(url, callback){
	this.onload = callback;
	this.image = new Image();
	var ref = this;
	this.image.onload = function(){ref.callbackImageLoaded(ref)};
	this.image.crossOrigin="anonymous";
	this.image.src = url;
};

RafImage.prototype.callbackImageLoaded = function(RafImage){
	RafImage.width = RafImage.image.width;
	RafImage.height = RafImage.image.height;
	RafImage.canvas = document.createElement('canvas');
	RafImage.canvas.width = RafImage.image.width;
	RafImage.canvas.height = RafImage.image.height;
	RafImage.ctx = RafImage.canvas.getContext("2d");
	RafImage.ctx.drawImage(RafImage.image, 0, 0);
	
	this.imageData = RafImage.ctx.getImageData(0, 0, RafImage.getWidth(), RafImage.getHeight());
	
	if(RafImage.onload!=null){
		RafImage.onload();
	}
};

RafImage.prototype.clone = function(){
	var image = new RafImage(this.getWidth(), this.getHeight());
	return image;
};

RafImage.prototype.getA = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+3];
};


RafImage.prototype.setAlphaComponent = function(x,y, alpha){
	var start = ((y*this.getWidth())+x)*4; 
	this.imageData.data[start+3] = alpha;
};

RafImage.prototype.getR = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start];
};

RafImage.prototype.getG = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+1];
};

RafImage.prototype.getB = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+2];
};


RafImage.prototype.getColor = function(x,y){
	var start = ((y*this.getWidth())+x)*4;
	
	return 	0x100000000 + 
			(this.imageData.data[start+3] << 24) + 
			(this.imageData.data[start] << 16) +
			(this.imageData.data[start+1] << 8) +
			(this.imageData.data[start+2]);
};


RafImage.prototype.setBinaryColor = function(x,y,value){
	var pos = ((y*this.getWidth())+x);
	this.arrBinaryColor[pos] = value;
};

RafImage.prototype.getBinaryColor = function(x,y){
	var pos = ((y*this.getWidth())+x);
	return this.arrBinaryColor[pos];
};


RafImage.prototype.setIntColor = function(x,y, alpha, r, g, b){
	var start = ((y*this.getWidth())+x)*4;
	this.imageData.data[start] = r;
	this.imageData.data[start+1] = g;
	this.imageData.data[start+2] = b;
	this.imageData.data[start+3] = alpha;
};

RafImage.prototype.getWidth = function(){
	return this.width;
};

RafImage.prototype.getHeight = function(){
	return this.height;
};


RafImage.prototype.draw = function(canvas, x, y, alphaCombination){
	if(x == null){x=0;}
	if(y == null){y=0;}
	canvas.getContext("2d").putImageData(this.imageData, x,y);
};
	

//////////////////////////////////////////////////

image = new RafImage();

image.load("lena.png", imageLoaded);

function imageLoaded(){
imageOut = image.clone()
image.draw(canvas1)
//Marvin.grayScale(image, imageOut);


for( let y = 0; y < image.height; y++) {
  for (let x = 0; x < image.width; x++) {

    //Red - 30% / Green - 59% / Blue - 11%
    /*
    r = image.getIntComponent0(x, y);
    g = image.getG(x, y);
    b = image.getB(x, y);
    finalColor = Math.ceil((r*0.3)+(g*0.59)+(b*0.11));
    imageOut.setIntColor(x,y,image.getA(x, y), finalColor,finalColor,finalColor);
    */
   var lim = 50
    image.getR(x,y) > lim ? r = 255 : r = image.getR(x,y);
    image.getG(x,y) > lim ? g = 255 : g = image.getG(x,y);
    image.getB(x,y) > lim ? b = 255 : b = image.getB(x,y);
    
    //imageOut.imageData.data[(x + 200*y)*4 +1] = 0;
    //imageOut.imageData.data[(x + 200*y)*4 +2] = 255;
    //imageOut.imageData.data[(x + 200*y)*4 +3] = 255;
    imageOut.setIntColor(x,y,255,r,g,b);
  }
}

console.log(imageOut.imageData)
canvas2.getContext("2d").putImageData(imageOut.imageData, 0,0);
//imageOut.draw(canvas2)
}



