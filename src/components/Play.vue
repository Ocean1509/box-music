<template>
  <div>
    <audio id="myaudio" v-if="show" loop="loop" controls = "controls">
      <source :src="src" type="audio/ogg">
      <source src="horse.mp3" type="audio/mpeg"> 您的浏览器不支持 audio 与元素。
    </audio>
    <input type="button" @click="autoPlay" value="播放">
    <!-- <button onclick="pauseAudio" type="button">暂停音频</button> -->
  </div>

</template>
<script>
import axios from 'axios'
export default {
  name: 'play',
  data() {
    return {
      id: '',
      show: false,
      src: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios({
      methods: 'get',
      baseURL: 'https://fast-earth-14384.herokuapp.com/',
      url: '/baidu/songdetail',
      params: {
        songid: this.id
      }
    }).then(res => {
      this.src = res.data.bitrate['show_link']
      // let audio = document.getElementById('myaudio');
      // console.log(audio)
      // audio.load();1
      this.show = true
    })
  },
  methods: {
    pauseAudio() {
      var x = document.getElementById('myaudio')
      x.pause()
    },
    autoPlay() {
      // this.src =
      //   'http://zhangmenshiting.qianqian.com/data2/music/29ecc7c81a7eae84a34ec28a3185fd52/594763855/594763855.mp3?xcode=9071f864affac74be9c5304b21fec782'
      // setTimeout(() => {
      //   document.getElementById('myaudio').play()
      // }, 1000)

      // var audio = new Audio("http://zhangmenshiting.qianqian.com/data2/music/29ecc7c81a7eae84a34ec28a3185fd52/594763855/594763855.mp3?xcode=9071f864affac74be9c5304b21fec782");
      // audio.play();
      var x = document.getElementById('myaudio')
      x.load()
      x.play()
    }
  }
}
</script>
