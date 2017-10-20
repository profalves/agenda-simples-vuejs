<template>

<input v-model="caminho" type="file" placeholder="Me edite" @change="getExt">
<p>O caminho é: {{ caminho }}</p>

<p>A extensao é: {{ extensao }}</p>

<br>


=====================================================================

  <div class="hello">
    <h1>{{ message }}</h1>
  </div>

</template>

<script>
export default {
    name: 'testes',
    data () {
      return {
        caminho: '',
        extensao: '',
        message: 'Loading'
      }
      
    },
    methods: {
      getExt(){
        this.extensao = this.caminho.split('.').pop()
        
      }
    },
    route: {
       data (transition) {
          setTimeout(() => {
            transition.next({
              message: 'Hello world'
            })
          }, 3000)
       },
       waitForData: true 
    }
    
    
}

</script>

<style scoped>
    .dz-message {
        
    }
    .clip-uploader-action {
        background: white;
    }
    .upload-action.is-dragging {
        background: green;
    } 

</style>