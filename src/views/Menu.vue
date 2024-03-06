<template>
  <div class="container mt-3">
    <a href="/admin">back</a>
    <h1>Food Category</h1>
    <div class="row">
      <div class="col-4 col-xl-3 card" v-for="category in categories" :key="category.id">
        <img src="" alt="Image of food category">
        <h2>{{ category.DM_TENDANHMUC }}</h2>
        <p>Short description about the food category</p>
        <button @click="getFoods(category.DM_MA)">See more</button>
        
        <div class="">
        <button class="btn btn-danger" @click="hideDanhMuc(category.DM_MA)">
          <i class="fa fa-trash"></i>
        </button>
        <button class="btn btn-warning" @click="editDM(category.DM_MA)">
          <i class="fa fa-edit"></i>
        </button>
      </div>
      </div>
      
      <div>
        {{ foods }}
        </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  data() {
    return {
      categories: [],
      foods: []
    };
  },
  methods: {
    async getCategories() {
      try {
        this.categories = await AdminService.getDanhMuc();
      } catch (error) {
        console.log(error);
      }
    },
    async getFoods(id) {
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

    refreshList() {
      this.getCategories();
    }
  },
  mounted() {
    this.refreshList();
  }
};
</script>
