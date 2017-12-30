<template>
  <div id="view-book">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">
        <img class="book-cover responsive-img" v-bind:src="cover" alt="book cover">
      </li>
      <li class="collection-item">
        <i class="fa fa-star" v-for="star in stars" aria-hidden="true"></i><i class="fa fa-star-o" v-for="star in lightStars" aria-hidden="true"></i>
      </li>
      <li class="collection-item">{{ genre }}</li>
      <li class="collection-item">{{ author }}</li>
      <li class="collection-item">{{ description }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteBook" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'edit-book', params: {book_id: id}}" class="btn-floating btn-large">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'view-book',
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
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        var _this = this
        db.collection('books').doc(this.$route.params.book_id).get().then(function (doc) {
          if (doc.exists) {
            _this.id = doc.id,
            _this.name = doc.data().name,
            _this.author = doc.data().author,
            _this.description = doc.data().description,
            _this.rating =  doc.data().rating,
            _this.cover = doc.data().cover
            _this.genre = doc.data().genre
          } else {
            console.log('Book not found')
            _this.$router.push('/')
          }
        });
      },
      deleteBook () {
        var _this = this;
        if (confirm('Are you sure?')) {
          db.collection('books').doc(this.$route.params.book_id).get().then(function (doc) {
            if (doc.exists) {
              doc.ref.delete();
              _this.$router.push('/')
            } else {
              console.log('Book not found')
              _this.$router.push('/')
            }
          });
        }
      }
    },
    computed: {
      stars: function() {
        var list = []
        for (var i = 0; i < this.rating; i++) {
          list.push(1)
        }
        return list
      },
      lightStars: function() {
        var list = []
        for (var i = 0; i < 5 - this.rating; i++) {
          list.push(1)
        }
        return list
      }
    }
  }
</script>

<style scoped>
  .book-cover {
    display: block;
    margin: 0 auto;
  }
</style>
