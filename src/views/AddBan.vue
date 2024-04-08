<template>
    <div class="page">
      <h4>Thêm Bàn</h4>
      <BanForm :Ban="Ban" @submit:ban="addBan" />
    </div>
    {{ message }}
  </template>
  
  <script>
  import BanForm from "@/components/BanForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      BanForm,
    },
    data() {
      return {
        Ban: {},
        // MAKV: {},
        message: "",
      };
    },
    methods: {
      async addBan(data) {
        try {
          await AdminService.createBan(data);
          this.message = "Bàn đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm bàn."; // User-friendly error message
        }
      },
      // async getMAKV() {
      //   try {
      //       this.MAKV = await AdminService.getKhuVuc();
      //     this.message = "Bàn đã được thêm thành công!";
      //   } catch (error) {
      //     console.error(error);
      //     this.message = "Đã xảy ra lỗi khi thêm bàn."; 
      //   }
      // }
    },
    created() {
        // this.getMAKV();
        this.message = "";
    },
  };
  </script>
  