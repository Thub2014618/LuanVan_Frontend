<template>
    <div class="container mt-3">
      <div class="row">
        <div class="col-4 col-xl-3 mr-2" v-for="MonAn in MonAns" :key="MonAn.id">
          <div class="card" v-if="MonAn.MA_TRANGTHAI">
            <img :src="MonAn.MA_HINHANH" alt="Hình ảnh" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">Tên món: {{ MonAn.MA_TEN }}</h4>
              <p class="card-text">Mô tả: {{ MonAn.MA_MOTA }}</p>
              <p class="card-status">Trạng thái: {{ MonAn.MA_TRANGTHAI ? 'Có sẵn' : 'Không có sẵn' }}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-warning" @click="editDM(danhmuc.DM_MA)">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-danger" @click="hideDanhMuc(danhmuc.DM_MA)">
                  <i class="fa fa-trash"></i>
                </button>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

// import MonAnForm from "@/components/MonAn.Form.vue";
import AdminService from "@/services/admin.service";

  export default {
    props() {

    },
    data() {
      return {
        MonAns: [] // Dữ liệu món ăn sẽ được lấy từ API hoặc một nguồn dữ liệu khác
      };

    },
    methods: {
      deleteMonan(id) {
        // Logic để xóa món ăn
      },
      editMonan(id) {
        // Logic để chỉnh sửa món ăn
      },
      getMonAN(){
        this.MonAns = AdminService.getMonAn_MADM()
      }
    },
    mounted() {
      // Gọi API để lấy danh sách món ăn khi component được mount
    },
    created(){

    }
  };
  </script>

<style>
  .container {
    padding: 2rem 0;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  
  .col-4 {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  
  .col-xl-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  
  .card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
    transition: box-shadow 0.3s ease-in-out;
  }
  
  .card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-img-top {
    width: 100%;
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .card-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 500;
  }
  
  .card-text {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .card-status {
    font-size: 0.875rem;
    font-weight: 400;
  }
  
  .card-footer {
    padding: 0.75rem 1.25rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid #e0e0e0;
  }
  
  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .btn-warning {
    color: #212529;
    background-color: #ffc107;
    border-color: #ffc107;
  }
  
  .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .fa {
    margin-right: 0.5rem;
  }
</style>
  