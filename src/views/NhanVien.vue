<template>

    <div class="container-fluid">
        <a href="/admin">back</a>

        <!-- Page Heading -->
        <h1 class="h3 mb-2 text-gray-800">Nhân viên</h1>
        <p class="mb-4">
            Danh sách nhân viên của quán <a target="_blank"
                href="https://datatables.net"></a>.</p>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Dữ liệu nhân viên</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>NV_MA</th>
                                <th>VT_MA</th>
                                <th>NV_TEN</th>
                                <th>NV_HINH</th>
                                <th>NV_GIOITINH</th>
                                <th>NV_QUEQUAN</th>
                                <th>NV_TAIKHOAN</th>
                                <th>NV_EMAIL</th>
                                <th>NV_SDT</th>
                                <th> NV_NGAYDANGKY</th>
                                <th>Handle</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>NV_MA</th>
                                <th>NV_TEN</th>
                                <th>VT_MA</th>
                                
                                <th>NV_HINH</th>
                                <th>NV_GIOITINH</th>
                                <th>NV_QUEQUAN</th>
                                <th>NV_TAIKHOAN</th>
                                <th>NV_EMAIL</th>
                                <th>NV_SDT</th>
                                <th>NV_NGAYDANGKY</th>
                                
                            </tr>
                        </tfoot>
                        <tbody v-for="NhanVien in NhanViens" :key="NhanVien.id" >
                            <tr>
                                <td>{{NhanVien.NV_MA }}</td>
                                <td>{{NhanVien.NV_TEN}}</td>
                                <td>{{NhanVien.VT_MA}}</td>
                                <td>{{NhanVien.NV_HINH}}</td>
                                <td>{{NhanVien.NV_GIOITINH}}</td>
                                <td>{{NhanVien.NV_QUEQUAN}}</td>
                                <td>{{NhanVien.NV_TAIKHOAN}}</td>
                                <td>{{NhanVien.NV_EMAIL}}</td>
                                <td>{{NhanVien.NV_SDT}}</td>
                                <td>{{ NhanVien.NV_NGAYDANGKY | formatDate }}</td>
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
           
    <!-- <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="js/sb-admin-2.min.js"></script>
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
    <script src="js/demo/datatables-demo.js"></script> -->


</template>


<script>
import AdminService from "@/services/admin.service";

export default {
    filters: {
    formatDate(value) {
      const date = new Date(value);
      const dd = date.getDate();
      const mm = date.getMonth() + 1; // Tháng bắt đầu từ 0
      const yyyy = date.getFullYear();
      const hh = date.getHours();
      const ii = date.getMinutes();

      return `${dd}-${mm}-${yyyy} ${hh}:${ii}`;
    }
  },
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
        async getNhanViens() {
            try {
                this.NhanViens = await AdminService.getNhanVien();
            } catch (error) {
                console.log(error);
            }
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

