<template>
  <router-view/>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } 
      })
      .then( res => {
        this.$store.state.userName = res.data.rows[0].login
        this.$store.state.userImageSrc = res.data.rows[0].imagesrc
      })
      .catch( e => {
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
  margin:0;
  padding:0;
}
body {
  background: #141414;
}
</style>
