var ASGlue_WebGL = {};
ASGlue_WebGL.Buffer_array = [];
ASGlue_WebGL.FrameBuffer_array = [];
ASGlue_WebGL.Program_array = [];
ASGlue_WebGL.Renderbuffer_array = [];
ASGlue_WebGL.Shader_array = [];
ASGlue_WebGL.Texture_array = [];
ASGlue_WebGL.UniformLocation_array = [];
ASGlue_WebGL.ActiveInfo_array = [];
ASGlue_WebGL.ShaderPrecisionFormat_array = [];
ASGlue_WebGL.RenderingContext_array = [];
ASGlue_WebGL.ASString_to_JSString = (string_index) => {
  console.error("ASGlue_WebGL_ASString_to_String");
  return "";
}
ASGlue_WebGL.RenderingContext_importObject;

ASGlue_WebGL.Init = (importObject, ...contextArray) => {
  if (importObject == null) {
    console.error("AssemblyScript WebGL glue requires an import object");
  }

  ASGlue_WebGL.RenderingContext_importObject = importObject;

  if (contextArray != null) {
    for (let i = 0; i < contextArray.length; i++) {
      ASGlue_WebGL.RenderingContext_array.push(contextArray[i]);
    }
  }

  importObject.webgl.activeTexture = (context_index, texture_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].activeTexture(ASGlue_WebGLTexture_array[texture_index]);
  }

  importObject.webgl.attachShader = (context_index, program_index, shader_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].attachShader(ASGlue_WebGL.Program_array[program_index],
      ASGlue_WebGL.Shader_array[shader_index]);
  }

  importObject.webgl.bindAttribLocation = (context_index, attrib_index, name_string_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].bindAttribLocation(attrib_index,
      ASGlue_WebGL.ASString_to_String(name_string_index));
  }

  importObject.webgl.bindBuffer = (target, buffer_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].bindBuffer(target,
      ASGlue_WebGL.Buffer_array[buffer_index]);
  }

  importObject.webgl.bindFramebuffer = (target, framebuffer_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].bindFramebuffer(target,
      ASGlue_WebGL.FrameBuffer_array[framebuffer_index]);
  }

  importObject.webgl.bindRenderbuffer = (target, renderbuffer_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].bindFramebuffer(target,
      ASGlue_WebGL.RenderBuffer_array[renderbuffer_index]);
  }

  importObject.webgl.bindTexture = (target, texture_index) => {
    ASGlue_WebGL.RenderingContext_array[context_index].bindTexture(target,
      ASGlue_WebGL.Texture_array[texture_index]);
  }

  importObject.webgl.blendColor = (red, green, blue, alpha) => {
    ASGlue_WebGL.RenderingContext_array[context_index].blendColor(red, green, blue, alpha);
  }

  importObject.webgl.blendEquation = (mode) => {
    ASGlue_WebGL.RenderingContext_array[context_index].blendEquation(mode);
  }

  importObject.webgl.blendEquationSeparate = (modeRGB, modeAlpha) => {
    ASGlue_WebGL.RenderingContext_array[context_index].blendEquationSeparate(modeRGB, modeAlpha);
  }

  importObject.webgl.blendFunc = (sfactor, dfactor) => {
    ASGlue_WebGL.RenderingContext_array[context_index].blendFunc(sfactor, dfactor);
  }

  importObject.webgl.blendFuncSeparate = (srcRGB, dstRGB, srcAlpha, dstAlpha) => {
    ASGlue_WebGL.RenderingContext_array[context_index].blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
  }

}
// endit

void bufferData(GLenum target, GLsizeiptr size, GLenum usage);
void bufferData(GLenum target, ArrayBufferView data, GLenum usage);
void bufferData(GLenum target, ArrayBuffer ? data, GLenum usage);
void bufferSubData(GLenum target, GLintptr offset, ArrayBufferView data);
void bufferSubData(GLenum target, GLintptr offset, ArrayBuffer ? data);

