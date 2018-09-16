<template>
  <div class="content">
    <loading :active.sync="isLoading"
          :can-cancel="true"></loading>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">

          <card>
            <template slot="header">
              <div class="row">
                <div class="col-8">
                  <h4 class="card-title">List Of Pages</h4>
                  <p class="card-category">All Seo Content of pages</p>
                </div>
                <div class="col-4">
                  <router-link class="btn btn-info btn-fill float-right" to="/addseocontent">
                    Add Content
                  </router-link>
                </div>
             </div>

            </template>
            <div class="table-responsive">
              <table class="table table-hover table-striped">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Title</th>
        <th>Tag</th>
        <th>Keywords</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(slide,k,index) in table1" :k="k">
        <td>{{k+1}}</td>
        <td>{{slide.pageName}}</td>
        <td>{{slide.pageTitle}}</td>
        <td>{{slide.metaTag}}</td>
        <td>{{slide.metaKeywords}}</td>
        <td>{{slide.metaDescription}}</td>
        <td>
          <router-link class="btn btn-info btn-fill btn-xs" :to="'/editseocontent/' + slide._id">Edit</router-link>  </td>
      </tr>

    </tbody>
  </table>

            </div>

          </card>

        </div>



      </div>
    </div>
  </div>
</template>
<script>

  import axios from 'axios'
  import { ServerUrl } from './variables/config'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.min.css';



  export default {
    components: {
      Loading
    },
    data () {
      return {

        table1: [],
        isLoading:false


      }
    },
    beforeMount(){

      var self = this

      this.isLoading = true
      axios.get(ServerUrl.url + 'getallseocontent')
    .then(response => {

      this.isLoading = false

      self.table1 = response.data

      console.log(response);

    })
    .catch(e => {
      this.isLoading = false
      this.errors.push(e)
    })




    }

  }
</script>
<style>
</style>
