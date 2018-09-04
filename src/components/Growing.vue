<template>
  <div class="main-table">
    <div class="tr table-header">
      <div class="th index"></div>
      <div class="th period">
        <div class="colspan-wrapper">
          <div class="absolute-container">
            <PopUpList :list-values="periods" @select="selectPeriod" v-model="periodIndex" />
          </div>
        </div>
      </div>
      <div class="th"></div>
      <div class="th"></div>
      <div class="th"><span class="extra-light nowrap">Daily Commits</span></div>
      <div class="th"><span class="extra-light">Language</span></div>
    </div>
    <div class="tr" v-for="(repo, index) in filteredRepositories" :key="repo.name">
      <div class="td index">{{index + 1}}</div>
      <div class="td grow">
        <!-- <span class="nowrap">{{repo.votes.was}} <span class="extra-light">◊</span></span> -->
        <!-- <span class="light nowrap" style="padding: 0 20px">+{{repo.votes.now - repo.votes.was}}</span> -->
        <!-- <span :style="{'font-size': getVotesFontSize(repo.votes) + '%'}" class="nowrap"> {{repo.votes.now}} <span class="extra-light">◊</span></span> -->
        <span>{{grow(repo.grow)}}%</span>
      </div>
      <div class="td logo"><img :src="require('@/assets/images-assets/' + repo.logo)" /></div>
      <div class="td name-description">
        <div class="name-description-wrapper">
          <a :href="repo.link || 'javascript:'" class="repo-name" v-tooltip.top="{content: 'Not Implemented in Demo', classes:[repo.link ? 'displayNone' : ''], trigger: 'click hover'}">
            <span>{{repo.name}}</span>
          </a>
          <div class="repo-description">{{repo.description}}</div>
        </div>
      </div>
      <div class="td activity"><img :src="require('@/assets/images-assets/a' + (index + 1) + '.png')" /></div>
      <div class="td language">{{repo.language}}</div>
    </div>
    <div v-for="(index) in loadingCount" :key="index" class="tr loading">
      <div class="td index">{{repositories.length + index}}</div>
      <div class="td grow"></div>
      <div class="td logo"></div>
      <div class="td name-description">
        <div class="name-description-wrapper"></div>
      </div>
      <div class="td activity"></div>
      <div class="td language"></div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue';
import PopUpList from './PopUpList.vue'

