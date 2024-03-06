<template>
    <div class="page">
      <h4>Thêm nhân viên</h4>
      <NhanVienForm :NhanVien="NhanVien" @submit:nhanvien="editNhanVien" />
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
    props: {
      id: { type: String, required: true }
    },
    data() {
      return {
        NhanVien: {},
        message: "",
      };
    },
    methods: {
      async editNhanVien(data) {
        try {
          await AdminService.updateNhanVien(this.id, data);
          this.message = "Nhân viên đã được sửa thành công!";
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
  