[WebGLHandlesContextLoss] GLenum checkFramebufferStatus(GLenum target);
void clear(GLbitfield mask);
void clearColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
void clearDepth(GLclampf depth);
void clearStencil(GLint s);
void colorMask(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
void compileShader(WebGLShader ? shader);

void compressedTexImage2D(GLenum target, GLint level, GLenum internalformat,
  GLsizei width, GLsizei height, GLint border,
  ArrayBufferView data);
void compressedTexSubImage2D(GLenum target, GLint level,
  GLint xoffset, GLint yoffset,
  GLsizei width, GLsizei height, GLenum format,
  ArrayBufferView data);

void copyTexImage2D(GLenum target, GLint level, GLenum internalformat,
  GLint x, GLint y, GLsizei width, GLsizei height,
  GLint border);
void copyTexSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLint x, GLint y, GLsizei width, GLsizei height);

WebGLBuffer ? createBuffer();
WebGLFramebuffer ? createFramebuffer();
WebGLProgram ? createProgram();
WebGLRenderbuffer ? createRenderbuffer();
WebGLShader ? createShader(GLenum type);
WebGLTexture ? createTexture();

void cullFace(GLenum mode);

void deleteBuffer(WebGLBuffer ? buffer);
void deleteFramebuffer(WebGLFramebuffer ? framebuffer);
void deleteProgram(WebGLProgram ? program);
void deleteRenderbuffer(WebGLRenderbuffer ? renderbuffer);
void deleteShader(WebGLShader ? shader);
void deleteTexture(WebGLTexture ? texture);

void depthFunc(GLenum func);
void depthMask(GLboolean flag);
void depthRange(GLclampf zNear, GLclampf zFar);
void detachShader(WebGLProgram ? program, WebGLShader ? shader);
void disable(GLenum cap);
void disableVertexAttribArray(GLuint index);
void drawArrays(GLenum mode, GLint first, GLsizei count);
void drawElements(GLenum mode, GLsizei count, GLenum type, GLintptr offset);

void enable(GLenum cap);
void enableVertexAttribArray(GLuint index);
void finish();
void flush();
void framebufferRenderbuffer(GLenum target, GLenum attachment,
  GLenum renderbuffertarget,
  WebGLRenderbuffer ? renderbuffer);
void framebufferTexture2D(GLenum target, GLenum attachment, GLenum textarget,
  WebGLTexture ? texture, GLint level);
void frontFace(GLenum mode);

void generateMipmap(GLenum target);

WebGLActiveInfo ? getActiveAttrib(WebGLProgram ? program, GLuint index);
WebGLActiveInfo ? getActiveUniform(WebGLProgram ? program, GLuint index);
sequence<WebGLShader>?getAttachedShaders(WebGLProgram ? program);

[WebGLHandlesContextLoss] GLint getAttribLocation(WebGLProgram ? program, DOMString name);

any getBufferParameter(GLenum target, GLenum pname);
any getParameter(GLenum pname);

[WebGLHandlesContextLoss] GLenum getError();

any getFramebufferAttachmentParameter(GLenum target, GLenum attachment,
  GLenum pname);
any getProgramParameter(WebGLProgram ? program, GLenum pname);
DOMString ? getProgramInfoLog(WebGLProgram ? program);
any getRenderbufferParameter(GLenum target, GLenum pname);
any getShaderParameter(WebGLShader ? shader, GLenum pname);
WebGLShaderPrecisionFormat ? getShaderPrecisionFormat(GLenum shadertype, GLenum precisiontype);
DOMString ? getShaderInfoLog(WebGLShader ? shader);

DOMString ? getShaderSource(WebGLShader ? shader);

any getTexParameter(GLenum target, GLenum pname);

any getUniform(WebGLProgram ? program, WebGLUniformLocation ? location);

