<template>
  <div class="container">
    <div style="height: 100%; width: 100%">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import Mesh from "./../mesh.js";

export default {
  name: "WebGlDemo",
  components: {},
  data() {
    return {};
  },
  watch: {},
  created() {
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      const canvas = document.getElementById("canvas");
      new Mesh(canvas);
    },
  },
  destroyed() {
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
