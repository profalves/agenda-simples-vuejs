<template>
    <div id="app">
        <div class="topo">
            
                <a v-link="{ path: '/' }" class="button is-primary">
                    <span class="icon">
                    <i class="fa fa-home"></i>
                    </span>
                    <span>Início</span>
                </a>
                <a v-link="{ path: '/ccompromissos' }" class="button is-dark">
                    <span class="icon">
                    <i class="fa fa-user"></i>
                    </span>
                    <span>Agenda</span>
                </a>
             
        </div>
        
        
 
        <div class="container">
            <div style="margin: 10px;">
            <router-view></router-view>
            </div>
        </div>
        
       

        <!--<footer>
            @ 2017. <a href="http://www.7virtual.com.br/" target="_blank" class="link">7Virtual</a>
        </footer>-->

        
            
    </div>
</template>
<script>
import store from './vuex/store'
import FileSaver from './FileSaver.js'
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');

export default {
  name:'VueSystem',
  data () {
    return {
    }
  },
  store,
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    closeLeftSidenav () {
      this.$refs.leftSidenav.close()
    },
    open (ref) {
      console.log('Menu aberto: ' + ref)
    },
    close (ref) {
      console.log('Menu fechado: ' + ref)
    }
  }
}

</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
        margin:0; 
        padding:60px 0 0;
    }
    h1 {
        font-size: 50px;
    }
    footer {
        position: absolute;
        right: 0;
        bottom: absolute;
        left: 0;
        padding: 1rem;
        background-color: lightslategray;
        text-align: center;
        z-index: 5;
        width: 100%;
        color: aliceblue;
    }
    .container{
        margin: 0;
    }
    nav.navbar{
        position: absolute;
        z-index: 5;
    }
	.topo {
		box-shadow: 0 0 5px 2px rgba(0,0,0,0.6);
		padding: 10px 0;
		width: 100%; 
		position: fixed;
		top: 0; 
        left: 0;
		background: #fff;
		text-align: center;
        z-index: 5;
	}
</style>