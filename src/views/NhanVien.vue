<template>

    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header">
                Nhân Viên
                <button class="btn btn-primary float-right"
                @click = "addNhanVien()"
                >Thêm Nhân Viên</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Mã nhân viên</th>
                                <th>Hình ảnh</th>
                                <th>NV_TEN</th>
                                <th>NV_GIOITINH</th>
                                <th>NV_QUEQUAN</th>
                                <th>NV_SDT</th>
                                <th>NV_EMAIL</th>
                                <th> NV_NGAYDANGKY</th>
                                <th>Lương buổi</th>
                                <th>VT_MA</th>
                                <th>Handle</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Mã nhân viên</th>
                                <th>Hình ảnh</th>
                                <th>NV_TEN</th>
                                <th>NV_GIOITINH</th>
                                <th>NV_QUEQUAN</th>
                                <th>NV_SDT</th>
                                <th>NV_EMAIL</th>
                                <th> NV_NGAYDANGKY</th>
                                <th>Lương buổi</th>
                                <th>VT_MA</th>
                                <th>Handle</th>
                            </tr>
                                
                        </tfoot>
                        <tbody v-for="NhanVien in NhanViens" :key="NhanVien.id" >
                            <tr>
                                <td>{{NhanVien.NV_MA }}</td>
                                <td class="p-0">
                                    <img :src="NhanVien.NV_HINH" alt="Hình ảnh nhân viên" class="img-fluid mt-2" />
                                </td>
                                <td>{{NhanVien.NV_TEN}}</td>
                                <td v-if="NhanVien.NV_GIOITINH" >Nữ</td>
                                <td v-else>Nam</td>
                                <td>{{NhanVien.NV_QUEQUAN}}</td>
                                <td>{{NhanVien.NV_SDT}}</td>
                                <td>{{NhanVien.NV_EMAIL}}</td>
                                <td>{{ NhanVien.NV_NGAYDANGKY }}</td>
                                <td>lương </td>
                                <td>{{NhanVien.VT_MA}}</td>
                                <td>
                                    <button @:click="deleteNhanvien(NhanVien.NV_MA)" class="btn-danger mb-1"> <i class="fa fa-trash"></i></button>
                                    <button @:click="editNhanVien(NhanVien.NV_MA)" class="btn-warning"> <i class="fa fa-edit"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
           
</template>


<script>
import AdminService from "@/services/admin.service";

export default {
    data() {
        return {
            NhanViens: [],
       
        };
    },
    watch: {

    },
    computed: {
    },
    methods: {
        formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '12', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  },

        async getNhanViens() {
            try {
                this.NhanViens = await AdminService.getNhanVien();
            } catch (error) {
                console.log(error);
            }
        },
        async addNhanVien(){
            this.$router.push( {name: "addNhanVien"})
        },
        async deleteNhanvien(id) {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await AdminService.deleteNhanVien(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async editNhanVien(data) {
            try {
                this.$router.push({ name: 'editnhanvien', params: {id: data}});
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
        this.getNhanViens();
    },

    },
   
    mounted() {
        this.refreshList();
    },
    created(){
        this.getNhanViens();
    },
};
</script>

