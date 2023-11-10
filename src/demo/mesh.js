import cuonUtils from "./lib/cuon-utils";
import cuonMatrix from "./lib/cuon-matrix";

class mesh {
  /**
   *
   * @param canvas
   * @param {import('./types/attributes').attributes} attributes
   */
  constructor(canvas, attributes) {
    // 获取WebGL渲染上下文
    const gl = cuonUtils.getWebGLContext(canvas);

    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }


    // 顶点着色器程序
    const VSHADER_SOURCE = `attribute vec4 a_Position;
         attribute vec4 a_Color;
         uniform mat4 u_MvpMatrix;
         varying vec4 v_Color;
         void main() {
            gl_Position = u_MvpMatrix * a_Position;
            v_Color = a_Color;
         }`;

    // 片元着色器程序
    const FSHADER_SOURCE = `precision mediump float;
         varying vec4 v_Color;
         void main() {
            gl_FragColor = v_Color;
         }`;

    // 初始化着色器
    if (!cuonUtils.initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }
    // 设置顶点位置
    var n = this.initVertexBuffers(gl);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }

    //设置MVP矩阵
    this.setMVPMatrix(gl,canvas);
    // 指定清空<canvas>的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 开启深度测试
    gl.enable(gl.DEPTH_TEST);

    // 清空颜色和深度缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n);

  }

  initVertexBuffers(gl) {
    // 顶点坐标和颜色
    var verticesColors = new Float32Array([
      0.0, 1.0, -4.0, 0.4, 1.0, 0.4,  //绿色在后
      -0.5, -1.0, -4.0, 0.4, 1.0, 0.4,
      0.5, -1.0, -4.0, 1.0, 0.4, 0.4,

      0.0, 1.0, -2.0, 1.0, 1.0, 0.4, //黄色在中
      -0.5, -1.0, -2.0, 1.0, 1.0, 0.4,
      0.5, -1.0, -2.0, 1.0, 0.4, 0.4,

      0.0, 1.0, 0.0, 0.4, 0.4, 1.0,  //蓝色在前
      -0.5, -1.0, 0.0, 0.4, 0.4, 1.0,
      0.5, -1.0, 0.0, 1.0, 0.4, 0.4,
    ]);

    //
    var n = 9; // 点的个数
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;   //数组中每个元素的字节数

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    //获取着色器中attribute变量a_Position的地址
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    //获取着色器中attribute变量a_Color的地址
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
    }
    // 将缓冲区对象分配给a_Color变量
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    // 连接a_Color变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Color);

    // 解除绑定
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
  }

  //设置MVP矩阵
  setMVPMatrix(gl,canvas) {
    // Get the storage location of u_MvpMatrix
    var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    if (!u_MvpMatrix) {
      console.log('Failed to get the storage location of u_MvpMatrix');
      return;
    }

    //模型矩阵
    var modelMatrix = new cuonMatrix.Matrix4();
    modelMatrix.setTranslate(0.75, 0, 0);

    //视图矩阵
    var viewMatrix = new cuonMatrix.Matrix4();  // View matrix
    viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);

    //投影矩阵
    var projMatrix = new cuonMatrix.Matrix4();  // Projection matrix
    projMatrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

    //MVP矩阵
    var mvpMatrix = new cuonMatrix.Matrix4();
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);

    //将MVP矩阵传输到着色器的uniform变量u_MvpMatrix
    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
  }


}

export default mesh;