/** third-party */
import Vue from 'vue'
import Router from 'vue-router'

/** application */
import BootStrap from '@/components/BootStrap'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ChooseAccount from '@/components/ChooseAccount'
import AcceptPassPhrase from '@/components/AcceptPassPhrase'
import ConfirmPassPhrase from '@/components/ConfirmPassPhrase'
import ImportAccount from '@/components/ImportAccount'
import SetPwd from '@/components/SetPwd'
import Start from '@/components/Start'
import DashBoard from '@/components/DashBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/bs',
      name: 'BootStrap',
      component: BootStrap
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/',
      name: 'Start',
      component: Start,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'signup',
          name: 'SignUp',
          component: SignUp
        },
        {
          path: 'account',
          name: 'ChooseAccount',
          component: ChooseAccount
        },
        {
          path: 'accept',
          name: 'AcceptPassPhrase',
          component: AcceptPassPhrase
        },
        {
          path: 'confirm',
          name: 'ConfirmPassPhrase',
          component: ConfirmPassPhrase
        },
        {
          path: 'setpwd',
          name: 'SetPwd',
          component: SetPwd
        },
        {
          path: 'import',
          name: 'ImportAccount',
          component: ImportAccount
        }
      ]
    }
  ]
})
