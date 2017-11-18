import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import RouterConfig from './routerconfig'
import VueResource from 'vue-resource'
import header from './content/header.vue'
import footer from './content/footer.vue'
/*import VueMask from 'v-mask'
import VeeValidate from 'vee-validate'
import money from 'v-money'*/
import axios from 'axios'
// import lodash from 'lodash'
import VueClip from 'vue-clip'
import JSZip from 'jszip'
import VModal from 'vue-js-modal'
 
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
console.log(moment.locale());

//VeeValidate config
/*const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields', 
  delay: 0, 
  locale: 'en', 
  dictionary: null, 
  strict: true, 
  classes: false, 
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: true,
  aria: true
};*/

Vue.component('app-header',header)
Vue.component('app-footer',footer)

Vue.use(VueRouter)
Vue.use(VueResource)
/*Vue.use(VueMask)
Vue.use(VeeValidate, config)
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})
Vue.use(lodash)*/
Vue.use(VueClip)
Vue.use(JSZip)
Vue.use(VModal)

const router = new VueRouter({
  mode: 'history'
})
router.map(RouterConfig)
router.start(App, 'App')
