<template>
    <app-header></app-header>
    <center>
        <h3>Bem vindo</h3>
        <p v-text="today"></p>
        <p v-text="currentTime1"></p>
        <div class="clock" v-text="currentTime2"></div>
    </center>    
</template>
<script>
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');

export default{
  name: 'Inicio',
  data () { 
    return {
      message: 'Bem vindo',
      currentTime1: moment().format('LL'),
      currentTime2: null,
      today: moment().format('dddd')
    }
  },
  methods: {
    updateCurrentTime() {
      // this.currentTime1 = moment().format('LLL');
      this.currentTime2 = moment().format('LTS');
    }
  },
  created() {
    this.currentTime2= moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
}
</script>

<style scoped>
    h3 {
        font-size: 45px;
        margin-bottom: 20px;
    }
    p{
        font-size: 25px;
    }
    .clock {
        width: 100%;
        margin-top: 30px;
        color: slategray;
        font-size: 80px;
    }
</style>