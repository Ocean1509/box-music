<template>
  <div id="app" class="contain">
    <router-view class="router-page"></router-view>
  </div>
</template>
<script>
import Play from 'src/components/play'

export default {
  name: 'App',
  components: {
    Play
  },
  data () {
    return {
      hello: '303030330'
    }
  },
  methods: {
    doSometing() {
      let f = Promise.resolve(222)
      f.then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

