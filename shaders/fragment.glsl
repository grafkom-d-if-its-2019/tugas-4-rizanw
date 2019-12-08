precision mediump float;

varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform vec3 diffuseColor;
uniform vec3 diffusePosition;
uniform vec3 ambientColor;

void main() {
  vec3 diffuseDirection = normalize(diffusePosition - fPosition); 
  float normalDotLight = max(dot(fNormal, diffuseDirection), 0.0);
  vec3 diffuse = diffuseColor * fColor * normalDotLight;
  vec3 ambient = ambientColor * fColor;

  gl_FragColor = vec4(diffuse + ambient, 1.0);
}
