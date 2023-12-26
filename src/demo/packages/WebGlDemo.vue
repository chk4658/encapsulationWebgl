<template>
  <div class="container">
    <div style="height: 100%; width: 100%">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import Mesh from "./../mesh";

export default {
  name: "WebGlDemo",
  components: {},
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: 'info'
    },
    effect: {
      type: String,
    },
    ckck: {
      type: Float32Array,
    },
  },
  data() {
    return {};
  },
  watch: {},
  created() {
    console.log('coach')
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      const canvas = document.getElementById("canvas");
      console.log(canvas);
      new Mesh(canvas);
    },
  },
  destroyed() {},
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>