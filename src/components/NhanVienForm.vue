<template>
    <div class="container">
      <Form @submit="submitNhanVien" :validation-schema="NhanVienFormSchema">
        <div class="form-group">
          <label for="NV_TEN">Tên nhân viên<span class="required">*</span></label>
          <Field name="NV_TEN" type="text" class="form-control" v-model="nhanvien.NV_TEN" required />
          <ErrorMessage name="NV_TEN" class="error-feedback" />
        </div>

        <div class="form-group">
          <label for="VT_MA">Mã vị trí<span class="required">*</span></label>
          <select v-model="nhanvien.VT_MA" required>
            <option v-for="ma in VT_MAs" :key="ma" :value="ma.VT_MA">
              {{ ma.VT_MA }}
            </option>
          </select>
          <ErrorMessage name="VT_MA" class="error-feedback" />
        </div> 

        <div class="form-group">
          <label for="NV_HINH">Hình ảnh</label>
          <Field name="NV_HINH" type="file" class="form-control" v-model="nhanvien.NV_HINH" />
          <ErrorMessage name="NV_HINH" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="NV_GIOITINH">Giới tính<span class="required">*</span></label>
          <select v-model="nhanvien.NV_GIOITINH" required>
            <option  :value="1">NAM</option>
            <option  :value="0">NỮ</option>

          </select>
          <ErrorMessage name="VT_MA" class="error-feedback" />
        </div> 
        <div class="form-group">
          <label for="NV_QUEQUAN">Quê quán<span class="required">*</span></label>
          <Field name="NV_QUEQUAN" type="text" class="form-control" v-model="nhanvien.NV_QUEQUAN" required />
          <ErrorMessage name="NV_QUEQUAN" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="NV_TAIKHOAN">Tài khoản<span class="required">*</span></label>
          <Field name="NV_TAIKHOAN" type="text" class="form-control" v-model="nhanvien.NV_TAIKHOAN" required />
          <ErrorMessage name="NV_TAIKHOAN" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="NV_EMAIL">Email<span class="required">*</span></label>
          <Field name="NV_EMAIL" type="email" class="form-control" v-model="nhanvien.NV_EMAIL" required />
          <ErrorMessage name="NV_EMAIL" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="NV_SDT">Số điện thoại<span class="required">*</span></label>
          <Field name="NV_SDT" type="tel" class="form-control" v-model="nhanvien.NV_SDT" required />
          <ErrorMessage name="NV_SDT" class="error-feedback" />
        </div>

        <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>
      </Form>
    </div>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";

  import AdminService from "@/services/admin.service";
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:nhanvien"],
    props: {
      NhanVien: { type: Object, required: true },
      
    },
    data() {
      const NhanVienFormSchema = yup.object().shape({
        NV_TEN: yup.string().required("Tên nhân viên phải có giá trị."),
        // Add other validation rules here
      });
  
      return {
        nhanvien: this.NhanVien,
        NhanVienFormSchema,
        VT_MAs: [],
      };
    },
  
    methods: {
      submitNhanVien() {
        this.$emit("submit:nhanvien", this.nhanvien);
      },
      async createdt() {
        try {
        
          this.VT_MAs = await AdminService.getMAVT();
          console.log(VT_MAs)
        } catch (error) {
          console.error(error);
        }
      },
    },
    created(){
            this.createdt();
        },
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/form.css";
  </style>
  