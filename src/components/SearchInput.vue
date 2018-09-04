<template>
  <div class="search-input-wrapper" v-bind:class="{'hold':(hold && !focused && !searchString)}">
      <input type="search" autocorrect="off" autocapitalize="off" spellcheck="false" v-on:focus="focused=true" v-on:blur="focused=false" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
      <i class="search-icon"></i>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  props: ['hold', 'value'],
  data () {
    return {
      focused: false
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-input-wrapper {
      display: inline-block;
      position: relative;
      width: 412px;
  }

  .search-input-wrapper input {
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background-color: #fff;
    -webkit-appearance: none;
    border: 1px solid #e3e3e3;
    outline: 0;
    padding: 0 28px 0 10px;
    font-size: 14px;
    transition: background-color 0.4s ease, box-shadow 0.4s ease;
    margin:0;
  }

  .search-input-wrapper input::-webkit-search-decoration {
    display: none;
  }

  .search-input-wrapper.hold input {
    background-color: transparent;
  }

  .search-input-wrapper input::-webkit-contacts-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
  }

  .search-input-wrapper input:focus {
      background-color: #fff;
      border-color: #95abc4;
  }

  .search-input-wrapper .search-icon {
      position: absolute;
      display: block;
      width: 18px;
      height: 18px;
      top: 50%;
      margin-top: -9px;
      right: 6px;
      border: 1px solid #bdbdbd;
      border-radius: 100%;
      box-sizing: border-box;
      transform: rotate(-45deg);
      transition: transform 0.5s ease, width 0.5s ease;
      pointer-events: none;
  }


  .search-input-wrapper .search-icon:before {
    content: "";
    display: block;
    position: absolute;
    right: 100%;
    /* margin-right: -2px; */
    border-radius: 2px;
    width: 0;
    height: 3px;
    top: 50%;
    margin-top: -1.5px;
    background: #b3b2b2;
    transition: width 0.5s ease;
    
  }

  .search-input-wrapper.hold .search-icon:before {
    width: 8px;
  }
</style>
