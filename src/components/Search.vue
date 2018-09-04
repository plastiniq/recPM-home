<template>
  <div class="search-main">
    <div class="search-panel">
      <div class="search-input">
        <SearchInput v-model="searchString" />
      </div>
      <div class="search-options">
        <div>Sort by: <PopUpList :list-values="sortList" v-model="sortIndex" /></div>
        <div>Language: <PopUpList :list-values="languagesList" v-model="languageIndex" /></div>
      </div>
    </div>
    <div class="main-table-wrapper">
      <div class="main-table">
        <div class="tr" v-for="(repo, index) in filteredRepositories" :key="repo.name">
          <div class="td index">{{index + 1}}</div>
          <div class="td logo"><img :src="require('@/assets/images-assets/' + repo.logo)" /></div>
          <div class="td name-description">
            <div class="name-description-wrapper">
              <div v-if="sortList[sortIndex] === 'Newest'" class="created light">{{created(repo.created)}}</div>
              <a :href="repo.link || 'javascript:'" class="repo-name" v-tooltip.top="{content: 'Not Implemented in Demo', classes:[repo.link ? 'displayNone' : ''], trigger: 'click hover'}">
                <span>{{repo.name}}</span>
              </a>
              <div class="repo-description">{{repo.description}}</div>
            </div>
          </div>
          <div class="td tokens">
            <span class="nowrap tokens-value" :style="{'font-size': getVotesFontSize(repo.votes.now) + '%'}">{{repo.votes.now}} <span class="extra-light">◊</span></span>
          </div>
          <div class="td nowrap created light">{{created(repo.created)}}</div>
          <div class="td language">{{repo.language}}</div>
        </div>
      </div>
    </div>
    <div class="search-pages" v-tooltip.top="{content: 'Not Implemented in Demo', trigger: 'click hover'}" v-if="filteredRepositories.length > 2">
      <div class="active-item">1</div>
      <div v-for="(index) in 4" :key="index">{{index + 1}}</div>
      <div>…</div>
      <div>14</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PopUpList from './PopUpList.vue'
import SearchInput from './SearchInput.vue'
import MenuItem from './MenuItem.vue'
import moment from 'moment'

export default {
  name: 'Growing',
  data () {
    return {
      repositories: [],
      votesFontSize: {max: 24, min: 17},
      votesFontSizeMin: 17,
      maxVote: 0,
      minVote: 0,
      loadingCount: 5,
      searchString: '',
      route: this.$root.currentRoute,
      sortList: [
        'Newest',
        'Name',
        'Upvotes'
      ],
      languagesList: [
        "All",
        "JavaScript",
        "Java",
        "Python",
        "TypeScript",
        "PHP",
        "Ruby on Rails",
        "Rust",
        "Go",
        "C#",
        "Swift"
      ],
      numPages: 14,
      sortIndex: 0,
      languageIndex: 0
    }
  },
  computed: {
    filteredRepositories () {
      var filtered, sortValue, language
      filtered = this.repositories.slice()
      sortValue = this.sortList[this.sortIndex]
      language = this.languagesList[this.languageIndex].toUpperCase()

      if (this.searchString) {
        let regexp = new RegExp(this.searchString, 'gi')
        filtered = this.repositories.filter((repo) => {
          return regexp.test(repo.name)
        })
      }

      if (language !== 'ALL') {
        filtered = filtered.filter((repo) => {
          return repo.language.toUpperCase() === language
        })
      }

      if (sortValue === 'Newest') {
        filtered.sort((a, b) => {
          return Date.parse(b.created) - Date.parse(a.created)
        })
      } else if (sortValue === 'Name') {
        filtered.sort((a, b) => {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      } else if (sortValue === 'Upvotes') {
        filtered.sort((a, b) => {
          return b.votes.now - a.votes.now
        })
      }

      return filtered
    }
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
    getVotesFontSize (value) {
      // return this.votesFontSize.min + (value - this.minVote) / (this.maxVote - this.minVote) * (this.votesFontSize.max - this.votesFontSize.min)
      return Math.max(100, value / this.maxVote * 120)
      // return values.now / values.was * 100
    },
    handleScroll () {
      if (window.innerHeight + (document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight) {
        this.loadingCount = Math.min(20, this.loadingCount + 5)
      }
    },
    grow (value) {
      return (value > 0 ? '+' : '-') + Math.round(value * 100)
    },
    created (value) {
      return moment(value).format('DD MMM YYYY')
    }
  },
  mounted () {
    axios.get('static/data/repositories.json').then((d) => {
      this.maxVote = 
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
    PopUpList,
    SearchInput,
    MenuItem,
    moment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.search-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  margin-bottom: 28px;

  > .search-input {
    margin-right: 50px;
  }

  .search-options {
    > div {
      float: left;
    }
    > div:not(:last-child) {
      margin-right: 50px;
    }
  }
}

.search-pages {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: stretch;
  margin-bottom: 28px;
  color: #9dadc3;
  margin-top: 28px;
  float: right;
  overflow: visible;

  > *:not(:last-child) {
    margin-right: 15px;
  }

  .active-item {
    font-weight: 500;
    color: #ff404a;
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      height: 1px;
      left: -3px;
      right: -3px;
      background-color: #ff404a;
      opacity: 0.8;
    }
  }
}

.main-table {
  width: 100%;
  display: table;

  >.tr {

    &:first-child {
      .td {
        border-top: 1px solid #f2f2f2;
      }
    }

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

        .created {
          display: none;
        }
      }


      &.logo, &.language, &.tokens, &.created {
        width: 10%;
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

      .tokens, .activity {
        &:before {
          content: '';
          display: block;
          width: 80%;
        }
      }

      .tokens {
        &:before {
          max-width: 55px;
        }
      }

      .activity {
        &:before {
          max-width: 60px;
        }
      }

      .language {
        &:before {
          display: inline-block;
          position: relative;
          max-width: 80px;
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
  @padding-offset: 23px;

  .search-panel {
    display: block;
    margin-bottom: 20px;
    margin-top: 13px;

    .search-input {
      margin: 0 -3px;

      .search-input-wrapper {
        display: block;
        width: 100%;
      }
    }

    .search-options {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      align-content: center;


      margin-top: 20px;

      > div {

        &:not(:last-child) {
          margin-right: 30px;
        }
      }
    }
  }

  .search-main {
    font-size: 14px;
  }

  .main-table-wrapper {
    margin: 0 -@padding-offset;
  }

  .main-table {
    > .tr {
      height: 80px;

      > .td, > .th {
        padding: 10px;
        vertical-align: middle;

        &.logo {
          padding-left: @padding-offset;
        }

        &.tokens {
          text-align: right;
          padding-right: @padding-offset;

          .tokens-value {
            font-size: inherit !important;
          }
        }

        &.logo {
      
          img {
            max-width: 28px;
            max-height: 28px;
          }
        }

        &.activity, &.language, &.created  {
          display: none;
        }
      }

      .name-description {
        line-height: 120%;
        

        .name-description-wrapper {
          position: relative;

          .repo-name {
            font-size: 14px;
          }

          .repo-description {
            display: none;
          }

          .created {
            display: block !important;
            position: absolute;
            top: -18px;
            left: 0;
            font-size: 11px;
          }
        }
      }
    }
  }

  .search-pages {

    > *:not(:last-child) {
      margin-right: 30px;
    }
  }
}
</style>