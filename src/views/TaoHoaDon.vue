<template>
    <div class="container">
      <h1>Danh sách bàn</h1>
        <KhuVucCard 
        :khuVucs="khuVucs" 
        :getBan="getBanFromKV"
        />

        <div class="row">
            <div class="row">
              <div v-for="(item, index) in bans" :key="index"
                class="col-xl-2 col-md-3 col-sl-4 m-2 "
              >
              <!-- <div v-if="checkHD(item.B_MA)" class="red-background custom-div"> -->              
                <div v-if="item.B_TRANGTHAISUDUNG"
                  @click="getHDFromB_MA(item.B_MA)"  
                  class="red-background custom-div">
                    <h4 class="text-center">{{ item.B_MA }}</h4>
                  <!-- <button @click="doiBan" type="button">Đổi bàn</button>
                  <button @click="doiMon" type="button">Đổi Món</button> -->
                  <button @click="showModal()" type="button">Thêm món</button>
                  <button @click="thanhToan(item.B_MA)" type="button">Thanh toán</button>
                </div>
                <div v-else class="green-background custom-div">
                  <h4 class="text-center">{{ item.B_MA }}</h4>
                  <button @click="showHDForm(item.B_MA )" type="button">tạo một hóa đơn</button>
                </div>
              </div> 
          </div>
        </div>
        <div id="myModal" class="modal">
        <!-- Nội dung modal -->
            <div class="modal-content col-xl-6 col-md-8 col-sl-10  ">
                <button class="close btn btn-danger" @click.stop="closeModal" style="position:absolute; right:10px; top:10px;">×</button>
                <CTHDForm
                :CTHD="CTHD" 
                :cthdOlds="cthdOlds" 
                :monAns="monAns" 
                :message="message"
                @submit:CTHD="submitCTHD"/>              
            </div>
        </div>

        <div id="myHDForm" class="modal">
          <div class="modal-content col-xl-4 col-md-6 col-sl-8 mt-5 ">
            <button class="close btn btn-danger" @click.stop="closeHDForm" style="position:absolute; right:10px; top:10px;">×</button>
            <HoaDonForm :HoaDon="HoaDon"
            @submit:hoaDon="addHoaDon" />
            {{ message }}
          </div>
        </div>

    </div>
</template>

<script>

import HoaDonForm from "@/components/HoaDonForm.vue";
import CTHDForm from '@/components/CTHDForm.vue';
import KhuVucCard from '@/components/KhuVucCard.vue';
import AdminService from "@/services/admin.service";

export default {
    components: {
      CTHDForm,
      HoaDonForm,
      KhuVucCard,
    },
    emits: ["submit:CTHD"],
    data() {
      return {

        khuVucs: {},


        currentB_MA: null,
        currentHD_MA: null,
        bans :{},
        monAns: {},
        HoaDon: {
          B_MA:  null,
          NV_MA: '1',
          HD_TRANGTHAI: '1'
        },
        CTHD: {
          HD_MA : null,
          CTHD_SOLUONG: '1',
          CTHD_TRANGTHAI: 1,
        },
        cthdOlds: {},
        
        message: "",

      };
    },
    watch: {
      currentB_MA(newVal) {
        this.HoaDon.B_MA = newVal;
      },
      currentHD_MA(newVal) {
        this.CTHD.HD_MA = newVal;
      },
    },
    methods: {

      async getKV() {
        try {
            this.khuVucs = await AdminService.getKhuVuc();
        } catch (error) {
            console.error(error);
        }
      },
      async getBanFromKV(data){
        this.bans = AdminService.getBanFormKV(data);
      },
      async getCTHD_Old(data) {
        try {
          this.cthdOlds = await AdminService.getCTHD_mahd(data);
        } catch (error) {
          console.error(error);
        }
      },
      async checkHD(data) {
        const dt = await AdminService.checkTTHD(data);
      },
      async showModal() {
        console.log("this.currentHD_MA", this.currentHD_MA);
        if (this.currentHD_MA) {
          await this.getCTHD_Old(this.currentHD_MA);
        }
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
      },
      closeModal() {
          const modal = document.getElementById("myModal");
          modal.style.display = "none";
      },
      async showHDForm(B_MA) {
        this.currentB_MA = B_MA;
        var HDForm = document.getElementById('myHDForm');
        HDForm.style.display = 'block';
      },
      closeHDForm() {
          var HDForm = document.getElementById('myHDForm');
          HDForm.style.display = 'none';
      },
      async submitCTHD() {
        try {
          console.log(this.CTHD)
            await AdminService.createCTHD(this.CTHD);
            this.message = this.message = `Món ăn đã được thêm thành công!`;
          } catch (error) {
            console.error(error);
            this.message = "Đã xảy ra lỗi khi thêm hóa đơn.";
          }
      },
      async getBan() {
        try {
            this.bans = await AdminService.getBan();
        } catch (error) {
            console.error(error);
        }
      },
      async getMonAn() {
        try {
          this.monAns = await AdminService.getMonAn();
        } catch (error) {
            console.error(error);
        }
      },
      
      async addHoaDon(data) {
        try {
          await AdminService.createHoaDon(data);
          await AdminService.onBan(this.currentB_MA);
          this.closeHDForm();
          this.refreshList();

        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm hóa đơn.";
        }
      },

      async thanhToan(data) {
        try {
          await AdminService.offHD(data);
          await AdminService.offBan(data);
        } catch (error) {
            console.error('Error in offBan or offHD:', error);
        }
        this.refreshList();
      },

      async getHDFromB_MA(data){
        const dt = await AdminService.getHD_MABAN(data);
        this.currentHD_MA = dt[0].HD_MA;
        console.log(dt[0], dt[0].HD_MA )

      },



      refreshList() {
          this.getKV();
          this.getBan();
          this.getMonAn();
          this.getCTHD_Old(this.currentHD_MA);
      }
    },
    mounted() {
        this.refreshList();
    },
    created() {
      this.getCTHD_Old( this.currentHD_MA);
      this.getBan();
      this.getMonAn();
      this.message = "";
    }
};
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



  .custom-div {
    border: 5px solid black;
    padding: 10px;
    transition: border-width 0.3s ease;
}

.custom-div:hover {
    border-width: 4px;
    border-color: rgb(164, 33, 33);
}





.modal {
    display: none; /* Ẩn modal */
    position: fixed; /* Ở vị trí cố định */
    z-index: 1; /* Đặt z-index để nó nằm trên các phần tử khác */
    left: 0;
    top: 0;
    width: 100%; /* Chiều rộng toàn màn hình */
    height: 100%; /* Chiều cao toàn màn hình */
    overflow: auto; /* Kích hoạt thanh cuộn nếu cần */
    background-color: rgb(0,0,0); /* Màu nền */
    background-color: rgba(0,0,0,0.4); /* Màu nền với độ mờ */
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% từ trên xuống và tự động căn giữa */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Chiều rộng của modal */
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }






  .custom-div button {
    visibility: hidden;
  }

  .custom-div:hover button {
    visibility: visible;
  }


  .green-background {
    background-color: green;
  }
  .red-background {
    background-color: red;
  }
</style>