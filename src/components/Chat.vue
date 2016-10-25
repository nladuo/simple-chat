<template>
    <div id="chat">
        <h4 class="head">你好: "{{ username }}"</h4>
        <div id="items">
            <div v-for="message in messages">
                <div v-if="!message.isMyself" class="left">
                    <div style="float: left">
                        <img class="avatar" :src="avatars[message.avatar]">
                        <p class="name">{{ message.username }}</p>
                    </div>
                    <p class="mess">{{ message.content }}</p>
                </div>
                <div v-else class="right">
                    <div style="float: right">
                        <img class="avatar" :src="avatars[message.avatar]">
                        <p class="name">{{ message.username }}</p>
                    </div>
                    <p class="mess">{{ message.content }}</p>
                </div>

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
    let socket = io();
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

            let that = this;
            socket.on('chat message', function(msg){
                let message = JSON.parse(msg);
                //判断消息是不是自己发送的
                message.isMyself = that.avatar == message.avatar && that.username == message.username;
                that.messages.push(message);
                //滑动到底部
                setTimeout(() => {
                    $("#items").scrollTop($("#items")[0].scrollHeight)
                }, 10);
            });
        },
        methods: {
            sendMsg() {
                let message = {
                    content: this.msg,
                    avatar: this.avatar,
                    username: this.username
                };

                socket.emit('chat message', JSON.stringify(message));
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
    #items .left{
        text-align: left;
    }
    #items .left img{
        float: left;
        margin-left: 10px;
        vertical-align: middle;
    }
    #items .left .mess{
        float: left;
        padding: 10px 4px;
        margin-left: 20px;
        background: #dedede;
        border-radius: 10px;
        max-width: 240px;
        word-break: break-all;
    }
    #items .left .name{
        text-align: center;
        width: 45px;
        margin-left: 10px;
    }


    #items .right{
        text-align: right;
    }
    #items .right img{
        float: right;
        margin-right: 10px;
        vertical-align: middle;
    }
    #items .right .mess{
        float: right;
        padding: 10px 4px;
        margin-right: 20px;
        background: #dedede;
        border-radius: 10px;
        max-width: 240px;
        word-break: break-all;
        text-align: left;
    }
    #items .right .name{
        width: 45px;
        text-align: center;
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