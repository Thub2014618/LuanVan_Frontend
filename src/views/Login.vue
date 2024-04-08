<template>
    <h1>Đăng nhập admin</h1>
    <div class="container">
        <LoginForm
        @submit:login="loginAdmin"
        />
    </div>
    <div class="text-center" v-if = message >Thông báo cho biết: {{ this.message }}</div>
</template>

<script>
    import adminService from "@/services/admin.service";
    import LoginForm from "@/components/LoginForm.vue";
    export default {
        components: {
            LoginForm,    
        },
        data() {
            return {
                message: "",
            };
        },
          methods: {
            async loginAdmin(data) {
                try {
                    const login = await adminService.loginAdmin(data); 
                    console.log("aa")

                    console.log("h",login)

                    if (login) {
                        // sessionStorage.setItem('username', login.user.username);
                        this.message = "Thành công";
                        this.$router.push({ name: "adminpage", query: { message: this.message } });                
                    }
                    else{
                        this.message = "thất bại"
                    }
                } catch (error) {
                    console.log(error);
                    this.message = "Có lỗi xảy ra"
                }
            },
        },
        mounted() {
        },
    };
</script>