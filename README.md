# encapsulation Webgl



### webgl
```
WebGL 算是比较底层的图形 API，WebGL 只能用它来渲染点，线和三角形。那些复杂的 3D 模型其实都是由一个个三角形组成。


顶点着色器
    对传进来的顶点数据通过矩阵进行换换位置、计算照明方程式以生成逐顶点的颜色以及生成或者变换纹理坐标。
    
片元着色器
    对即将送到屏幕上的像素内容进行更进一步的处理，包括一些特殊效果的定制等。
    
顶点数组对象（VBO）
    存储相关的顶点数据
    
索引数组对象（IBO）
    表示顶点组合顺序
```

### npm
```
npm version major   主版本号（大版本）[2.0.0]
npm version minor   次版本号（小更新）[1.1.0]
npm version patch   补丁号（补丁）[1.0.1]

npm config set registry https://registry.npmjs.org/

npm login 

npm publish

```

### yalc
```
npm i yalc -g

组件
    发布依赖 yalc publish
    更新和推送 yalc push
    
用户
    添加依赖 yalc add xxx
    移除依赖 yalc remove xxx
    更新依赖 yalc update xxx
    移除当前包里的全部yalc依赖 yalc remove --all

```

### 参考文章
- [基于element-ui二次封装vue组件发布到npm](https://juejin.cn/post/7008793714835324936)
- [yalc: 可能是最好的前端link调试方案](https://juejin.cn/post/7033400734746066957)
- [NPM 包的发布、更新、撤销](https://juejin.cn/post/6932803368226127886)