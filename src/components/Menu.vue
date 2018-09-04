<template>
  <div class="main-menu">
    <div><MenuItem :to="'growing'" :name="'Fastest Growing'" /></div>
    <div><span v-tooltip.top="{content: 'Not Implemented in Demo', trigger: 'click hover'}">Activity</span></div>
    <div><MenuItem :to="'search'" :name="'Search'" /></div>
  </div>
</template>

<script>
import VTooltip from 'v-tooltip'
import '@/assets/css/tooltip.less'
import MenuItem from './MenuItem.vue'

export default {
  name: 'Menu',
  props: {
  },
  data () {
    return {
    }
  },
  watch: {
    $route () {
      // this.route = this.$root.currentRoute
    }
  },
  methods: {
  },
  mounted () {
    // console.log(this.$route)
  },
  created () {
  },
  destroyed () {
  },
  components: {
    VTooltip,
    MenuItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .main-menu {
    height: 270px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;

    > div {
      font-size: 40px;
      font-weight: 100;
      margin-right: 100px;
      cursor: pointer;
      color: #b0bed0;

      .active-item {
        font-weight: 500;
        color: #ff404a;

        &:after {
          content: '';
          display: block;
          position: absolute;
          bottom: -30px;
          height: 1px;
          left: 0;
          right: 0;
          background-color: #ff404a;
          opacity: 0.3;
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    .main-menu {
      flex-wrap: wrap;
      align-items: center;
      align-content: center;
      height: 200px;

      > div {
        font-size: 27px;
        font-weight: 200;
        color: #b0bed0;
        cursor: pointer;
        margin-right: 0;
        margin: 12px 0;
        flex-basis: 100%;

        .active-item {
          &:after {
            display: none;
          }
        }
      }
    }
  }
</style>