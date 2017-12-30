import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditBook from '@/components/EditBook'
// import NavBar from '@/components/NavBar'
import NewBook from '@/components/NewBook'
import ViewBook from '@/components/ViewBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-book',
      component: NewBook
    },
    {
      path: '/edit/:book_id',
      name: 'edit-book',
      component: EditBook
    },
    {
      path: '/:book_id',
      name: 'view-book',
      component: ViewBook
    }
  ]
})
