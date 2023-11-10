<template>
    <div class="login">
        <div class="login__content">
            <div class="login__image">
                <img src="@/assets/main/logo.svg">
            </div>
            <p class="login__title">Вход</p>
            <form class="login__form" @submit.prevent>
                <div class="login__block">
                    <input class="login__input" type="text" placeholder="Логин" v-model="loginModel">
                </div>
                <div class="login__block">
                    <input class="login__input" type="password" placeholder="Пароль" v-model="passwordModel">
                </div>
                <button class="login__btn" @click="setLogin">Войти</button>
                <p class="login__text">Нет аккаунта? <span class="login__span" @click="$router.push('/registration')">Зарегестрироваться</span></p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginModel:'',
            passwordModel:''
        }
    },
    methods:{
        async setLogin() {
        try {
            const response = await axios.post(this.$store.state.urlPage + 'api/user/auth', {
                    login:this.loginModel,
                    password:this.passwordModel,
                })
            if(await response) {
                localStorage.setItem('token',response.data)
                location.reload();
            }
        }
        catch(e) {
            if(!e.response) {
                alert('Сервер не запущен')
                return
            }
            alert(e.response.data.message)
            return;
        }
    }
    }
}
</script>

<style scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
}
.login__content {
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:450px;
}
.login__title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 24px;
    color:white;
}
.login__image {
    margin-bottom: 55px;
}
.login__form {
    width: 100%;
}
.login__input {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    padding: 20px 20px;
    color: rgba(0, 0, 0, 0.60);
    font-size: 15px;
    outline: none;
    background: #FFF;
}
.login__btn {
    width: 100%;
    border-radius: 10px;
    padding: 18px 0;
    border:none;
    outline: none;
    background: #009C64;
    color: #FFF;
    font-size: 15px;
    margin-bottom: 30px;
    transition: all 0.3s ease;
    cursor: pointer;
}
.login__btn:hover {
    color: #009C64;
    background: white;
}
.login__text {
    text-align: center;
    color: #FFF;
    font-size: 15px;
}
.login__span {
    text-decoration: underline;
    cursor: pointer;
}
</style>