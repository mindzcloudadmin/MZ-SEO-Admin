<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/seocontent" name="SEO Content" icon="ti-view-list-alt"/>

      </template>
      <mobile-menu>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Go To Site</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     title="Account"
                     title-classes="nav-link" icon="ti-user">
            <a class="dropdown-item" href="#">Edit Profile</a>
            <a class="dropdown-item" href="#">Help &amp; Support</a>

          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Logout
              </p>
            </a>
          </li>

        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  beforeMount () {
      if (!this.$session.has('email')) {
        window.location.href = '/#/Login'
      }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
};
</script>
