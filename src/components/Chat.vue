<template>
    <div>
        <h4>你好, "{{ username }}"</h4>
        <div>
            <ul>
                <li v-for="message in messages">
                    <img class="avatar"  width="40" height="40" :alt="message.username" :src="avatars[message.avatar]">
                    <p class="name">{{message.username}}</p>
                </li>
            </ul>
        </div>


        <div id="input-area" class="input-group">
            <input v-model="msg" type="text" class="form-control" placeholder="请输入想要说的话"/>
            <div class="input-group-btn">
                <button @click="sendMsg" class=" btn btn-primary btn-block">发送</button>
            </div>
        </div>


    </div>
</template>

<style scoped>
    li {
        padding: 12px 15px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        transition: background-color .1s;
    }
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
</style>

<script>
    import { state } from '../store/state'
    import { avatars } from '../const/avatars'
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
        },
        methods: {
            sendMsg() {
                this.messages.push({
                    content: this.msg,
                    avatar: this.avatar,
                    username: this.username
                })
            }
        }

    }
</script>