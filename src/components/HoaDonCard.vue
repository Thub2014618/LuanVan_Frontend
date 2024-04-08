<template>
    
    <div class="card">
        <div class="card-header">
            <h5 class="text-center">
                Hóa Đơn Bán Hàng
            </h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col d-flex justify-content-between">
                    <div class="p-2">
                        <p>Số bàn:</p>
                        <p>Nhân viên:</p>
                        <p>Thời gian vào:</p>
    
                    </div>
                    <div class="p-2" v-if="HD" >
                        <p>{{soban}}</p>
                        <p>{{HD.NV_MA}}</p>
                        <p>{{HD.HD_NGAYLAP}}</p>
                    </div>
                </div>
                
            </div>
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên món</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in MonAns" :key="index">
                        <td>{{ index }}</td>
                        <td>{{ item.MA_TEN }}</td>
                        <td>{{ item.CTHD_GIA }}</td>
                        <td>{{ item.CTHD_SOLUONG }}</td>
                        <td>{{ item.CTHD_SOLUONG * item.CTHD_GIA }} </td>
                        <td>{{item.CTHD_GHICHU}}</td>
                        <td v-if="item.CTHD_TRANGTHAI == 1">
                            <button @click="pc(item.CTHD_MA)">Pha chế</button>
                            <button @click="pc()">Hủy</button>
                        </td>
                        <td v-else >
                            Đã xong
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <div class="col d-flex justify-content-between">
                <div class="p-2">
                    <p>Tổng tiền(VND):</p>
                    <!-- <p>Giảm giá:(%):</p>
                    <p>Tổng đơn:(VND):</p> -->

                </div>
                <div class="p-2" v-if="HD">
                    <p>{{ HD.HD_TONGTIEN }}</p>
                </div>
                
            </div>
        </div>
        <hr/>
        <div class="row d-flex justify-content-end">
            <button @click="thanhtoan(soban)" class="mr-2">Thanh toán</button>
            <button class="mr-2">In hóa đơn</button>
            <button class="mr-2">Đổi bàn</button>
            <button class="mr-2">Gộp bàn</button>
        </div>
        <!-- <button class="btn btn-info" @click="submit(selectedTable.bill)">Submit</button> -->
    </div>
      
      
</template>
  
<script>
    import AdminService from "@/services/admin.service";
export default {
   
    data() {
        return {
            // CTHDs: [],
        }
    },
    props: {
        soban: {},
        MonAns: {},
        HD: {},
    },
    emits: [ "phache", 'thanhtoan' ],

    methods: {
        submit() {
        this.$emit("submit:danhmuc", this.egory);
      },
      pc( data ) {
        this.$emit('phache', data);
      },
      thanhtoan(data) {
        this.$emit('thanhtoan', data);

      }
        // async getCTHDs() {
        //     try {
        //         this.CTHDs = await AdminService.getCTHD_mahd(1);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    },
    created() {
        // this.getCTHDs();
    }
}
</script>
  