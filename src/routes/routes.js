import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Login from 'src/components/Dashboard/Views/Login.vue'
import SeoContent from 'src/components/Dashboard/Views/SeoContent.vue'
import AddSeoContent from 'src/components/Dashboard/Views/AddSeoContent.vue'
import EditSeoContent from 'src/components/Dashboard/Views/EditSeoContent.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'seocontent',
        name: 'SeoContent',
        component: SeoContent
      },
      {
        path: 'addseocontent',
        name: 'AddSeoContent',
        component: AddSeoContent
      },
      {
        path: 'editseocontent/:id',
        name: 'EditSeoContent',
        component: EditSeoContent
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  { path: '*', component: NotFound }
]


export default routes
