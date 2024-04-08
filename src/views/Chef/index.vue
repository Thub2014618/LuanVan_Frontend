<template>
  <div class="col-12">
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
        <div  class="row">
          <div 
            v-for="Ban in Bans" :key="Ban.B_MA"
            class="col-xl-3 col-md-4 col-sm-6 "
          >
          <div v-if="selectedTable.B_STT == Ban.B_STT"
            class="bg-danger mr-2 mt-2 p-3 text-center">
            <h3 class="">{{ Ban.B_STT }}</h3>
            <p>chọn thao tác</p>
          </div>
          <div v-if="Ban.B_TRANGTHAISUDUNG == 1 && selectedTable.B_STT != Ban.B_STT"
            @click="selectTable(Ban)"
            class=" bg-warning mr-2 mt-2 p-3 text-center">
            <h3 class="">{{ Ban.B_STT }}</h3>
            <p>Đang được dùng</p>
          </div>
          <div 
            v-if="selectedTable.B_STT != Ban.B_STT && Ban.B_TRANGTHAISUDUNG == 0"
            v-on:click="selectTable(Ban)"
            class="bg-success mr-2 mt-2 p-3 text-center"
          >
            <h3 class="">{{ Ban.B_STT }}</h3>
            <p>Trống</p>
          </div>

          
          </div>
        </div>
      </div>
    </div>
<!-- HoaDonvaMonAN -->
{{ selectedTable }}
    <div v-if="selectedTable" class="row">
      <!-- HoaDon -->
      <div  class="card col-10">
        <ChildComponent 
        @phache="pc"
        :MonAns="selectedTable.bill"
        :soban="selectedTable.B_STT"
        :HD="selectedTable.inforBill"
        />
        {{  selectedTable.inforBill }}
        <div v-for="(item, index) in selectedTable.bill" :key="index">
       
          {{ item.MA_TEN }} - {{ item.G_GIA }} x {{ item.CTHD_SOLUONG }}
          <button v-on:click="decreaseQuantity(item)">-</button>
          <button v-on:click="increaseQuantity(item)">+</button>
          <button v-on:click="removeDish(item)">Xóa</button>
        </div>
        <!-- <button class="btn btn-info" @click="submit(selectedTable.bill)">Submit</button> -->

      </div>
<!-- MENU -->
    
    </div>
  </div>
{{ bills }}
{{ selectedTable }}
{{ selectedTable.bill }}

</template>

<script>
  import AdminService from "../../services/admin.service";
  import ChildComponent from '../../components/HoaDonCard.vue';

export default {
  components: {
      ChildComponent
    },
  data() {
    return {
      tables: [
        { id: 1, name: 'Bàn 1',  bill: [] },
        { id: 2, name: 'Bàn 2',  bill: [] },
        // thêm nhiều bàn hơn nếu bạn muốn
      ],
      bills: {},
      
      Bans: {},
      MA: {},
      KVs: {},

      selectedTable: {
        B_STT:''
      },
    };
  },
  methods: {


    async selectTable(table) {
      // this.selectedTable = table;
      // this.selectedTable.bill = [];
      // console.log(this.selectedTable ,' selectedtbale')

      const bill = await AdminService.getHD_MABAN(table.B_MA);
      const inforbill = await AdminService.getINFOR_HD_MABAN(table.B_MA);
      if (bill && inforbill) {
        table.bill = bill;
        table.inforBill = inforbill[0];
}
      this.selectedTable = table;
      console.log(this.selectedTable ,' selectedtbale' ,this.bill)
    },
    orderDish(dish) {
      let itemInBill = this.selectedTable.bill.find(item => item.dish.MA_MA === dish.MA_MA);
      if (itemInBill) {
        itemInBill.dish.CTHD_SOLUONG++;
      } else {
        // this.selectedTable.bill.push({ dish: dish, CTHD_SOLUONG: 1 });
        dish.CTHD_SOLUONG = 1;
        this.selectedTable.bill.push({ dish: dish });

      }
    },
    removeDish(item) {
      const index = this.selectedTable.bill.indexOf(item);
      if (index > -1) {
        this.selectedTable.bill.splice(index, 1);
      }
    },
    async pc(data) {
      await console.log(data);
      await AdminService.offCTHD(data);
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
  },
  created() {
    this.getKhuVuc();
    this.getMonAn();
  }
};
</script>

<style>
  
</style>
