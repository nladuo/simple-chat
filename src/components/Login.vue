<template>
    <center>
        <div class="form-horizontal" role="form" style="max-width: 606px;">
            <div class="form-group">
                <h4>输入你的用户名</h4>
                <input v-model="username" type="text" class="form-control">
            </div>
            <div class="form-group">
                <h4>选择头像</h4>
                <div id="avatar-list">
                    <div id="avatar" v-for="url in urls">
                        <img :class="{ 'active-item': avatar == $index, 'inactive-item': avatar != $index}"
                             :src="url" @click="selectAvatar($index)" style="width: 96px; height: 96px;">
                    </div>
                </div>
            </div>
            <center>
                <button v-if="avatar == -1 || username == '' " disabled="disabled"
                        class="btn btn-bg btn-primary">进入聊天室</button>
                <button v-else @click="joinChat" class="btn btn-bg btn-primary">进入聊天室</button>
            </center>
        </div>
    </center>
</template>
<style scoped>
    #avatar-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    #avatar {
        flex:1;
    }

    .inactive-item {
        border: 4px solid transparent;
    }
    .active-item {
        border: 4px solid #ea4335;
    }

</style>

<script>
    import { avatars } from '../const/avatars'
    import { state } from '../store/state'
    export default {
        data() {
            return {
                urls: avatars,
                username: '',
                avatar: -1
            }
        },
        methods: {
            selectAvatar(index) {
                this.avatar = index
            },
            joinChat() {
                state.avatar = this.avatar;
                state.username = this.username;
                state.isLogin = true;
                this.$route.router.go('/chat')
            }
        }
    }
</script>