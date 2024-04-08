<template>
  <div class="container mt-3">
    <h1>Food danhmuc</h1>


<!-- 
    <div class="row">
      <div class="col-4 col-xl-3 card" v-for="danhmuc in danhMucs" :key="danhmuc.id">
        <img src="" alt="Image of food danhmuc">
        <h2>{{ danhmuc.DM_TENDANHMUC }}</h2>
        <p>Short description about the food danhmuc</p>
        <button @click="getFoods(danhmuc.DM_MA)">See more</button>
        
        <div class="">
        <button class="btn btn-danger" @click="hideDanhMuc(danhmuc.DM_MA)">
          <i class="fa fa-eye"></i>
        </button>
        <button class="btn btn-warning" @click="editDM(danhmuc.DM_MA)">
          <i class="fa fa-edit"></i>
        </button>
      </div>
      </div>
      
      <div>
        {{ foods }}
        </div>
    </div> -->



    <div class="card p-0">
      <div class="card-header">
        Tiêu đề bảng
        <button class="btn btn-primary float-right ml-2" @click = "addDM()">Thêm Danh Mục</button>
        <button class="btn btn-secondary float-right">Ẩn Danh Mục</button>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped table-hover table-bordered">
          <thead class="bg-primary">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên Danh Mục</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in danhMucs" :key="index">
              <td>{{ index }}</td>
              <td>{{ item.DM_TENDANHMUC }}</td>{{  }}
              <td>
                <button class="btn" @click="showDanhMucMon(item.DM_MA)">
                  <i class="fa fa-list"></i>
                </button>
                <button class="btn" @click="editDM(item.DM_MA)">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn" @click="deleteDM(item.DM_MA)">
                  <i class="fa fa-eye"></i>
                </button>
              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



    <div class="container my-4">
      <div class="card">
        <div class="card-header">
          Món Ăn Đã Thêm
          <button  @click = "addMA()" class="btn btn-primary float-right">Thêm Món</button>
        </div>
        <div class="card-body">
          <!-- Bảng món ăn ở đây -->
          <table class="table table-striped table-hover table-bordered">
            <thead class="bg-primary">
              <tr>
                <th scope="col">DM_MA</th>
                <th scope="col">MA_TEN</th>
                <th scope="col">MA_MOTA</th>
                <th scope="col">MA_TRANGTHAI</th>
              </tr>
            </thead>
            <tbody  v-for="(item, index) in foods" :key="index">
              <tr>
                <td>{{ item.DM_MA }}</td>
                <td>{{ item.MA_TEN }}</td>
                <td>{{ item.MA_MOTA }}</td>
                <td>{{ item.MA_TRANGTHAI }}</td>
              </tr>           
            </tbody>
          </table>
        </div>
      </div>
    </div>



    
  <div class="row">
    <div class="col-xl-3 col-md-4 col-6 card p-0 " v-for="(item, index) in foods" :key="index" style="width: 18rem; overflow: hidden;">
      <img v-if="!item.MA_HINH" src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg" class="img-fluid" alt="Tên món ăn">
      <img v-else :src="item.MA_HINH" class="img-fluid" alt="Tên món ăn">
      
      <div class="card-body p-0">
        <h4 class="card-title text-center">{{ item.MA_TEN }}</h4>
        <p class="card-text">{{ item.MA_MOTA }}</p>
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
      
      danhMucs: {
      type: Object,
      required: true,
    },
      foods: {}
    };
  },
  methods: {
    async getdanhMucs() {
      try {
        this.danhMucs = await AdminService.getDanhMuc();
      } catch (error) {
        console.log(error);
      }
    },
    async showDanhMucMon(id) {
      this.foods = await AdminService.findDanhMuc(id);
    },
    async hideDanhMuc(id) {
        if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
            try {
                await AdminService.hideDanhMuc(id);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        }
    },
    async editDM(id) {
      this.$router.push({ name: "editDanhMuc", params: { id: id} });
    },
    async addDM() {
      this.$router.push({ name: "addDanhMuc" });
    },
    async addMA() {
      this.$router.push({ name: "addMonAn" });
    },
    refreshList() {
      this.getdanhMucs();
    }
  },
  mounted() {
    this.refreshList();
  },
  created(){
    this.getdanhMucs()
    // this.getFoods()
  }
};
</script>

<style>


.table tr:hover {
  background-color: #4e4b4b; /* Màu nền khi di chuột qua hàng */
}

.table th {
  background-color: #04AA6D; /* Màu nền cho tiêu đề */
  color: white; /* Màu chữ cho tiêu đề */
}

</style>