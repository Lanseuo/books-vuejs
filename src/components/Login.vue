<template lang="html">
  <div class="login1">
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel cyan white-text center">
            <h3>Login</h3>
            <form @submit.prevent="login">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input v-model="email" type="text" id="email">
                <label class="white-text" for="email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input v-model="password" type="password" id="password">
                <label class="white-text" for="password">Password</label>
                <button class="btn btn-large grey lighten-4 black-text">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`You are logged in as ${user.email}`)
          this.$router.go({ path: this.$router.path })
        })
        .catch(e => {
          console.log(e);
          alert(e)
        })
    }
  }
}
</script>

<style lang="css">
</style>
