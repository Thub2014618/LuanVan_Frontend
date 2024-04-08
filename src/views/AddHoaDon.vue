<template>
  <div class="page">
    <h4>Tạo Hóa Đơn</h4>
    <HoaDonForm :HoaDon="HoaDon"
     @submit:hoadon="addHoaDon" />
  </div>
  {{ message }}
</template>

<script>
import HoaDonForm from "@/components/HoaDonForm.vue";
import AdminService from "@/services/admin.service";

export default {
  components: {
    HoaDonForm,
  },
  data() {
    return {
      HoaDon: {},
      message: "",
      // dt: {}
    };
  },
  methods: {
    async addHoaDon(data) {
        try {
          this.dt = await AdminService.createHoaDon(data);

          this.$router.push({ params: this.dt.HD_MA ,name: addCTHD});

          this.$router.push({ name: addCTHD});

          this.message = "Hóa đơn đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm hóa đơn.";
        }
      },
  },
  created() {
    this.message = "";
  },
};
</script>
