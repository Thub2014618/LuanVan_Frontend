<template>
    <div class="page">
      <h4>Thêm Danh Mục</h4>
      <DanhMucForm :DanhMuc="DanhMuc"
       @submit:danhmuc="addDanhMuc" />
    </div>
    {{ message }}
  </template>
  
  <script>
  import DanhMucForm from "@/components/DanhMucForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      DanhMucForm,
    },
    data() {
      return {
        DanhMuc: {},
        message: "",
      };
    },
    methods: {
      async addDanhMuc(data) {
        try {
          await AdminService.createDanhMuc(data);
          this.message = "Danh mục đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm danh mục."; // User-friendly error message
        }
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  