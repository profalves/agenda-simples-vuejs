<template>
  <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
    <span class="fixo sr-only" v-show="isLoading">Carregando...</span>
  <div class="container">
      <!-- cabeçario -->
    <div class="card" style="width: 100%;">
      <header class="card-header">
        <p class="card-header-title">
          Compromisso: {{compromissos.idComp}}
        </p>
      </header>
      <div class="card-content">


        <section>

          <div class="columns">

            <div class="column">
              <label class="label">Data/Hora:</label>
                {{compromissos.dataHora | dataFormat}}
            </div>

            <div class="column">
              <label class="label">Tipo:</label>
                {{compromissos.tipoComp}}
            </div>

            <div class="column is-4">
              <label class="label">Status:</label>
                {{compromissos.status}}
            </div>

          </div>

          <div class="columns">
            <div class="column">
              <label class="label">Assunto:</label>
                {{compromissos.titulo}}
            </div>
            <div class="column is-4">
              <label class="label">Projeto:</label>
                {{compromissos.projeto}}
            </div>
          </div>


          <div class="columns">
            <div class="column">
              <label class="label">Plataforma:</label>
                {{compromissos.plataforma}}
            </div>
            <div class="column">
              <label class="label">Prioridade:</label>
                {{compromissos.numPrioridade}}
            </div>
            <div class="column">
              <label class="label">Usuário:</label>
                {{compromissos.usuario}}
            </div>  
          </div>

        </section>
      </div>

      <div class="card-footer">
        <p class="card-footer-item">
        <a @click="responder" class="button is-primary">Responder</a>
        </p>
      </div>

    </div>

    <!-- fim cabeçario --> 

    <br>

    <h2>Tópico: {{ compromissos.titulo }}</h2>
    <br>

     <!-- responder --> 

     <!-- detalhes -->

    <div v-for="compromisso in compromissosDet">

        <!-- sub-resposta direita -->
        <div v-if="compromisso.align=='D'">
            <div style="margin-top: 11px;"></div>
                <div class="alinD">
                    <div class="box" id="coment">
                        <div class="columns">
                            <div class="column is-3">
                                <a class="button is-primary" v-if="compromisso.botao == true" @click="showResposta(compromisso)" id="btnSubResp">Comentar</a>
                            </div>
                            <div class="column is-3">
                                <strong>Abertura:</strong><br>
                                {{compromisso.dataHoraAgend | dataFormat}}
                            </div>    
                            <div class="column is-3">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>
                            <div class="column is-3">
                                <strong style="color: red">{{compromisso.usuario}}</strong>
                            </div>
                            
                            
                        </div>
                        
                        <div class="columns">
                            <div class="column is-3">
                                 
                            </div>
                            <div class="column is-1" style="margin-top: 5px;">
                                <!--<label class="label">Anexo</label>-->
                                <i class="button fa fa-upload is-primary" @click.prevent="showAnexo(compromisso)"></i> 
                            </div>
                            <div class="column">
                                <a 
                                   class="button" 
                                   href="http://192.168.0.200/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                   target="_blank"
                                   v-if="compromisso.extensao!=null"
                                   >
                                    <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                    <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                    <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                </a>
                            </div>
                            
                        </div>
                        {{ compromisso.idCompDet }}
                        <hr style="margin-top: 5px;">
                        <div class="columns">
                            <div class="column">
                            <div style="font-size: 30px;">{{compromisso.detalhes}}</div>
                            </div>
                        </div>
                        
                    </div>

                </div>


        </div>

        <!-- sub-resposta esquerda -->

        <div v-if="compromisso.align=='E'">
            <div style="margin-top: 11px;"></div>
                <div class="alinE">

                    <div class="box" id="coment">
                        <div class="columns">
                            <div class="column is-3">
                                <a class="button is-primary" v-if="compromisso.botao == true" @click="showResposta(compromisso)" id="btnSubResp">Comentar</a>
                            </div>
                            <div class="column is-3">
                                <strong>Abertura:</strong><br>
                                {{compromisso.dataHoraAgend | dataFormat}}
                            </div>    
                            <div class="column is-3">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>
                            <div class="column is-3">
                                <strong  style="color: red">{{compromisso.usuario}}</strong>

                            </div>
                        </div>
                        
                        <div class="columns">
                            <div class="column is-3">
                                 
                            </div>
                            <div class="column is-1" style="margin-top: 5px;">
                                <!--<label class="label">Anexo</label>-->
                                <i class="button fa fa-upload is-primary" @click.prevent="showAnexo(compromisso)"></i> 
                            </div>
                            <div class="column">
                                <a 
                                   class="button" 
                                   href="http://192.168.0.200/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                   target="_blank"
                                   v-if="compromisso.extensao!=null"
                                   >
                                    <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                    <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                    <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                </a>
                            </div>
                            
                        </div>
                        {{ compromisso.idCompDet }}
                        <hr style="margin-top: 5px;">

                        <div class="columns">
                            <div class="column">
                            <div style="font-size: 30px;">{{compromisso.detalhes}}</div>
                            </div>
                        </div>
                       
                    </div>

                </div>

        </div>

        <!-- box central-->
        <div v-if="compromisso.align=='C'">
            <div style="margin-top: 11px;"></div>
                <div class="alinC">

                    <div class="box" id="coment">
                        <div class="columns">
                            <div class="column is-3">
                                <a class="button is-primary" @click="showResposta(compromisso)">Comentar</a>
                            </div>
                            <div class="column is-3">
                                <strong>Abertura:</strong><br>
                                {{compromisso.dataHoraAgend | dataFormat}}
                            </div>    
                            <div class="column is-3">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>
                            <div class="column is-3">
                                <strong  style="color: red">{{compromisso.usuario}}</strong>

                            </div>
                        </div>
                        
                        <div class="columns">
                            <div class="column is-3">
                                 
                            </div>
                            <div class="column is-1" style="margin-top: 5px;">
                                <!--<label class="label">Anexo</label>-->
                                <i class="button fa fa-upload is-primary" @click.prevent="showAnexo(compromisso)"></i> 
                            </div>
                            <div class="column">
                                <a 
                                   class="button"
                                   href="http://192.168.0.200/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                   target="_blank"
                                   v-if="compromisso.extensao!=null"
                                   >
                                    
                                     <!-- @click="showExibir(compromisso)"-->
                                    
                                    <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                    <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                    <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                </a>
                            </div>
                            
                        </div>
                        {{ compromisso.idCompDet }}
                        <hr style="margin-top: 5px;">

                        <div class="columns">
                            <div class="column">
                            <div style="font-size: 30px;">{{compromisso.detalhes}}</div>
                            </div>
                        </div>
                       
                    </div>
                </div>
        </div>
        <!--fim box central-->

    </div>


    <!-- MODAL -->    

    <div id="modal_compromisso" class="modal" :class="{'is-active':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Comentando</p>
          <button class="delete" @click.prevent="showModal=false"></button>
        </header>
        <section class="modal-card-body">

                <textarea id="detalhes" class="textarea" v-model.trim="compDet.detalhes" placeholder="Digite a sua resposta" style="width: 100%;"></textarea>
                <br>
                <div class="columns">

                    <div class="column">
                        <label class="label">Data:</label>
                        <div class="select">
                          <date-picker :date="startTime" :option="option" :limit="limit" id="data"></date-picker>
                        </div>
                        <!-- <span>{{ startTime.time }}</span> -->
                    </div>
                    
                    <div class="column">
                        <div v-if="!image">
                            <label class="label">Selecione uma imagem:</label>
                            <input type="file" @change="onFileChange">
                        </div>

                        <div v-else>
                            <img :src="image">
                            <center><button @click="removeImage">Remove image</button></center>
                        </div>
                    </div> 

                </div>

        </section>
        <div class="box">
          <div class="level">
              <div class="level-left">
                  <div class="level-item">
              <a class="button" @click.prevent="showModal=false">Cancelar</a>
                </div>
              </div>
              <div class="level-left">
                  <div class="level-item">
                  <a class="button is-primary" @click.prevent="salvarSubDet()">Enviar</a>
                  </div>
              </div>
          </div>
       </div>
      </div>
    </div>
    <!-- fim modal -->

    <!-- MODAL Add IMAGEM -->
      
        <div class="modal" :class="{'is-active':showUpload}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box is-narrow">
                <div class="columns">
                    <div class="column is-4">
                        
                    </div>
                    <div class="column is-2">
                        <input type="radio" id="one" value="1" v-model="picked">
                        <label for="one">Imagem</label>
                    </div>
                
                    <div class="column is-2">
                        <input type="radio" id="two" value="2" v-model="picked" @click="image=''">
                        <label for="two">Arquivo</label>
                    </div>
                    
                </div>
                
                <div v-if="!image && picked=='1'">
                    <center>
                        <label class="label">Selecione uma imagem:</label>
                        <input type="file" @change="onFileChange">
                    </center>
                </div>
                
                <div v-if="image">
                    <img :src="image" />
                    <center>
                        <button class="button is-danger" @click="removeImage">Remover</button>
                        <button class="button is-primary" @click="enviarImg()">Enviar</button><br><br>
                        <strong>Arquivo: {{ image | extensao }}</strong>
                    </center>

                </div>
                
                <div v-if="picked=='2'">
                    
                    <center>
                        <label class="label">Selecione um Arquivo (o mesmo será zipado):</label>
                        <input type="file" v-model="arquivo" @change="zipFile()">
                    </center>

                </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click.prevent="showUpload=false"></button>
        </div>
      
    <!-- fim modal -->
      
    <!-- MODAL exibir IMAGEM --
      
        <div class="modal" :class="{'is-active':showImage}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <p class="image is-4by3">
              <img :src="http://192.168.0.200/helpdesk/files/ + idResposta + . + ext">
            </p>
          </div>
          <button class="modal-close is-large" aria-label="close" @click.prevent="showImage=false"></button>
        </div>
      
    <!-- fim modal -->
    

    <!-- RESPOSTA GERAL -->
      
      <div id="resposta" class="box" style="margin-top: 20px;">
          <label class="label">Resposta:</label>
                <textarea @click="responder()" class="textarea" v-model.trim="compDet.detalhes" placeholder="Digite a sua resposta" style="width: 100%;"></textarea>
                <br>
                <div class="columns">

                    <div class="column">
                        <label class="label">Data:</label>
                        <div class="select">
                          <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
                        </div>
                        <!-- <span>{{ startTime.time }}</span> -->
                    </div>
                    <div class="column">
                            <div class="column">
                        <div v-if="!image">
                            <label class="label">Selecione uma imagem:</label>
                            <input type="file" @change="onFileChange">
                        </div>

                        <div v-else>
                            <img :src="image">
                            <center><button @click="removeImage">Remove image</button><br>
                            <strong>Arquivo: {{ image | extensao }}</strong></center>
                        </div>
                    </div>   
                    </div>
                    <span></span>
                    <!-- <div class="column">
                    <label class="label">Status</label>
                      <div class="select">
                          <select v-model="compDet.idStatus">
                              <option v-for="stat in status" :value="stat.idStatus">
                                {{ stat.nome }}
                              </option>
                          </select>
                      </div>
                      <!-- <span>{{ compDet.idStatus }}</span> --
                    </div> -->
                    <div class="column is-1">    
                        <a class="button is-primary enviar" @click.prevent="salvarDet()">Enviar</a>
                    </div>
                </div>

      </div> 
    </div>
    <span class="nav-item">
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
        <button class="button navbar-burger" @click="backtoTop">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
    </span>
