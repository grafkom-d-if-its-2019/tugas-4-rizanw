(function (global) {
  // var theta = 0.0, scale = 1, membesar = 1.0;
  var gl, canvas, program, program2, programCube;
  var scale = 0.2;
  var vec = [0, 0, 0];
  var vecX = 0.0196;
  var vecY = 0.0069;
  var vecZ = 0.016;
  var size = scale;
  var theta = [30, 60,0];
  var nrp = 0.183;

  glUtils.SL.init({ callback: function () { main(); } });

  var mainLinesVertices = new Float32Array([
    -0.4, -0.5, 1.0, 1.0, 0.0, //a
    -0.2, -0.5, 1.0, 0.0, 0.0, //b
    -0.1, -0.2, 1.0, 1.0, 0.0, //c
    +0.1, -0.2, 1.0, 0.0, 0.0, //d
    +0.2, -0.5, 1.0, 1.0, 0.0, //e
    +0.4, -0.5, 1.0, 0.0, 0.0, //f
    +0.1, +0.5, 1.0, 1.0, 0.0, //g
    -0.1, +0.5, 1.0, 0.0, 0.0,  //h
  ]);

  var centerLinesVertices = new Float32Array([
    -0.1, -0.0, 1.0, 1.0, 0.0,  //==c
    -0.02, +0.3, 1.0, 0.0, 0.0,
    +0.02, +0.3, 1.0, 1.0, 0.0,
    +0.1, -0.0, 1.0, 0.0, 0.0, //==d
  ]);

  var TriangleVertices1 = new Float32Array([
    +0.4, +0.5, 1.0, 1.0, 0.0,
    +0.2, +0.5, 1.0, 0.0, 0.0,
    +0.29, +0.3, 1.0, 1.0, 0.0,
    +0.31, +0.3, 1.0, 0.0, 0.0,
  ]);

  var TriangleVertices2 = new Float32Array([
    +0.2, +0.5, 1.0, 0.0, 0.0,
    +0.1, 0.0, 1.0, 1.0, 0.0,
    +0.24, 0.0, 1.0, 1.0, 0.0,
    +0.29, +0.3, 1.0, 0.0, 0.0,
  ]);

  var TriangleVertices3 = new Float32Array([
    +0.4, +0.5, 1.0, 1.0, 0.0,
    +0.5, 0.0, 1.0, 0.0, 0.0,
    +0.36, 0.0, 1.0, 1.0, 0.0,
    +0.31, +0.3, 1.0, 0.0, 0.0,
  ]);

  var TriangleVertices4 = new Float32Array([
    +0.4, -0.2, 1.0, 0.0, 0.0,
    +0.5, 0.0, 1.0, 1.0, 0.0,
    +0.1, 0.0, 1.0, 0.0, 0.0,
    +0.2, -0.2, 1.0, 1.0, 0.0,
  ]);

  var TriangleVertices5 = new Float32Array([
    +0.1, 0.0, 1.0, 1.0, 0.0,
    +0.2, -0.2, 1.0, 0.0, 0.0,
    -0.0, -0.5, 1.0, 1.0, 0.0,
  ]);

  var TriangleVertices6 = new Float32Array([
    +0.4, -0.2, 1.0, 0.0, 0.0,
    +0.5, 0.0, 1.0, 1.0, 0.0,
    +0.6, -0.5, 1.0, 0.0, 0.0,
  ]);

  var TriangleVertices7 = new Float32Array([
    -0.0, -0.5, 1.0, 1.0, 0.0,
    +0.15, -0.5, 1.0, 1.0, 0.0,
    +0.2, -0.2, 1.0, 0.0, 0.0,
  ]);

  var TriangleVertices8 = new Float32Array([
    +0.4, -0.2, 1.0, 0.0, 0.0,
    +0.45, -0.5, 1.0, 1.0, 0.0,
    +0.6, -0.5, 1.0, 1.0, 0.0,
  ]);

  var cubeVertices = [
    // x, y, z             r, g, b

    //left
    -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
    -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
    -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
    0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
    0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
    0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
    0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
    -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
    
    //DCGH
    0.5, 0.5, 0.5,      1.0, 1.0, 1.0,    //C
    0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
    0.5, -0.5, 0.5,     1.0, 1.0, 1.0,    //D
    0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H

    //ABFE
    -0.5, -0.5, 0.5,    1.0, 1.0, 1.0,    //A
    -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E
    -0.5, 0.5, 0.5,     1.0, 1.0, 1.0,    //B
    -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F

    //EFGH
    -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E
    -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F
    -0.5, 0.5, -0.5,    1.0, 1.0, 1.0,    //F
    0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
    0.5, 0.5, -0.5,     1.0, 1.0, 1.0,    //G
    0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H
    0.5, -0.5, -0.5,    1.0, 1.0, 1.0,    //H
    -0.5, -0.5, -0.5,   1.0, 1.0, 1.0,    //E
  ];


  function main() {
    window.addEventListener('resize', resizer);

    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v3.fragment);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    resizer();
    render();
  }

  function drawShapes(type, vertices) {
    var n = vertices.length / 5;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,
      2,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.vertexAttribPointer(
      vColor,
      3,
      gl.FLOAT,
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.drawArrays(type, 0, n);
  }

  function cube(){
    gl.useProgram(programCube);

    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [30, 60, 0];

    var cubeVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(programCube, 'vPosition');
    var vColor = gl.getAttribLocation(programCube, 'vColor');

    gl.vertexAttribPointer(
      vPosition, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0 
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT
      );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    gl.uniform3fv(thetaLocCube, thetaCube);
  }

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    cube();
    gl.drawArrays(gl.LINES, 0, 24);

    // gl.useProgram(program);
    // var thetaLoc = gl.getUniformLocation(program, 'theta');
    // theta += 0.0183;
    // gl.uniform1f(thetaLoc, theta);
    // drawShapes(gl.LINE_LOOP, mainLinesVertices);
    // drawShapes(gl.LINE_LOOP, centerLinesVertices);

    gl.useProgram(program2);
    var scaleLoc = gl.getUniformLocation(program2, 'scale');
    gl.uniform1f(scaleLoc, scale);

    var transLoc = gl.getUniformLocation(program2, 'vec');
    if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
      vecX = vecX * -1;
    }
    vec[0] += vecX;
    if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
      vecY = vecY * -1;
    }
    vec[1] += vecY;
    if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
      vecZ = vecZ * -1;
    }
    vec[2] += vecZ;
    gl.uniform3fv(transLoc, vec);

    var thetaLoc = gl.getUniformLocation(program2, 'theta'); 
    theta[1] += ( nrp * 3 );
    gl.uniform3fv(thetaLoc, theta);

    // if (scale >= 1) membesar = -1;
    // else if (scale <= -1) membesar = 1;
    // scale += 0.0082 * membesar;

    drawShapes(gl.TRIANGLE_FAN, TriangleVertices1);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices2);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices3);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices4);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices5);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices6);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices7);
    drawShapes(gl.TRIANGLE_FAN, TriangleVertices8);

    requestAnimationFrame(render);
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }
})(window | this);