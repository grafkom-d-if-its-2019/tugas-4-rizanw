precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix; 

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);

  fColor = vColor;
  fNormal = normalize(normalMatrix * vNormal);
  fPosition = vec3(modelMatrix * vec4(vPosition, 1.0));
}