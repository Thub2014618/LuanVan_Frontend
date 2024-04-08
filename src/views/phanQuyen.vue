<template>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Tên vai trò</th>
                        <th>Thao tác</th>
                        
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Tên vai trò</th>
                        <th>Thao tác</th>
                        
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="item in vaiTros" :key="item.VT_MA" >
                        <td>{{item.VT_TENCHUCVU}}</td>
                        <td><button>sửa vai trò</button></td>
                    </tr>
                 
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import admin from '../services/admin.service';

export default {
    components: {
        // Your components here
    },
    data() {
        return {
            vaiTros: {}
        };
    },
    methods: {
        async getVT() {
            this.vaiTros = await admin.getVaiTro();
        },
        refreshList(){
            this.getVT();
        },

    },
    mounted() {
        this.refreshList();
    },

    created() {
        // this.getVT();
        this.refreshList();
    },
};
</script>
