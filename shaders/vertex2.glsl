// attribute vec4 aPosition;

precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scale;
uniform vec3 theta;
uniform vec3 vec;
// uniform float size;

void main() {
  fColor = vColor; 
  float size = scale;

  mat4 translate = mat4(
    1.0, 0.0, 0.0, vec.x,
    0.0, 1.0, 0.0, vec.y,
    0.0, 0.0, 1.0, vec.z,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scale = mat4(
    size, 0.0, 0.0, 0.0,
    0.0, size, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 flip = mat4(
    size, 0.0, 0.0, 0.0,
    0.0, size, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );


  vec3 angle = radians(theta);
  vec3 c = cos(angle);
  vec3 s = sin(angle);

  mat4 rx = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rz = mat4(
    c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );


  gl_Position = vec4(vPosition, 0.0, 1.0) * scale * rz * ry * rx;
  gl_Position = gl_Position * translate;
  // gl_Position = aPosition;
}
