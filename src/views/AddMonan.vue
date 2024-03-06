<template>
    <div class="page">
      <h4>Thêm Món Ăn</h4>
      <MonanForm :Monan="Monan" @submit:monan="addMonan" />
    </div>
    {{ message }}

  </template>
  
  <script>
  import MonanForm from "@/components/Monan.Form.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      MonanForm,
    },
    data() {
      return {
        Monan: {},
        message: "",
      };
    },
    methods: {
        async addMonan(data) {
        try {
          await AdminService.createMonAn(data);
          this.message = "Món ăn đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm món ăn."; // User-friendly error message
        }
      
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  