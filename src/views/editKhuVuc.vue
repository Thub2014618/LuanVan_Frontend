<template>
    <div class="page">
      <h4>Sửa Khu Vực</h4>
      <KhuVucForm :KhuVuc="KhuVuc" @submit:khuvuc="editKhuVuc" />
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
    props: {
      id: { type: String, required: true },
    },
    data() {
      return {
        KhuVuc: {},
        message: "",
      };
    },
    methods: {
      async editKhuVuc(data) {
        try {
          await AdminService.updateKhuVuc(this.id, data);
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
  