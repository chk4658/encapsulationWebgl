<template>
  <div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "Layout",
  components: {},
  computed: {
    device() {
      return this.$store.state.app.device;
    },
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
