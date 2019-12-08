(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  var scale = 0.2;
  var vec = [0, 0, 0];
  var vecX = 0.0196;
  var vecY = 0.0069;
  var vecZ = 0.016;
  var size = scale;
  var thetaHuruf = [30, 60, 0];
  var nrp = 0.183;

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    var program2 = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    {  // Mendefinisikan verteks-verteks kubus
      var vertices = [];
      var cubePoints = [
        [ -0.5, -0.5,  0.5 ],
        [ -0.5,  0.5,  0.5 ],
        [  0.5,  0.5,  0.5 ],
        [  0.5, -0.5,  0.5 ],
        [ -0.5, -0.5, -0.5 ],
        [ -0.5,  0.5, -0.5 ],
        [  0.5,  0.5, -0.5 ],
        [  0.5, -0.5, -0.5 ]
      ];
      var cubeColors = [
        [],
        [1.0, 0.0, 0.0], // merah
        [0.0, 1.0, 0.0], // hijau
        [0.0, 0.0, 1.0], // biru
        [1.0, 1.0, 1.0], // putih
        [1.0, 0.5, 0.0], // oranye
        [1.0, 1.0, 0.0], // kuning
        []
      ];
      var cubeNormals = [
        [],
        [  0.0,  0.0,  1.0 ], // depan
        [  1.0,  0.0,  0.0 ], // kanan
        [  0.0, -1.0,  0.0 ], // bawah
        [  0.0,  0.0, -1.0 ], // belakang
        [ -1.0,  0.0,  0.0 ], // kiri
        [  0.0,  1.0,  0.0 ], // atas
        []
      ];
      function quad(a, b, c, d) {
        var indices = [a, b, c, a, c, d];
        for (var i=0; i < indices.length; i++) {
          for (var j=0; j < 3; j++) {
            vertices.push(cubePoints[indices[i]][j]);
          }
          for (var j=0; j < 3; j++) {
            vertices.push(cubeColors[a][j]);
          }
          for (var j=0; j < 3; j++) {
            vertices.push(-1 * cubeNormals[a][j]);
          }
          switch (indices[i]) {
            case a:
              vertices.push((a - 2) * 0.2);
              vertices.push(0.0);
              break;
            case b:
              vertices.push((a - 2) * 0.2);
              vertices.push(1.0);
              break;
            case c:
              vertices.push((a - 1) * 0.2);
              vertices.push(1.0);
              break;
            case d:
              vertices.push((a - 1) * 0.2);
              vertices.push(0.0);
              break;
          
            default:
              break;
          }
        }
      }
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
      quad(6, 5, 1, 2);

      console.log(vertices.length);
      console.log(vertices);
    }

    { //mendefinisikan kubus baru
      
    }

    { // Mendefinisikan verteks-verteks huruf
      var hurufKu = new Float32Array([
        // x,y,z				r, g, b
        -0.85, -0.85,     1.0, 1.0, 0.0,
        -0.6, +0.8,       1.0, 1.0, 0.0,
        -0.7, -0.85,      1.0, 0.0, 0.0,
        -0.6, +0.8,       1.0, 0.0, 0.0,
        -0.7, -0.85,      1.0, 1.0, 0.0,
        -0.5, +0.5,       1.0, 0.0, 0.0,
        -0.4, +0.8,       1.0, 0.0, 0.0,
        -0.6, +0.8,       1.0, 0.0, 0.0,
        -0.5, +0.5,       1.0, 1.0, 0.0,
        -0.5, +0.5,       1.0, 1.0, 0.0,
        -0.15, -0.85,     1.0, 0.0, 0.0,
        -0.4, +0.8,       1.0, 1.0, 0.0,
        -0.5, +0.5,       1.0, 1.0, 0.0,
        -0.15, -0.85,     1.0, 0.0, 0.0,
        -0.3, -0.85,      1.0, 1.0, 0.0,
        -0.42, 0.0,       1.0, 1.0, 0.0,
        -0.58, 0.0,       1.0, 0.0, 0.0,
        -0.3, -0.4,       1.0, 1.0, 0.0,
        -0.3, -0.3,       1.0, 1.0, 0.0,
        -0.7, -0.3,       1.0, 0.0, 0.0,
        -0.58, 0.0,       1.0, 1.0, 0.0,
      ]);
    }

    function drawA(type, vertices) {
			var n = initBuffers(vertices);
			if (n < 0) {
				console.log('Failed to set the positions of the vertices');
				return;
			}
			gl.drawArrays(type, 0, n);
		}
		
		function initBuffers(vertices){
			var n = vertices.length / 5;
			// Membuat vertex buffer object (CPU Memory <==> GPU Memory)
			var vertexBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			
			// Membuat sambungan untuk attribute
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
			return n;
		}

    // Membuat sambungan untuk uniform
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = Math.PI/72;
    var thetaSpeed = Math.PI/72;
    var axis = [true, true, true];
    var x = 0;
    var y = 1;
    var z = 2;

    // Definisi untuk matriks model
    var mmLoc = gl.getUniformLocation(program, 'modelMatrix');
    var mm = glMatrix.mat4.create();
    mm = glMatrix.mat4.create();
    glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -1.5]);

    // Definisi untuk matrix view dan projection
    var vmLoc = gl.getUniformLocation(program, 'viewMatrix');
    var vm = glMatrix.mat4.create();
    var pmLoc = gl.getUniformLocation(program, 'projectionMatrix');
    var pm = glMatrix.mat4.create();
    var camera = {x: 0.0, y: 0.0, z:0.0};
    glMatrix.mat4.perspective(pm,
      glMatrix.glMatrix.toRadian(90), // fovy dalam radian
      canvas.width/canvas.height,     // aspect ratio
      0.5,  // near
      10.0, // far  
    );
    gl.uniformMatrix4fv(pmLoc, false, pm);


    // Uniform untuk modelMatrix vektor normal
    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

    // Kontrol menggunakan keyboard
    function onKeyDown(event) {
      if (event.keyCode == 189) thetaSpeed -= 0.01;       // key '-'
      else if (event.keyCode == 187) thetaSpeed += 0.01;  // key '='
      else if (event.keyCode == 48) thetaSpeed = 0;       // key '0'
      if (event.keyCode == 88) axis[x] = !axis[x];
      if (event.keyCode == 89) axis[y] = !axis[y];
      if (event.keyCode == 90) axis[z] = !axis[z];
      if (event.keyCode == 38) camera.z -= 0.1;
      else if (event.keyCode == 40) camera.z += 0.1;
      if (event.keyCode == 37) camera.x -= 0.1;
      else if (event.keyCode == 39) camera.x += 0.1;
    }
    document.addEventListener('keydown', onKeyDown);

    // Kontrol menggunakan mouse
    var dragging, lastx, lasty;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      // Saat mouse diklik di area aktif browser,
      //  maka flag dragging akan diaktifkan
      if (
        rect.left <= x &&
        rect.right > x &&
        rect.top <= y &&
        rect.bottom > y
      ) {
        dragging = true;
        lastx = x;
        lasty = y;
      }
    }
    function onMouseUp(event) {
      // Ketika klik kiri mouse dilepas
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        factor = 10 / canvas.height;
        var dx = factor * (x - lastx);
        var dy = factor * (y - lasty);
        // Menggunakan dx dan dy untuk memutar kubus
        glMatrix.mat4.rotateY(mm, mm, dx);
        glMatrix.mat4.rotateX(mm, mm, dy);
      }
      lastx = x;
      lasty = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

		var flag = {
			x:1,
			y:1,
			z:1
		};
		// var theta = 0; // rotation angle in radian
		var trans = {
			x:0.0,
			y:0.0,
			z:0.0
    }
    
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // theta += thetaSpeed;
      // if (axis[z]) glMatrix.mat4.rotateZ(mm, mm, thetaSpeed);
      // if (axis[y]) glMatrix.mat4.rotateY(mm, mm, thetaSpeed);
      // if (axis[x]) glMatrix.mat4.rotateX(mm, mm, thetaSpeed);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      glMatrix.mat4.lookAt(vm,
        [camera.x, camera.y, camera.z], // di mana posisi kamera (posisi)
        [0.0, 0.0, -2.0], // ke mana kamera menghadap (vektor)
        [0.0, 1.0, 0.0]  // ke mana arah atas kamera (vektor)
      );
      gl.uniformMatrix4fv(vmLoc, false, vm);

			gl.uniformMatrix4fv(mmLoc, false, mm);
      { // Menggambar kubus 
        // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Membuat sambungan untuk attribute
        var vPosition = gl.getAttribLocation(program, 'vPosition');
        // var vColor = gl.getAttribLocation(program, 'vColor');
        var vNormal = gl.getAttribLocation(program, 'vNormal');
        var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
        gl.vertexAttribPointer(
          vPosition,    // variabel yang memegang posisi attribute di shader
          3,            // jumlah elemen per atribut
          gl.FLOAT,     // tipe data atribut
          gl.FALSE, 
          11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
          0                                   // offset dari posisi elemen di array
        );
        // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          // 11 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE,
          11 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT);
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE,
          11 * Float32Array.BYTES_PER_ELEMENT, 9 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPosition);
        // gl.enableVertexAttribArray(vColor);
        gl.enableVertexAttribArray(vNormal);
        gl.enableVertexAttribArray(vTexCoord);
        gl.drawArrays(gl.TRIANGLES, 0, 30);
      }
      
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

      thetaHuruf[1] += nrp;

			// Draw the filled version
			var objHuruf = glMatrix.mat4.create();
			glMatrix.mat4.translate(objHuruf, objHuruf, [0.0, 0.0, -1.5]);
			glMatrix.mat4.translate(objHuruf, objHuruf, vec);
			glMatrix.mat4.scale(objHuruf, objHuruf, [0.2, 0.2, 0.2]);
      glMatrix.mat4.rotateX(objHuruf,objHuruf, thetaHuruf[1])

			gl.uniformMatrix4fv(mmLoc, false, objHuruf);
      drawA(gl.TRIANGLES, hurufKu)

      // Uniform untuk pencahayaan
      var dcLoc = gl.getUniformLocation(program, 'diffuseColor');
      var ddLoc = gl.getUniformLocation(program, 'diffusePosition');
      var acLoc = gl.getUniformLocation(program, 'ambientColor');
      var dc = glMatrix.vec3.fromValues(0.17, 0.41, 0.83);  // rgb nrp 174183
      var dd = glMatrix.vec3.fromValues(1., 2., 1.7);  // xyz
      var ac = glMatrix.vec3.fromValues(0.2, 0.2, 0.2);
      var dloc = [0 + vec[0], 0 + vec[1], 0 + vec[2]];
      gl.uniform3fv(dcLoc, dc);
      gl.uniform3fv(ddLoc, dloc);
      gl.uniform3fv(acLoc, ac);

      requestAnimationFrame(render);
    }
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

   { // Texture
      // Uniform untuk tekstur
      var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
      gl.uniform1i(sampler0Loc, 0);

      // Create a texture.
      var texture = gl.createTexture();
      if (!texture) {
        reject(new Error('Gagal membuat objek tekstur'));
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Fill the texture with a 1x1 blue pixel.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                    new Uint8Array([0, 0, 255, 255]));
      
      // Asynchronously load an image
      var image = new Image();
      image.src = "img/selfi.jpeg";
      image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        // gl.bindTexture(gl.TEXTURE_2D, texture);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        // gl.generateMipmap(gl.TEXTURE_2D);
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      });
    }

    render();
  }
})();