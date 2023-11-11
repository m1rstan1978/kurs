<template>
    <div class="chats__menu">
        <div class="chats__menu_content" v-if="activeIdx !== null">
            <div class="chats__menu_items" ref="messagesContainer">
                <div class="chats__menu_item"
                v-for="item in arrMessages"
                :key="item.id"
                >
                    <div class="chats__menu_user">
                        <img :src="item.writeimagesrc">
                    </div>
                    <div class="chats__menu_about">
                        <p class="chats__menu_info">{{ item.writemessage }} <span class="chats__menu_span">{{ item.dateandtime }}</span></p>
                        <p class="chats__menu_des">{{ item.content }}</p>
                    </div>
                </div>
            </div>
            <div clss="chats__menu_send">
                <form class="chats__menu_form" @submit.prevent="addMessage">
                    <input class="chats__menu_input" type="text" placeholder="Введите сообщение" v-model="contentModel">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { io } from 'socket.io-client'

export default {
    props:{
        uuid:{},
        activeIdx:{
            type:Number
        }
    },
    data() {
        return {
            arrMessages:null,
            contentModel:'',
            dataTime:null,
            socket:io(this.$store.state.urlPage),
        }
    },
    methods:{
        async addMessage() {
            if(this.contentModel.length <= 0) {
                alert('В вашем сообщении должно быть больше 1 символа')
                return;
            }
            const response = await axios.post(this.$store.state.urlPage + 'api/messages/create',{
                uuid_messages:this.uuid,
                content:this.contentModel,
                writemessage:this.$store.state.userName,
                writeimagesrc:this.$store.state.userImageSrc
            })
            if(await response) {
                this.socket.emit('message',this.uuid)
                this.socket.on('allMessages',msg => {
                    this.arrMessages = msg
                    this.$nextTick(() => {
                    const container = this.$refs.messagesContainer;
                    container.scrollTop = container.scrollHeight;
                });
                })
                console.log(this.arrMessages)
                this.contentModel = ''
            }
        }
    },
    watch:{
        async uuid(val) {
            const response = await axios.post(this.$store.state.urlPage + 'api/messages/all',{
                uuid_messages:val
            })
            this.arrMessages = response.data.rows
            this.$nextTick(() => {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
        });
        }
    },
    mounted() {
        this.socket.emit('message',this.uuid)
        this.socket.on('allMessages',msg => {
            this.arrMessages = msg
        })
    }
    }
</script>

<style scoped>
.chats__menu {
    width: 800px;
    height: 744px;
    border-radius: 10px;
    border: 1px solid #00432B;
    background: #222;
}
.chats__menu_content {
    padding: 40px 60px;
}
.chats__menu_items{
    height: 620px;
    margin-bottom: 20px;
    overflow: auto;
}
.chats__menu_item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
}
.chats__menu_user {
    display: flex;
}
.chats__menu_user img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
}
.chats__menu_about {
    margin-left: 20px;
}
.chats__menu_info {
    color: #009C64;
    font-size: 18px;
    margin-bottom: 5px;
}
.chats__menu_span {
    color:#7D7D7D;
    font-size: 15px;
}
.chats__menu_des {
    color: #FFF;
    font-size: 15px;
    max-width: 500px;
}
.chats__menu_input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.20);
    background: #222;
    outline: none;
    color: rgba(255, 255, 255, 0.60);
    font-size: 16px;
    padding: 10px 20px;
}
</style>