<template>
    <a href="/admin">back</a>
    <a href="/admin/monan" class="">mon an</a>
    <div class="container mt-3">
        <div class="row">
        <div class="col-4 col-xl-3 mr-2" v-for="MonAn in MonAns" :key="MonAn.id" >
            <div class="card" v-if = "!MonAn.MA_TRANGTHAI">
                <img src="{{ }}" alt="hình ảnh">
            <h4>Tên món:{{ MonAn.MA_TEN }}</h4>
            <p>Mô tả: {{ MonAn.MA_MOTA, MonAn.MA_MA }}</p>
            <p>Trạng thái : {{ MonAn.MA_TRANGTHAI }}</p>
            <div class="">
                <button @:click="restoreMonan(MonAn.MA_MA)" class="btn btn-warning mr-2">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-danger">
                    <i class="fa fa-edit"></i>
                </button>
            </div>
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
    async restoreMonan(id) {
        if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
            try {
                await AdminService.restoreMonAn(id);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        }
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