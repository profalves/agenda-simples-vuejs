import MainContent from './content/MainContent.vue'
//import ResourceContent from './content/ResourceContent.vue'
//import VuexContent from './content/VuexContent.vue'
import Compromissos from './content/Compromissos.vue'
import Detalhes from './content/Detalhes.vue'
import Testes from './content/Test.vue'
import Login from './content/login.vue'
import AltPass from './content/pass.vue'

const RouterConfig = {
    '/': {
        name: 'login',
        component: Login
    },
    '/ccompromissos': {
        name: 'compromissos',
        component: Compromissos
    },
    '/cdetalhe': {
        name: 'detalhes',
        component: Detalhes 
    },
    '/testes': {
        name: 'testes',
        component: Testes
    },
    '/login': {
        name: 'login',
        component: Login
    },
    '/pass': {
        name: 'altPass',
        component: AltPass
    }
}

export default RouterConfig;