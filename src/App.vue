<template>

<div class="conteudo">
    <router-view></router-view>
</div>
        

</template>
<script>
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
    },
    
  }
}

</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
        margin:0; 
        padding:60px 0 0;
        max-height: 100%;
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
		padding: 10px;
		width: 100%; 
		position: fixed;
		top: 0; 
        left: 0;
		background: #fff;
		text-align: left;
        z-index: 4;
	}
    .tile {
        font-size: 30px;
		padding: 10px;
		position: fixed;
        margin-left: 50px;
		top: 0; 
        left: 0;
		background: #fff;
		text-align: center;
        z-index: 5;
	}
    .conteudo {
        margin: 10px;
    }
    
    
</style>