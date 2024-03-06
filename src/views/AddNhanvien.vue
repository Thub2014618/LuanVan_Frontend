<template>
    <div class="page">
      <h4>Thêm nhân viên</h4>
      <NhanVienForm :NhanVien="NhanVien" @submit:nhanvien="addNhanVien" />
    </div>
    {{ message }}
  </template>

  <script>
  import NhanVienForm from "@/components/NhanVienForm.vue";
  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      NhanVienForm,
    },
    data() {
      return {
        NhanVien: {},
        message: "",
      };
    },
    methods: {
      async addNhanVien(data) {
        try {
          await AdminService.createNhanVien(data);
          this.message = "Nhân viên đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm nhân viên.";
        }
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  