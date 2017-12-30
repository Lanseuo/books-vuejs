<template>
  <div id="new-book">
    <h3 v-if="name">{{ name }}</h3>
    <div class="row">
      <form @submit.prevent="updateBook" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <!-- <label>Name</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="author" required>
            <!-- <label>Author</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="genre" required>
            <!-- <label>Genre</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="description" required>
            <!-- <label>Description</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="cover" required>
            <!-- <label>Cover</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="number" v-model="rating" value="42" min="1" max="5" required="">
            <!-- <label>Rating</label> -->
          </div>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'edit-book',
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
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData () {
        var _this = this;
        db.collection('books').doc(this.$route.params.book_id).get().then(function (doc) {
          if (doc.exists) {
            _this.id = doc.id,
            _this.name = doc.data().name,
            _this.author = doc.data().author,
            _this.description = doc.data().description,
            _this.rating =  doc.data().rating,
            _this.cover = doc.data().cover
            _this.genre = doc.data().genre
          }
        });
      },
      updateBook () {
        var _this = this;
        db.collection('books').doc(this.$route.params.book_id).get().then(function (doc) {
          if (doc.exists) {
            doc.ref.update({
              name: _this.name,
              author: _this.author,
              description: _this.description,
              rating: _this.rating,
              cover: _this.cover,
              gerne: _this.genre
            })
            .then(() => {
              _this.$router.push({name: 'view-book', params: {book_id: _this.id}})
            })
          } else {
            console.log('Book not found')
            _this.$router.push('/')
          }
        });
      }
    }
  }
</script>
