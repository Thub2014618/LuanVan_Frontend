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


                    <!-- <div class="p-2" v-if="false">
                        <p>{{tables.table.B_STT}}</p>
                        <p>{{ tables.bill.NV_MA }}</p>
                        <p>{{tables.bill.HD_NGAYLAP}}</p> 
    
                    </div> -->
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
                    <tbody v-for="(item, index) in tables.dish" :key="index">
                        {{item.dish.CTHD_TRANGTHAI}}
                        <td>{{ index }}</td>
                        <td>{{ item.dish.MA_TEN }}</td>
                        <td>{{ item.dish.G_GIA }}</td>
                        <td>{{ item.dish.CTHD_SOLUONG }}</td>
                        <td>{{ item.dish.CTHD_SOLUONG * item.dish.G_GIA }} </td>
                        <td>{{item.dish.CTHD_GHICHU}}</td>
                        <!-- <td v-if="item.dish.CTHD_TRANGTHAI === 0">
                            đã xong
                        </td> -->
                        <td >
                            <button @click="pc(item.dish.CTHD_MA)">Đổi</button>
                            <button @click="pc()">Hủy</button>
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
                <div class="p-2" v-if="tables && tables[0]">
                    <p>{{ tables.bill[0].bill.HD_TONGTIEN }}</p>
                </div>
                
            </div>
        </div>
        <hr/>
        <div class="row d-flex justify-content-end">
            <button class="mr-2" @click="">Đổi bàn</button>
            <!-- <button class="mr-2" @click="">Gộp bàn</button> -->
        </div>
        <button class="btn btn-info" @click="submit">Submit</button>

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
        tables: {},
    },
    emits: ["submit:cthd", "phache" ],

    methods: {
        submit() {
        this.$emit("submit:cthd", this.tables.dish);
      },
      pc( data ) {
        this.$emit('phache', data);
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
  