import Vue from 'vue'
import App from './App'
import iView from 'iview';
import router from './router';
import 'iview/dist/styles/iview.css';
import 'src/style/_style.scss'

Vue.use(iView);

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router, 
  render: (h) => h(App)
}).$mount(root)
