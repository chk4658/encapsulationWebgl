<template>
  <div class="chart-wrap" v-resize:throttle.100="handleResize">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "SimpleChart",
  props: {
    option: Object,
  },
  data() {
    return {
      chart: null,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  computed: {},
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    configCharts() {
      let _this = this;
      // 等外部字体完全引入再绘制echart
      document.fonts.ready.then(function () {
        _this.chart = echarts.init(_this.$refs.chart);
        _this.chart.setOption(_this.option, true);
      });
    },
  },
  mounted() {
    this.configCharts();
  },
  watch: {
    option: {
      deep: true,
      handler(newVal) {
        if (this.chart) {
          this.chart.setOption(newVal, true);
        }
      },
    },
    screenWidth() {},
    screenHeight() {},
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}

.chart-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
