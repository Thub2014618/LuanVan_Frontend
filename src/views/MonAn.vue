<template>
    <a href="/admin/monan/trash" >Trash</a>

    <div class="container mt-3">
        <div class="row">
            <!-- <div class="col-4 col-xl-3 mr-2" v-for="MonAn in MonAns" :key="MonAn.id" >
                <div class="card" v-if = "MonAn.MA_TRANGTHAI">
                    <img src="{{ }}" alt="hình ảnh">
                <h4>Tên món:{{ MonAn.MA_TEN }}</h4>
                <p>Mô tả: {{ MonAn.MA_MOTA, MonAn.MA_MA }}</p>
                <p>Trạng thái : {{ MonAn.MA_TRANGTHAI }}</p>
                <div class="">
                    <button @:click="deleteMonan(MonAn.MA_MA)" class="btn btn-warning mr-2">
                        <i class="fa fa-trash"></i>
                    </button>
                    <button @:click="editMonan(MonAn.MA_MA)" class="btn btn-danger">
                        <i class="fa fa-edit"></i>
                    </button>
                </div>
                </div>
            </div> -->
        </div>
        <div class="row">
            <div class="col-xl-3 col-md-4 col-6 card p-0 " v-for="(item, index) in MonAns" :key="index">
                
                <img v-if="item.MA_HINH" src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg" class="img-fluid" alt="Tên món ăn">
                <img v-else :src="item.MA_HINHANH" class="img-fluid" alt="Tên món ăn">
                
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
            MonAns: [],
       
        };
    },
    watch: {

    },
    computed: {
    },
    methods: {
        async getMonAns() {
            try {
                this.MonAns = await AdminService.getMonAn();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteMonan(id) {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await AdminService.deleteMonAn(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async editMonan(id) {
            this.$router.push({ name: "editMonAn", params: { id: id} });
        },
        refreshList() {
            this.getMonAns();
        },
    },
    mounted() {
        this.refreshList();
    },
    created(){
        this.getMonAns();
    },
};
</script>