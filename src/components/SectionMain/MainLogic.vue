<template>
    <div class="logic">
        <main-create-post
        @addPost="addNewPost"
        ></main-create-post>
        <main-search-post
        @search="getPosts"
        ></main-search-post>
        <div class="logic__posts" v-if="arrPosts">
          <main-post
          v-for="item in arrPosts"
          :key="item.id"
          :item="item"
          @delPost="deletePost"
          ></main-post>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MainCreatePost from './MainCreatePost.vue'
import MainPost from './MainPost.vue';
import MainSearchPost from './MainSearchPost.vue';
import io from 'socket.io-client';

export default {
  data() {
    return {
      arrPosts:null,
      socket:io(this.$store.state.urlPage)
    }
  },
  methods:{
    deletePost(post) {
      const idx = this.arrPosts.findIndex(item => item.uuid_posts === post)
      this.arrPosts.splice(idx, 1)
    },
    addNewPost() {
      this.socket.emit('createPost')
      this.socket.on('getAllPosts',(msg) => {
        this.arrPosts = msg
      })
    },
    getPosts(arr) {
      this.arrPosts = arr
    }
  },
  async mounted() {
    const response = await axios.get(this.$store.state.urlPage + 'api/posts/list')
    this.arrPosts = await response.data
  },
  components: { MainCreatePost, MainSearchPost, MainPost },

}
</script>

<style scoped>                            

</style>