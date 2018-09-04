<template>
  <div class="main">
    <header>
      <div class="logotype"><span style="font-weight: 500">RecPM</span> Repositories</div>
      <div class="user-menu"><div class="user-icon" :style="{'background-image': 'url(' + require('@/assets/images-assets/user-icon.svg') + ')'}"></div><span class="user-name">Malan Alankara </span><span class="outlined user-votes">38 ◊</span></div>
    </header>
    <Menu />
    <div class="main-body">
      <Growing v-if="$route.params.page === 'growing' || $route.path === '/'" />
      <Search v-if="$route.params.page === 'search'" />
    </div>
  </div>
</template>

<script>
import Growing from './Growing.vue'
import Search from './Search.vue'
import Menu from './Menu.vue'

export default {
  name: 'Main',
  props: {
  },
  data () {
    return {
      pagePath: 'growing'
    }
  },
  watch: {
    $route () {
    }
  },
  methods: {
  },
  mounted () {
  },
  created () {
  },
  destroyed () {
  },
  components: {
    Growing,
    Search,
    Menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  header {
    /* background-color: red; */
    margin-top: 35px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;

    .user-icon {
      display: none;
    }
  }

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

      a {
        color: #b0bed0;
      }

      &.menu-active {
        font-weight: 500;
        position: relative;

        a {
          color: #ff2f2f;
        }

        &:after {
          content: '';
          display: block;
          position: absolute;
          bottom: -20px;
          height: 1px;
          left: 0;
          right: 0;
          background-color: #ff2f2f;
          opacity: 0.3;
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    header {
      // display: none;
      font-size: 14px;
      margin-top: 18px;

      .user-votes {
        background-color: transparent;
        padding: 0;
        color: inherit;
      }

      .user-name {
        display: none;
      }

      .user-menu {
        position: relative;

        .user-icon {
          content: '';
          display: block;
          position: absolute;
          width: 14px;
          height: 14px;
          top: calc(50% - 8px);
          left: -25px;
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.4;
        }
      }
    }

    .main-menu {
      // display: block;
      // margin: 60px 0 0 22px;
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

        &.menu-active {
          color: #ff2f2f;
          font-weight: 500;
          position: relative;

          &:after {
            content: '';
            display: none;
          }
        }
      }
    }
  }
</style>