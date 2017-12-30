<template>
  <div id="new-book">
    <h3 v-if="name">{{ name }}</h3>
    <h3 v-else="name">New book</h3>
    <div class="row">
      <form @submit.prevent="saveBook" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="author" required>
            <label>Author</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="genre" required>
            <label>Genre</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="description" required>
            <label>Description</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="cover" required>
            <label>Cover</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="number" v-model="rating" value="42" min="1" max="5" required="">
            <label>Rating</label>
          </div>
        </div>
        <button type="submit" class="btn">Add</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'new-book',
    data() {
      return {
        id: null,
        name: null,
        author: null,
        description: null,
        rating: null,
        cover: null,
        genre: null
      }
    },
    methods: {
      saveBook () {
        db.collection('books').add({
          name: this.name,
          author: this.author,
          description: this.description,
          rating: this.rating,
          cover: this.cover,
          genre: this.genre
        })
        .then(docRef => this.$router.push('/'))
        .catch(error => console.log(err))

      }
    }
  }
</script>
