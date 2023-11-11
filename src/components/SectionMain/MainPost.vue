<template>
  <div class="post">
    <div class="post__content">
        <div class="post__header">
            <div class="post__logo">
                <div class="post__img">
                    <img :src="item.createuserimagesrc">
                </div>
                <p class="post__name">@{{ item.createuser }}</p>
            </div>
            <div class="post__actions" v-if="item.createuser === $store.state.userName">
                <div class="post__actions_image" @click="isActions = !isActions" onmousedown="return false" onselectstart="return false">
                    <img src="@/assets/main/dop.svg">
                </div>
                <div class="post__actions_inner" v-if="isActions">
                    <p class="post__actions_text" @click="isInputInn = !isInputInn, isActions = !isActions">Редактировать</p>
                    <p class="post__actions_del" @click="deletePost">Удалить</p>
                </div>
            </div>
        </div>
        <p class="post__des" v-if="!isInputInn">{{ !itemContent ? item.content : itemContent }}</p>
        <form class="post__form" @submit.prevent="editText" v-else>
            <input class="post__input" type="text" v-model="contentModel"> 
        </form>
        <div class="post__back" :class="{ifImage : item.imagesrc }">
            <img :src="item.imagesrc">
        </div>
        <div class="post__actives">
            <div class="post__likes" @click="setLike" v-if="arrLikes">
                <div class="post__icon post__icon1">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path :class="{activeLike : isMyLike}" d="M10.05 18.6366H9.99521C9.77045 18.6223 9.45904 18.5393 9.06686 18.3643C8.65157 18.1791 8.17606 17.9045 7.66344 17.5484C6.63839 16.8363 5.49437 15.8188 4.4249 14.6022C2.27185 12.1531 0.5 8.98988 0.5 5.97861C0.5 3.16058 2.83037 0.724609 5.403 0.724609C7.44502 0.724609 8.85469 2.13548 9.64122 3.24395L10.0491 3.81884L10.4569 3.24382C11.2415 2.1373 12.6511 0.724609 14.694 0.724609C17.2686 0.724609 19.598 3.16053 19.598 5.97961C19.598 8.98982 17.826 12.1525 15.6726 14.6013C14.6031 15.8177 13.4589 16.835 12.4338 17.5469C11.9211 17.903 11.4456 18.1775 11.0303 18.3626C10.6106 18.5497 10.2834 18.6316 10.056 18.6366H10.05Z" stroke="white"/>
                    </svg>
                </div>
                <p class="post__text">{{ this.arrLikes.length }}</p>
            </div>
            <div class="post__comm" @click="setActiveComm" v-if="arrComm">
                <div class="post__icon post__icon2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.95 0.00999999L7.802 0H7.8C3.426 0 0 3.427 0 7.80201C0 11.9 3.186 15.008 7.465 15.172V19C7.465 19.108 7.509 19.286 7.585 19.403C7.727 19.628 7.96899 19.75 8.21699 19.75C8.35499 19.75 8.49399 19.712 8.61899 19.632C8.88299 19.464 15.092 15.492 16.707 14.126C18.609 12.516 19.747 10.156 19.75 7.81401V7.79701C19.744 3.43 16.32 0.00999982 11.95 0.00899982V0.00999999ZM15.737 12.982C14.603 13.942 10.875 16.387 8.96499 17.625V14.438C8.96499 14.024 8.62999 13.688 8.21499 13.688H7.819C4.159 13.688 1.501 11.212 1.501 7.80201C1.501 4.268 4.269 1.5 7.801 1.5L11.948 1.51H11.95C15.482 1.51 18.25 4.276 18.252 7.80601C18.249 9.71601 17.31 11.65 15.738 12.982H15.737Z" fill="white"/>
                    </svg>
                </div>
                <p class="post__text">{{ this.arrComm.length }}</p>
            </div>
        </div>
    </div>
    <div class="post__inner" ref="postInner" v-if="arrComm">
        <div class="post__inner_comm"
        v-for="list in arrComm"
        :key="list.id"
        >
            <div class="post__inner_icon">
                <img :src="list.userimagesrc">
            </div>
            <div class="post__inner_block">
                <p class="post__inner_name">@{{ list.username }}</p>
                <p class="post__inner_des">{{ list.comment_text }}</p>
            </div>
        </div>
        <div class="post__inner_card">
            <form @submit.prevent="createComm">
                <input class="post__inner_input" type="text" placeholder="Введите свой комментарий" v-model="commentModel">
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        item:{
            type:Object
        }
    },
    data() {
        return {
            isInner:false,
            isActions:false,
            commentModel:'',
            arrComm:null,
            arrLikes:null,
            isMyLike:false,
            isInputInn:false,
            itemContent:null,
            contentModel:this.item.content
        }
    },
    methods:{
        setActiveComm() {
            if(!this.isInner) {
                this.$refs.postInner.style.height = 'auto'
                this.$refs.postInner.style.overflow = 'auto'
                this.$refs.postInner.style.borderTop = '1px solid #00432B'
                this.$refs.postInner.style.padding = '40px'
                this.isInner = true
            }
            else {
                this.$refs.postInner.style.height = '0'
                this.$refs.postInner.style.overflow = 'none'
                this.$refs.postInner.style.borderTop = '0px solid #00432B'
                this.$refs.postInner.style.padding = '0px'
                this.isInner = false
            }
        },
        async createComm() {
            try {
                if(this.commentModel.length <= 5) {
                    alert('Размер комментария должен быть больше 5 символов')
                    return;
                }
                const response = await axios.post(this.$store.state.urlPage + 'api/comments/create',{
                    username:this.$store.state.userName,
                    userImageSrc:this.$store.state.userImageSrc,
                    uuid_comments:this.item.uuid_posts,
                    comment_text:this.commentModel
                })
                if(await response) {
                    this.arrComm.push({
                        username:this.$store.state.userName,
                        userimagesrc:this.$store.state.userImageSrc,
                        uuid_comments:this.item.uuid_posts,
                        comment_text:this.commentModel
                    })
                    this.commentModel = ''
                    alert('Вы успешно разместили комментарий')
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
        async setLike() {
            const response = await axios.post(this.$store.state.urlPage + 'api/likes/create',{
                uuid_like: this.item.uuid_posts,
                likesname: this.$store.state.userName,
            })
            if(await response) {
                this.arrLikes = response.data.rows
                this.checkMyLike()
            }
        },
        checkMyLike() {
            const res = this.arrLikes.filter(el => el.likesname === this.$store.state.userName )
            if(res.length === 0) {
                this.isMyLike = false
            }
            else {
                this.isMyLike = true
            }
        },
        async editText() {
            const response = await axios.put( this.$store.state.urlPage + 'api/posts/edit',{
                uuid_post:this.item.uuid_posts,
                content: this.contentModel
            })
            if(await response) {
                this.itemContent = response.data.rows[0].content
                this.contentModel = response.data.rows[0].content
                this.isInputInn = false
            }
        },
        async deletePost() {
            const response = await axios.post( this.$store.state.urlPage + 'api/posts/delete',{
                uuid_post:this.item.uuid_posts
            })
            if(await response) {
                this.$emit('delPost',this.item.uuid_posts)
                this.isActions = false
            }
        }
    },
    async mounted() {
        try {
            const resC = await axios.post( this.$store.state.urlPage + 'api/comments/list',{
                uuid_comments:this.item.uuid_posts
            })
            this.arrComm = await resC.data.rows
            
            const resL = await axios.post( this.$store.state.urlPage + 'api/likes/list',{
                uuid_likes:this.item.uuid_posts
            })
            this.arrLikes = await resL.data.rows
            this.checkMyLike()
        }
        catch {
            
        }
    }
}
</script>

<style scoped>
.post {
    border-radius: 10px;
    border: 1px solid #00432B;
    background: #222;
    width: 100%;
    margin-bottom: 15px;
}
.post__content {
    padding: 25px 35px;
}
.post__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 15px;
}
.post__logo {
    display: flex;
    align-items: center;
}
.post__actions {
    position: relative;
    cursor: pointer;
}
.post__actions_inner {
    position: absolute;
    z-index: 3;
    border-radius: 10px;
    border: 1px solid #009C64;
    background: #292929;
    top: 200%;
    right: 0%;
}
.post__actions_text{
    color: #FFF;
    font-size: 15px;
    padding:20px 20px 0 20px;
    transition: all 0.3s ease;
    cursor: pointer;
}
.post__actions_text:hover {
    color:#009C64;
}
.post__actions_del {
    color: #FFF;
    font-size: 15px;
    padding: 20px 20px 20px 20px;
    transition: all 0.3s ease;
    cursor: pointer;
}
.post__actions_del:hover {
    color:#009C64;
}
.post__img {
    display: flex;
    align-items: center;
}
.post__img img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.post__name {
    color: #009C64;
    font-size: 15px;
    margin-left: 15px;
}
.post__des {
    color: #929292;
    font-size: 15px;
    margin-bottom: 15px;
}
.post__back {
    margin-bottom: 10px;
}
.ifImage{
    margin-bottom: 40px;
}
.post__back img {
    border-radius: 10px;
    max-width: 100%;
}
.post__actives {
    display: flex;
    align-items: center;
}
.post__likes {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.post__icon {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}
.post__icon1 svg {
    transition: all 0.3s ease;
}
.post__likes:hover .post__icon1 svg path {
    stroke: red;
}
.activeLike {
    stroke: red;
}
.post__text {
    color: #FFF;
    font-size: 16px;
    margin-left: 10px;
}
.post__inner_icon img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
.post__comm {
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
}
.post__comm:hover .post__icon2 svg path {
    fill: white;
    stroke: white;
}
.post__inner {
    height: 0;
    overflow: hidden;
}
.post__inner_comm {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
}
.post__inner_block {
    margin-left: 10px;
}
.post__inner_name {
    color: #009C64;
    font-size: 15px;
    margin-bottom: 5px;
}
.post__inner_des {
    color: #929292;
    font-size: 15px;
}
.post__inner_card {
    margin-top: 40px;
}
.post__inner_create {
    color:white;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
}
.post__inner_create:hover {
    color: #009C64;
}
.post__inner_input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    outline: none;
    border:none;
    border-radius: 5px;
}
.post__input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    outline: none;
    border:none;
    border-radius: 5px;
    margin-bottom: 15px;
    background: #141414;
    color:white;
}
</style>