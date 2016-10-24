<template>
    <div id="chat">
        <h4 class="head">你好: "{{ username }}"</h4>
        <div id="items">
            <div v-for="message in messages">
                <div v-if="$index % 2 == 0" style="float: left">
                    <img class="avatar" :src="avatars[message.avatar]">
                    <p class="name">{{ message.username }}</p>
                </div>
                <div v-else style="float: right">
                    <img class="avatar" :src="avatars[message.avatar]">
                    <p class="name">{{ message.username }}</p>
                </div>
                <p class="mess">{{ message.content }}</p>
            </div>

        </div>

        <div id="input-area" class="input-group">
            <input id="inputBox" v-model="msg" type="text" class="form-control" placeholder="请输入想要说的话"/>
            <div id="inputButton" class="input-group-btn">
                <button @click="sendMsg" class=" btn btn-primary btn-block">发送</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { state } from '../store/state'
    import { avatars } from '../const/avatars'
//    let socket = io();
    export default {
        data() {
            return {
                avatars: avatars,
                username: state.username,
                avatar: state.avatar,
                msg: '',
                messages: []
            }
        },
        created() {
            if (!state.isLogin) {
                this.$route.router.go('/login')
            }

//            let that = this;
//            socket.on('chat message', function(msg){
//                let msg = JSON.parse(msg);
//                //判断消息是不是自己发送的
//                msg.isMyself = that.avatar == msg.avatar && that.username == msg.username;
//                that.messages.push(msg);
//                //滑动到底部
//                setTimeout(() => {
//                    $("#items").scrollTop($("#items")[0].scrollHeight)
//                }, 10);
//            });
        },
        methods: {
            sendMsg() {
                let message = {
                    content: this.msg,
                    avatar: this.avatar,
                    username: this.username
                };

//                socket.emit('chat message', JSON.stringify(message));

                this.messages.push(message);
                setTimeout(function () {
                    $("#items").scrollTop($("#items")[0].scrollHeight)
                }, 10);
            }

        }

    }
</script>


<style scoped>

    #chat{
        width: 70%;
        background: #f4f4f4;
        border-radius: 10px;
    }
    .head{
        background: #1b1b1b;
        color:#ffffff;
        text-align: center;
        padding: 6px 0;
        border-radius: 10px 10px 0 0;
    }

    #input-area {
        padding-top: 5px;
        flex:1;
    }

    #items{
        clear: both;
        height: 450px;
        position: relative;
        overflow: scroll;
    }
    #items>div{
        width: 100%;
        clear: both;
    }
    #items>div:nth-child(odd){
        text-align: left;
    }
    #items>div:nth-child(odd) img{
        float: left;
        margin-left: 10px;
        vertical-align: middle;
    }
    #items>div:nth-child(odd) .mess{
        float: left;
        padding: 10px 4px;
        margin-left: 20px;
        background: #dedede;
        border-radius: 10px;
        max-width: 240px;
        word-break: break-all;
    }
    #items>div:nth-child(odd) .name {
        margin-left: 10px;
        width: 45px;
        text-align: center;
        color: #8ab493;
    }


    #items>div:nth-child(even){
        text-align: right;
    }
    #items>div:nth-child(even) img{
        float: right;
        margin-right: 10px;
        vertical-align: middle;
    }
    #items>div:nth-child(even) .mess{
        float: right;
        padding: 10px 4px;
        margin-right: 20px;
        background: #dedede;
        border-radius: 10px;
        max-width: 240px;
        word-break: break-all;
        text-align: left;
    }
    #items>div:nth-child(even) .name{
        width: 45px;
        text-align: center;
        color: #8ab493;
    }

    .avatar{
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }
    #inputBox{
        width: 100%;
        resize: none;
        border-radius: 4px 4px 0 0;
    }

</style>