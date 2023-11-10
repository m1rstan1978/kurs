<template>
    <div class="search">
        <form class="search__form" @submit.prevent="searchPosts">
            <div class="search__block">
                <input class="search__input" type="text" placeholder="Найти пост" v-model="contentModel">
                <img class="search__image" src="@/assets/main/lupa.svg">
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            contentModel:''
        }
    },
    methods: {
       async searchPosts() {
           const response = await axios.post( this.$store.state.urlPage + 'api/posts/search',{
            searchContent:this.contentModel
           })
           this.$emit('search',response.data.rows)
        }
    }
}
</script>

<style scoped>
.search__block {
    position: relative;
    margin-bottom: 15px;
}
.search__input {
    color: #FFF;
    font-size: 15px;
    padding: 24px 340px 24px 75px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #00432B;
    background: #222;
    outline: none;
    box-sizing: border-box;
}
.search__image {
    position: absolute;
    top: 30%;
    left: 4%;
}
</style>