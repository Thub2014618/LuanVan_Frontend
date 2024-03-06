<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">WEB Bán Vé</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link :to="{
                            name: 'Home',
                        }">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div v-if="username">
                <div class="btn btn-defauld"><i>{{ username }}</i></div>
               
                <button @click="$router.push({ name: 'Order.ticket' })">
                    <i class="fa fa-list" style="color: black"></i>
                </button>
                <a href="" @click="logout">logout</a>
                
                
            </div>
            <div v-else  class="navbar" style="float: left;">
                <a class="nav-link" href="/register">Đăng ký</a>
                <a class="nav-link" href="/user/login">Đăng nhập</a>
            </div>
            
        </div>
    </nav>
</template>


<script>
    export default {
    data(){
        return{
            username : sessionStorage.getItem("username"),
            user_id : sessionStorage.getItem("user_id"),
        }
    },

    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        logout(){
            sessionStorage.clear();
        },
        submit() {
            this.$emit("submit");
        },

    },
};
</script>