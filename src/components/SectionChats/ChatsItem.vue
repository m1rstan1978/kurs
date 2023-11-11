<template>
  <div class="chats__item" @click="$emit('setUuid',item.uuid_messages, idx)" :class="{activeItemChat : idx === activeIdx}">
    <div class="chats__item_content">
        <div class="chats__item_header">
            <img :src="item.imagesrc">
        </div>
        <div class="chats__item_about">
            <p class="chats__item_name">{{ item.name }}</p>
            <p class="chats__item_des">{{ contentModel }}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        },
        idx:{
            type:Number
        },
        activeIdxProps: {
            type:Number
        }
    },
    data() {
        return {
            activeIdx:null,
            contentModel:'Открыть чат с пользователем'
        }
    },
    mounted() {
        if(this.activeIdxProps === this.idx) {
            this.contentModel = 'Чат с пользователем открыт'
        }
    },
    watch:{
        activeIdxProps(val) {
            if(val === this.idx) {
                this.contentModel = 'Чат с пользователем открыт'
            }
            else {
                this.contentModel = 'Открыть чат с пользователем'
            }
        }
    }
}
</script>

<style scoped>
.chats__item {
    border-radius: 10px;
    background: #222;
    margin-right: 40px;
    border:1px solid rgba(0,0,0,0);
    margin-bottom: 15px;
    transition: all 0.3s ease;
    cursor: pointer; 
}
.chats__item:hover {
    border:1px solid #009C64;
    transform: scale(1.01);
}
.chats__item_content {
    padding: 15px 30px;
    display: flex;
    align-items: center;
}
.chats__item_header img {
    display: flex;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.chats__item_about {
    margin-left: 20px;
}
.chats__item_name {
    color: #FFF;
    font-size: 17px;
    margin-bottom: 5px;
}
.chats__item_des {
    color: #FFF;
    font-size: 14px;
}
</style>