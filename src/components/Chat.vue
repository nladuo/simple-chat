<template>
    <div id="chat">
        <h4>你好, "{{ username }}"</h4>
        <div id="items">
            <div>
                <div v-for="message in messages">
                    <img class="avatar" width="40" height="40" :alt="message.username" :src="avatars[message.avatar]">
                    <p class="name">{{ message.content }}</p>
                    <p>{{message.username}}</p>
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

<style scoped>
    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
    }
    #chat{
        display: flex;
        flex-direction: column;


    }
    #items{
        display: block;
        height:400px;
        flex: 3;
        overflow: scroll;
        border-style: solid;
        border-color: rgba(200, 227, 233, 0.48);
    }
    
    #input-area {
        padding-top: 5px;
        flex:1;
    }

</style>

<script>
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
                that.messages.push(JSON.parse(msg));
                setTimeout(function () {
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