<template>
    <div class="page">
      <h4>Thêm Danh Mục</h4>
      <CTHDForm :CTHD="CTHD"
       @submit:CTHD="addCTHD" />
    </div>
    {{ message }}
  </template>
  
  <script>
  import CTHDForm from "@/components/CTHDForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      CTHDForm,
    },
    data() {
      return {
        CTHD: {},
        message: "",
      };
    },
    methods: {
      async addCTHD(data) {
        try {
          await AdminService.createCTHD(data);
          this.message = "đã thêm sản phẩm vào hóa đơn!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm danh mục.";
        }
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  