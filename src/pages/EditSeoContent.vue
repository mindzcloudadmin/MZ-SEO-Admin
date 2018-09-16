<template>
  <div class="content">
    <loading :active.sync="isLoading"
          :can-cancel="true"></loading>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">

          <card>
            <template slot="header">

                  <h4 class="card-title">Edit Seo Content</h4>
                  <p class="card-category">Edit All Seo Content For Pages</p>

            </template>

              <form>
                <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
                <div class="row">
                  <div class="col-md-4">
                    <fg-input type="text"
                              label="Page Title"
                              placeholder="Page Title" v-model="pageName" disabled="true">
                    </fg-input>

                  </div>
                  <div class="col-md-8">
                    <fg-input type="text"
                              label="Page Title"
                              placeholder="Page Title" v-model="pageTitle">
                    </fg-input>
                  </div>

                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Meta Tag"
                              placeholder="Meta Tag" v-model="metaTag">
                    </fg-input>
                  </div>

                </div>

                <div class="row">
                  <div class="col-md-12">
                    <fg-input type="text"
                              label="Meta Keywords"
                              placeholder="Meta Keywords" v-model="metaKeywords">
                    </fg-input>
                  </div>
                </div>



                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Meta Description</label>
                      <textarea rows="5" class="form-control border-input"
                                placeholder="Meta Description"
                                v-model="metaDescription">
                        </textarea>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="UpdateSeoContent">
                    Update Content
                  </button>
                </div>
                <div class="clearfix"></div>
              </form>

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

        pageName:'',
        pageTitle:'',
        metaTag:'',
        metaKeywords:'',
        metaDescription:'',
        isLoading:false,
        errors:[],


      }
    },
    methods: {

      UpdateSeoContent(){

        this.errors = []

        var self = this

        if(this.pageName == ''){

          this.errors.push('Please select page');

        }

        if(this.pageTitle == ''){

          this.errors.push('Please enter page title');

        }
        if(this.metaTag == ''){

          this.errors.push('Please enter meta tags');

        }

        if(this.metaKeywords == ''){

          this.errors.push('Please enter meta keywords');

        }

        if(this.metaDescription == ''){

          this.errors.push('Please enter meta description');

        }

        if (this.pageName && this.pageTitle && this.metaTag && this.metaKeywords && this.metaDescription) {

            this.isLoading = true
            axios.get(ServerUrl.url + 'updateseocontent',{
                        params: {
                            pageName: self.pageName,
                            pageTitle:self.pageTitle,
                            metaTag:self.metaTag,
                            metaKeywords:self.metaKeywords,
                            metaDescription:self.metaDescription,
                            id:self.$route.params.id
                        }
                    })
          .then(response => {

            this.isLoading = false

            window.location.href = '/seocontent'

          })
          .catch(e => {
            this.isLoading = false
            this.errors.push(e)
          })


        }





      }
    },
    beforeMount(){

      var self = this

      this.isLoading = true
      axios.get(ServerUrl.url + 'getseocontentbyname',{
                  params: {
                      pageName: self.$route.params.id,

                  }
              })
    .then(response => {

      this.isLoading = false

      this.pageName = response.data.pageName
      this.pageTitle = response.data.pageTitle
      this.metaTag = response.data.metaTag
      this.metaKeywords = response.data.metaKeywords
      this.metaDescription = response.data.metaDescription


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
