<template>
<div class="container row">
        <div class="danh-sach-mon-an">
            <table>
            <thead>
                <tr>
                <th>Tên món ăn</th>
                <th>Số lượng</th>
                <th>Giá tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in CTHDs" :key="item.id">
                <td>{{ item.MA_MA }}</td>
                <td>{{ item.CTHD_SOLUONG }}</td>
                <td>{{ item.CTHD_GIA }}</td>
                </tr>
            </tbody>
            </table>kk
        </div>
    </div>



</template>

<script>
import AdminService from "@/services/admin.service";
export default {
  data() {
    return {
      CTHDs: [],
      id: null
    };
  },
  async created() {
    this.id = this.$route.params.id; // Truy cập id từ route
    this.getCTHDs(this.id); // Gọi hàm getCTHDs với id
  },
  methods: {
    async getCTHDs(id) {
      this.CTHDs = await AdminService.findHoaDon(id);
    },
    refreshList() {
      // Logic để làm mới danh sách
    },
  },
  mounted() {
    this.refreshList();
  },
};

</script>