</template>

<script>

  //plugin para requisições
  import axios from 'axios'

  //captura hora e data
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');

  //Calendário
  import myDatepicker from 'vue-datepicker'

  //Repositório:
  const REPO = 'files/'
  
  //zipar Arquivos
  import FileSaver from 'file-saver'
  import JSZip from 'jszip'
    
  var zip = new JSZip()
  
  //dev:
  const ENDPOINT = 'http://192.168.0.200/helpdesk/'

  // ao descomentar abaixo tem que comentar a const acima
  //debug:
  //const ENDPOINT = 'http://192.168.0.115:32688/'
  

export default {
    name: 'CompromissosDet',
    data () {
      return {
        title: 'Tópico',
        showModal: false,
        showUpload: false,
        showImage: false,
        isLoading: false,
        selected: {},
        compromissos: [],
        compromissosDet: [],
        visivel: false,
        image: '',
        ext: '',
        arquivo: [],
        url: 'http://192.168.0.200/helpdesk/files/',
        picked: '',

        compDet: {
            "detalhes": '',
            "idComp": this.$route.query.q,
            "idUsuario": 4,
            "idStatus": 1,
            "dataHoraAgend": '',
            "nivel": 1
        },
        status: [],  
        usuarios: [
          { text: 'KEL', value: 4}
        ],
        nivelResposta: '',
        idResposta: '',
        ultimoDet: '',
        primeiroDet: '',
        imgDet: {
            
            "idCompDet": '',
            "imgFile": '',
            "extFile": ''
            
        },  
        
        // datapicker
        startTime: {
            time: moment().format('YYYY-MM-DD HH:mm')
        },
        endtime: {
            time: ''
        },
        option: {
            type: 'day',
            week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            format: 'YYYY-MM-DD' + moment().format('THH:mm'),
            placeholder: 'Insira a data',
            inputStyle: {
              'display': 'inline-block',
              'padding': '5px',
              'line-height': '18px',
              'font-size': '16px',
              'border': '2px solid #fff',
              'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
              'border-radius': '2px',
              'color': '#5F5F5F',
              'margin-bottom': '5px'
        },
        color: {
          header: '#1FC8DB',
          headerText: '#fff'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
        },
        timeoption: {
          type: 'time',
          week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          format: 'YYYY-MM-DDTHH:mm'
        },
        multiOption: {
          type: 'multi-day',
          week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          format: 'YYYY-MM-DDTHH:mm'
        },
        limit: [{
          type: '', // preencher com 'weekday' para impor limite no calendário e ocultar dom/sab
          available: [1, 2, 3, 4, 5, 6] //define o limite de dias uteis - [6] inclui o sábado no calendário  
        },
        { // sem uso no momento
          type: 'fromto',
          from: '',
          to: ''
        }
        ]
      }
    },
    
    components: {
      'date-picker': myDatepicker,
      JSZip
    },
    
    filters: {
      dataFormat: function (value) {  

         if (value == '' || value == null){
            return null
         }
         else {
            return moment(value).format('DD/MMM HH:mm')
         }

      },
      extensao: function (ext) {
        ext = this.image.split(';').shift().split('/').pop();
        if ( ext == 'jpeg' ) {
            return ext = 'jpg'
        }
        else {
            return ext
        }
         
         
      }
    },

    // METODOS ======================================

    methods: {
      
      responder(){
        let x = 0
        let y = 999999
        window.scrollBy(x,y)
        this.ultimoDet = this.compromissosDet.slice(-1)[0]
      },
      backtoTop(){
        let x = 0
        let y = -999999
        window.scrollBy(x,y)
      },
      validar() {
        if (this.compDet.detalhes==null || this.compDet.detalhes=='') {
          swal(
            'Oopa...',
            'Por favor, escreva  a ocorrência',
            'error'
          )
          // this.detalhes.focus();
          return false
        }
        if (this.startTime.time==null || this.startTime.time=='') {
          swal(
            'Oopa...',
            'Por favor, preencha a data e hora!',
            'error'
          )
          // this.data.focus();
          return false
        }
      },
      selectStatus(){
        axios.get(ENDPOINT + 'api/comp/obterStatus')
        .then(response => {

          this.status = response.data
          console.log()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      showResposta(compromisso){
        this.idResposta = compromisso.idCompDet
        this.nivelResposta = compromisso.nivel
        this.showModal = true
        this.image = ''
      },
      showAnexo(compromisso){
        this.idResposta = compromisso.idCompDet
        this.showUpload = true
        this.image = ''
      },
      showExibir(compromisso){
        this.idResposta = compromisso.idCompDet.toString()
        this.ext = compromisso.extensao
        this.showImage = true
      },
      showLoading(){
        this.isLoading=true;
      },
      hideLoading(){
        this.isLoading=false;
      },
      loadCompromissos(){
        let t = this
        this.showLoading()
        let q = t.compDet.idComp;
        this.$http.get(ENDPOINT + `api/comp/obterCompCab?idComp=${q}`).then(
         response=>{
           t.compromissos = response.json()
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })
       },
      loadDetahes(){
        let t = this
        this.showLoading()
        let q = t.compDet.idComp;

        this.$http.get(ENDPOINT + `api/comp/obterCompdet?idComp=${q}`).then(
         response=>{
           t.compromissosDet = response.json()
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })
      },
      salvarDet(){
          this.validar()
          let t = this
          t.compDet.dataHoraAgend = t.startTime.time
          t.compDet.idUsuario = 4
          t.compDet.nivel = t.ultimoDet.nivel
          t.compDet.nivel++


             this.$http.post(ENDPOINT + 'api/comp/novoDet', this.compDet)
             .then((response) => {
                
                this.$set('compDet',{
                    "detalhes": '',
                    "idComp": this.$route.query.q,
                    "idUsuario": 4,
                    "idStatus": 1,
                    "nivel": this.compDet.nivel,
                    "dataHoraAgend": '',
                    "startTime.time": ''
                })
                this.$set('showModal',false)
                console.log(response.body)
             })
             .catch((error) => {
                /*swal({   title: `Falha ao enviar sua solicitação`,
                        html: `<strong>É importante verificar se todos os campos estão preenchidos, caso contrário contate o admin</strong>`,   
                        type: "error",  
                    })*/
                //=>CAPTURAR O RETORNO DO SERVIDOR NA MENSAGEM
                /*this.err = JSON.stringify(response.json)
                swal({
                  html: '<strong>' + this.err + '</strong>',
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                }) */
                console.log(response.json)
             })
             .finally(function () {
                this.loadDetahes()
             }) 
          this.enviarAposSalvar()

      },
      salvarSubDet(){
          this.validar()
          
          this.compDet.dataHoraAgend = this.startTime.time
          this.compDet.idUsuario = 4
          this.compDet.nivel = this.nivelResposta


             this.$http.post(ENDPOINT + 'api/comp/novoDet', this.compDet)
             .then((response) => {
                this.$set('compDet',{
                    "detalhes": '',
                    "idComp": this.$route.query.q,
                    "idUsuario": 4,
                    "idStatus": 1,
                    "nivel": this.compDet.nivel,
                    "dataHoraAgend": '',
                    "startTime.time": '',

                })
                this.$set('showModal',false)
                console.log(response.body)
             })
             .catch((error) => {
                /*swal({   title: `Falha ao enviar sua solicitação`,
                        html: `<strong>É importante verificar se todos os campos estão preenchidos, caso contrário contate o admin</strong>`,   
                        type: "error",  
                    })*/
                //=>CAPTURAR O RETORNO DO SERVIDOR NA MENSAGEM
                /*this.err = JSON.stringify(response.json)
                swal({
                  html: '<strong>' + this.err + '</strong>',
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                }) */
                console.log(response.json)
             })
             .finally(function () {
                this.loadDetahes()
             })
             
          this.enviarAposSalvar()

      },
      enviarAposSalvar(){
        
        ultimoDet = this.compromissosDet.slice(-1)[0] 
        ext = this.image.split(';').shift().split('/').pop()
         if ( ext == 'jpeg' ) {
            ext = 'jpg'
            this.imgDet.extFile = ext
         }
         else {
            this.imgDet.extFile = ext
         }
         this.imgDet.imgFile = this.image.split(',').pop()
         this.imgDet.idCompDet = ultimoDet.idCompDet+1



        this.$http.post(ENDPOINT + 'api/comp/imgDet', this.imgDet)
          .then((response) => {
                this.$set('showUpload',false)
                this.$set('imgDet',{
                    "idCompDet": '',
                    "extFile": '',
                    "imgFile": ''
                })
                this.$set('image','')
                console.log(response.body)
             })
             .catch((error) => {
                console.log(response.body)
             })
             .finally(function () {
                this.loadDetahes()
             })
      
      },  
     
        
      // envio de imagem
      onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);
      },
      createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;
          
          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
          
      },
      removeImage: function (e) {
          this.image = '';
      },
        
      enviarImg(){
       
       ext = this.image.split(';').shift().split('/').pop()
         if ( ext == 'jpeg' ) {
            ext = 'jpg'
            this.imgDet.extFile = ext
         }
         else if(ext == 'data:'){
            ext = 'zip'
            this.imgDet.extFile = ext
            
            
         }
         else {
            this.imgDet.extFile = ext
       }
       this.imgDet.imgFile = this.image.split(',').pop()
       this.imgDet.idCompDet = this.idResposta
       
         
      
       this.$http.post(ENDPOINT + 'api/comp/imgDet', this.imgDet)
          .then((response) => {
                this.$set('showUpload',false)
                this.$set('imgDet',{
                    "idCompDet": '',
                    "extFile": '',
                    "imgFile": ''
                })
                this.$set('image','')
                console.log(response.body)
             })
             .catch((error) => {
                console.log(response.body)
             })
             .finally(function () {
                this.loadDetahes()
             })
      },
        
      //zipando arquivos
      zipFile(a){  
        return this.ext = this.arquivo.split('.').pop()
        
        var zip = new JSZip();
        
        zip.file(this.arquivo);
        
       /* zip.generateAsync({type:"blob"}).then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });*/
      },
      
      


    },
    created(){
      let t = this
      t.loadCompromissos()
      t.loadDetahes()
      t.selectStatus()
    }
}
</script>

<style scoped>
    h2 {
        font-size: 35px;
    }
    .enviar {
        margin-top: 25px;
    }
    .column {
        padding: 0px;
    }
    img {
        width: 50%;
        margin: 10px auto 5px;
        display: block;

    }
    .alinD {
        margin-left: 15%;
    }
    .alinE {
        margin-right: 15%;
    }
    .alinC {
        margin-left: 5%;
        margin-right: 5%;
    }
    label {
        margin-top: 5px;
    }
    a {
        margin-top: 5px;
        margin-bottom: 5px;
    }
    
</style>