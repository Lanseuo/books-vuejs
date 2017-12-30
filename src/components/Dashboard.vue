<template>
  <div id="dashbaord">
    <h3>Dashboard</h3>

    <ul class="collection with-header">
      <!-- <li class="collection-header"><h4>Books</h4></li> -->
      <li v-for="book in books" v-bind:key="book.id" class="collection-item">
        <div class="chip">{{ book.genre }}</div><strong>{{ book.author }}</strong> - {{ book.name }}
        <router-link v-bind:to="{name:'view-book', params: {book_id: book.id}}" class="secondary-content">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'dashboard',
    data() {
      return {
        books: []
      }
    },
    created() {
      db.collection('books').orderBy('name').get().then
      (querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'author': doc.data().author,
            'description': doc.data().description,
            'rating': doc.data().rating,
            'cover': doc.data().cover,
            'genre': doc.data().genre
          }
          this.books.push(data);
        })
      })
    }
  }
</script>
