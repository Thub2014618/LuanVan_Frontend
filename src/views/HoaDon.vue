<template>
    <a href="/admin">back</a>
<div class="container row">
    <div class="hoa-don" v-for="HoaDon in HoaDons" :key="HoaDon.id">
        <div class="header">
            <p>Mã hóa đơn: {{ HoaDon.HD_MA }}</p>
            <span>Trang thái thanh toán: {{ HoaDon.HD_TRANGTHAI }}</span>
        </div>
        <div class="info">
            <p>Ngày tạo: {{ HoaDon.HD_NGAYLAP }}</p>
            <p>Khách hàng: {{ HoaDon.KH_MA }}</p>
        </div>
        <div class="chitiethoadon">
            <table>
                <tr>
                    <th>MA_MA</th>
                    <th>CTHD_GIA</th>
                    <th>CTHD_SOLUONG</th>
                    <th>TỔNG</th>
                </tr>
                <tr>
                    <td>{{ HoaDon.MA_MA }}</td>
                    <td>{{ HoaDon.CTHD_GIA }}</td>
                    <td>{{ HoaDon.CTHD_SOLUONG }}</td>
                    <td>{{ HoaDon.CTHD_GIA * HoaDon.CTHD_SOLUONG }}</td>
        
                </tr>
            </table>

        </div>

        <div class="footer">
            <p>Tổng giá tiền: {{ HoaDon.HD_TONGTIEN}}</p>
        </div>
        <button @click = getCTHDs(HoaDon.HD_MA) >xem chi tiết</button>

        <div class="">
            <button @:click="deleteHoadon(HoaDon.HD_MA)" class="btn btn-warning mr-2">
                <i class="fa fa-trash"></i>
            </button>
            <button class="btn btn-danger">
                <i class="fa fa-edit"></i>
            </button>
        </div>
    </div>
</div>



</template>

<script>
import AdminService from "@/services/admin.service";

export default {

    data() {
        return {
            HoaDons: [],
            CTHDS: [],
            show : true,
        };
    },
    watch: {

    },
    computed: {
    },
    methods: {
        getCTHDs(ma) {
            this.$router.push({
                name: 'cthd',
                params: { id: ma }
            });
        },

        async getHoaDons() {
            try {
                this.HoaDons = await AdminService.getHoaDon();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteHoadon(id) {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await AdminService.deleteHoaDon(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        refreshList() {
            this.getHoaDons()
        },

    },
    mounted() {
        this.refreshList();
    },
    created(){
        // this.getCTHDs();
        this.getHoaDons();
    },
};
</script>

<style>
.hoa-don {
border: 1px solid #ddd;
border-radius: 5px;
padding: 15px;
margin: 10px;
}

.header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
}

.ma-hoa-don {
font-weight: bold;
}

.trang-thai-thanh-toan {
color: #999;
}

.info {
display: flex;
justify-content: space-between;
margin-bottom: 10px;
}

.ngay-tao, .khach-hang {
font-weight: bold;
}

.danh-sach-mon-an {
border: 1px solid #ddd;
border-radius: 5px;
margin-bottom: 10px;
}

table {
width: 100%;
border-collapse: collapse;
}

th, td {
border: 1px solid #ddd;
padding: 5px;
text-align: center;
}

th {
font-weight: bold;
}

.footer {
display: flex;
justify-content: flex-end;
align-items: center;
}

.tong-gia-tien {
font-weight: bold;
}

</style>
