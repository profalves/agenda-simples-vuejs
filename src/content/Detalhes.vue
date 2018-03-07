<template>
  <app-header></app-header>
  <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
    <span class="fixo sr-only" v-show="isLoading">Carregando...</span>
  <div>
    <!-- cabeçario -->
    <div class="card" style="width: 100%">
      
      <div class="card-content">
        
        <section>

          <div class="columns is-mobile is-multiline">

            <div class="column is-4-desktop is-4-tablet is-6-mobile">
              <label class="label">Data/Hora:</label>
                {{compromissos.dataHora | dataFormat}}
            </div>

            <div class="column">
              <label class="label">Tipo:</label>
                {{compromissos.tipoComp}}
            </div>

            <div class="column">
              <label class="label">Status: </label>
                {{compromissos.status}}
            </div>
            <div class="column">
              <label class="label">Responsável:</label>
              <div class="resp">{{responsavel.nome}}</div>
            </div>
            
          </div>

          <div class="columns is-mobile">
            <div class="column">
              <label class="label">Assunto:</label>
                {{compromissos.titulo | uppercase}}
            </div>
            
          </div>


          <div class="columns is-mobile is-multiline">
            <div class="column is-4-desktop is-4-tablet is-6-mobile">
              <label class="label">Projeto:</label>
                {{compromissos.projeto}}
            </div>
            <div class="column">
              <label class="label">Plataforma:</label>
                {{compromissos.plataforma}}
            </div>
            <div class="column">
              <label class="label">Prioridade:</label>
                {{compromissos.numPrioridade}}
            </div>
            <div class="column">
              <label class="label">Criador:</label>
                {{compromissos.usuario}}
            </div>  
          </div>

        </section>
      </div>

      <div class="card-footer">
        <p class="card-footer-item">
          <a @click="showSelStatus" class="button is-primary">Alterar Status/Prazo</a>
        </p>
        <p class="card-footer-item">
          <button class="button is-info" @click="novaConversa" v-if="btnNovaConversa">Nova Conversa</button>
          <button class="button is-danger" @click="novaConversa" v-else>Cancelar</button>
        </p>
      </div>

    </div>
    <!-- fim cabeçario --> 

    <br>
      
    <center><h2>{{ compromissos.titulo | uppercase }}</h2></center>
    
    <br>
    
    <div v-if="prazo" :style="colorPrazo">
      <b>Prazo:</b> {{ prazo | dataFormat }}
    </div>
    
    <input class="input" v-model="search" placeholder="Procurar entre as respostas...">
    <br><br>
    
     <!-- detalhes -->

    <div v-for="compromisso in listaDets">

        <!-- sub-resposta direita -->
        <div v-if="compromisso.align=='D'">
            <div style="margin-top: 11px;"></div>
                <div class="alinD">
                    
                    <div class="box" id="coment">
                        <div v-if="compromisso.botao == true" class="columns is-mobile" id="barraNivel">
                            
                            <div class="column is-4">
                                {{compromisso.dataHoraAgend | dataFormat}}
                                <!--/ Prazo: {{compromisso.dataHoraAtend | dataFormat}}-->
                            </div>    
                            <!--<div class="column is-4">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>-->
                            <div id="user" class="column is-6-desktop is-5-tablet is-3-mobile">
                                <div style="color: aliceblue">{{compromisso.usuario}}</div>
                            </div>
                            
                            <!--<div class="column" id="btns">		
                              <i class="fa fa-cog is-primary" @click.prevent="showSelStatus(compromisso)"></i>		
                            </div>-->

                            <div class="column" id="btns">
                                
                                <span v-if="compromisso.extensao==null" class="span" style="margin-top: 5px;">
                                    <!--<label class="label">Anexo</label>-->
                                    <!--<i class="fa fa-paperclip is-primary" @click.prevent="showAnexo(compromisso)"></i>-->
                                    <img src="dist/img/anexo.png" class="anexo" @click.prevent="showAnexo(compromisso)" />

                                </span>
                                <span class="span">
                                    <a 
                                       class="button"
                                       href="http://191.252.64.6/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                       target="_blank"
                                       v-if="compromisso.extensao!=null"
                                       >

                                         <!-- @click="showExibir(compromisso)"-->

                                        <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                        <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                        <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                    </a>
                                </span>
                            </div>
                            <div class="column is-2-mobile" id="btns">
                                <i class="fa fa-comment-o fa-2x mHover" @click="showResposta(compromisso)" id="btnSubResp"></i>
                            </div>
                            
                        </div>
                        
                        <div v-if="compromisso.botao == true" class="columns is-mobile" id="barraStatus">
                            <strong style="color:aliceblue; margin-right: 5px">Status:</strong>{{compromisso.status}}
                        </div>
                        
                        <div v-else class="columns is-mobile" id="barraTit">
                            
                            <div class="column is-4">
                                
                                {{compromisso.dataHoraAgend | dataFormat}}
                            </div>    
                            <!--<div class="column is-4">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>-->
                            <div id="user" class="column is-6-desktop is-5-tablet is-3-mobile">
                                <div>{{compromisso.usuario}}</div>
                            </div>
                           
                                                            
                            <div class="column is-3-mobile is-1-desktop" id="btns">

                                <span v-if="compromisso.extensao==null" class="span" style="margin-top: 5px;">
                                    <!--<label class="label">Anexo</label>-->
                                    <!--<i class="fa fa-paperclip is-primary" @click.prevent="showAnexo(compromisso)"></i>-->
                                    <img src="dist/img/anexo.png" class="anexo" @click.prevent="showAnexo(compromisso)" />

                                </span>
                                <span class="span">
                                    <a 
                                       class="button"
                                       href="http://191.252.64.6/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                       target="_blank"
                                       v-if="compromisso.extensao!=null"
                                       >

                                         <!-- @click="showExibir(compromisso)"-->

                                        <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                        <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                        <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                    </a>
                                </span>
                            </div>
                            
                            
                        
                        </div>
                        
                        <div class="columns">
                          <div class="column">
                            <div id="det" v-for="line in compromisso.detalhes.split('\n')">{{line}}</div>
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
                        
                        <div v-if="compromisso.botao == true" class="columns is-mobile" id="barraNivel">
                            
                            <div class="column is-4">
                                
                                {{compromisso.dataHoraAgend | dataFormat}}
                                <!--/ Prazo: {{compromisso.dataHoraAtend | dataFormat}}-->
                                
                            </div>    
                            <!--<div class="column is-4">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>-->
                            <div id="user" class="column is-6-desktop is-5-tablet is-3-mobile">
                                <div style="color: aliceblue">{{compromisso.usuario}}</div>
                                  
                            </div>
                          
                            <!--<div class="column" id="btns">		
                              <i class="fa fa-cog is-primary" @click.prevent="showSelStatus(compromisso)"></i>		
                            </div>-->
                            
                            <div class="column" id="btns">
                                
                                <span v-if="compromisso.extensao==null" class="span" style="margin-top: 5px;">
                                    <!--<label class="label">Anexo</label>-->
                                    <!--<i class="fa fa-paperclip is-primary" @click.prevent="showAnexo(compromisso)"></i>-->
                                    <img src="dist/img/anexo.png" class="anexo" @click.prevent="showAnexo(compromisso)" />

                                </span>
                                <span class="span">
                                    <a 
                                       class="button"
                                       href="http://191.252.64.6/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                       target="_blank"
                                       v-if="compromisso.extensao!=null"
                                       >

                                         <!-- @click="showExibir(compromisso)"-->

                                        <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                        <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                        <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                    </a>
                                </span>
                            </div>
                            <div class="column is-2-mobile" id="btns">
                                <i class="fa fa-comment-o fa-2x mHover" @click="showResposta(compromisso)" id="btnSubResp"></i>
                            </div>
                            
                        </div>
                        
                        <div v-if="compromisso.botao == true" class="columns is-mobile" id="barraStatus">
                            <strong style="color:aliceblue; margin-right: 5px">Status:</strong>{{compromisso.status}}   
                        </div>
                        
                        <div v-else class="columns is-mobile" id="barraTit">
                            
                            <div class="column is-4">
                                
                                {{compromisso.dataHoraAgend | dataFormat}}
                            </div>    
                            <!--<div class="column is-4">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>-->
                            <div id="user" class="column is-6-desktop is-5-tablet is-3-mobile">
                                <div>{{compromisso.usuario}}</div>
                            </div>
                           
                                                            
                            <div class="column is-3-mobile is-1-desktop" id="btns">

                                <span v-if="compromisso.extensao==null" class="span" style="margin-top: 5px;">
                                    <!--<label class="label">Anexo</label>-->
                                    <!--<i class="fa fa-paperclip is-primary" @click.prevent="showAnexo(compromisso)"></i>-->
                                    <img src="dist/img/anexo.png" class="anexo" @click.prevent="showAnexo(compromisso)" />

                                </span>
                                <span class="span">
                                    <a 
                                       class="button"
                                       href="http://191.252.64.6/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}" 
                                       target="_blank"
                                       v-if="compromisso.extensao!=null"
                                       >

                                         <!-- @click="showExibir(compromisso)"-->

                                        <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                        <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                        <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                    </a>
                                </span>
                            </div>
                            
                            
                        
                        </div>
                        
                        <div class="columns">
                          <div class="column">
                            <div id="det" v-for="line in compromisso.detalhes.split('\n')">{{line}}</div>
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
                        <div class="columns is-mobile" id="barraNivel">
                            
                            <div class="column is-4">
                                
                                {{compromisso.dataHoraAgend | dataFormat}}
                                <!--/ Prazo: {{compromisso.dataHoraAtend | dataFormat}}-->
                            </div>    
                            <!--<div class="column is-4">
                                <strong>Atendimento:</strong><br>
                                {{compromisso.dataHoraAtend | dataFormat}}
                            </div>-->
                            <div id="user" class="column is-6-desktop is-6-tablet is-4-mobile">
                                <div style="color: aliceblue">{{compromisso.usuario}}</div>
                            </div> 
                          
                            <!--<div class="column" id="btns">		
                              <i class="fa fa-cog is-primary" @click.prevent="showSelStatus(compromisso)"></i>		
                            </div>-->
                          
                            <div class="column" id="btns">
                                
                                <span v-if="compromisso.extensao==null" class="span" style="margin-top: 5px;">
                                    <!--<label class="label">Anexo</label>-->
                                    <!--<i class="fa fa-paperclip fa-2x is-primary" @click.prevent="showAnexo(compromisso)"></i>-->
                                    <img src="dist/img/anexo.png" class="anexo" @click.prevent="showAnexo(compromisso)" />

                                </span>
                                <span class="span">
                                    <a 
                                       class="button"
                                       href="http://191.252.64.6/helpdesk/files/{{ compromisso.idCompDet }}.{{ compromisso.extensao }}"
                                       target="_blank"
                                       v-if="compromisso.extensao!=null"
                                       >

                                         <!-- @click="showExibir(compromisso)"-->

                                        <i v-if="compromisso.extensao=='jpg' || compromisso.extensao=='png'" class="fa fa-picture-o" aria-hidden="true"></i>
                                        <i v-else class="fa fa-file-text-o" aria-hidden="true"></i>
                                        <strong id="ext" style="margin-left: 5px;">{{ compromisso.extensao }}</strong>
                                    </a>
                                </span>
                            </div>
                            <div class="column" id="btns">
                                <i class="fa fa-comment-o fa-2x mHover" @click="showResposta(compromisso)" id="btnSubResp"></i>
                            </div>
                            
                            
                        </div>
                        
                        <div v-if="compromisso.botao == true" class="columns is-mobile" id="barraStatus">
                            <strong style="color:aliceblue; margin-right: 5px">Status:</strong>{{compromisso.status}}
                        </div>
                        <div class="columns">
                          <div class="column">
                            <div id="det" v-for="line in compromisso.detalhes.split('\n')">{{line}}</div>
                          </div>
                        </div>
                        
                       
                    </div>
                </div>
        </div>

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
                            <input id="file3" type="file" @change="onFileChange">
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
              <div class="level-right">
                  <div class="level-item">
                  <button v-if="isLoading" class="button is-primary is-loading">Loading</button>
                  <a class="button is-primary" @click.prevent="salvarSubDet()" v-else>Enviar</a>
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
            <div v-if="!image">
                <center>
                    <label class="label">Selecione uma imagem:</label>
                    <input id="file" type="file" @change="onFileChange">
                </center>
            </div>

            <div v-else>
                <img :src="image" />
                <center><strong>Arquivo: {{ image | extensao }}</strong></center>
                <br>
                <center>
                    <button class="button is-danger" @click="removeImage">Remover</button>
                    <!--<button class="button" @click="zipar">Zipar</button>-->
                    <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
                    <button class="button is-primary" @click="enviarImg()" v-else>Enviar</button><br><br>

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
    
    <!-- MODAL Painel de Ações -->
      
    <div class="modal" :class="{'is-active':showStatus}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Painel de Ações</p>
          <button class="delete" aria-label="close" @click.prevent="showStatus=false"></button>
        </header>
        <section class="modal-card-body">
          <div style="text-align:center">
              <div class="columns">
                <div class="column">
                  <div v-if="userDest===1 || usuario===userDest || usuario===compromissos.idUsuarioCriador">
                      <label class="label">Mudar Status para:</label>
                      <div class="select">
                          <select v-model="idStatus" @change="verificarStatus">
                              <option></option>
                              <option v-for="stat in status" :value="stat.idStatus">
                                {{ stat.nome }}
                              </option>
                          </select>
                      </div><br><br>
                      <div v-if="idStatus == 7">
                        <textarea class="textarea is-info" v-model.trim="compDet.detalhes">
                        </textarea><br><br>
                        <button class="button is-primary" @click="alterarTestar">Enviar</button>
                      </div>
                  </div>
                  
                  <div v-else>Não permitido alterar Status</div>
                  
                </div>
                <div class="column vertical-align">
                  <div v-if="userDest!==1 && prazo===null && userDest===usuario">
                      <label class="label">Mudar prazo para:</label>
                      <div class="select">
                          <date-picker :date="startTime" 
                                       :option="option" 
                                       :limit="limit"
                                       @change="alterarPrazo"
                                       ></date-picker>
                      </div>

                  </div>
                  <div v-else>Não permitido alterar Prazo</div>
                </div>
              </div>
          </div>
        </section>
        <!--<footer class="modal-card-foot">
          <button class="button is-success">Salvar Mudanças</button>
          <button class="button" @click.prevent="showStatus=false">Cancel</button>
        </footer>-->
      </div>
          
    </div>
      
    <!-- fim modal -->
    

    <!-- NOVA CONVERSA -->
      
      <div id="resposta" class="box" style="margin-top: 20px;" v-show="visivel">
          <label class="label">Iniciando nova conversação dentro do tópico:</label>
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
                        <div v-if="!image">
                            <label class="label">Selecione uma imagem:</label>
                            <input id="file2" type="file" @change="onFileChange">
                        </div>

                        <div v-else>
                            <img :src="image">
                            <center><button @click="removeImage">Remove image</button><br>
                            <strong>Arquivo: {{ image | extensao }}</strong></center>
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
                        <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
                        <a class="button is-primary enviar" @click.prevent="salvarDet()" v-else>Enviar</a>
                    </div>
                </div>

      </div> 
    </div>
    
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
  
  //import JSZip from 'jszip'
    
  var zip = '' //new JSZip()
  
  //WS:
  //const ENDPOINT = 'http://localhost/helpdesk/'
  //dev:
  //const ENDPOINT = 'http://192.168.0.200/helpdesk/'
  // ao descomentar abaixo tem que comentar a const acima
  //debug:
  //const ENDPOINT = 'http://192.168.0.115:32688/'
  //produção
  const ENDPOINT = 'http://191.252.64.6/helpdesk/'
  
