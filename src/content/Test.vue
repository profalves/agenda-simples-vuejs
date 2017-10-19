<template>

<input v-model="caminho" type="file" placeholder="Me edite" @change="getExt">
<p>O caminho é: {{ caminho }}</p>

<p>A extensao é: {{ extensao }}</p>

<br>

<div class="card">
  <header class="card-header" style="background-color: grey;">
    <p class="card-header-title">
      Component
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
      <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>

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