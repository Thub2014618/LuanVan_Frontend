<template>
    <div class="page">
      <h4>Sửa Bàn</h4>
      <BanForm :Ban="Ban" @submit:ban="editBan" />
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
    props: {
      id: { type: String, required: true },
    },
    data() {
      return {
        Ban: {},
        message: "",
      };
    },
    methods: {
      async editBan(data) {
        try {
          await AdminService.updateBan(this.id, data);
          this.message = "Thao tác thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi."; 
        }
      },
    },
    created() {
      this.message = "";
    },
  };
  </script>
  