WebGLUniformLocation ? getUniformLocation(WebGLProgram ? program, DOMString name);

any getVertexAttrib(GLuint index, GLenum pname);

[WebGLHandlesContextLoss] GLsizeiptr getVertexAttribOffset(GLuint index, GLenum pname);

void hint(GLenum target, GLenum mode);
[WebGLHandlesContextLoss] GLboolean isBuffer(WebGLBuffer ? buffer);
[WebGLHandlesContextLoss] GLboolean isEnabled(GLenum cap);
[WebGLHandlesContextLoss] GLboolean isFramebuffer(WebGLFramebuffer ? framebuffer);
[WebGLHandlesContextLoss] GLboolean isProgram(WebGLProgram ? program);
[WebGLHandlesContextLoss] GLboolean isRenderbuffer(WebGLRenderbuffer ? renderbuffer);
[WebGLHandlesContextLoss] GLboolean isShader(WebGLShader ? shader);
[WebGLHandlesContextLoss] GLboolean isTexture(WebGLTexture ? texture);
void lineWidth(GLfloat width);
void linkProgram(WebGLProgram ? program);
void pixelStorei(GLenum pname, GLint param);
void polygonOffset(GLfloat factor, GLfloat units);

void readPixels(GLint x, GLint y, GLsizei width, GLsizei height,
  GLenum format, GLenum type, ArrayBufferView ? pixels);

void renderbufferStorage(GLenum target, GLenum internalformat,
  GLsizei width, GLsizei height);
void sampleCoverage(GLclampf value, GLboolean invert);
void scissor(GLint x, GLint y, GLsizei width, GLsizei height);

void shaderSource(WebGLShader ? shader, DOMString source);

void stencilFunc(GLenum func, GLint ref, GLuint mask);
void stencilFuncSeparate(GLenum face, GLenum func, GLint ref, GLuint mask);
void stencilMask(GLuint mask);
void stencilMaskSeparate(GLenum face, GLuint mask);
void stencilOp(GLenum fail, GLenum zfail, GLenum zpass);
void stencilOpSeparate(GLenum face, GLenum fail, GLenum zfail, GLenum zpass);

void texImage2D(GLenum target, GLint level, GLenum internalformat,
  GLsizei width, GLsizei height, GLint border, GLenum format,
  GLenum type, ArrayBufferView ? pixels);
void texImage2D(GLenum target, GLint level, GLenum internalformat,
  GLenum format, GLenum type, ImageData ? pixels);
void texImage2D(GLenum target, GLint level, GLenum internalformat,
  GLenum format, GLenum type, HTMLImageElement image); // May throw DOMException
void texImage2D(GLenum target, GLint level, GLenum internalformat,
  GLenum format, GLenum type, HTMLCanvasElement canvas); // May throw DOMException
void texImage2D(GLenum target, GLint level, GLenum internalformat,
  GLenum format, GLenum type, HTMLVideoElement video); // May throw DOMException

void texParameterf(GLenum target, GLenum pname, GLfloat param);
void texParameteri(GLenum target, GLenum pname, GLint param);

void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLsizei width, GLsizei height,
  GLenum format, GLenum type, ArrayBufferView ? pixels);
void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLenum format, GLenum type, ImageData ? pixels);
void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLenum format, GLenum type, HTMLImageElement image); // May throw DOMException
void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLenum format, GLenum type, HTMLCanvasElement canvas); // May throw DOMException
void texSubImage2D(GLenum target, GLint level, GLint xoffset, GLint yoffset,
  GLenum format, GLenum type, HTMLVideoElement video); // May throw DOMException

