<template>

    <div class="container row">

        <div class="container mt-3 border border-secondary col-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h2 class="text-primary text-white">Danh Sách Khu Vực</h2>
                <button @click="addKhuVuc()" type="button" class="btn btn-success">Thêm Khu vực</button>
            </div>
            <table class="table">
                <thead class="bg-primary text-white">
                <tr>
                    <th>Tên Khu Vực</th>
                    <th>handle </th>

                </tr>
                </thead>
                <tbody  v-for="khuvuc in khuVucs" :key="khuvuc.id">
                    <td>{{ khuvuc.KV_TENKHUVUC }}</td>
                    <td>
                        <button @click = "ed"><i class="fa fa-bars"></i></button>
                        <button @click = "editKhuVuc(khuvuc.KV_MA)"><i class="fa fa-edit"></i></button>
                        <button @click = "deleteKhuVuc(khuvuc.KV_MA)"><i class="fa fa-trash"></i></button>
                    </td>
                </tbody>
            </table>
        </div>


        <div class="container mt-3 border border-secondary col-8">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h2 class="text-primary">Danh Sách Bàn</h2>
                <button @click="addBan()" type="button" class="btn btn-success">Thêm Bàn</button>
            </div>
            <table class="table">
                <thead class="bg-primary text-white">
                <tr>
                    <th>Số bàn</th>
                    <th>Loại Bàn</th>
                    <th>Số Chỗ</th>
                    <th>Tên Khu Vực</th>
                    <th>Trạng Thái Sử Dụng</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody v-for="ban in bans" :key="ban.id">
                <tr>
                    <td>{{ ban.B_STT }}</td>
                    <td>{{ ban.B_LOAIBAN }}</td>
                    <td>{{ ban.B_SOCHONGOI }}</td>
                    <td>{{ ban.KV_MA }}</td>
                    <td>{{ ban.B_TRANGTHAISUDUNG }}</td>
                    <td>
                    <button class="btn btn-primary" @click="editBan(ban.B_MA)"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger" @click="deleteBan(ban.B_MA)">                    
                        {{ ban.B_MA }}
                        <i class="fa fa-trash"></i></button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script>

import AdminService from "@/services/admin.service";

export default {
    data() {
        return {
            bans :{},
            khuVucs: {}
        }
    },
    methods: {

        async getBan() {
            try {
                this.bans = await AdminService.getBan();
            } catch (error) {
                console.log(error);
            }
        },

        async getkhuvuc() {
            try {
                this.khuVucs = await AdminService.getKhuVuc();
            } catch (error) {
                console.log(error);
            }
        },

        // async getBan_KV(){
        //     this.bans = AdminService.getBan_KhuVuc();
        // }
        async addBan(){
            this.$router.push({ name: "addban" });
        },
        async addKhuVuc(){
            this.$router.push({ name: "addKhuVuc" });
        },
        async deleteBan(id) {
            if (confirm("Bạn muốn xóa bàn này ?")) {
                try {
                    await AdminService.deleteBan(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async editBan(data) {
            try {
                this.$router.push({ name: 'editBan', params: {id: data}});
            } catch (error) {
                console.log(error);
            }
        },
        async addKhuVuc(){
            this.$router.push({ name: "addKhuVuc" });
        },
        async deleteKhuVuc(id) {
            if (confirm("Bạn muốn xóa khu vực này ?")) {
                try {
                    await AdminService.deleteKhuVuc(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async editKhuVuc(data) {
            try {
                this.$router.push({ name: 'editKhuVuc', params: {id: data}});
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.getkhuvuc(),
            this.getBan()
        },

    },
    created() {
        this.getBan(),
        this.getkhuvuc()

    },

}
</script>


<style>
  .table-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .table-card.in-use {
    background-color: #ff0000; /* Màu đỏ */
  }
  .table-card.available {
    background-color: #008000; /* Màu xanh */
  }
  .table-card:hover .table-details {
    display: block;
  }
  .table-header {
    color: white;
    padding: 5px;
    border-radius: 5px 5px 0 0;
  }
  .table-details {
    display: none;
    padding: 10px;
    background-color: #f9f9f9;
  }
</style>