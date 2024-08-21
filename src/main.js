import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
//import firebase from 'firebase/app';
import 'firebase/firestore';

import 'bulma/css/bulma.css';

const firebaseConfig = {
  apiKey: "AIzaSyAel2O0IaWOXOVc0j1XVJzZl-Ked6qd2bo",
  authDomain: "reportrashv2.firebaseapp.com",
  projectId: "reportrashv2",
  storageBucket: "reportrashv2.appspot.com",
  messagingSenderId: "186044340160",
  appId: "1:186044340160:web:fd819fa994bcaefbc3da25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast);