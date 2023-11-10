<template>
  <div class="main">
    <div class="main__content">
        <div class="main__about">
            <div class="main__logo">
                <img src="@/assets/main/logo.svg">
            </div>
            <div class="main__user">
                <div class="main__user_logo">
                    <img :src="$store.state.userImageSrc">
                </div>
                <div class="main__user_about">
                    <p class="main__user_name">@{{ $store.state.userName }}</p>
                    <button class="main__user_btn" @click="setClear">Выйти из аккаунта</button>
                </div>
            </div>
        </div>
        <div class="main__menu">
            <main-logic></main-logic>
        </div>
    </div>
  </div>
</template>

<script>
import MainLogic from './MainLogic.vue'
export default {
    methods:{
        setClear() {
            localStorage.clear()
            location.reload()
        }
    },
  components: { MainLogic },

}
</script>

<style scoped>
.main {
    margin:0 auto;
    max-width: 1100px;
    width:100%
}
.main__content {
    padding: 60px 0;
    display: flex;
    align-items: flex-start;
}
.main__logo {
    margin-bottom: 40px;
}
.main__user {
    display: flex;
    align-items: flex-start;
}
.main__user_about {
    margin-left: 20px;
}
.main__user_name {
    color: #FFF;
    font-size: 15px;
    margin-bottom: 15px;
    line-height: normal;
}
.main__user_logo img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.main__user_btn {
    padding: 12px 35px;
    color: #FFF;
    font-size: 14px;
    border-radius: 10px;
    background: #009C64;
    border-radius: 10px;
    border:none;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
}
.main__user_btn:hover {
    background: #fff;
    color:#009C64;
}
.main__menu{
    width: 700px;
    margin-left: 80px;
}
</style>