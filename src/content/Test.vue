<template>
<h1>Testes</h1>
    <!--
    <input id="inputFile" type="file">
    <p id="atributos"></p>-->
    
    <input id="inputImage" type="file" onchange="pegaArquivo(this.files)">
    <div id="imgLocal"></div>

<!--<vue-clip :options="options">
 
    <template slot="clip-uploader-action">
      <div>
        <input type="file" class="dz-message">
          <h2> Click or Drag and Drop files here upload </h2>
      </div>
    </template>
    
    <template slot="clip-uploader-body" scope="props">
      <div v-for="file in props.files">
        <img v-bind:src="file.dataUrl" />
        {{ file.name }} {{ file.status }}
      </div>
    </template>

    

</vue-clip>-->

</template>

<script>
export default {
    name: 'testes',
    data () {
      return {
        options: {
          url: '/upload',
          paramName: 'file'
        },
        imgLocal: ''
      }
      
    },
    methods: {
        /*pegarArquivo(arquivoSelecionado) {
            if(arquivoSelecionado.files){
            var file = arquivoSelecionado.files[0];
            document.getElementById('atributos').innerHTML =
                                 '  nome do arquivo: '+file.name +
                                 ';  tipo do arquivo: '+file.type +
                                 ';  tamanho do arquivo: '+file.size + ' bytes'
            }   
            
        },*/
        pegaArquivo(files){
            let imgLocal = document.getElementById('imgLocal')
            let file = [0];
            let img = document.createElement("img");
                img.file = file;

                imgLocal.appendChild(img)

            let reader = new FileReader();
                reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
                reader.readAsDataURL(file);
        }
    },
    created(){
      let t = this
      //t.pegarArquivo()
      //t.pegaArquivo()
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