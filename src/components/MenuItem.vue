<template>
  <div class="menu-item" :class="{'active-item': $route.params.page === to}">
    <span class="placeholder">{{name}}</span>
    <router-link class="visible-text" :to="to">{{name}}</router-link>
  </div>
</template>

<script>

export default {
  name: 'MenuItem',
  props: ['to', 'name'],
  watch: {
    $route () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .menu-item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    white-space: nowrap;
    color: inherit;

    .placeholder {
      opacity: 0;
      font-weight: 500;
    }

    .visible-text {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: visible;
      font-weight: inherit;
      white-space: nowrap;
      text-align: left;
      color: inherit;
    }
  }
</style>