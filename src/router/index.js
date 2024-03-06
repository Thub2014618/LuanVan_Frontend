import { createWebHistory, createRouter } from "vue-router";

import login from "@/views/login.vue";
import admin from "@/views/admin.vue";
import menu from "@/views/menu.vue";
import addDanhMuc from "@/views/addDanhMuc.vue";
import editDanhMuc from "@/views/editDanhMuc.vue";
import monan from "@/views/monan.vue";
import editmonan from "@/views/editMonAn.vue";
import addMonan from "@/views/addMonan.vue";
import trashmonan from "@/views/trashmonan.vue";
import hoadon from "@/views/hoadon.vue";
import addHoaDon from "@/views/AddHoaDon.vue";
import CTHD from "@/views/CTHD.vue";
import nhanvien from "@/views/nhanvien.vue";
import addnhanvien from "@/views/addnhanvien.vue";
import editnhanvien from "@/views/editNhanVien.vue";
import addCTHD from "@/views/addCTHD.vue";

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
        props : true
    },
    {
        path:"/admin/menu",
        name: "menu",
        component: menu,
        props : true
    },
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
        path:"/admin/HoaDon/:id",
        name: "cthd",
        component: CTHD,
        props : true
    },
    {
        path:"/admin/cthd/:id",
        name: "CTHDh",
        component: () => import("@/views/CTHD.vue"),
        props : true
    },
    {
        path:"/admin/CTHD/add",
        name: "addkHoaDon",
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
        name: "AddNhanVien",
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