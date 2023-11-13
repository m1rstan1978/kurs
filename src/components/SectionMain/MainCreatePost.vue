<template>
    <div class="create">
        <form class="create__form" @submit.prevent="createPost">
            <div class="create__block">
                <input class="create__input" type="text" placeholder="Что у вас нового?" v-model="newsModel">
                <img class="create__image" :src="this.$store.state.userImageSrc">
                <div class="create__file">
                    <input id="post__file" type="file" class="create__file_input" @change="onFileChange">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newsModel:'',
            fileImage:null,
        }
    },
    methods: {
        async createPost() {
        try {
            if(this.newsModel.length <= 10) {
                alert('В вашем посте символов в тексте должно быть больше 10')
                return;
            }
            if(!this.fileImage) {
                const response = await axios.post(this.$store.state.urlPage + 'api/posts/create',{
                content:this.newsModel,
                createUser:this.$store.state.userName,
                createUserImageSrc:this.$store.state.userImageSrc,
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            this.$emit('addPost')
            this.newsModel = ''
            alert('Пост успешно создан')
            return;
            }
            const response = await axios.post(this.$store.state.urlPage + 'api/posts/create',{
                content:this.newsModel,
                createUser:this.$store.state.userName,
                createUserImageSrc:this.$store.state.userImageSrc,
                photo:this.fileImage
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            this.$emit('addPost', await response.data)
            const fileInput = document.getElementById('post__file');
            fileInput.value = null;
            this.fileImage = null
            this.newsModel = ''
            alert('Пост успешно создан')
            return
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
            const fileInput = document.getElementById('post__file');
            fileInput.value = null;
            this.fileImage = null
            alert('Вы выбрали неверный формат изображения, форматы которые допускаются: JPEG, PNG, WEBP')
            return;
        },
    }
}
</script>

<style scoped>
.create__block {
    position: relative;
    margin-bottom: 15px;
}
.create__input {
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
.create__image {
    position: absolute;
    top: 25%;
    left: 4%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.create__file_input {
    position: absolute;
    right: 0;
    color:white;
    top: 35%;
}
</style>