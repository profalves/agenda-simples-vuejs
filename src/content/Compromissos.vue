<template>
  <app-header></app-header>
  <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-show="isLoading"></i>
  <span class="fixo sr-only" v-show="isLoading">Carregando...</span>
  
    <div id="compromissos">
      
      <div class="columns is-mobile">
          <div class="column is-1-desktop is-1-tablet is-2-mobile">
              <label class="label">Novo</label>
              <a class="button is-info" @click.prevent="newCompromissos"><i class="fa fa-plus"></i></a>
          </div>
          <div class="column is-2-desktop is-3-tablet is-5-mobile">
              <label class="label">Status</label>
              <div class="select" id="status">
                  <select v-model="filtroStatus">
                      <option v-for="stat in status" :value="stat.nome">
                        {{ stat.nome }}
                      </option>
                  </select>
              </div>
          </div>
          <div class="column is-2-desktop is-5-mobile">
              <label class="label">Tipo</label>
              <div class="select" id="tipo">
                  <select v-model="filtroTipo">
                      <option v-for="tipo in tipos | orderBy 'nome'">
                        {{ tipo.nome }}
                      </option>
                  </select>
              </div>
          </div>
      </div>
      <div class="columns"> 
          <span class="column is-10">
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
          
              
              
          </span>
          
          <span class="column">
              <span class="button" @click="limparFiltros()" v-if="filtroBtn" id="btn-limpFiltros">Limpar Filtros</span>
          </span>
      </div>
        
    </div>     
        <!-- tabela -->
    <div id="table">
        <table class="table is-narrow-mobile is-bordered tg">
            
              <thead>
                <th id="user">Criador<br>
                 <!-- <div class="select">
                      <select v-model="filtroUser" id="usuario">
                          <option v-for="user in compFiltrados | filterBy 'user'">
                            {{ user.usuario }}
                          </option>
                      </select>
                  </div>-->
                </th>
                <th>Assunto<br>
                    <input class="input" id="titulo" v-model="filtroTitulo">
                </th>
                
                <th>Ult. post.
                    <div style="width: 80px"></div>
                </th>
                
                  
                <th v-if="colPriori">Prior.<br>
                  
                  <div class="select" style="width: 40px;">
                      <select v-model="filtroPriori" id="priori">
                          <option v-for="prioridade in prioridades" :value="prioridade.value">
                            {{ prioridade.text }}
                          </option>
                      </select>
                  </div>
                </th>
                  
                <th v-if="colProj">Projeto<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroProjeto" id="projeto">
                          <option v-for="projet in projetos">
                            {{ projet.nome }}
                          </option>
                      </select>
                  </div>
                </th>
                <th v-if="colPlat">Plataforma<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroPlat" id="plataforma">
                          <option v-for="plataf in plataformas">
                            {{ plataf.text }}
                          </option>
                      </select>
                  </div>
                </th>
                <th>Cód<br>
                  <input class="input" v-model="filtroId" id="id">
                </th>
                <!-- <th>Ações</th> -->

            </thead>
            <tbody id="lista">
              <tr v-for="compromisso in compFiltrados">
               
                <td 
                    @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario}}"
                    style="cursor: pointer; text-align: center;"
                    ><strong style="color:#4774bc">{{compromisso.usuario}}</strong>
                </td>
                  
                <td @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario}}"
                    style="cursor: pointer"
                    >{{compromisso.titulo}}
                </td>
                
                <td>
                    <center>
                        <strong style="color:orange">{{compromisso.ultResp}}</strong><br>
                        {{compromisso.dataHoraUltResp | dataFormat}}<br>
                        <i>Resp.:</i> {{compromisso.qtdRespostas}}
                    </center>
                    
                </td>
                <td v-if="colPriori" style="text-align: center;">{{compromisso.numPrioridade}}</td>
                <td v-if="colProj">{{compromisso.projeto}}</td>
                <td v-if="colPlat">{{compromisso.plataforma}}</td>
                <td>{{compromisso.idComp}}</td>
                
                
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
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
              
            <!--<div class="column">
              <label class="label">Status</label>
              <div class="select">
                  <select v-model="comp.idStatus">
                      <option v-for="stat in status" :value="stat.idStatus">
                        {{ stat.nome }}
                      </option>
                  </select>
                  
              </div>
            </div>-->
              
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
            <!--<div class="column">
              <label class="label">Usuário</label>
              <div class="select">
                  <select v-model="comp.idUsuario">
                      <option v-for="usuario in usuarios" :value="usuario.value">
                        {{ usuario.text }}
                      </option>
                  </select>
              </div>
            </div>-->
            
            
            
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
          <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-if="isLoading"></i>
          <a class="button is-primary" @click.prevent="salvarCompromisso" v-else>Salvar</a>
            
          <a class="button" @click.prevent="showModalNew=false">Cancelar</a>
        </footer>
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
    
  //dev:
  const ENDPOINT = 'http://192.168.0.200/helpdesk/'
  
  // ao descomentar abaixo tem que comentar a const acima
  //debug:
  //const ENDPOINT = 'http://192.168.0.115:32688/'
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
        usuario: '',
        projetos: [],
        comp: {
              
              "idCompTipo": '',
              "idStatus": 1,
              "idProjeto": '',
              "titulo": '',
              "numPrioridade": 3,
              "idUsuario": parseInt(localStorage.getItem('userId')),
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
        filtroStatus: 'EM ANDAMENTO',
        filtroPriori: '',
        filtroTipo: '',
        filtroProjeto: '',
        filtroPlat: '',
        filtroUser: '',
        filtroBtn: false,
        filtroTitulo: '',
          
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
        
        if (this.filtroTitulo != ''){
            return response = this.compromissos.filter(this.filtrarPorStatus())
                                               .filter(this.filtrarPorAssunto());                       
        }  
        
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
            
      // filtros GERAL
      filtrarPorStatus(compromisso){      
        return compromisso => compromisso.status ==  this.filtroStatus     
      },
      filtrarPorTipo(compromisso){
        return compromisso => compromisso.tipoComp == this.filtroTipo
      },
      
      // filtros TABELA
      filtrarPorCod(compromisso){
        return compromisso => compromisso.idComp == this.filtroId     
      },
      filtrarPorAssunto(compromisso){
        return compromisso => compromisso.titulo.toLowerCase().indexOf(this.filtroTitulo)>=0
      },
      filtrarPorPrioridade(compromisso){
        return compromisso => compromisso.numPrioridade == this.filtroPriori
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
        
      onFileChange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
      },  
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
        /*if (this.comp.idStatus==null || this.comp.idStatus=='') {
          swal(
            'Por favor, preencha o status!',
            'Ahh vamos lá, vamos fazer o serviço direito!',
            'error'
          )
          this.comp.idStatus.focus();
          return false
        }*/
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
        /*if (this.comp.idUsuario==null || this.comp.idUsuario=='') {
          swal(
            'Por favor, selecione o usuário',
            'A pressa é inimiga da perfeição',
            'error'
          )
          this.comp.idUsuario.focus();
          return false
        }*/
        if (this.msg==null || this.msg=='') {
          swal(
            'Por favor, preencha o detalhamento',
            'Só falta isso pra terminar, vai lá',
            'error'
          )
          this.comp.compromissosDet.focus();
          return false
        }
          
      },
      selectTipo(){
        axios.get(ENDPOINT + 'api/comp/obterCompTipo')
        .then(response => {
          
          this.tipos = response.data
          console.log()
        })
        .catch(e => {
          console.log(e)
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
        let qString = '';
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
        this.showLoading()
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
                e = error.json()
                console.log(e)
               
                //=>CAPTURAR O RETORNO DO SERVIDOR NA MENSAGEM
                /*this.err = JSON.stringify(e)
                swal({
                  html: '<strong>' + this.err + '</strong>',
                  confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Ok!',
                }) */ 
                
                
             })
             .finally(function () {
                this.loadCompromissos()
                this.hideLoading();
             })
          
      },
      carregarComp(compromisso){
        this.filtro = compromisso.idComp
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
      expSession(){
        console.log('INFORMAÇÕES DE SESSÃO:')
        var user = localStorage.getItem('name')
        console.log('Usuário:' + user)
        var data = new Date().toString();
        console.log('Agora: ' + data)
        var ex = localStorage.getItem('fimSessao')
        console.log('Encerra: ' + ex)
        if (data>ex){
            this.$router.go({ name: 'login'})
        }
      }
      
      
    },
    created(){
      let t = this
      t.loadCompromissos()
      t.selectTipo()
      t.selectStatus()
      t.selectProjetos()
      t.carregarUser()
      t.verificarUsuario()
      //t.expSession()
      
    }
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
    @media (max-height: 540px) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 400px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    @media (min-height: 550px ) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 420px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    @media (min-height: 730px) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 600px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    
    #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: auto;
        line-height: 100%;
        overflow: scroll;
    }
    
    table {
        border-collapse: collapse;
        border: 1px solid #666;
        width: 100%;    
    }
    tr:nth-child(even) {
        background-color: #edf5ff;
    }
    th, td {
        padding: 0.1em 1em;
    }
    td {
        cursor: default;
    }
    
    span.column {
        margin-bottom: 5px;
    }
    #btn-limpFiltros {
        margin: 0 10px
    }
    .fixo{float: right; margin-right: 10px; margin-top: 0px; z-index: 1000;}
    
</style>