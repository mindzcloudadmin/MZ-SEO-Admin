<template>
  <div class="content">
    <loading :active.sync="isLoading"
          :can-cancel="true"></loading>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">

          <card>
            <template slot="header">

                  <h4 class="card-title">Add Seo Content</h4>
                  <p class="card-category">Add All Seo Content For Pages</p>

            </template>

              <form>
                <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
                <div class="row">
                  <div class="col-md-4">
                    <label class="control-label">
      Select Page
    </label>
                    <select name="select" class="form-control" v-model="pageName">
                      <option>Select Page</option>
                      <option v-for="page in table1" :value="page">{{page}}</option>

                    </select>

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
                  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="AddSeoContent">
                    Save Content
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
        table1: ['AboutUs', 'Services', 'Home', 'CourseList', 'DomainList', 'Customized','Corporate', 'AccountExist','AccountVerified','VerifyAccount', 'Blog', 'Events', 'OurTrainer', 'Profile', 'EditProfile','Help', 'JoinUs', 'Testimonials', 'ContactUs', 'AccessCourse', 'AccessEvent','MyCourse', 'TypesOfCourses', 'BlogSingle', 'SingleCourse', 'SuccessfullPayment', 'CancelPayment',
      ],
        pageName:'Select Page',
        pageTitle:'',
        metaTag:'',
        metaKeywords:'',
        metaDescription:'',
        isLoading:false,
        errors:[],


      }
    },
    methods: {

      AddSeoContent(){

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
            axios.get(ServerUrl.url + 'addseocontent',{
                        params: {
                            pageName: self.pageName,
                            pageTitle:self.pageTitle,
                            metaTag:self.metaTag,
                            metaKeywords:self.metaKeywords,
                            metaDescription:self.metaDescription
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





      },
      removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
    },
    beforeMount(){

      var self = this

      this.isLoading = true
      axios.get(ServerUrl.url + 'getallseocontent')
    .then(response => {

      this.isLoading = false

    //  self.table1 = response.data

      for (let key in response.data) {

        console.log(response.data[key]);

        this.removeA(self.table1, response.data[key].pageName);

      }



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
