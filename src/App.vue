<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style lang="less">
@import (css) 'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,500&subset=cyrillic';

body {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4c4e4b;
  font-size: 17px;
  line-height: 140%;
  font-weight: 300;
}

#app {
  padding: 0 100px;
}

@media only screen and (max-width: 1280px) {
  #app {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 1000px) {
  #app {
    padding: 0 23px;
  }
}

body, html {
  padding: 0;
  margin: 0;
}

.outlined {
  display: inline-block;
  position: relative;
  /* margin-left: 7px; */
  color: #fff;
  font-weight: 500;
  background-color: #42c3a9;
  border-radius: 100px;
  padding: 2px 8px;
}

.outlined:before {
  /* content: '';
  display: block;
  position: absolute;
  left: -7px;
  top: -1px;
  right: -7px;
  bottom: -1px;
  border-radius: 12px;
  background-color: #42c3a9;
  z-index: -1; */
}

a {
  color: #3356ba;
  text-decoration: none;
}

.extra-light {
  color: #cccaca;
}

.light {
  color: #979797;
}

.active-text {
  color: #2c8ada;
  cursor: pointer;
}

.list-icon {
  display: inline-block;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 2px;
}


.list-icon:before {
  content: "▲";
  font-size: 35%;
  vertical-align: super;
  /* font-size: 0.5em; */
}

.list-icon:after {
  font-size: 35%;
  position: absolute;
  display: inline-block;
  content: "▼";
  top: 22%;
  left: 0;
  vertical-align: super;
  // font-size: 0.5em;
}

.nowrap {
  white-space: nowrap;
}

.arrows {
  display: inline-block;
  margin-left: 0.4em;
  // width: 5px;
  // height: 10px;
  // background: url('./assets/images-assets/arrows.svg') no-repeat center center;
}

.arrows:before {
  content: "▼";
  font-size: 40%;
  vertical-align: middle;
  font-family: Arial, Helvetica, sans-serif;
}

.displayNone {
  display: none !important;
}

.table {
  display: table;
}

.tr {
  display: table-row;
}

.td, .th {
  display: table-cell;
  vertical-align: middle;
}

</style>
