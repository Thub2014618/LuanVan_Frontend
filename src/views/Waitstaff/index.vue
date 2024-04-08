<template>
  <div class="col-12">
    <!-- <div class="bg-danger">selectedTable:{{ selectedTable }}</div> -->
    <div class="bg-success">selectedTable.bill:{{ selectedTable.bill }}</div>
    <div class="bg-warning">selectedTable.inforbill:{{ selectedTable.inforbill }}</div>
    <div class="">selectedTable.table:{{ selectedTable.table }}</div>
    <div class="">
      <div class="card-header">
          <h5 class="text-center">
              Sơ Đồ Bàn Ăn và Khu Vực
          </h5>
      </div>
<!-- KhuVuc -->
      <div class="card-body">
        <div class="row d-flex justify-content-start">
          <button 
            v-for="KV in KVs" :key="KV.KV_MA"
            @click="getBan(KV.KV_MA)"
            class="border border-success mr-2"
          >
            {{ KV.KV_TENKHUVUC}}
          </button>
        </div>
        <hr/>
<!-- BanAn -->      
        <div class="row">
          <div v-for="Ban in Bans" :key="Ban.B_MA" class="col-xl-3 col-md-4 col-sm-6">
            <div v-if="selectedTable.table.B_STT == Ban.B_STT" class="bg-warning border border-dark text-center b-3 mr-2 mt-2 p-3">
              <h3>{{ Ban.B_STT }}</h3>
              <p>chọn thao tác</p>
            </div>

            <div v-else-if="Ban.B_TRANGTHAISUDUNG == 1 && selectedTable.table.B_STT != Ban.B_STT" 
              @click="selectTable(Ban)" class="bg-danger mr-2 mt-2 p-3 text-center">
              <h3>{{ Ban.B_STT }}</h3>
              <p>Đang được dùng</p>
            </div>
            <div v-else class="bg-success mr-2 mt-2 p-3 text-center">
              <h3>{{ Ban.B_STT }}</h3>
              <button @click="selectTable(Ban)">Tạo hóa đơn</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
<!-- HoaDonvaMonAN -->
    <div v-if="selectedTable || bills" class="row">
      <!-- HoaDon -->
      <!-- <div  class="card col-6">
        <ChildComponent 
        @submit:cthd="submit"
        :tables="selectedTable"
      /> 
    </div>-->
      <div class="card col-6 p-2" style="font-size: 0.5em;">
        <div class="card-header">
            <h5 class="text-center">
                Hóa Đơn Bán Hàng
            </h5>
        </div>
        <div class="card-body p-1">
            <div class="row">
                <div class="col d-flex justify-content-between">
                    <div class="p-2">
                        <p>Số bàn:</p>
                        <p>Nhân viên:</p>
                        <p>Thời gian vào:</p>
    
                    </div>
                    <div class="p-2" v-if="selectedTable.table">
                        <p>{{ selectedTable.table.B_STT}}</p>
                        <p>{{ selectedTable.bill.NV_MA }}</p>
                        <p>{{ selectedTable.bill.HD_NGAYLAP}}</p> 
    
                    </div>
                </div>
            </div>
            <div class="">
                <table class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="p-1">#</th>
                            <th class="p-1">Tên món</th>
                            <th class="p-1">Đơn giá</th>
                            <th class="p-1">Số lượng</th>
                            <th class="p-1">Thành tiền</th>
                            <th class="p-1">Ghi chú</th>
                            <th class="p-1">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody
                      v-if="this.selectedTable && this.selectedTable.bill"
                      v-for="(item, index) in selectedTable.bill" :key="index">
                        <td >{{ index }}</td>
                        <td>{{ item.MA_TEN }}</td>
                        <!-- <td>{{ item.G_GIA }}</td> -->
                        <td>{{ item.CTHD_GIA }}</td>

                        <td>{{ item.CTHD_SOLUONG }}</td>
                        <td>{{ item.CTHD_SOLUONG * item.CTHD_GIA }} </td>
                        <td class="p-0"><textarea rows="3" cols="15"></textarea></td>
                        <td v-if="item.CTHD_TRANGTHAI === 0">
                          đã xong
                        </td>
                        <td v-else class="p-0">
                          <button class="btn" @click=" increaseQuantity(item)"><i class="fa fa-plus"></i></button>
                          <button class="btn" @click=" decreaseQuantity(item)"><i class="fa fa-minus"></i></button>
                          <button class="btn" @click="removeDish(item)"><i class="fa fa-window-close"></i></button>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
        <hr/>
        <div class="row d-flex justify-content-end">
          <button class="mr-2" @click="">Đổi bàn</button>
          <button class="mr-2"  @click="submit(selectedTable)">Gửi order</button>
          <div v-if="message" class="alert-success">{{ message }}</div>
          <!-- <button class="mr-2" @click="">Gộp bàn</button> -->
        </div>
      </div>
