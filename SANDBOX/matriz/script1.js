var canvas = document.getElementById('c');
// Access the rendering context
var ctx = canvas.getContext('2d');
// ImageData object
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// One-dimensional array containing the data in the RGBA order
var data = imageData.data;
function paintGreen(data) {
  // data represents the Uint8ClampedArray containing the data
  // in the RGBA order [r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an]
  var numPixels = data.length / 4;
  for (let i = 0; i < numPixels; i += 50) {
    data[i * 4 + 1] = 127; // Green channel
    data[i * 4 + 2] = 255; // Green channel
    data[i * 4 + 3] = 255; // Alpha channel
  }
  // Paint pixel data into the context
  ctx.putImageData(imageData, 0, 0);
}
paintGreen(data);

function arrPmtx(array, width, height) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

}
var mx = [
[11 , 12 , 13 , 14 , 15],
[21 , 22 , 23 , 24 , 25],
[31 , 32 , 33 , 34 , 35],
[41 , 42 , 43 , 44 , 45],
[51 , 52 , 53 , 54 , 55]
]
console.log(mx);
console.log(mx[1])
console.log(mx[1][1])

