<template>

  <div class="content">
    <div class="container">
        <div class="card card-container">
          <loading :active.sync="isLoading"
                :can-cancel="true"></loading>

            <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin" @submit="login">
              <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Email address" required autofocus>
                <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block btn-signin" @click.prevent="login" type="submit">Sign in</button>
            </form><!-- /form -->
            <!-- <a href="#" class="forgot-password">
                Forgot the password?
            </a> -->
        </div><!-- /card-container -->
    </div><!-- /container -->
  </div>

</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'
  import { ServerUrl } from '../../../variables/config'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.min.css';


  export default {
    components: {
      Card,
      Loading
    },
    data () {
      return {

          email: '',
          password: '',
          errors:[],
          isLoading:false

      }
    },
    beforeMount() {



      if(this.$session.has('email')){

          window.location.href = '/#/admin/'


      }

    },
    methods: {
      login () {

        this.errors = []

      if (!this.email) {
        this.errors.push('Email is required.');

      }else if(!this.validEmail(this.email)){

        this.errors.push('Valid email required.');

      }
      if (!this.password) {
        this.errors.push('Password is required.');
      }



        if (this.email && this.password) {

          this.isLoading = true

          var self = this

          axios.get(ServerUrl.url + 'login',{
                  params: {
                      email: self.email,
                      password:self.password
                  }
              })
    .then(response => {

      this.isLoading = false
      // JSON responses are automatically parsed.
      if(response.data.length > 0){

        this.$session.set('name',response.data[0].name)
        this.$session.set('email',response.data[0].email)
        this.$session.set('username',response.data[0].username)
        this.$session.set('id',response.data[0]._id)

        window.location.href = '/'

      }else{

          this.errors.push('Invalid credentials')
      }
    })
    .catch(e => {
      this.isLoading = false
      this.errors.push(e)
    })

        }



      },
      validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    }
  }

</script>
<style>

body, html {
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
}

.card-container.card {
    max-width: 350px;
    padding: 40px 40px;
}

.btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

.card {
    background-color: #F7F7F7;

    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;

    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
}

.reauth-email {
    display: block;
    color: #404040;
    line-height: 2;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
}

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {

    background-color: rgb(9, 107, 255);
    color:white;

    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color: rgb(68, 143, 255);
}

.forgot-password {
    color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: rgb(12, 97, 33);
}

</style>
