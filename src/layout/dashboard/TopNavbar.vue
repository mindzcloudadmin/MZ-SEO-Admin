<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>Go To Site</p>
            </a>
          </li>
          <drop-down class="nav-item"
                     :title="Account"
                     title-classes="nav-link" icon="ti-user">
            <a class="dropdown-item" href="#">Edit Profile</a>
            <a class="dropdown-item" href="#">Help &amp; Support</a>

          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout()">
              <i class="ti-settings"></i>
              <p>
                Logout
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div></nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      Account:'Account',
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
      logout(){

         this.$session.destroy()

         window.location.href = '/Login'


      }
  },
  created(){

        this.Account = this.$session.get('name')
    }
};
</script>
<style>
</style>
