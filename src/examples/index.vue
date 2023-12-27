<template>
  <div>
    <canvas id="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import mesh from "@/mesh";

export default {
  name: "wExample",
  components: {},
  mounted() {
    const instance = new mesh();
    instance.drawBasicGraphics(document.getElementById("canvas"));
  },
};
</script>

<style></style>
