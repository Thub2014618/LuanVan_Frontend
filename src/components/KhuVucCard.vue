<template>
    <div class="container mt-3 border border-secondary">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2 class="text-primary text-white">Danh Sách Khu Vực</h2>
        <button @click="addKhuVuc" type="button" class="btn btn-success">Thêm Khu vực</button>
      </div>
      <table class="table">
        <thead class="bg-primary text-white">
          <tr>
            <th>Tên Khu Vực</th>
            <th>handle</th>
          </tr>
        </thead>
        <tbody v-for="khuvuc in khuVucs" :key="khuvuc.id">
          <tr>
            <td>{{ khuvuc.KV_TENKHUVUC }}</td>
            <td>
                <!-- <button @click="getBan(khuvuc.KV_MA)"><i class="fa fa-list"></i></button> -->
                <button @click="callGetBanFromKV(khuvuc.KV_MA)"><i class="fa fa-list"></i></button>
                <button @click="editKhuVuc(khuvuc.KV_MA)"><i class="fa fa-edit"></i></button>
              <button @click="deleteKhuVuc(khuvuc.KV_MA)"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
//   import AdminService from "@/services/admin.service";
  
  export default {
    data() {
      return {
        message: ""
      };
    },
    props: {
        khuVucs: { type: Object, required: true },
        getBan: {
            type: Function,
            required: true
        }
    },

    methods: {
      async addKhuVuc() {
        this.$router.push({ name: "addKhuVuc" });
      },
      async deleteKhuVuc(id) {
        if (confirm("Bạn muốn xóa khu vực này?")) {
          try {
            await AdminService.deleteKhuVuc(id);
            this.refreshList();
          } catch (error) {
            console.error(error);
            this.message = "Đã xảy ra lỗi khi xóa khu vực.";
          }
        }
      },
      async editKhuVuc(id) {
        try {
          this.$router.push({ name: 'editKhuVuc', params: { id: id } });
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi chỉnh sửa khu vực.";
        }
      },
      async refreshList() {
        try {
          this.khuVucs = await AdminService.getKhuVuc();
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi tải danh sách khu vực.";
        }
      }
    },

    async callGetBanFromKV() {
        await this.$parent.getBanFromKV();
    },

    mounted() {
        this.getBan();
    },
    created() {
      this.refreshList();
    }
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  