void uniform1f(WebGLUniformLocation ? location, GLfloat x);
void uniform1fv(WebGLUniformLocation ? location, Float32Array v);
void uniform1fv(WebGLUniformLocation ? location, sequence < GLfloat > v);
void uniform1i(WebGLUniformLocation ? location, GLint x);
void uniform1iv(WebGLUniformLocation ? location, Int32Array v);
void uniform1iv(WebGLUniformLocation ? location, sequence < long > v);
void uniform2f(WebGLUniformLocation ? location, GLfloat x, GLfloat y);
void uniform2fv(WebGLUniformLocation ? location, Float32Array v);
void uniform2fv(WebGLUniformLocation ? location, sequence < GLfloat > v);
void uniform2i(WebGLUniformLocation ? location, GLint x, GLint y);
void uniform2iv(WebGLUniformLocation ? location, Int32Array v);
void uniform2iv(WebGLUniformLocation ? location, sequence < long > v);
void uniform3f(WebGLUniformLocation ? location, GLfloat x, GLfloat y, GLfloat z);
void uniform3fv(WebGLUniformLocation ? location, Float32Array v);
void uniform3fv(WebGLUniformLocation ? location, sequence < GLfloat > v);
void uniform3i(WebGLUniformLocation ? location, GLint x, GLint y, GLint z);
void uniform3iv(WebGLUniformLocation ? location, Int32Array v);
void uniform3iv(WebGLUniformLocation ? location, sequence < long > v);
void uniform4f(WebGLUniformLocation ? location, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
void uniform4fv(WebGLUniformLocation ? location, Float32Array v);
void uniform4fv(WebGLUniformLocation ? location, sequence < GLfloat > v);
void uniform4i(WebGLUniformLocation ? location, GLint x, GLint y, GLint z, GLint w);
void uniform4iv(WebGLUniformLocation ? location, Int32Array v);
void uniform4iv(WebGLUniformLocation ? location, sequence < long > v);

void uniformMatrix2fv(WebGLUniformLocation ? location, GLboolean transpose,
  Float32Array value);
void uniformMatrix2fv(WebGLUniformLocation ? location, GLboolean transpose,
  sequence < GLfloat > value);
void uniformMatrix3fv(WebGLUniformLocation ? location, GLboolean transpose,
  Float32Array value);
void uniformMatrix3fv(WebGLUniformLocation ? location, GLboolean transpose,
  sequence < GLfloat > value);
void uniformMatrix4fv(WebGLUniformLocation ? location, GLboolean transpose,
  Float32Array value);
void uniformMatrix4fv(WebGLUniformLocation ? location, GLboolean transpose,
  sequence < GLfloat > value);

void useProgram(WebGLProgram ? program);
void validateProgram(WebGLProgram ? program);

void vertexAttrib1f(GLuint indx, GLfloat x);
void vertexAttrib1fv(GLuint indx, Float32Array values);
void vertexAttrib1fv(GLuint indx, sequence < GLfloat > values);
void vertexAttrib2f(GLuint indx, GLfloat x, GLfloat y);
void vertexAttrib2fv(GLuint indx, Float32Array values);
void vertexAttrib2fv(GLuint indx, sequence < GLfloat > values);
void vertexAttrib3f(GLuint indx, GLfloat x, GLfloat y, GLfloat z);
void vertexAttrib3fv(GLuint indx, Float32Array values);
void vertexAttrib3fv(GLuint indx, sequence < GLfloat > values);
void vertexAttrib4f(GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
void vertexAttrib4fv(GLuint indx, Float32Array values);
void vertexAttrib4fv(GLuint indx, sequence < GLfloat > values);
void vertexAttribPointer(GLuint indx, GLint size, GLenum type,
  GLboolean normalized, GLsizei stride, GLintptr offset);

void viewport(GLint x, GLint y, GLsizei width, GLsizei height);
};

[Constructor(DOMString type, optional WebGLContextEventInit eventInit)]
interface WebGLContextEvent : Event {
    readonly attribute DOMString statusMessage;
};

// EventInit is defined in the DOM4 specification.
dictionary WebGLContextEventInit: EventInit {
  DOMString statusMessage;
};
