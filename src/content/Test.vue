<template>

<input v-model="caminho" type="file" placeholder="Me edite" @change="getExt">
<p>O caminho é: {{ caminho }}</p>

<p>A extensao é: {{ extensao }}</p>


</template>

<script>
export default {
    name: 'testes',
    data () {
      return {
        caminho: '',
        extensao: ''
      }
      
    },
    methods: {
      getExt(){
        this.extensao = this.caminho.split('.').pop()
        
      }
    },
    
    
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