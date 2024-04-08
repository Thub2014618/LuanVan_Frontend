<template>
    <div class="card-body">
        <div class="table-responsive">
            <button @click="addCL()" type="button" class="btn btn-success">Thêm Ca Làm</button>
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Tên Ca</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Ẩn-hiện</th>
                        <th>Thao tác</th>
                        
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Tên Ca</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Ẩn-hiện</th>
                        <th>Thao tác</th>
                        
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="item in Cas" :key="item.CL_MA" >
                        <td>{{item.CL_TENCA}}</td>
                        <td>{{item.CL_BATDAU}}</td>
                        <td>{{item.CL_KETTHUC}}</td>
                        <td>
                            <button><i class="fa fa-edit" ></i></button>
                            <button><i class="fa fa-times" ></i></button>
                            <button><i class="fa fa-trash" ></i></button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Tên Ca</th>
                        <th>Nhân Viên</th>
                        <th>Ngày Làm</th>
                        <th>Ẩn-hiện</th>
                        <th>Thao tác</th> 
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Tên Ca</th>
                        <th>Nhân Viên</th>
                        <th>Ngày Làm</th>
                        <th>Ẩn-hiện</th>
                        <th>Thao tác</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="item in lichs" :key="item.CTC_MA" >
                        <td>{{item.CL_MA}}</td>
                        <td>{{item.NV_MA}}</td>
                        <td>{{item.N_NGAYLAM}}</td>
                        <td>{{item.CTC_TRANGTHAI}}</td>
                        <td>
                            <button><i class="fa fa-edit" ></i></button>
                            <button><i class="fa fa-times" ></i></button>
                            <button><i class="fa fa-trash" ></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>Nhân Viên</th>
                <th>Thứ 2</th>
                <th>Thứ 3</th>
                <th>Thứ 4</th>
                <th>Thứ 5</th>
                <th>Thứ 6</th>
                <th>Thứ 7</th>
                <th>Chủ nhật</th>

            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Nhân Viên</th>
                <th>Thứ 2</th>
                <th>Thứ 3</th>
                <th>Thứ 4</th>
                <th>Thứ 5</th>
                <th>Thứ 6</th>
                <th>Thứ 7</th>
                <th>Chủ nhật</th>

            </tr>
        </tfoot>
        <tbody>
            <tr v-for="item in NhanViens" :key="item.CTC_MA" >
                <td>{{item.NV_TEN}} ( {{ item.VT_MA }} )</td>

                <td v-for="lich in lichs" :key="item.CTC_MA"> 
                    <td  v-if="lich.NV_TEN == item.NV_TEN">                    
                        {{lich.N_NGAYLAM}}
                    </td>
                    <td v-else ></td>
                </td>

                <td>{{item.CL_MA}}</td>
                <td>{{item.CTC_TRANGTHAI}}</td>
                <td>
                    <button><i class="fa fa-edit" ></i></button>
                    <button><i class="fa fa-times" ></i></button>
                    <button><i class="fa fa-trash" ></i></button>
                </td>
            </tr>
        </tbody>
    </table>


</template>

<script>
import admin from '../services/admin.service';

export default {
    components: {
        // Your components here
    },
    data() {
        return {
            Cas: {},
            lichs: {},
            NhanViens: {}
        };
    },
    methods: {
        async getCL() {
            this.Cas = await admin.getcalam();
        },
        async getLL() {
            this.lichs = await admin.getlichlam();
        },
        async getLL() {
            this.lichs = await admin.getlichlam();
        },
        async getNV() {
            this.NhanViens = await admin.getNhanVien();
        },
        async addCL() {
            this.$router.push({ name: 'addcalam' });
        },        

        refreshList(){
            this.getCL()
            this.getLL()
            this.getNV()

        },

    },
    mounted() {
        this.refreshList();
    },

    created() {
        // this.getCL();
        this.refreshList();
    },
};
</script>
