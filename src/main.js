import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Chat from './components/Chat.vue'

Vue.use(VueRouter);

let router = new VueRouter();

router.map({
    '/login':{
        component: Login
    },
    '/chat':{
        component: Chat
    }
});

router.beforeEach(function () {
    window.scrollTo(0, 0);
});

router.redirect({
    '*': '/login'
});

router.start(App, 'body');

