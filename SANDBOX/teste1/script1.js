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
    for (let i = 0; i < numPixels; i += 10) {
      data[i * 4 + 1] = 127; // Green channel
      data[i * 4 + 2] = 255; // Green channel
      data[i * 4 + 3] = 255; // Alpha channel
    }
    // Paint pixel data into the context
    ctx.putImageData(imageData, 0, 0);
  }
  paintGreen(data);
