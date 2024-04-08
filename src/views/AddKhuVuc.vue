<template>
    <div class="page">
      <h4>Thêm Khu Vực</h4>
      <KhuVucForm :KhuVuc="KhuVuc" @submit:khuvuc="addKhuVuc" />
    </div>
    {{ message }}
  </template>
  
  <script>
  import KhuVucForm from "@/components/KhuVucForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      KhuVucForm,
    },
    data() {
      return {
        KhuVuc: {},
        message: "",
      };
    },
    methods: {
      async addKhuVuc(data) {
        try {
          await AdminService.createKhuVuc(data);
          this.message = "Khu Vực đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm Khu Vực."; // User-friendly error message
        }
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  