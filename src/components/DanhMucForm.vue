<template>
  <div class="container">
    <Form @submit="submitDanhMuc" :validation-schema="DanhMucFormSchema">
      <div class="form-group">
        <label for="DM_TENDANHMUC">DM_TENDANHMUC<span class="required">*</span></label>
        <Field name="DM_TENDANHMUC" type="text" class="form-control" v-model="category.DM_TENDANHMUC" :value="category.DM_TENDANHMUC" required />
        <ErrorMessage name="DM_TENDANHMUC" class="error-feedback" />
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
  