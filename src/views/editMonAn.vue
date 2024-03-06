<template>
  <div class="page">
    <h4>Sửa Món ăn</h4>
    <MonAnForm :Monan="Monan" 
    @submit:monan="editMonAn"/>
  </div>
  {{ message }}
</template>

<script>
import MonAnForm from "@/components/MonAn.Form.vue";
import AdminService from "@/services/admin.service";

export default {
  components: {
    MonAnForm,
  },
  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      Monan: {},
      message: "",
    };
  },
  methods: {
    async editMonAn(data) {
      try {
        await AdminService.updateMonAn(this.id, data);
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
