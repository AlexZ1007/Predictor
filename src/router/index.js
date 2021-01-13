import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap'
import StartPage from '../components/StartPage.vue'
import CompetionSelect from '../components/CompetionSelect.vue'
import CustomGroups from '../components/CustomGroups.vue'
import RandomGroups from '../components/RandomGroups.vue'
import GroupStagePredictor from '../components/GroupStagePredictor.vue'
import BracketPredictor from '../components/BracketPredictor.vue'
import Page404 from '../components/Page404.vue'
import Winner from '../components/Winner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'startPage',
    component: StartPage
  },
  {
    path: '/competionSelect',
    name: 'competionSelect',
    component: CompetionSelect
  },
  {
    path: '/customGroups/:compID',
    name: 'customGroups',
    component: CustomGroups,
    props: true
  },
  {
    path: '/randomGroups/:compID',
    name: 'randomGroups',
    component: RandomGroups,
    props: true
  },
  {
    path: '/prediction/groupStage/:compID',
    name: 'groupStage',
    component: GroupStagePredictor,
    props: true
  },
  {
    path: '/prediction/bracket/:compID',
    name: 'bracket',
    component: BracketPredictor,
    props: true
  },
  {
    path: '/prediction/bracket/winner/:name',
    name: 'winner',
    component: Winner,
    props: true
  },
  {
    path: '/*',
    name: '404',
    component: Page404
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
