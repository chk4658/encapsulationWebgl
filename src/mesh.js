import cuonUtils from "./lib/cuon-utils";
import cuonMatrix from "./lib/cuon-matrix";
import basicGraphicsExample from "./examples/basicGraphics/draw";

class mesh {
  constructor() {
    this.cuonUtils = cuonUtils;
    this.cuonMatrix = cuonMatrix;
    this.gl = null;
  }

  /**
   *
   * @param {HTMLElement} canvas
   * @param {string} vs
   * @param {string} fs
   */
  setShaders = (canvas, vs, fs) => {
    // 获取WebGL渲染上下文
    const gl = this.cuonUtils.getWebGLContext(canvas);

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }

    // 初始化着色器
    if (!this.cuonUtils.initShaders(gl, vs, fs)) {
      console.log("Failed to intialize shaders.");
      return;
    }

    this.gl = gl;
    return this;
  };

  codeSquare = (fn) => {
    if (fn) fn(this.gl);
  };

  drawBasicGraphics = (canvas) => {
    const { staticShaders, basicGraphics } = basicGraphicsExample;
    this.setShaders(canvas, staticShaders.vs, staticShaders.fs);
    basicGraphics(this.gl);
  };
}

export default mesh;
