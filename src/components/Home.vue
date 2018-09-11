<template>
  <div class="home">
    <Input search enter-button size="large" placeholder="Enter something..." class="search" @on-search="search" />
    <div class="result-container">
      <Menu active-name="baidu" :open-names="['platform']" @on-select="choosePlatform">
        <Submenu name="platform">
          <template slot="title">
            <Icon type="ios-analytics" /> 平台选择
          </template>
          <MenuItem name="baidu">百度</MenuItem>
          <MenuItem name="kugou">酷狗</MenuItem>
        </Submenu>
      </Menu>
      <div class="show-list">
        <Loading v-if="loading"></Loading>
        <ul v-if="list.length > 0">
          <div class="list-title">
            <span class="list-title__name">歌曲</span>
            <span>歌手</span>
          </div>
          <li v-for="l in list" @click="toplay(l['song_id'])" class="list-container">
            <span class="list-container__name">{{stripHTML(l.title)}}</span>
            <span class="author">{{stripHTML(l.author)}}</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import Loading from 'src/components/Loading'

export default {
  name: 'Home',
  components: {
    Loading
  },
  data() {
    return {
      platform: 'baidu',
      loading: false,
      list: []
    }
  },
  methods: {
    choosePlatform(e) {
      this.platform = e
    },
    search(e) {
      this.loading = true;
      let url = this.platform === 'baidu' ? '/baidu/songsearch' : '/kugou/songsearch';
      let params = this.platform === 'baidu' ? { query: e } : { keyword: e };
      axios({
        methods: 'get',
        baseURL: 'http://localhost:3456/',
        url,
        params
      }).then(res => {
        this.loading = false
        this.list = res.data
      })
    },
    stripHTML(str) {
      var reTag = /<(?:.|\s)*?>/g
      return str.replace(reTag, '')
    },
    toplay(id) {
      this.$router.push({ path: `/play/${id}`})
    }
  }
}
</script>
