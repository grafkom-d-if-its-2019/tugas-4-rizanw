precision mediump float;

attribute vec3 vPosition;
attribute vec3 vNormal;
attribute vec2 vTexCoord;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTexCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;   

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);

  fTexCoord = vTexCoord;
  fNormal = normalize(normalMatrix * vNormal);
  fPosition = vec3(modelMatrix * vec4(vPosition, 1.0));
}
