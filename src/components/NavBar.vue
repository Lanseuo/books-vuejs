<template>
  <nav>
    <div class="nav-wrapper cyan darken-3">
      <div class="container">
        <router-link to="/" class="brand-logo">Book Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn"><a>{{ currentUser }}</a></li>
          <li><router-link :to="{ name: 'dashboard', params: {} }">Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link :to="{ name: 'login', params: {} }">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link :to="{ name: 'register', params: {} }">Register</router-link></li>
          <li v-if="isLoggedIn" @click="logout"><a href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navbar',

  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },

  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email
    }
  },

  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path })
        })
    }
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
