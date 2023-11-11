<template>
    <div class="chats" v-if="arrItems">
        <div class="chats__header">
            <div class="chats__about">
                <div class="chats__logo">
                    <img src="@/assets/main/logo.svg">
                </div>
                <div class="chats__user">
                    <div class="chats__icon">
                        <img :src="$store.state.userImageSrc">
                    </div>
                    <div class="chats__leave">
                        <button class="chats__btn" @click="$router.push('/')">Вернуться на главную</button>
                    </div>
                </div>
            </div>
            <div class="chats__invite">
                <form class="chats__form" @submit.prevent="inviteFriend">
                    <input class="chats__input" type="text" placeholder="Введите логин" v-model="inviteModel">
                </form>
                <div class="chats__create">
                    <button class="chats__btn" @click="inviteFriend">Создать чат</button>
                </div>
            </div>
        </div>
        <h1 class="chats__h1" v-if="arrItems.length <= 0">У вас нет созданных чатов, пригласите друга</h1>
        <div class="chats__content" v-else>
            <div class="item">
                <chats-item
                v-for="(item, idx) in arrItems"
                :key="item.id"
                :item="item"
                :idx="idx"
                :activeIdxProps="activeIdx"
                :class="{activeItemChat : activeIdx === idx}"
                @setUuid="setUuidMessage"
                ></chats-item>
            </div>
            <div class="chat">
                <chats-chat
                :uuid="uuidMessages"
                :activeIdx="activeIdx"
                ></chats-chat>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ChatsChat from './ChatsChat.vue'
import ChatsItem from './ChatsItem.vue'

export default {
    data() {
        return {
            arrItems:null,
            arrChats:null,
            uuidMessages:null,
            inviteModel:'',
            activeIdx:null
        }
    },
    methods:{
        setUuidMessage(obj, idx) {
            this.uuidMessages = obj
            this.activeIdx = idx
        },
        async inviteFriend() {
            try {
                const response = await axios.post(this.$store.state.urlPage + 'api/messages/invite',{
                    inviteUsername:this.inviteModel,
                    senderName:this.$store.state.userName
                })
                if(await response) {
                    this.arrItems.push({
                        imagesrc:response.data[0].receiver_imagesrc,
                        name:response.data[0].receiver_name,
                        uuid_messages:response.data[0].uuid_messages
                    })
                    this.inviteModel = ''
                    alert('Вы успешно пригласили друга :)')
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
    },
    async mounted(){
        try {
            const oldRes = await axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                } 
            })
            if(oldRes) {
                const response = await axios.post(this.$store.state.urlPage + 'api/messages/list',{
                    name:this.$store.state.userName 
                })
                this.arrItems = response.data
            }
        }
        catch(e) {
        }

    },
    components: { ChatsItem, ChatsChat },

}
</script>

<style scoped>
.chats {
    max-width: 1200px;
    width: 100%;
    margin:0 auto;
}
.chats__h1 {
    color: white;
    text-align: center;
    margin:140px 0;
}
.chats__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
}
.chats__about {
    display: flex;
    align-items: center;
}
.chats__icon img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.chats__user {
    display: flex;
    align-items: center;
    margin-left: 40px;
}
.chats__btn{
    margin-left: 20px;
    border-radius: 10px;
    background: #009C64;
    padding: 12px 30px;
    color: #FFF;
    font-size: 15px;
    border:none;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
}
.chats__btn:hover {
    color:#009C64;
    background: white;
}
.chats__invite {
    display: flex;
    align-items: center;
}
.chats__input {
    color: rgba(255, 255, 255, 0.60);
    font-size: 15px;
    padding: 10px 20px;
    box-sizing: border-box;
    outline: none;
    width: 300px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: #222;
}
.activeItemChat{
    border:1px solid #009C64;
}
.chats__content {
    display: grid;
    grid-template-areas: 
    'item chat'
    ;
}
.item {
    grid-area: item;
}
.chat {
    grid-area: chat;
}
</style>