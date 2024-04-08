<template>
  <div class="page">
    <h4>Sửa danh mục</h4>
    <DanhMucForm :DanhMuc="DanhMuc" 
    @submit:danhmuc="editDanhMuc"/>
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
  props: {
  id: { type: String, required: true },
  },

  data() {
    return {
      DanhMuc: {},
      message: "",
    };
  },
  methods: {
    async editDanhMuc(data) {
      try {
        await AdminService.updateDanhMuc(this.id, data);
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