export default {
    name: 'CompromissosDet',
    data () {
      return {
        api: '',
        title: 'Tópico',
        showModal: false,
        showUpload: false,
        showImage: false,
        showStatus: false,
        isLoading: false,
        selected: {},
        compromissos: [],
        compromissosDet: [],
        visivel: false,
        image: '',
        ext: '',
        arquivo: '',
        arqZip: '',
        caminho: '',
        url: ENDPOINT,
        alterar: false,
        aJSZip: '',
        usuario: localStorage.getItem('userId'),
        compDet: {
            "detalhes": '',
            "idComp": this.$route.query.q,
            "idUsuario": parseInt(localStorage.getItem('userId')),
            "idStatus": 1,
            "dataHoraAgend": '',
            "nivel": 1
        },
        status: [],  
        usuarios: [],
        nivelResposta: '',
        idResposta: '',
        ultimoDet: '',
        primeiroDet: '',
        imgDet: {
            "idCompDet": '',
            "imgFile": '',
            "extFile": '' 
        },  
        idStatus: '',
        prazo: '',
        userDest: '',
        novaResp: '', 
        btnNovaConversa: true,
        responsavel: '',
        search: '',
        
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
    computed:{
      colorPrazo(){
        let prazo = Date.parse(this.prazo)
        if(prazo<new Date()){
          return 'color: red'
        }
      },
      listaDets(){
        if(this.search){
          return this.compromissosDet.filter(row => row.detalhes.toLowerCase().indexOf(this.search)>=0)
        }
        else{
          return this.compromissosDet
        } 
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
        return ext = this.ext
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
          return
        }
        if (this.startTime.time==null || this.startTime.time=='') {
          swal(
            'Oopa...',
            'Por favor, preencha a data e hora!',
            'error'
          )
          // this.data.focus();
          return
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
        
        if (compromisso.extensao != null){
            swal({
              title: 'Deseja mudar a imagem?',
              text: "Já possui uma imagem vinculada a essa resposta ",
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#09c41c',
              cancelButtonColor: '#d33',
              confirmButtonText: 'sim',
              cancelButtonText: 'não'
            }).then(function () {
                //não está funcionando...
                //está com v-if nos botôes para bloquear caso já tenha uma imagem vinculada
                this.alterar = true
                //mas isso executa:
                /*swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )*/
            })
        }
        else{
              this.idResposta = compromisso.idCompDet
              this.showUpload = true
              this.image = ''
        }
        
        if(this.alterar==true){
           this.idResposta = compromisso.idCompDet
           this.showUpload = true
           this.image = '' 
        }
        
      },
      showSelStatus(){
        let det = this.compromissosDet.slice(0)[0]
        console.log('ultimoDet:', det);
        console.log('compromisso:', this.compromissos);
        
        this.idResposta = det.idCompDet.toString()
        this.userDest = det.idUsuarioDestina
        this.prazo = det.dataHoraAtend
        this.showStatus = true
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
           t.prazo = t.compromissosDet[0].dataHoraAtend
           console.log('compromissosDet', t.compromissosDet);
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })
      },
      salvarDet(){
          this.validar()
          this.showLoading()
          this.compDet.dataHoraAgend = this.startTime.time
          this.compDet.idUsuario = this.usuario
          this.compDet.nivel = this.ultimoDet.nivel
          this.compDet.nivel++
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
            this.$set('visivel',false)
            this.$set('btnNovaConversa',true)
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
            this.hideLoading()
            this.loadDetahes()
          }) 
          if(this.image!=''){
            this.enviarAposSalvar()
          }
          
      },
      salvarSubDet(){
          this.validar()
          this.showLoading()
          this.compDet.dataHoraAgend = this.startTime.time
          this.compDet.idUsuario = this.usuario
          this.compDet.nivel = this.nivelResposta
             this.$http.post(ENDPOINT + 'api/comp/novoDet', this.compDet)
             .then((response) => {
                this.$set('compDet',{
                    "detalhes": '',
                    "idComp": this.$route.query.q,
                    "idStatus": this.compDet.idUsuario,
                    "nivel": this.compDet.nivel,
                    "dataHoraAgend": '',
                    "startTime.time": '',
                })
                this.$set('showModal',false)
                this.$set('visivel',false)
                this.$set('btnNovaConversa',true)
                this.$set('ultimoDet',true)
                this.ultimoDet = JSON.parse(response.body)
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
                this.hideLoading()
                this.loadDetahes()
             })
          
          if(this.image){
            this.enviarAposSalvar()
          }
          
      },
      enviarAposSalvar(){
        
        //let ultimoDet = this.compromissosDet.slice(-1)[0] 
        
        this.imgDet.extFile = this.ext
        this.imgDet.imgFile = this.image.split(',').pop()
        this.imgDet.idCompDet = this.ultimoDet.idCompDet+1
          
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
      verificarStatus(){
        if(this.idStatus !== 7){
          this.alterarStatus()
        }
        else{
          this.ultimoDet = this.compromissosDet.slice(-1)[0]
        }
      },
      alterarStatus(){
        this.$http.get(ENDPOINT + 'api/comp/alterarStatus?idCompDet=' + this.idResposta + '&idStatus=' + this.idStatus)
          .then((response) => {
            console.log(response.body)
            this.showStatus = false
            this.$router.go({ name: 'compromissos'})
          })
          .catch((error) => {
            console.log(response.body)
          })
          .finally(function(){
            this.loadDetahes()
          })
      
      }, 
      alterarTestar(){
        this.$http.get(ENDPOINT + 'api/comp/alterarStatus?idCompDet=' + this.idResposta + '&idStatus=' + this.idStatus)
          .then((response) => {
            console.log(response.body)
            this.showStatus = false
            if(this.compDet.detalhes){
              this.salvarDet()
            }
            this.$router.go({ name: 'compromissos'})
          })
          .catch((error) => {
            console.log(response.body)
          })
          .finally(function(){
            this.loadDetahes()
          })
      
      }, 
      alterarPrazo(){
        this.$http.get(ENDPOINT + 'api/comp/alterarDataEntrega?idCompDet=' + this.idResposta + '&novaData=' + this.startTime.time)
          .then((response) => {
                console.log(response.body)
                this.showStatus = false
                this.$router.go({ name: 'compromissos'})
             })
             .catch((error) => {
                console.log(response.body)
             })
             .finally(function () {
                
                this.loadDetahes()
             })
      
      }, 
      novaConversa(){
        if(!this.visivel){
          this.visivel = true
          this.btnNovaConversa = false
          this.ultimoDet = this.compromissosDet.slice(-1)[0]
          if(this.visivel){
          let x = 0
          let y = 99999
          window.scrollBy(x,y)
          }
        }
        else{ 
          this.visivel = false
          this.btnNovaConversa = true
        }
        
        
      },
      todosUsuarios(){ //api/usuario/todos
          this.$http.get(ENDPOINT + 'api/usuario/todos').then(
             response=>{
               console.log(response)
               let users = response.json().filter(row => row.idUsuario === this.compromissosDet[0].idUsuarioDestina)
               this.responsavel = users[0]
               this.isLoading = false
             },
             error=>{
               this.isLoading = false
               e = error.json()
               this.message = e.split(':').pop()
               
             }
          )
          .catch(e=>{
            console.log(e)
          })
      },
        
      // envio de imagem
      onFileChange(e) {
          // pegar o caminho do arquivo e a extensão
          caminho = document.getElementById('file').value || document.getElementById('file2').value || document.getElementById('file3').value
          this.caminho = caminho
          this.ext = this.caminho.split('.').pop()
          
          // começa a geração do base64 e renderiza uma miniatura se for uma imagem
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
      removeImage(e) {
          this.image = '';
      },
      
      //zipando arquivos
      zipar(){
        this.arquivo = this.image.split(',').pop()
        
        this.aJSZip = []
        
        /*x = zip.file("new." + this.ext, this.arquivo, { base64: true, compression: "STORE" });    
        console.log(x)*/
        
        zip.file("new." + this.ext, this.arquivo, {base64: true, compression: "STORE"});
                  
        // Gerar o arquivo zip de forma assíncrona
        zip.generateAsync({
            type: "base64",
            compression: "DEFLATE"
            
        }).then(
            res => {
            this.arqZip = res
            this.$nextTick(function () {
            this.imgDet.imgFile = this.arqZip // => 'atualizado'
        })
            console.log(this.imgDet.imgFile)
        });
          
        
            this.imgDet.imgFile = this.arqZip
        
        
      }, 
        
      enviarImg(){
       /*
       if(this.ext=='jpg' || this.ext=='png' || this.ext=='pdf'){
           this.imgDet.imgFile = this.image.split(',').pop()
       }
       else{
           this.zipar()
           this.imgDet.extFile = this.arqZip  
           this.ext = 'zip'
           this.$nextTick(function () {
            this.imgDet.extFile = this.arqZip  
            console.log(this.imgDet.extFile) // => 'atualizado'
            })
       }*/
          
       this.imgDet.imgFile = this.image.split(',').pop()
       this.imgDet.extFile = this.ext   
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
                //this.$set('arqZip','')
                console.log(response.body)
             })
             .catch((error) => {
                console.log(response.body)
             })
             .finally(function () {
                this.hideLoading()
                this.loadDetahes()
             })
          
      },
      
      carregarUser(){
        this.usuario = parseInt(localStorage.getItem('userId'))
      },
      verificarUsuario(){
        var user = localStorage.getItem('userId')
        if (user==null){
            this.$router.go({ name: 'login'})
        }
      },
      
      
    },
    ready(){
      this.todosUsuarios()
    },
    created(){
      let t = this
      t.loadCompromissos()
      t.loadDetahes()
      t.selectStatus()
      t.carregarUser()
      t.verificarUsuario()
      t.todosUsuarios()
      localStorage.setItem('status', this.$route.query.status)
      
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
    a#btnSubResp {
        margin: 0 5px;   
    }
    #barraTit {
        background-color: #c0c5ce;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 10px 5px 10px;
    }
    #barraNivel {
        background-color: #686868;
        color: aliceblue;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 10px 5px 10px;
    }
    #barraStatus {
        background-color: #686868;
        color: aliceblue;
        padding: 10px 5px 10px;
    }
    div#coment.box {
        padding: 10px;
        
    }
    #det {
        font-size: 30px;
        margin: 10px 10px;
    }
    #btns {
        
        text-align: center;
    }
    #user {
        text-align: center;
    }
    .mHover {
        cursor: pointer;
    }
    .vertical-align {
        vertical-align: middle;
    }
    .resp{
        font-weight: bold;
        margin-top: -9px;
    }
    .anexo{
      height:32; 
      width: 12px; 
      margin: 5px 0 0 20px;
      cursor: pointer;
    }
</style>