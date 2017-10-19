<template>
  <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
  <span class="fixo sr-only" v-show="isLoading">Carregando...</span>
  
    
  <div class="container">
    <!--<h1 class="title">{{title}}</h1>-->
    
    <div class="column">
      <a class="button is-info" @click.prevent="newCompromissos">Novo Compromisso</a> 
    </div>
    <br>
    
      
    <div>
      <label class="label">Status</label>
      <div class="columns">
        
          <span class="column">
              <div class="select" id="status">
                  <select v-model="filtroStatus" style="width: 100%; font-size: 12px">
                      <option v-for="stat in status" :value="stat.nome">
                        {{ stat.nome }}
                      </option>
                  </select>
              </div>
          
            <div class="chip animated bounceInRight" v-if="chipTipo">
              {{ filtroTipo }}
              <span class="closebtn" @click="limparFiltroTipo()">&times;</span>
            </div>  
            
            <div class="chip animated bounceInRight" v-if="chipPriori">
              <strong>P: {{ filtroPriori }}</strong>
              <span class="closebtn" @click="limparFiltroPriori()">&times;</span>
            </div>  
             
            <div class="chip animated bounceInRight" v-if="chipProj">
              {{ filtroProjeto }}
              <span class="closebtn" @click="limparFiltroProj()">&times;</span>
            </div>  
          
            <div class="chip animated bounceInRight" v-if="chipPlat">
              {{ filtroPlat }}
              <span class="closebtn" @click="limparFiltroPlat()">&times;</span>
            </div>  
          
            <div class="chip animated bounceInRight" v-if="chipUser">
              {{ filtroUser }}
              <span class="closebtn" @click="limparFiltroUser">&times;</span>
            </div>  
              
          </span>
          
          <span class="is-9">
              <span class="button" @click="limparFiltros()" v-if="filtroBtn" id="btn-limpFiltros">Limpar Filtros</span>
          </span>
      </div>
        <br>
    </div>     
        <!-- tabela -->
    <div id="table">
        <table class="table is-narrow-mobile is-bordered tg">
            
              <thead>
                <th>Cód<br>
                  <input class="input" v-model="filtroId" id="id">
                </th>
                <th>Assunto</th>
                <th v-if="colTipo">Tipo<br>
                  <div class="select">
                      <select v-model="filtroTipo" id="tipo">
                          <option v-for="tipo in tipos">
                            {{ tipo.nome }}
                          </option>
                      </select>
                  </div>
                </th>
                <!--<th>Status</th>-->
                  
                <th v-if="colPriori">N.Prioridade<br>
                  
                  <div class="select">
                      <select v-model="filtroPriori" id="priori">
                          <option v-for="prioridade in prioridades" :value="prioridade.value">
                            {{ prioridade.text }}
                          </option>
                      </select>
                  </div>
                </th>
                  
                <th v-if="colProj">Projeto<br>
                  <div class="select">
                      <select v-model="filtroProjeto" id="projeto">
                          <option v-for="projet in projetos">
                            {{ projet.nome }}
                          </option>
                      </select>
                  </div>
                </th>
                <th v-if="colPlat">Plataforma<br>
                  <div class="select">
                      <select v-model="filtroPlat" id="plataforma">
                          <option v-for="plataf in plataformas">
                            {{ plataf.text }}
                          </option>
                      </select>
                  </div>
                </th>
                <th v-if="colUser">Usuário<br>
                  <div class="select">
                      <select v-model="filtroUser" id="usuario">
                          <option v-for="user in usuarios">
                            {{ user.text }}
                          </option>
                      </select>
                  </div>
                </th>
                <!-- <th>Ações</th> -->

            </thead>
            <tbody>
              <tr v-for="compromisso in compFiltrados | orderBy 'idComp'">
               
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}">{{compromisso.idComp}}</td>
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}">{{compromisso.titulo}}</td>
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}" v-if="colTipo">{{compromisso.tipoComp}}</td>
                <!--<td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}">{{compromisso.status}}</td>-->
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}" v-if="colPriori">{{compromisso.numPrioridade}}</td>
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}" v-if="colProj">{{compromisso.projeto}}</td>
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}" v-if="colPlat">{{compromisso.plataforma}}</td>
                <td @click="filtro = compromisso.idComp" v-link="{ path: '/cdetalhe', query: {q:filtro}}" v-if="colUser">{{compromisso.usuario}}</td>
                <!-- <td class="is-icon">
                  <a href="#" @click.prevent="editarCompromisso(compromisso)">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="#" @click.prevent="removerCompromisso(compromisso)">
                    <i class="fa fa-trash"></i>
                  </a>
                </td> -->
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
      </div>
    
    </div>

    
    <!-- novo compromisso -->
    <div id="modal_compromisso" class="modal" :class="{'is-active':showModalNew}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Compromisso: {{selected.id}}</p>
          <button class="delete" @click.prevent="showModalNew=false"></button>
        </header>
        <section class="modal-card-body">
            
          <div class="columns">
              
            <div class="column">
                <label class="label">Agendamento</label>
                <div class="select">
                  <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
                </div>
                <!-- <span>{{ startTime.time }}</span> -->
            </div>
              
            <div class="column">
              <label class="label">Status</label>
              <div class="select">
                  <select v-model="comp.idStatus">
                      <option v-for="stat in status" :value="stat.idStatus">
                        {{ stat.nome }}
                      </option>
                  </select>
                  
              </div>
            </div>
              
            <div class="column">
              <label class="label">Tipo</label>
              <div class="select">
                  <select v-model="comp.idCompTipo">
                      <option v-for="tipo in tipos" :value="tipo.idCompTipo">
                        {{ tipo.nome }}
                      </option>
                  </select>
                  
              </div>
            </div>
              
          </div>
          
          <div class="columns">
              <div class="column">
              <label class="label">Assunto</label>
                <p class="control">
                  <input class="input" placeholder="Escreva o assunto..." v-model="comp.titulo">
                </p>
              
              </div>
          
          </div>
          <div class="columns">
            <div class="column is-6">
              <label class="label">Projeto</label>
                <div class="select">
                  <select v-model="comp.idProjeto">
                      <option v-for="projeto in projetos" :value="projeto.idProjeto">
                        {{ projeto.nome }}
                      </option>
                  </select>
                </div>
                <p></p>
            </div>
            <div class="column is-4">
              <label class="label">Prioridade</label>
              <div class="select">
                  <select v-model="comp.numPrioridade">
                      <option v-for="prioridade in prioridades" :value="prioridade.value">
                        {{ prioridade.text }}
                      </option>
                  </select>
              </div>
            </div>
            <div class="column">
              <label class="label">Usuário</label>
              <div class="select">
                  <select v-model="comp.idUsuario">
                      <option v-for="usuario in usuarios" :value="usuario.value">
                        {{ usuario.text }}
                      </option>
                  </select>
              </div>
            </div>
            
            
            
          </div>
          <!-- upload de arquivos -->
            
           
            
          <!----> 
          <label class="label">Detalhamento</label>
          <p class="control">
            <textarea class="textarea" placeholder="Escreva a pergunta ou comentário..." v-model.trim="msg"></textarea>
          </p>
          
          <br>
          
        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary" @click.prevent="salvarCompromisso">Salvar</a>
          <a class="button" @click.prevent="showModalNew=false">Cancelar</a>
        </footer>
      </div>
    </div>
    
    <span class="nav-item">
        <a v-link="{ path: '/' }" class="button is-primary">
            <span class="icon">
            <i class="fa fa-home"></i>
            </span>
            <span>Início</span>
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
    
  //produção:
  const ENDPOINT = 'http://192.168.0.200/helpdesk/'
  
  // ao descomentar abaixo tem que comentar a const acima
  //debug:
  // const ENDPOINT = 'http://192.168.0.115:32688/'

  export default {
    name: 'Compromissos',
    data () {
      return {
        optFiles: {
          url: '/upload',
          paramName: 'file'
        },
        isLoading: false,
        title: 'Compromissos',
        arquivo: [],
        compromissos: [],
        selected: {},
        showModalNew: false,
        showModalForum: false,
        currentTime: moment().format('L'),
        currentHour: moment().format('LT'),
        tipos: [],
        status: [],
        prioridades: [
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
          { text: '5', value: '5' }
        ],
        plataformas: [
          { text: 'DESKTOP'},
          { text: 'MOBILE'},
          { text: 'WEB'},
          { text: 'HIBRIDO'}
        ],
        usuarios: [
          { text: 'KEL', value: 4}
        ],
        projetos: [],
        comp: {
              
              "idCompTipo": '',
              "idStatus": '',
              "idProjeto": '',
              "titulo": '',
              "numPrioridade": '',
              "idUsuario": 4,
              "compromissosDet": []
              
        },
        msg: '',
        filtro: '',
        
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
              'margin-bottom': '5px',
              'width': '180px'
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
        ],
          
        // Filtros 
        
        filtroId: '',
        filtroStatus: 'AGUARDANDO',
        filtroPriori: '',
        filtroTipo: '',
        filtroProjeto: '',
        filtroPlat: '',
        filtroUser: '',
        filtroBtn: false,
          
        // chips 
        
        chipId: false,
        chipStatus: false,
        chipPriori: false,
        chipTipo: false,
        chipProj: false,
        chipPlat: false,
        chipUser: false,
          
        // colunas
          
        colTipo: true,
        colPriori: true,
        colProj: true,
        colPlat: true,
        colUser: true,
          
      }
    },
    components: {
        'date-picker': myDatepicker,
    },
    
    computed: {
      compFiltrados(){
        
        if (this.filtroId != ''){
            return response = this.compromissos.filter(this.filtrarPorCod());                        
        }
        
        if (this.filtroTipo != ''){
            this.chipTipo = true
            this.colTipo = false
            this.filtroBtn = true
            
            if (this.filtroPriori != ''){
                this.chipPriori = true
                this.colPriori = false
                this.filtroBtn = true
                
                if (this.filtroProjeto != ''){
                    this.chipProj = true
                    this.colProj = false
                    this.filtroBtn = true
                    
                    if (this.filtroPlat != ''){
                        this.chipPlat = true
                        this.colPlat = false
                        this.filtroBtn = true
                        
                        if (this.filtroUser != '' ){
                            this.chipUser = true
                            this.colUser = false
                            this.filtroBtn = true
                            
                            return response = this.compromissos.filter(this.filtrarPorStatus())
                                                               .filter(this.filtrarPorTipo())
                                                               .filter(this.filtrarPorPrioridade())
                                                               .filter(this.filtrarPorProJeto())
                                                               .filter(this.filtrarPorPlataforma())
                                                               .filter(this.filtrarPorUsuario())
                        }
                        
                        return response = this.compromissos.filter(this.filtrarPorStatus())
                                                           .filter(this.filtrarPorTipo())
                                                           .filter(this.filtrarPorPrioridade())
                                                           .filter(this.filtrarPorProJeto())
                                                           .filter(this.filtrarPorPlataforma())
                    }
                    
                    return response = this.compromissos.filter(this.filtrarPorStatus())
                                                       .filter(this.filtrarPorTipo())
                                                       .filter(this.filtrarPorPrioridade())
                                                       .filter(this.filtrarPorProJeto())
                }
                
                
                return response = this.compromissos.filter(this.filtrarPorStatus())
                                                   .filter(this.filtrarPorTipo())
                                                   .filter(this.filtrarPorPrioridade())
            }
            
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorTipo())                                        
        }
        
        if (this.filtroPriori != ''){
            
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorPrioridade())
                                               
        } 
        
        if (this.filtroProjeto != ''){
            this.chipProj = true
            this.colProj = false
            this.filtroBtn = true
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorProJeto())
        }
          
        if (this.filtroPlat != ''){
            this.chipPlat = true
            this.colPlat = false
            this.filtroBtn = true
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorPlataforma())
        }
          
        if (this.filtroUser != ''){
            this.chipUser = true
            this.colUser = false
            this.filtroBtn = true
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorUsuario())
                             
            
        }
          
          
        else {
            return response = this.compromissos.filter(this.filtrarPorStatus())
                
        }

        
      }
      
    },
      
    // METODOS ======================================
      
    methods: {
        
      onFileChange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
      },
      
      // filtros GERAL
      filtrarPorStatus(compromisso){      
        return compromisso => compromisso.status ==  this.filtroStatus     
      },
      
      
      // filtros TABELA
      filtrarPorCod(compromisso){
        return compromisso => compromisso.idComp == this.filtroId     
      },
      filtrarPorTipo(compromisso){
        return compromisso => compromisso.tipoComp == this.filtroTipo
      },
      filtrarPorPrioridade(compromisso){
        return compromisso => compromisso.numPrioridade ==  this.filtroPriori
      },
      filtrarPorProJeto(compromisso){
        return compromisso => compromisso.projeto == this.filtroProjeto 
      },
      filtrarPorPlataforma(compromisso){
        return compromisso => compromisso.plataforma == this.filtroPlat  
      },
      filtrarPorUsuario(compromisso){
        return compromisso => compromisso.usuario == this.filtroUser  
      },
        
      limparFiltros(){
        this.limparFiltroTipo()
        this.limparFiltroPriori()
        this.limparFiltroProj()
        this.limparFiltroPlat()
        this.limparFiltroUser()
        this.filtroBtn = false
      },
      limparFiltroTipo(){
        this.filtroTipo = ''
        this.colTipo = true
        this.chipTipo = false
        this.filtroBtn = false
      },
      limparFiltroPriori(){
        this.filtroPriori = ''
        this.colPriori = true
        this.chipPriori = false
        this.filtroBtn = false
      },
      limparFiltroProj(){
        this.filtroProjeto = ''
        this.colProj = true
        this.chipProj = false
        this.filtroBtn = false
      },
      limparFiltroPlat(){
        this.filtroPlat = ''
        this.colPlat = true
        this.chipPlat = false
        this.filtroBtn = false
      },
      limparFiltroUser(){
        this.filtroUser = ''
        this.colUser = true
        this.chipUser = false
        this.filtroBtn = false
      },
        
      // fim filtros
        
      backtoTop(){
        let x = 0
        let y = -999999
        window.scrollBy(x,y)
      },
      validar() {     
        if (this.comp.idCompTipo==null || this.comp.idCompTipo=='') {
          swal(
            'Oopa...',
            'Por favor, preencha o tipo do compromisso!',
            'error'
          )
          this.comp.idCompTipo.focus();
          return false
        }
        if (this.comp.idStatus==null || this.comp.idStatus=='') {
          swal(
            'Por favor, preencha o status!',
            'Ahh vamos lá, vamos fazer o serviço direito!',
            'error'
          )
          this.comp.idStatus.focus();
          return false
        }
        if (this.comp.titulo==null || this.comp.titulo=='') {
          swal(
            'Por favor, deixe de má vontade... preencher o assunto é imprescindível!',
            'Por favor, preencha o ASSUNTO',
            'error'
          )
          this.comp.titulo.focus();
          return false
        }
        if (this.comp.idProjeto==null || this.comp.idProjeto=='') {
          swal(
            'Ei! Não se esqueça de selecionar o projeto!',
            'Por favor, selecione o projeto',
            'error'
          )
          this.comp.idProjeto.focus();
          return false
        }  
        if (this.comp.numPrioridade==null || this.comp.numPrioridade=='') {
          swal(
            'Por favor, preencha a prioridade. É imprescindível!',
            'Se não preencher a prioridade, este compromisso não pode ser tratado da forma adequada',
            'error'
          )
          this.comp.numPrioridade.focus();
          return false
        }
        if (this.comp.idUsuario==null || this.comp.idUsuario=='') {
          swal(
            'Por favor, selecione o usuário',
            'A pressa é inimiga da perfeição',
            'error'
          )
          this.comp.idUsuario.focus();
          return false
        }
        /*if (this.comp.compromissosDet.detalhes==null || this.comp.compromissosDet.detalhes=='') {
          swal(
            'Por favor, preencha o detalhamento',
            'Só falta isso pra terminar, vai lá',
            'error'
          )
          this.comp.compromissosDet.focus();
          return false
        }*/
          
      },
      selectTipo(){
        axios.get(ENDPOINT + 'api/comp/obterCompTipo')
        .then(response => {
          
          this.tipos = response.data
          console.log()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      selectStatus(){
        axios.get(ENDPOINT + 'api/comp/obterStatus')
        .then(response => {
          
          this.status = response.data
          console.log()
        })
        .catch(e => {
          console.log(e)
        })
      },
      selectProjetos(){
        axios.get(ENDPOINT + 'api/projetos/todos')
        .then(response => {
          
          this.projetos = response.data
          console.log()
        })
        .catch(e => {
          console.log(e)
        })
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

        let start = (this.page * this.itensPerPage) - (this.itensPerPage)
        let end = this.page * this.itensPerPage
        let qString = "";

        if (this.search){
          qString = `&q=${this.search}`
        }

        this.$http.get(ENDPOINT + `api/comp/obterComp`).then(
         response=>{
           t.compromissos = response.json()
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })

       },
       searchCompromissos(){
        this.loadCompromissos()
       },
       newDetalhes(){
        this.selected={}
        this.showModalForum = true;
       },
       newCompromissos(){
        this.selected={}
        this.showModalNew = true;
       },
       editarCompromisso(compromisso){
        this.selected=compromisso
        this.showModalNew = true;
       },
       
       salvarCompromisso(){
        this.validar()
        
        det = {detalhes: this.msg, dataHoraAgend: this.startTime.time}
        this.comp.compromissosDet.push(det)
        
           this.$http.post(ENDPOINT + 'api/comp/novoCab',this.comp)
             .then((response) => {
                this.$set('comp',{
                  "idCompTipo": '',
                  "idStatus": '',
                  "idProjeto": '',
                  "titulo": '',
                  "numPrioridade": '',
                  "idUsuario": '',
                  "compromissosDet": []
                })
                this.$set('msg','')
                this.$set('showModalNew',false)
                console.log(response.body)
             })
             .catch((error) => {
                swal({   title: `Falha ao enviar sua solicitação`,
                        html: `<strong>É importante verificar se todos os campos estão preenchidos, caso contrário contate o admin</strong>`,   
                        type: "error",  
                    })
                //=>CAPTURAR O RETORNO DO SERVIDOR NA MENSAGEM
                /*this.err = JSON.stringify(error)
                swal({
                  html: '<strong>' + this.err + '</strong>',
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                }) */ 
                console.log(error);
             })
             .finally(function () {
                this.loadCompromissos()
             })
          
      },
      carregarComp(compromisso){
        this.filtro = compromisso.idComp
      }
    },
    created(){
      let t = this
      t.loadCompromissos()
      t.selectTipo()
      t.selectStatus()
      t.selectProjetos()
    },
  }
</script>
<style>
    input#id {
      width: 50px;
    }
    
    ul {
      padding: 0;
    }

    .user {
      height: 30px;
      line-height: 30px;
      padding: 10px;
      border-top: 1px solid #eee;
      overflow: hidden;
      transition: all .25s ease;
    }

    .user:last-child {
      border-bottom: 1px solid #eee;
    }

    .v-enter, .v-leave-active {
      height: 0;
      padding-top: 0;
      padding-bottom: 0;
      border-top-width: 0;
      border-bottom-width: 0;
    }
    
    table {
      width: 100%;
    }
    
    .chip {
        display: inline-block;
        padding: 0 10px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        border-radius: 25px;
        background-color: #d1d1d1;
        margin-left: 5px;
        /*width: 100%;*/
    }

    .chip img {
        float: left;
        margin: 0 10px 0 -25px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }

    .closebtn {
        padding-left: 10px;
        color: #888;
        font-weight: bold;
        float: right;
        font-size: 20px;
        cursor: pointer;
    }

    .closebtn:hover {
        color: #000;
    }
    #table{
      max-width: 100%;
      max-height: 400px;
      overflow: scroll;
    }
    table {
      border-collapse: collapse;
      width: 50em;
      border: 1px solid #666;
    }
    tr:nth-child(even) {
      background-color: #edf5ff;
    }
    th {
      font-weight: normal;
      text-align: left;
    }
    th, td {
      padding: 0.1em 1em;
    }
    span.column {
        margin-bottom: 5px;
    }
    #btn-limpFiltros {
        margin: 0 10px
    }
    .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
</style>