<template>
  <app-header></app-header>
  <i class="fixo fa fa-spinner fa-pulse fa-4x fa-fw" v-show="isLoading"></i>
  <span class="fixo sr-only" v-show="isLoading">Carregando...</span>
  
    <div id="compromissos">
      <!-- botões -->
      <div class="columns is-mobile">
          <div class="column is-1-tablet is-2-mobile">
              <label class="label">Novo</label>
              <a class="button is-info" @click.prevent="newCompromissos"><i class="fa fa-plus"></i></a>
          </div>
          <div class="column is-2-tablet is-2-mobile" v-if="notificados.length>0">
              <label class="label">Notificações</label>
              <button class="button is-warning" @click="getNotificados" v-if="!notify">{{notificados.length}}</button>
              <button class="button is-info" @click="getNotificados" v-else>Todas</button>
          </div>
          <div class="column is-2-desktop is-3-tablet is-4-mobile">
              <label class="label" style="background-color: aliceblue">Status</label>
              <div class="select" id="status">
                  <select v-model="filtroStatus" @change="loadLists">
                      <option v-for="stat in status" :value="stat.nome">
                        {{ stat.nome }}
                      </option>
                  </select>
              </div>
          </div>
          <div class="column is-2-desktop is-4-mobile" v-if="listaTodos">
              <label class="label">Tipo</label>
              <div class="select" id="tipo">
                  <select v-model="filtroTipo" @change="setTipo">
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
          
            <div class="chip animated bounceInRight" v-if="chipUser">
              {{ filtroUser }}
              <span class="closebtn" @click="limparFiltroUser()">&times;</span>
            </div>  
             
          </span>
          
          <span class="column">
              <span class="button" @click="limparFiltros()" v-if="filtroBtn" id="btn-limpFiltros">Limpar Filtros</span>
          </span>
      </div>
        
    </div> 
    
    <div class="columns comp">
      <div class="column is-3-tablet is-2-desktop" v-if="selected.length>0">
        <button class="button is-danger" @click="showStatus=true">Alterar Status</button>
      </div>
      <div class="column is-4-mobile is-2-tablet is-1-desktop" v-if="switch">
        <div class="onoffswitch">
          <input type="checkbox"
                 @click="mudarLista"
                 name="onoffswitch" 
                 class="onoffswitch-checkbox" 
                 id="myonoffswitch"
                 v-model="listaEu"
                 :checked="listaEu"
                 >
          <label class="onoffswitch-label" for="myonoffswitch">
              <span class="onoffswitch-inner"></span>
              <span class="onoffswitch-switch"></span>
          </label>
        </div>
      </div>
      <div class="column" v-if="listaTodos">{{compFiltrados.length}} compromissos</div> 
      <div class="column" v-if="listaEu && destFiltrados.length===1">1 compromisso para você</div> 
      <div class="column" v-if="listaEu && destFiltrados.length>1">{{destFiltrados.length}} compromissos para você</div> 
    </div>

    <!-- tabela -->
    <div id="table" v-if="listaTodos">
        <table class="table is-narrow-mobile is-bordered tg">
            
              <thead>
                
                <th id="user">Criador<br>
                  <div class="select">
                      <select v-model="filtroUser">
                        <option v-for="user in filtroUsuarios" :value="user.nome">
                          {{ user.nome }}
                        </option>
                      </select>
                  </div>
                  
                </th>
                <th>Assunto<br>
                    <input class="input" id="titulo" v-model="filtroTitulo" >
                </th>
                
                <th>Ult. post.
                    <div style="width: 80px"></div>
                </th>
                
                  
                <th v-if="colPriori">Ordem<br>
                  
                  <div class="select" style="width: 40px;">
                      <select v-model="filtroPriori" id="priori" @change="setPriori">
                          <option v-for="prioridade in prioridades" :value="prioridade.value">
                            {{ prioridade.text }}
                          </option>
                      </select>
                  </div>
                </th>
                  
                <th v-if="colProj">Projeto<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroProjeto" id="projeto" @change="setProj">
                          <option v-for="projet in projetos">
                            {{ projet.nome }}
                          </option>
                      </select>
                  </div>
                </th>
                <th v-if="colPlat">Plataforma<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroPlat" id="plataforma" @change="setPlat">
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
              <tr v-for="compromisso in compFiltrados | orderBy 'numPrioridade' 'idComp'">
                <!--<td style="font-size: 10px;">{{compromisso.tipoComp}}</td>-->
                <td 
                    @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario, status:filtroStatus}}"
                    style="cursor: pointer; text-align: center;"
                    ><strong style="color:#4774bc">{{compromisso.usuario}}</strong>
                </td>
                  
                <td @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario, status:filtroStatus}}"
                    style="cursor: pointer"
                    >{{compromisso.titulo}}
                </td>
                
                <td>
                    <center v-if="compromisso.ultResp === usuarioNome">
                        <strong style="color: orange">{{compromisso.ultResp}}</strong><br>
                        {{compromisso.dataHoraUltResp | dataFormat}}<br>
                        <i>Resp.:</i> {{compromisso.qtdRespostas}}
                    </center>
                    <center v-else>
                        <strong style="color: red">{{compromisso.ultResp}}</strong><br>
                        {{compromisso.dataHoraUltResp | dataFormat}}<br>
                        <i>Resp.:</i> {{compromisso.qtdRespostas}}
                    </center>
                    
                </td>
                <td v-if="colPriori" id="dataPriori">{{compromisso.numPrioridade}}</td>
                <td v-if="colProj">{{compromisso.projeto}}</td>
                <td v-if="colPlat">{{compromisso.plataforma}}</td>
                <td>{{compromisso.idComp}}</td>
                
                
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
    </div>

    <!-- NOTIFICADOS -->
    <div id="table" v-if="notify">
        <table class="table is-narrow-mobile is-bordered tg">
              <thead>
                
                <th id="user">Criador<br>
                  <!--<div class="select">
                      <select v-model="filtroUser">
                        <option v-for="user in filtroUsuarios" :value="user.nome">
                          {{ user.nome }}
                        </option>
                      </select>
                  </div>-->
                  
                </th>
                <th>Assunto<br>
                    <input class="input" id="titulo" v-model="filtroTitulo" >
                </th>
                
                <th>Ult. post.
                    <div style="width: 80px"></div>
                </th>
                
                  
                <th v-if="colPriori">Ordem<br>
                  
                  <div class="select" style="width: 40px;">
                      <select v-model="filtroPriori" id="priori" @change="setPriori">
                          <option v-for="prioridade in prioridades" :value="prioridade.value">
                            {{ prioridade.text }}
                          </option>
                      </select>
                  </div>
                </th>
                  
                <th v-if="colProj">Projeto<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroProjeto" id="projeto" @change="setProj">
                          <option v-for="projet in projetos">
                            {{ projet.nome }}
                          </option>
                      </select>
                  </div>
                </th>
                <th v-if="colPlat">Plataforma<br>
                  <div class="select" style="width: 100px;">
                      <select v-model="filtroPlat" id="plataforma" @change="setPlat">
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
              <tr v-for="compromisso in notificados">
                <!--<td style="font-size: 10px;">{{compromisso.tipoComp}}</td>-->
                <td 
                    @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario, status:filtroStatus}}"
                    style="cursor: pointer; text-align: center;"
                    ><strong style="color:#4774bc">{{compromisso.usuario}}</strong>
                </td>
                  
                <td @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario, status:filtroStatus}}"
                    style="cursor: pointer"
                    >{{compromisso.titulo}}
                </td>
                
                <td>
                    <center v-if="compromisso.ultResp === usuarioNome">
                        <strong style="color: orange">{{compromisso.ultResp}}</strong><br>
                        {{compromisso.dataHoraUltResp | dataFormat}}<br>
                        <i>Resp.:</i> {{compromisso.qtdRespostas}}
                    </center>
                    <center v-else>
                        <strong style="color: red">{{compromisso.ultResp}}</strong><br>
                        {{compromisso.dataHoraUltResp | dataFormat}}<br>
                        <i>Resp.:</i> {{compromisso.qtdRespostas}}
                    </center>
                    
                </td>
                <td v-if="colPriori" id="dataPriori">{{compromisso.numPrioridade}}</td>
                <td v-if="colProj">{{compromisso.projeto}}</td>
                <td v-if="colPlat">{{compromisso.plataforma}}</td>
                <td>{{compromisso.idComp}}</td>
                
                
              </tr>
            </tbody>
        </table>
      
      <!-- Paginação -- 
      <Pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></Pagination> -->
    </div>
    
    <!-- LISTA ESPECIFICADA -->
    <div id="table" v-if="listaEu">
        <table class="table is-narrow-mobile is-bordered tg">
            
              <thead>
                <th style="text-align: center">
                  Todos<br>
                  <label class="checkbox">
                    <input type="checkbox" v-model="selectAll">
                  </label>
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
                
                <th>Assunto<br>
                    <input class="input" id="titulo" v-model="filtroTitulo">
                </th>
                
                <th>Prazo de Entrega:</th>
                
                
                  
                <th v-if="colPriori">Prior.<br>
                  
                  <div class="select" style="width: 40px;">
                      <select v-model="filtroPriori" id="priori">
                          <option v-for="prioridade in prioridades" :value="prioridade.value">
                            {{ prioridade.text }}
                          </option>
                      </select>
                  </div>
                </th>
                
                <th>Cód<br>
                  <input class="input" v-model="filtroId" id="id">
                </th>

            </thead>
          
            <tbody id="lista">
              <tr v-for="compromisso in destFiltrados">
                <td id="checkbox">
                  <label class="checkbox">
                    <input type="checkbox" v-model="selected" :value="compromisso" number>
                  </label>
                </td>
                <td v-if="colProj">{{compromisso.nome}}</td>
                <td @click="filtro = compromisso.idComp" 
                    v-link="{ path: '/cdetalhe', query: {q:filtro, user:usuario, status:filtroStatus}}"
                    style="cursor: pointer"
                    >{{compromisso.titulo}}
                </td>
                <td>{{compromisso.dataHoraAgend | dataFormat}}</td>
                <td v-if="colPriori" id="dataPriori">{{compromisso.numPrioridade}}</td>
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
              <label class="label">Tipo</label>
              <div class="select">
                  <select v-model="comp.idCompTipo">
                      <option v-for="tipo in tipos" :value="tipo.idCompTipo">
                        {{ tipo.nome }}
                      </option>
                  </select>
                  
              </div>
            </div>
              
            <div class="column">
                <label class="label">Agendamento</label>
                <div class="select">
                  <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
                </div>
                <!-- <span>{{ startTime.time }}</span> -->
            </div>
             
            <div class="column">
                <label class="label">Responsável</label>
                <div class="select">
                    <select v-model="userDest">
                      <option v-for="user in users" :value="user.idUsuario">
                        {{ user.nome }}
                      </option>
                    </select>
                </div>
                <!-- <span>{{ startTime.time }}</span> -->
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
            <div class="column is-5">
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
            <div class="column">
              <label class="label">Ordem Proritária</label>
              <div class="select">
                  <select v-model="comp.numPrioridade" @change="avisoPriori">
                      <option v-for="prioridade in prioridades" :value="prioridade.value">
                        {{ prioridade.text }}
                      </option>
                  </select>
              </div>
            </div>
            <div class="column">
              <label class="label">Status</label>
              <div class="select">
                  <select v-model="comp.idStatus">
                      <option v-for="status in status" :value="status.idStatus">
                        {{ status.nome }}
                      </option>
                  </select>
              </div>
            </div>
          </div>
          
          <div class="box aviso">
            <div v-if="comp.numPrioridade === 1">
              <strong>Prioridade 1:</strong><br>
              Remete ao responsável PARAR as suas tarefas para atender a esta solicitação<br>
              <div style="color: red">ESCOLHA CRÍTICA</div>
            </div>
            <div v-if="comp.numPrioridade === 2">
              <strong>Prioridade 2:</strong><br>
              Entrará na lista de todos os compromissos com PRAZO DE ENTREGA determinado 
            </div>
            <div v-if="comp.numPrioridade === 3">
              <strong>Prioridade 3:</strong><br>
              Entrará na lista de todos os compromissos que podem ser realizados até o próximo PACKAGE (dia 01 de cada mês)
            </div>
            <div v-if="comp.numPrioridade === 4">
              <strong>Prioridade 4:</strong><br>
              Entrará na lista de todos os compromissos que podem aguardar a conclusão das listas anteriores
            </div>
            <div v-if="comp.numPrioridade === 5">
              <strong>Prioridade 5:</strong><br>
              Inclui na lista de solicitações em STAND BY
            </div>
          
          </div>
          
          
          
          <!-- upload de arquivos -->
            
           
            
          <!----> 
          <label class="label">Detalhamento</label>
          <p class="control">
            <textarea class="textarea" placeholder="Escreva a pergunta ou comentário..." v-model.trim="msg"></textarea>
          </p>
          
          <br>
          
          <!--<div class="column">
              <div v-if="!image">
                  <label class="label">Selecione uma imagem:</label>
                  <input id="file2" type="file" @change="onFileChange">
              </div>

              <div v-else>
                  <img :src="image">
                  <center><button @click="removeImage">Remove image</button><br>
                  <strong>Arquivo: {{ image | extensao }}</strong></center>
              </div>

          </div>-->
          
        </section>
        <footer class="modal-card-foot">
          <i class="fixo fa fa-spinner fa-pulse fa-5x fa-fw" v-if="isLoading"></i>
          <a class="button is-primary" @click.prevent="salvarCompromisso" v-else>Salvar</a>
            
          <a class="button" @click.prevent="showModalNew=false">Cancelar</a>
        </footer>
      </div>
    </div>

    <!-- MODAL Alterar Status -->
      
    <div class="modal" :class="{'is-active':showStatus}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Painel de Ações</p>
          <button class="delete" aria-label="close" @click.prevent="showStatus=false"></button>
        </header>
        <section class="modal-card-body">
          <div style="text-align:center">
              <label class="label">Mudar Status para:</label>
              <div class="select">
                  <select v-model="idStatus" @change="alterarStatus">
                      <option v-for="stat in status" :value="stat.idStatus">
                        {{ stat.nome }}
                      </option>
                  </select>
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

  //==========================================================
  //dev:
  //const ENDPOINT = 'http://192.168.0.200/helpdesk/'
  
  //WS:
  //const ENDPOINT = 'http://localhost/helpdesk/'
  
  //produção
  const ENDPOINT = 'http://191.252.64.6/helpdesk/'
  
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
        btnTable: 'Mostrar interessados a TODOS',
        arquivo: [],
        compromissos: [],
        compDestinados: [],
        selected: [],
        showModalNew: false,
        showModalForum: false,
        currentTime: moment().format('L'),
        currentHour: moment().format('LT'),
        tipos: [],
        status: [],
        prioridades: [
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
          { text: '5', value: 5 }
        ],
        plataformas: [
          { text: 'DESKTOP'},
          { text: 'MOBILE'},
          { text: 'WEB'},
          { text: 'HIBRIDO'}
        ],
        usuario: localStorage.getItem('userId'),
        usuarioNome: localStorage.getItem('name'),
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
        userDest: 1,
        users: [],
        image: '',
        imgDet: {
            "idCompDet": '',
            "imgFile": '',
            "extFile": ''    
        },
        caminho: '',
        ext: '',
        listaTodos: (sessionStorage.getItem('listaTodos') === 'true'), 
        listaEu: (sessionStorage.getItem('listaEu') === 'true'),
        showStatus: false,
        idStatus: '',
        notify: false,
        notified: false,
        switch: true,
        
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
        filtroPriori: localStorage.getItem('priori'),
        filtroTipo: localStorage.getItem('tipo'),
        filtroProjeto: localStorage.getItem('projeto'),
        filtroPlat: localStorage.getItem('plataforma'),
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
        
        if (this.filtroTitulo){
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorAssunto());                       
        }  
        
        if (this.filtroId){
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorCod());                        
        }
        
        if (this.filtroUser){
            this.chipUser = true
            this.colUser = false
            this.filtroBtn = true
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorUsuario())
                             
            
        }
        
        if(this.filtroPriori && this.filtroProjeto && this.filtroPlat){
            this.chipProj = true
            this.colProj = false
            this.chipPriori = true
            this.colPriori = false
            this.chipPlat = true
            this.colPlat = false
            this.filtroBtn = true
            console.log('filtros: priori e proj e plat')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorPrioridade())
                                    .filter(this.filtrarPorProjeto())
                                    .filter(this.filtrarPorPlataforma())
        }
        
        if(this.filtroPriori && this.filtroProjeto){
            this.chipProj = true
            this.colProj = false
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            console.log('filtros: priori e proj')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorPrioridade())
                                    .filter(this.filtrarPorProjeto())
        }
        
        if(this.filtroPriori && this.filtroPlat){
            this.chipPlat = true
            this.colPlat = false
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            console.log('filtros: priori e plat')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorPrioridade())
                                    .filter(this.filtrarPorPlataforma())
        }
        
        if(this.filtroPriori && this.filtroProjeto){
        
        }
        
        if (this.filtroProjeto && this.filtroPlat && this.filtroTipo){
            this.chipPlat = true
            this.chipTipo = true
            this.colPlat = false
            this.colTipo = false
            this.colProj = false
            this.chipProj = true
            this.filtroBtn = true
            console.log('filtros: proj, plat e tipo')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorTipo())
                                    .filter(this.filtrarPorProjeto())
                                    .filter(this.filtrarPorPlataforma())
        }
        
        if (this.filtroPlat && this.filtroTipo){
            this.chipPlat = true
            this.chipTipo = true
            this.colPlat = false
            this.colTipo = false
            this.filtroBtn = true
            console.log('filtros: plat e tipo')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorTipo())
                                    .filter(this.filtrarPorPlataforma())
        }
        
        
        
        if (this.filtroPlat){
            this.chipPlat = true
            this.colPlat = false
            this.filtroBtn = true
          
            if (this.filtroProjeto){
                this.chipProj = true
                this.colProj = false
                this.filtroBtn = true
                
                if (this.filtroPriori){
                    this.chipPriori = true
                    this.colPriori = false
                    this.filtroBtn = true
                  
                    if (this.filtroTipo){
                        this.chipTipo = true
                        this.colTipo = false
                        this.filtroBtn = true
                        console.log('filtros: plat, projeto, priori, tipo')
                        return this.compromissos.filter(this.filtrarPorStatus())
                                                .filter(this.filtrarPorPlataforma())
                                                .filter(this.filtrarPorProjeto())
                                                .filter(this.filtrarPorPrioridade())
                                                .filter(this.filtrarPorTipo())  
                    }
                    console.log('filtros: plat, projeto, priori')
                    return this.compromissos.filter(this.filtrarPorStatus())
                                        .filter(this.filtrarPorPlataforma())
                                        .filter(this.filtrarPorProjeto())
                                        .filter(this.filtrarPorPrioridade()) 
                }
                console.log('filtros: plat, projeto')
                return this.compromissos.filter(this.filtrarPorStatus())
                                        .filter(this.filtrarPorPlataforma())
                                        .filter(this.filtrarPorProjeto())
            }
            console.log('filtros: plataforma')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorPlataforma())
        }
        
        
        
        
        if (this.filtroProjeto && this.filtroTipo){
            this.chipProj = true
            this.colProj = false
            this.chipTipo = true
            this.colTipo = false
            this.filtroBtn = true
            console.log('filtros: tipo e proj')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorTipo())
                                    .filter(this.filtrarPorProjeto())
        }
         
        
        if (this.filtroTipo){
            this.chipTipo = true
            this.colTipo = false
            this.filtroBtn = true
            
                if (this.filtroPriori){
                    this.chipPriori = true
                    this.colPriori = false
                    this.filtroBtn = true
                    
                    if (this.filtroProjeto){
                        this.chipProj = true
                        this.colProj = false
                        this.filtroBtn = true
                      
                        if (this.filtroPlat){
                            this.chipPlat = true
                            this.colPlat = false
                            this.filtroBtn = true
                            console.log('filtros: tipo, priori, proj, plat')
                            return this.compromissos.filter(this.filtrarPorStatus())
                                                    .filter(this.filtrarPorTipo())
                                                    .filter(this.filtrarPorPrioridade())
                                                    .filter(this.filtrarPorProjeto())
                                                    .filter(this.filtrarPorPlataforma())
                        }
                        console.log('filtros: tipo, priori, proj')
                        return this.compromissos.filter(this.filtrarPorStatus())
                                                .filter(this.filtrarPorTipo())
                                                .filter(this.filtrarPorPrioridade())
                                                .filter(this.filtrarPorProjeto())
                    }
                    console.log('filtros: tipo, priori')
                    return this.compromissos.filter(this.filtrarPorStatus())
                                            .filter(this.filtrarPorTipo())
                                            .filter(this.filtrarPorPrioridade())
                  }
            
            console.log('filtros: tipo')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorTipo())                                        
        }
        
        if (this.filtroPriori){
            
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            console.log('filtros: priori')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorPrioridade())
                                               
        } 
        
        
          
        if (this.filtroProjeto){
            this.chipProj = true
            this.colProj = false
            this.filtroBtn = true
            console.log('filtros: projeto')
            return this.compromissos.filter(this.filtrarPorStatus())
                                    .filter(this.filtrarPorProjeto())
        }
                      
        else {
            console.log('filtros: todos do status')
            return this.compromissos.filter(this.filtrarPorStatus())
                
        }
        
      },
      destFiltrados(){
        if (this.filtroId){
            return this.compDestinados.filter(this.filtrarPorStatus())
                                      .filter(this.filtrarPorCod());                        
        }
        
        if (this.filtroPriori && this.filtroProjeto){
            this.chipProj = true
            this.colProj = false
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            return this.compDestinados.filter(this.filtrarPorStatus())
                                      .filter(compromisso => compromisso.nome === this.filtroProjeto )
                                      .filter(this.filtrarPorPrioridade())
                                               
        }
        
        if (this.filtroProjeto){
            this.chipProj = true
            this.colProj = false
            this.filtroBtn = true
          
            
            console.log(this.compDestinados)
        
            return this.compDestinados.filter(this.filtrarPorStatus())
                                      .filter(compromisso => compromisso.nome === this.filtroProjeto )
        }
        
        if (this.filtroTitulo){
            return this.compDestinados.filter(this.filtrarPorStatus())
                                      .filter(this.filtrarPorAssunto());                       
        } 
        
        
        if (this.filtroPriori){
            
            this.chipPriori = true
            this.colPriori = false
            this.filtroBtn = true
            return this.compDestinados.filter(this.filtrarPorStatus())
                                      .filter(this.filtrarPorPrioridade())
                                               
        } 
        
         
        else {
            return this.compDestinados.filter(this.filtrarPorStatus())
        }
        
      },
      notificados(){
        let notify = this.compromissos.filter(compromisso => compromisso.status !== 'CANCELADO')
                                      .filter(compromisso => compromisso.status !== 'FINALIZADO')
                                      .filter(compromisso => compromisso.usuario === this.usuarioNome)
                                      .filter(compromisso => compromisso.ultResp !== this.usuarioNome)
                                      .filter(compromisso => compromisso.ultResp !== " - - -")
        
        if(notify.length>0 && !this.notified){
          this.notified = true
          console.log('ATENÇÃO: há notificações para você!')
          let users = notify.map(row => ' ' + row.ultResp)
          
          let n = new Notification('Helpdesk - 7Virtual', {
            body: 'Você possui interações de' + users.toString(),
          })

          n.vibrate
          n.onclick = (event, close) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            this.getNotificados()
            n.close()
          }
          setTimeout(n.close.bind(n), 5000);
        }
        
        return notify  
      },
      filtroUsuarios(){ // para o select de filtro de criadores na lista todos
        let users = this.users
        this.users.shift()
        
        return users
      },
      selectAll: {
        get: function () {
            return this.destFiltrados ? this.selected.length == this.destFiltrados.length : false;
        },
        set: function (value) {
            let selected = [];

            if (value) {
                this.destFiltrados.forEach(function (value) {
                    selected.push(value);
                    console.log('value', value);
                });
            }

            this.selected = selected;
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
        return compromisso => compromisso.status ===  this.filtroStatus     
      },
      filtrarPorTipo(compromisso){
        return compromisso => compromisso.tipoComp == this.filtroTipo
      },
      
      // filtros TABELA
      filtrarPorCod(compromisso){
        return compromisso => compromisso.idComp.toString().indexOf(this.filtroId)>=0      
      },
      filtrarPorAssunto(compromisso){
        return compromisso => compromisso.titulo.toLowerCase().indexOf(this.filtroTitulo)>=0
      },
      filtrarPorPrioridade(compromisso){
        return compromisso => compromisso.numPrioridade == this.filtroPriori
      },
      filtrarPorProjeto(compromisso){
        return compromisso => compromisso.projeto === this.filtroProjeto 
      },
      filtrarPorPlataforma(compromisso){
        return compromisso => compromisso.plataforma == this.filtroPlat  
      },
      filtrarPorUsuario(compromisso){
        return compromisso => compromisso.usuario == this.filtroUser  
      },
       
      // limpeza
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
        localStorage.setItem('tipo', '')
      },
      limparFiltroPriori(){
        this.filtroPriori = ''
        this.colPriori = true
        this.chipPriori = false
        this.filtroBtn = false
        localStorage.setItem('priori', '')
      },
      limparFiltroProj(){
        this.filtroProjeto = ''
        this.colProj = true
        this.chipProj = false
        this.filtroBtn = false
        localStorage.setItem('projeto', '')
      },
      limparFiltroPlat(){
        this.filtroPlat = ''
        this.colPlat = true
        this.chipPlat = false
        this.filtroBtn = false
        localStorage.setItem('plataforma', '')
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
        /*if (this.comp.idStatus==null || this.comp.idStatus=='') {
          swal(
            'Por favor, preencha o status!',
            'Ahh vamos lá, vamos fazer o serviço direito!',
            'error'
          )
          this.comp.idStatus.focus();
          return false
        }*/
        if (this.comp.titulo.length>100) {
          swal(
            'Este título está muito grande, resuma!',
            'Este campo suporta até 50 caracteres. Por favor, escreva um titulo com quantidade menor',
            'error'
          )
          this.comp.titulo.focus();
          return false
        }
        if (this.msg.length>2500) {
          swal(
            'Este detalhamento está muito extenso, resuma!',
            'Este campo suporta até 2500 caracteres. Por favor, escreva um titulo com quantidade menor',
            'error'
          )
          this.comp.titulo.focus();
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
      selectUsuarios(){
        axios.get(ENDPOINT + 'api/usuario/todos')
        .then(response => {
          
          this.users = response.data
          //console.log(response)
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
           console.log('load todos')
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })
      },
      loadCompDestinados(){
        let t = this
        this.showLoading()
        this.$http.get(ENDPOINT + `api/comp/obterCompDestina?idUserDestina=` + this.usuario + `&status=` + this.filtroStatus).then(
         response=>{
           t.compDestinados = response.json()
           console.log('load dest')
         },
         error=>{
           console.log(error)
         }).finally(function () {
          t.hideLoading();
        })
      },
      loadLists(){
        let t = this
        t.loadCompromissos()
        t.loadCompDestinados()
        
        
        if(this.filtroStatus !== 'EM ANDAMENTO') localStorage.setItem('status', this.filtroStatus)
        
        
        /*if(this.filtroProjeto: '',
        if(this.filtroPlat: '',
        if(this.filtroUser: '',
        
        localStorage.setItem('status', this.filtroStatus)*/
      },
      setTipo(){ if(this.filtroTipo) localStorage.setItem('tipo', this.filtroTipo) },
      setPriori(){ if(this.filtroPriori) localStorage.setItem('priori', this.filtroPriori) },
      setProj(){ if(this.filtroProjeto) localStorage.setItem('projeto', this.filtroProjeto) },
      setPlat(){ if(this.filtroPlat) localStorage.setItem('plataforma', this.filtroPlat) },
      marcarComp(compromisso){
        console.log('Antes:', compromisso.selected)
        if(compromisso.selected === false) {
          compromisso.selected = true
          console.log('Depois:',compromisso.selected)
        }
        else {
          compromisso.selected = false
          console.log('Depois:',compromisso.selected)
        }
      },
      marcarTodos(){
        for(let i in this.compDestinados){
          Object.assign(this.compDestinados[i], {selected: true})
        }
        console.log('comps: ', this.compDestinados)
      },
      mudarLista(){
        if(this.listaTodos === true){
            this.listaEu = true
            this.listaTodos = false
            sessionStorage.setItem('listaTodos', false)
            sessionStorage.setItem('listaEu', true)
            //this.btnTable = 'Mostrar interessados a TODOS'
            this.loadCompDestinados()
        }
        else {
            this.listaEu = false
            this.listaTodos = true
            sessionStorage.setItem('listaTodos', true)
            sessionStorage.setItem('listaEu', false)
            //this.btnTable = 'Mostrar interessados a MIM'
            this.loadCompromissos()
        }
      },
      getNotificados(){
        Notification.requestPermission()
        
        if(this.notify === true){
            this.notify = false
            this.listaEu = (sessionStorage.getItem('listaEu') === 'true')
            this.listaTodos = (sessionStorage.getItem('listaTodos') === 'true')
            this.switch = true
        }
        else{
            this.notify = true
            this.listaEu = false
            this.listaTodos = false
            this.switch = false
        }
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
        this.comp.compromissosDet = []
        let det = {
            detalhes: this.msg, 
            dataHoraAgend: this.startTime.time,
            idUsuarioDestina: this.userDest
        } 
        this.comp.compromissosDet.push(det)
        
          this.$http.post(ENDPOINT + 'api/comp/novoCab',this.comp)
           .then((response) => {
              this.$set('comp',{
                "idCompTipo": '',
                "idStatus": 1,
                "idProjeto": '',
                "titulo": '',
                "numPrioridade": 3,
                "idUsuario": parseInt(localStorage.getItem('userId')),
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
              //e = error.json()
              console.log(e)
              this.hideLoading()
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
      enviarAposSalvar(){
        
        ultimoDet = this.compromissosDet.slice(-1)[0] 
        
        this.imgDet.extFile = this.ext
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
      expSession(){
        console.log('INFORMAÇÕES DE SESSÃO:')
        let user = localStorage.getItem('name')
        console.log('Usuário:' + user)
        let data = new Date();
        console.log('Agora: ' + data)
        let ex = localStorage.getItem('fimSessao')
        console.log('Encerra: ' + ex)
        if (data>ex){
            this.$router.go({ name: 'login'})
        }
      },
      getStatus(){
        if(localStorage.getItem('status')){
           this.filtroStatus = localStorage.getItem('status') 
        }
      },
      alterarStatus(){
        for(let i in this.selected){
          let id = this.selected[i].idCompDet
          console.log('sel' + i, this.selected[i].idCompDet)
          this.$http.get(ENDPOINT + 'api/comp/alterarStatus?idCompDet=' + id + '&idStatus=' + this.idStatus)
          .then((response) => {
                console.log(response.body)
                this.showStatus = false
                this.selected = []
                //this.$router.go({ name: 'compromissos'})
             })
             .catch((error) => {
                console.log(response.body)
             })
             .finally(function () {
                
                this.loadCompDestinados()
             })
        }
      },
      notifyMe(){
        let p = localStorage.getItem('permitirNotificar')
        console.log('p:', p)
        if(p === 'granted') return
        Notification.requestPermission((permission) => {
          if (permission === "granted"){
            let notification = new Notification("Obrigado! Agora você poderá ser notificado");
            localStorage.setItem('permitirNotificar', permission)
          }
          else{
            
          }
        });
      },
      avisoPriori(){
        if(this.comp.numPrioridade === 1){
          swal('Eepa...Para o seu caso a prioridade 1 será necessária?', 'Reveja os critérios para esta prioridade antes para que tenha a certeza que o responsável pare de fazer a lista de tarefas dele para atender esta solicitação', 'warning');
        }
      }
      
    },
    
    ready(){
      let t = this
      t.selectStatus()
      t.loadCompDestinados()
      
      if(localStorage.getItem('userId') === 6){
        sessionStorage.setItem('listaTodos', true)
        sessionStorage.setItem('listaEu', false)  
      }
      
      this.listaTodos = (sessionStorage.getItem('listaTodos') === 'true')
      this.listaEu = (sessionStorage.getItem('listaEu') === 'true')
      
    },
    
    created(){
      let t = this
      t.loadCompromissos()
      //t.loadCompDestinados()
      t.selectTipo()
      t.selectStatus()
      t.selectProjetos()
      t.selectUsuarios()
      t.carregarUser()
      t.verificarUsuario()
      //t.expSession()
      t.getStatus()
      
      if(!sessionStorage.getItem('listaEu')){
        sessionStorage.setItem('listaTodos', false)
        sessionStorage.setItem('listaEu', true)
      }
      
      t.notifyMe()
      
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
  
  @media (min-height: 440px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 140px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 520px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 200px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 600px ) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 270px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 650px ) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 330px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 720px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 460px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 765px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 510px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 800px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 490px;
      line-height: 100%;
      overflow: scroll;
    }
  }
  @media (min-height: 800px) {
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

  #dataPriori {
      text-align: center; 
      font-size: 20px;
      font-weight: bold;
  }

  .fixo{
    float: right; 
    margin-right: 10px; 
    margin-top: 0px; 
    z-index: 1000;
  }

  .comp{
    font-size: 18px;
    color: slategray;
    margin-top: 0px;
  }
  
  #checkbox{
    text-align: center;
  }

  /* btn switch on/off */
  .onoffswitch {
      position: relative; 
      width: 90px;
      -webkit-user-select:none; 
      -moz-user-select:none; 
      -ms-user-select: none;
  }
  .onoffswitch-checkbox {
      display: none;
  }
  .onoffswitch-label {
      display: block; overflow: hidden; cursor: pointer;
      border: 0; border-radius: 20px;
  }
  .onoffswitch-inner {
      display: block; width: 200%; margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
  }
  .onoffswitch-inner:before, .onoffswitch-inner:after {
      display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
      font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
      box-sizing: border-box;
  }
  .onoffswitch-inner:before {
      content: "MEUS";
      padding-left: 10px;
      background-color: #209CEE; color: #FFFFFF;
  }
  .onoffswitch-inner:after {
      content: "TODOS";
      padding-right: 10px;
      background-color: #EEEEEE; color: #999999;
      text-align: right;
  }
  .onoffswitch-switch {
      display: block; width: 18px; margin: 6px;
      background: #FFF;
      position: absolute; top: 0; bottom: 0;
      right: 56px;
      border: 1px solid #999999; border-radius: 20px;
      transition: all 0.3s ease-in 0s; 
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
      margin-left: 0;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
      right: 0px; 
  }
  .aviso{
    background-color: #F5F5F5;
  }
</style>