<template>
    <div class="container">
      <Form @submit="submitDanhMuc" :validation-schema="DanhMucFormSchema">
        <div class="form-group">
  <label for="KH_MA">Mã khách hàng<span class="required">*</span></label>
  <Field name="KH_MA" type="text" class="form-control" v-model="bill.KH_MA" required />
  <ErrorMessage name="KH_MA" class="error-feedback" />
</div>

<div class="form-group">
  <label for="B_MA">Mã bàn<span class="required">*</span></label>
  <Field name="B_MA" type="text" class="form-control" v-model="bill.B_MA" required />
  <ErrorMessage name="B_MA" class="error-feedback" />
</div>

<div class="form-group">
  <label for="HD_NGAYLAP">Ngày lập hóa đơn<span class="required">*</span></label>
  <Field name="HD_NGAYLAP" type="date" class="form-control" v-model="bill.HD_NGAYLAP" required />
  <ErrorMessage name="HD_NGAYLAP" class="error-feedback" />
</div>

<div class="form-group">
  <label for="HD_TONGTIEN">Tổng tiền<span class="required">*</span></label>
  <Field name="HD_TONGTIEN" type="number" class="form-control" v-model="bill.HD_TONGTIEN" required />
  <ErrorMessage name="HD_TONGTIEN" class="error-feedback" />
</div>

<div class="form-group">
  <label for="HD_GHICHU">Ghi chú</label>
  <Field name="HD_GHICHU" type="text" class="form-control" v-model="bill.HD_GHICHU" />
  <ErrorMessage name="HD_GHICHU" class="error-feedback" />
</div>

<div class="form-group">
  <label for="HD_TRANGTHAI">Trạng thái<span class="required">*</span></label>
  <Field name="HD_TRANGTHAI" type="select" class="form-control" v-model="bill.HD_TRANGTHAI" required>
    <option value="Chưa thanh toán">Chưa thanh toán</option>
    <option value="Đã thanh toán">Đã thanh toán</option>
  </Field>
  <ErrorMessage name="HD_TRANGTHAI" class="error-feedback" />
</div>
        <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>
      </Form>
    </div>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:danhmuc"],
    props: {
      DanhMuc: { type: Object, required: true },
    },
    data() {
      const DanhMucFormSchema = yup.object().shape({
        // Ma_DM: yup.string().required("Ma_DM phải có giá trị."),
        DM_TENDANHMUC: yup.string().required("DM_TENDANHMUC phải có giá trị."),
      });
  
      return {
        category: this.DanhMuc,
        DanhMucFormSchema,
      };
    },
  
    methods: {
      submitDanhMuc() {
        this.$emit("submit:danhmuc", this.category);
      },
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/form.css";
  </style>
  