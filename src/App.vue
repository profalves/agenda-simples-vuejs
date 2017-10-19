<template>
    <div id="app">
        <nav class="navbar">
          <div class="navbar-brand">
            <!-- navbar items, navbar burger... -->
            <span class="nav-item">
                <!--<button class="button navbar-burger" v-on:click.native="toggleLeftSidenav">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>-->
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
            </span>
          </div>
          
        </nav>
        
        
 
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
</style>