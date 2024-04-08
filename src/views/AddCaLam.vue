<template>
    <div class="page">
      <h4>Thêm Ca Làm</h4>
      <CaLamForm :CaLam="CaLam" @submit:calam="addCaLam" />
    </div>
    {{ message }}
  </template>
  
  <script>
  import CaLamForm from "@/components/CaLamForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      CaLamForm,
    },
    data() {
      return {
        CaLam: {},
        message: "",
      };
    },
    methods: {
      async addCaLam(data) {
        try {
          await AdminService.createCaLam(data);
          this.message = "Ca làm đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm ca làm."; // User-friendly error message
        }
      }
    },
    created() {
      this.message = "";
    },
  };
  </script>
  