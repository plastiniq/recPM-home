<template>
  <div class="pop-up-list">
    <span class="active-text nowrap pop-up-list-button" @click="open">
      <span class="pop-up-list-button-content">
        <slide-text :value="listValues[selectedIndex]"></slide-text>
        <span class="arrows"></span>
      </span>
    </span>
    <transition name="fade" @enter="popUpEnter">
      <div class="pop-up" @click="isOpen = false" v-if="isOpen" ref="pop-up" @mousemove="mouseMoved = true">
          <div class="pop-up-value nowrap" :class="{'active-text': selectedIndex === index, 'hover': selectedIndex === index && mouseMoved === false}" v-for="(value, index) in listValues" :key="value" @click="selectedIndex = index"><span>{{value}}</span></div>
      </div>
    </transition>
  </div>
</template>

<script>
import SlideText from './SlideText.vue'

export default {
  name: 'PopUpList',
  props: [
    'listValues',
    'value'
  ],
  data () {
    return {
      isOpen: false,
      mouseMoved: false,
      selectedIndex: 0
    }
  },
  watch: {
    selectedIndex () {
      this.$emit('input', this.selectedIndex)
    },
    index () {
      this.selectedIndex = this.index
    }
  },
  methods: {
    open () {
      this.isOpen = true
      this.mouseMoved = false
      // console.log(e.target, this.$refs, this.$refs['pop-up'])
    },
    popUpEnter () {
      var popup, el
      popup = this.$refs['pop-up']
      el = popup.querySelectorAll('.pop-up-value')[this.selectedIndex]
      popup.style.top = -el.offsetTop + 'px'
      // console.log(el.offsetTop)
      // this.$refs['pop-up'].style.top = '100px'
      // console.log(this.$refs, this.$refs['pop-up'])
    }
  },
  mounted () {
    this.selectedIndex = this.value
  },
  created () {
  },
  destroyed () {
  },
  components: {
    SlideText
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @duration: 0.1s;
  @padding: 0.85em;

  .pop-up-list {
    position: relative;
    display: inline-block;

    .pop-up-list-button {
      position: relative;
      line-height: 100%;

      .pop-up-list-button-content {
        display: inline-block;
        transition: transform 0.2s;

        > span {
          position: relative;
        }

        &:before {
          content: '';
          display: block;
          position: absolute;
          left: -12px;
          top: -4px;
          right: -10px;
          bottom: -4px;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.05);
          background: linear-gradient(45deg, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.05) 100%);
          // background: #fff;
          // box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transition: opacity 0.2s;
        }
      }
      

      &:hover {
        .pop-up-list-button-content {
          // transform: translate(0, -3px);

          &:before {
            // opacity: 1;
          }
        }
      }
    }

    .pop-up {
      position: absolute;
      left: 0;
      top: -20px;
      max-height: 340px;
      z-index: 100;
      // color: #fff;
      // line-height: 30px;

      > * {
        position: relative;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: -1.47em;
        right: -1.47em;
        top: -0.8em;
        bottom: -0.8em;
        // border-radius: 5px;
        // background-color: #7e91aa;
        background-color: #f2f2f2;
        // border: 1px solid rgba(0,0,0,0.14);
        // box-shadow: 0 2px 9px rgba(0, 0, 0, 0.15);
      }

      &.fade-enter, &.fade-leave-to {
        &:before {
          left: -0.7em;
          top: 0;
          right: -0.7em;
          bottom: 0;
        }

        .pop-up-value:not(.active-text) {
          // transform: scale(0.9)
        }

        .pop-up-value {

          &:before {
            left: -0.7em;
            right: -0.7em;
          }
        }
      }

      &.fade-enter-active, &.fade-leave-active {
        &:before {
          transition-property: left, right, top, bottom;
          transition-duration: @duration;
        }

        .pop-up-value {
          transition: transform @duration;

          &:before {
            transition-property: left, right;
            transition-duration:  @duration;
          }
        }
      }

      > .pop-up-value {
        cursor: pointer;
        margin: 0.41em 0;
        position: relative;

        > span {
          position: relative;
        }

        &.active {
          // color: #1c7bfd;
        }

        &:before {
          content: '';
          display: block;
          position: absolute;
          left: -1.47em;
          right: -1.47em;
          top: -0.17em;
          bottom: -0.17em;
          // border-radius: 4px;
        }

        &:hover, &.hover {
          color: #fff;

          &:before {
            background-color: #647088;
          }
        }

        &:active {
          color: #fff;

          &:before {
            background-color: #346bdb;
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity @duration;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>