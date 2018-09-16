<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Design & Developed by <a href="https://mindzcloudstage.herokuapp.com/" target="_blank"> Mindzcloud</a>.
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
