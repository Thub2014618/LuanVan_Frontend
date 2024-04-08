<script>
import AdminService from "@/services/admin.service";

export default {

    data() {
        return {
            CTHDs: [],
            HD_MAs: {},
            HDs: {},
            show : true,
        };
    },
    watch: {

    },
    computed: {
    },
    methods: {
        async getHoaDons() {
            try {
                this.HDs = await AdminService.getHoaDon();
            } catch (error) {
                console.log(error);
            }
        },

        async getMAHDs() {
            try {
                this.HD_MAs = await AdminService.getMAHD();
            } catch (error) {
                console.log(error);
            }
        },

        async getCTHDs(id) {
            try {
                this.CTHDs = await AdminService.getCTHD_mahd(id);
            } catch (error) {
                console.log(error);
            }
        },

        async deleteHoadon(id) {
            if (confirm("Bạn muốn xóa hóa đơn này?")) {
                try {
                    await AdminService.deleteHoaDon(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },


        refreshList() {
            this.getHoaDons();
            this.getMAHDs()

        },

    },
    mounted() {
        this.refreshList();
    },
    created(){
        this.getMAHDs()
        this.getHoaDons()
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 fixed-card">
                <div class="card hoa-don" v-for="HD in HD_MAs" :key="HD.id">
                    <div class="card-header">
                        <h5 class="card-title">Mã hóa đơn: {{ HD.HD_MA }}</h5>
                        <div v-if="!HD.HD_TRANGTHAI " class="">
                            Đã thành toán
                        </div>
                        <div v-else class="">
                            chưa thanh toán
                        </div>
                        <!-- <p class="card-text">Trạng thái: {{ HD.HD_TRANGTHAI }}</p> -->
                        <p class="card-text">Bàn: {{ HD.B_MA }}</p>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <button @click="deleteHoadon(HD.HD_MA)" class="btn btn-warning">
                                <i class="fa fa-trash"></i> Xóa
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-edit"></i> Sửa
                            </button>
                            <p class="card-text">Tổng cộng: {{ HD.HD_TONGTIEN }}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button @click="getCTHDs(HD.HD_MA)" class="btn btn-primary">Xem chi tiết {{ HD.HD_MA }}</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6 chitiethoadon mt-3">
                <div v-if="CTHDs && CTHDs.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Món ăn</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="CTHD in CTHDs" :key="CTHD.id">
                                <td>{{ CTHD.MA_TEN }}</td>
                                <td>{{ CTHD.CTHD_GIA }}</td>
                                <td>{{ CTHD.CTHD_SOLUONG }}</td>
                                <td>{{ CTHD.CTHD_GIA * CTHD.CTHD_SOLUONG }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="alert alert-warning">Không có sản phẩm nào</div>
            </div>
        </div>
    </div>
    
</template>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-6 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 50%;
  max-width: 50%;
}

.card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1rem;
  padding: 1rem;
}

.header {
  margin-bottom: 1rem;
  font-weight: 500;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-warning {
  color: #ffffff;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  color: #ffffff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.fa {
  margin-right: 0.5rem;
}

.fixed-card {
    position: fixed; /* Thẻ sẽ cố định so với viewport */
    top: 20px; /* Khoảng cách từ đỉnh viewport */
    right: 20px; /* Khoảng cách từ cạnh phải viewport */
    width: 300px;
    height: 700px; /* Chiều rộng của thẻ */
    z-index: 999; /* Đảm bảo thẻ nằm trên các phần tử khác */
    background-color: white; /* Màu nền cho thẻ */
    border: 1px solid #ddd; /* Viền cho thẻ */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bóng đổ cho thẻ */
    overflow-y: auto; /* Cho phép cuộn nếu nội dung dài */
}


</style>