<!-- MENU -->
      <div class="card col-6">
        <div class="card-header text-center">
          <h5>MENU</h5>
        </div>
        <div class="card-body row">
          <div 
            v-for="( item, index ) in MAs" :key="index"
            v-on:click="orderDish(item)"
            class="col-xl-3 col-md-4 col-sm-6 text-center"
          >
            <img :src="item.MA_HINH" class="img-fluid" alt="">
            <h5>{{ item.MA_TEN }}</h5>
            <span>{{item.G_GIA}} VND</span>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- {{ bills }} -->
</template>

<script>
  import AdminService from "../../services/admin.service";
  import ChildComponent from '../../components/HoaDon.vue';

export default {
  components: {
      ChildComponent
    },
  data() {
    return {
      Bans: {},
      MAs: {},
      KVs: {},
      bills:{},
      message: null,
      selectedTable: {
        table:''
      },
    };
  },
  methods: {
    async selectTable(table) {
      try {
        if (table.B_TRANGTHAISUDUNG == 0) {
          const inforbill = await AdminService.createHoaDon({
            NV_MA: '1',
            KH_MA: "2",
            B_MA: table.B_STT
          });
          this.selectedTable = {
            table: table,
            bill: [],
            inforbill: inforbill
          };
          await AdminService.onBan(table.B_MA);
        } else {
          const bill = await AdminService.getHD_MABAN(table.B_MA);
          const inforbill = await AdminService.getINFOR_HD_MABAN(table.B_MA);
          this.selectedTable = {
            table: table,
            bill: bill,
            inforbill: inforbill,
          }
        }
        // this.refresh();
      } catch (error) {
        console.error(error);
      }
    },

    async orderDish(dish) {
      try {
        if (this.selectedTable && this.selectedTable.bill) {
          let itemInBill = this.selectedTable.bill.find(item => item.MA_MA === dish.MA_MA);
          if (itemInBill) {
            itemInBill.CTHD_SOLUONG++;
          } else {
            dish.CTHD_SOLUONG = 1;
            if (dish.G_GIA == null) {
                dish.CTHD_GIA = dish.CTHD_GIA;
            } else {
                dish.CTHD_GIA = dish.G_GIA;
            }
            this.selectedTable.bill.push(dish);
          }
          console.log(this.selectedTable.bill)
          // await AdminService.updateHoaDon(this.selectedTable.bill);
        } else {
          console.error("No table selected");
        }
      } catch (error) {
        console.error(error);
      }
    },

    increaseQuantity(dish) {
      let itemInBill = this.selectedTable.bill.find(item => item.MA_MA === dish.MA_MA);
      if (itemInBill) {
        itemInBill.CTHD_SOLUONG++;
      }
    },

    decreaseQuantity(dish) {
      let itemInBill = this.selectedTable.bill.find(item => item.MA_MA === dish.MA_MA);
      if (itemInBill && itemInBill.CTHD_SOLUONG > 1) {
        itemInBill.CTHD_SOLUONG--;
      } else if (itemInBill && itemInBill.CTHD_SOLUONG === 1) {
        this.removeDish(dish);
      }
    },

    removeDish(dish) {
      const index = this.selectedTable.bill.findIndex(item => item.MA_MA === dish.MA_MA);
      if (index > -1) {
        this.selectedTable.bill.splice(index, 1);
      }
    },

    async getCTHD (data) {
      this.bills = await AdminService.getHD_MABAN(data);
      console.log(this.bills)
    },

    async submit(data) {
      console.log('data',data)
      if(data.B_TRANGTHAISUDUNG == 0){
        await AdminService.createCTHD(data);
      }
      else{
        const dt = data.inforbill[0];
       // console.log('(data.inforbill.HD_MA', dt)
      //  console.log('(data.inforbill.HD_MA', data.bill)
        if (dt) {
          await AdminService.deleteAllCTHD(dt.HD_MA );
        }
        await AdminService.updateCTHD(data);
      }
      console.log(data);
      this.message = "Hóa đơn đã được thêm thành công!";
    },
    
    async getKhuVuc() {
        try {
          this.KVs = await AdminService.getKhuVuc();
        } catch (error) {
          console.log(error);
        }
    },

    async getBan(data) {
      try {
        this.Bans = await AdminService.getBanFromKV(data);
      } catch (error) {
        console.log(error);
      }
    },

    async getMonAn() {
      try {
        this.MAs = await AdminService.getMonAn();
      } catch (error) {
        console.log(error);
      }
    },
    refresh(){
      this.getKhuVuc();
      this.getMonAn();
      this.getBan()
    }
  },
  mounted(){
    this.refresh();
  },
  created() {
    this.getKhuVuc();
    this.getMonAn();
  }
};
</script>

<style>
    td, th {
      padding: 1px;
    }
</style>
