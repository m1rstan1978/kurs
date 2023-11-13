<template>
    <div class="reg">
        <div class="reg__content">
            <div class="reg__image">
                <img src="@/assets/main/logo.svg">
            </div>
            <p class="reg__title">Регистрация</p>
            <form class="reg__form" @submit.prevent>
                <div class="reg__block">
                    <input class="reg__input" type="text" placeholder="Логин" v-model="loginModel">
                </div>
                <div class="reg__block">
                    <input class="reg__input" type="password" placeholder="Пароль" v-model="passwordModel">
                </div>
                <div class="reg__block">
                    <input class="reg__input" type="password" placeholder="Подтверждение пароля" v-model="passwordRepModel">
                </div> 
                <input class="reg__file" id="reg__file" type="file" @change="onFileChange">
                <button class="reg__btn" @click="setRegistr">Зарегистрироваться</button>
                <p class="reg__text">Есть аккаунт? <span class="reg__span" @click="$router.push('/login')">Войти</span></p>
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
            passwordModel:'',
            passwordRepModel:'',
            fileImage:null,
        }
    },
    methods:{
        async setRegistr() {
            try {
                if(this.loginModel.length <= 0 || this.passwordModel.length <= 0 || this.passwordRepModel.length <= 0) {
                    alert('У вас есть пустые строки')
                    return
                }
                if(this.passwordModel !== this.passwordRepModel) {
                    alert('Пароли не совпадают')
                    return
                }
                if(!this.fileImage) {
                    alert('Вы не добавили картинку')
                    return
                }
                const response = await axios.post( this.$store.state.urlPage + 'api/user/registration', {
                    login:this.loginModel,
                    password:this.passwordModel,
                    photo: this.fileImage
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                if(await response) {
                    localStorage.setItem('token',response.data.token)
                    this.loginModel = ''
                    this.passwordModel = ''
                    this.passwordRepModel = ''
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

        },
        onFileChange(e) {
            const checkImage = e.target.files[0]
            const str = checkImage.type.toUpperCase()
            if(str.includes('JPEG') || str.includes('PNG') || str.includes('JPG') || str.includes('WEBP')) {
                this.fileImage = e.target.files[0]
                return;
            }
            const fileInput = document.getElementById('reg__file');
            fileInput.value = null;
            this.fileImage = null
            alert('Вы выбрали неверный формат изображения, форматы которые допускаются: JPEG, PNG, WEBP')
            return;
        },
    }
}
</script>

<style scoped>
.reg {
    display: flex;
    align-items: center;
    justify-content: center;
}
.reg__content {
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:450px;
}
.reg__title {
    text-align: center;
    margin-bottom: 40px;
    font-size: 24px;
    color:white;
}
.reg__image {
    margin-bottom: 55px;
}
.reg__form {
    width: 100%;
}
.reg__input {
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
.reg__btn {
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
.reg__btn:hover {
    color: #009C64;
    background: white;
}
.reg__text {
    text-align: center;
    color: #FFF;
    font-size: 15px;
}
.reg__span {
    text-decoration: underline;
    cursor: pointer;
}
.reg__file {
    color: white;
    margin-bottom: 25px;
}
</style>