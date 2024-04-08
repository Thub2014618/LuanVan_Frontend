import { createWebHistory, createRouter } from "vue-router";

import login from "@/views/login.vue";
import admin from "@/views/admin.vue";
import caLam from "@/views/calam.vue";
import addCaLam from "@/views/AddCaLam.vue";

import phanquyen from "@/views/phanQuyen.vue";
import menu from "@/views/menu.vue";
import addDanhMuc from "@/views/AddDanhMuc.vue";
import editDanhMuc from "@/views/editDanhMuc.vue";
import monan from "@/views/monan.vue";
import editmonan from "@/views/editMonAn.vue";
import addMonan from "@/views/addMonan.vue";
import trashmonan from "@/views/trashmonan.vue";
import hoadon from "@/views/hoadon.vue";
import addHoaDon from "@/views/TaoHoaDon.vue";
import CTHD from "@/views/CTHD.vue";
import nhanvien from "@/views/nhanvien.vue";
import addnhanvien from "@/views/addnhanvien.vue";
import editnhanvien from "@/views/editNhanVien.vue";
import addCTHD from "@/views/addCTHD.vue";
import editBan from "@/views/editBan.vue";

import ban from "@/views/BanAn.vue";
import addBan from "@/views/addBan.vue";


import createHoaDon from "@/views/TaoHoaDon.vue";

// import khuVuc from "@/views/KhuVuc.vue";
import addKhuVuc from "@/views/addKhuVuc.vue";

import thungan from "@/views/Cashier/index.vue";
import daubep from "@/views/Chef/index.vue";
import phucvu from "@/views/Waitstaff/index.vue";



const routes = [
    {
        path: "/",
        name: "admin.login",
        component: login,
        props: true 
    },
    {
        path:"/admin",
        name: "adminpage",
        component: admin,
        props : true,
       
    },
    {
        path:"/admin/calam",
        name: "calam",
        component: caLam,
        props : true,
       
    },
    {
        path:"/admin/calam/add",
        name: "addcalam",
        component: addCaLam,
        props : true,
       
    },
   
    {
        path:"/admin/menu",
        name: "menu",
        component: menu,
        props : true
    },
    {
        path:"/admin/phanquyen",
        name: "phanquyen",
        component: phanquyen,
        props : true,
    },
    // {
    //     path: "/admin",
    //     name: "adminpage",
    //     component: admin,
    //     children: [
    //         {
    //             path:"phanquyen",
    //             name: "phanquyen",
    //             component: phanquyen,
    //             props : true,
    //         },
    //     ]
    // },
    {
        path:"/admin/menu/add",
        name: "addDanhMuc",
        component: addDanhMuc,
        props : true
    },
    {
        path:"/admin/menu/edit/:id",
        name: "editDanhMuc",
        component: editDanhMuc,
        props : true
    },
    {
        path:"/admin/MonAn",
        name: "MonAn",
        component: monan,
        props : true
    },
    {
        path:"/admin/MonAn/edit/:id",
        name: "editMonAn",
        component: editmonan ,
        props : true
    },
    {
        path:"/admin/MonAn/add",
        name: "addMonAn",
        component: addMonan,
        props : true
    },
    {
        path:"/admin/MonAn/trash",
        name: "trashMonAn",
        component: trashmonan,
        props : true
    },
    {
        path:"/admin/HoaDon",
        name: "HoaDon",
        component: hoadon,
        props : true
    }, 
    {
        path:"/admin/HoaDon/add",
        name: "addHoaDon",
        component: addHoaDon,
        props : true
    },
    {
        path:"/admin/CTHD/add",
        name: "addCTHD",
        component: addCTHD,
        props : true
    }, 
    {
        path:"/admin/NhanVien",
        name: "NhanVien",
        component: nhanvien,
        props : true
    },
    {
        path:"/admin/NhanVien/add",
        name: "addNhanVien",
        component: addnhanvien,
        props : true
    },
    {
        path:"/admin/NhanVien/edit/:id",
        name: "editnhanvien",
        component: editnhanvien,
        props : true
    }, 
    {
        path:"/admin/ban",
        name: "ban",
        component: ban,
        props : true
    }, 
    {
        path:"/admin/ban/add",
        name: "addban",
        component: addBan,
        props : true
    }, 
    {
        path:"/admin/ban/edit/:id",
        name: "editBan",
        component: editBan,
        props : true
    },
    // {
    //     path:"/admin/KhuVuc",
    //     name: "KhuVuc",
    //     component: khuVuc,
    //     props : true
    // }, 
    {
        path:"/admin/khuVuc/add",
        name: "addKhuVuc",
        component: addKhuVuc,
        props : true
    }, 

    {
        path:"/admin/hoadon/create",
        name: "createhoadon",
        component: createHoaDon,
        props : true
    }, 


    {
        path:"/admin/hoadon/check",
        name: "checkhd",
        component: () => import("../views/AddHoaDon.vue"),
        props : true
    }, 


    {
        path:"/chef",
        name: "daubep",
        component: daubep,
        props : true
    }, 
    {
        path:"/waitstaff",
        name: "phucvu",
        component: phucvu,
        props : true
    }, 
    {
        path:"/cashier",
        name: "thungan",
        component: thungan,
        props : true
    }, 



    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    
];
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    });

export default router;