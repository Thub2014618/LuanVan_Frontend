<template>
    <div class="container">
      <Form @submit="submitKhuVuc" :validation-schema="KhuVucFormSchema">
        <div class="form-group">
          <label for="KV_TenKhuVuc">Tên Khu Vực<span class="required">*</span></label>
          <Field name="KV_TenKhuVuc" type="text" class="form-control" v-model="khuvuc.KV_TenKhuVuc" :value="khuvuc.KV_TenKhuVuc" required />
          <ErrorMessage name="KV_TenKhuVuc" class="error-feedback" />
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
    emits: ["submit:khuvuc"],
    props: {
      KhuVuc: { type: Object, required: true },
    },
    data() {
      const KhuVucFormSchema = yup.object().shape({
        KV_TenKhuVuc: yup.string().required("Tên Khu Vực phải có giá trị."),
      });
  
      return {
        khuvuc: this.KhuVuc,
        KhuVucFormSchema,
      };
    },
  
    methods: {
      submitKhuVuc() {
        this.$emit("submit:khuvuc", this.khuvuc);
      },
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/form.css";
  </style>
  