export default {
  name: 'Growing',
  props: {
  },
  data () {
    return {
      repositories: [],
      votesFontSize: {max: 28, min: 17},
      votesFontSizeMin: 17,
      maxVote: 0,
      minVote: 0,
      loadingCount: 5,
      route: this.$root.currentRoute,
      periods: [
        '1 day',
        '7 days',
        '30 days'
      ],
      periodIndex: 1
    }
  },
  computed: {
    filteredRepositories () {
      var days = parseInt(this.periods[this.periodIndex])

      return this.repositories.slice().sort((a, b) => {
        return b.grow[days] - a.grow[days]
      })
    },
  },
  watch: {
    repositories () {
      var max = 0,
          min = Infinity
      for (let i = 0; i < this.repositories.length; i++) {
        max = Math.max(this.repositories[i].votes.now, max)
        min = Math.min(this.repositories[i].votes.now, min)
      }
      this.maxVote = max
      this.minVote = min
    },
    $route () {
      this.route = this.$root.currentRoute
    }
  },
  methods: {
    getVotesFontSize (values) {
      // return this.votesFontSize.min + (value - this.minVote) / (this.maxVote - this.minVote) * (this.votesFontSize.max - this.votesFontSize.min)
      return values.now / values.was * 100
    },
    handleScroll () {
      if (window.innerHeight + (document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight) {
        this.loadingCount = Math.min(20, this.loadingCount + 5)
      }
    },
    grow (value) {
      var days = parseInt(this.periods[this.periodIndex])
      return (value[days] > 0 ? '+' : '-') + Math.round(value[days] * 100)
    },
    selectPeriod (e) {
      this.periodIndex = e.index
    }
  },
  mounted () {
    axios.get('static/data/repositories.json').then((d) => {
      // this.maxVote = 
      this.repositories = d.data
    })
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('popstate', () => {
      // console.log(window.location.pathname)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    PopUpList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-table {
  width: 100%;
  display: table;

  >.tr {

    .th, .td {
      padding-left: 25px;
      padding-right: 25px;
      border-bottom: 1px solid #f2f2f2;

      &.index {
        display: none;
      }

      &.name-description {
        .name-description-wrapper {
          max-width: 50em;
        }
      }

      &.grow {
        span {
          display: inline-block;
          min-width: 55px;
        }
      }

      &.logo, &.activity {
        width: 10%;
      }

      &.language {
        width: 15%;
      }

      &.name-description {
        width: 60%;
      }

      &:last-child {
        text-align: right;
      }
    }

    .th {
      font-weight: inherit;
      text-align: left;
      padding-bottom: 20px;

      &.period {
        .colspan-wrapper {
          position: relative;

          &:before {
            content: "\200b";
          }

          .absolute-container {
            position: absolute;
            overflow: visible;
            left: 0;
            top: 0;
          }
        }
      }
    }

    .td {
      padding-top: 55px;
      padding-bottom: 55px;

      &.logo {
        text-align: center;

        img {
          max-width: 40px;
          max-height: 40px;
          vertical-align: middle;
        }
      }

      .name-description {
        // width: 600px;
      }

      // .repo-description {
      //   max-width: 600px;
      // }
    }

    &.loading {

      > .td {

        &:before{
          content: '';
          display: block;
        }

        &:after, &:before {
          background-color: #ededed;
        }

        &:not(.logo) {
          &:after, &:before {
            height: 15px;
            border-radius: 8px;
          }
        }
      }

      .grow, .activity {
        &:before {
          content: '';
          display: block;
          width: 80%;
        }
      }

      .activity {
        &:before {
          max-width: 50px;
        }
      }

      .language {
        &:before {
          display: inline-block;
          position: relative;
          max-width: 100px;
          width: 100%;
        }
      }

      .activity {
        &:before {
          background-image: linear-gradient(to right, #ededed, #ebecf2, #e7ecf7, #e1ecfb, #d8edff);
        }
      }

      .logo {
        &:before {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: inline-block;
        }
      }

      .name-description {
        // width: 100%;

        &:before {
          max-width: 200px;
          margin-bottom: 12px;
        }

        &:after {
          content: '';
          display: block;
          max-width: 80%;
        }
      }
    }
  }

  .repo-name {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
  }
}

@media only screen and (max-width: 1000px) {
  .main-table {
    @margin: 6px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    font-size: 11px;
    margin: 0 -@margin;
    
    > .tr {
      flex: 0 0 0;
      margin: @margin;
      display: block;
      flex-basis: calc(50% - (@margin * 2));
      height: 155px;
      border: 1px solid #f2f2f2;
      box-sizing: border-box;
      flex-shrink: 1;
      min-width: 100px;
      position: relative;
      transition: transform 0.2s;

      &:active {
        border-color: #6bbbfe;
      }

      .td, .th {
        display: block;
        border: 0;
        padding: 0;
      }

      &.table-header {
        height: auto;
        font-size: 14px;
        flex-basis: 100%;
        border: 0;

        .th {
          padding-bottom: 7px;
        }

        .th:not(.period) {
          display: none;
        }
      }

      &:not(.table-header)  {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      
        .td:not(.logo) {
          position: absolute;
          line-height: 100%;
        }

        .repo-description {
          display: none;
        }

        .logo {
          width: auto;
        }

        .repo-name {
          font-size: 11px;
          font-weight: 300;
          margin: 0;

          span {
            color: #2a2a2a;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            position: absolute;
            left: 8px;
            bottom: 8px;
            right: 8px;

            &:after {
              content: '';
              display: block;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 50%;
              background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%);
            }
          }
        }

        .name-description {
          font-size: 11px;
          left: 8px;
          bottom: 6px;
          right: 8px;
          position: relative;
          width: auto;
          // overflow: hidden;
        }

        .name-description, .name-description-wrapper, .repo-name {
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
        }

        .grow {
          font-size: 12px;
          right: 10px;
          top: 8px;
          left: 8px;
          color: #fc3c3c;
          text-align: right;
        }

        .activity, .language {
          display: none;
        }
      }

      &.loading {
        > .td:not(.index) {
          display: none;
        }

        .td {
          &:before, &:after {
            display: none;
          }
        }

        > .index {
          left: 8px;
          bottom: 8px;
          display: block;
        }
      }
    }
  }
}
</style>