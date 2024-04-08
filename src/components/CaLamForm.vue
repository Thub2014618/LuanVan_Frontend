<template>
    <div class="container">
      <Form @submit="submitCaLam" :validation-schema="CaLamFormSchema">
        <div class="form-group">
          <label for="CL_TENCA">Tên ca làm<span class="required">*</span></label>
          <Field name="CL_TENCA" type="text" class="form-control" v-model="shift.CL_TENCA" :value="shift.CL_TENCA" required />
          <ErrorMessage name="CL_TENCA" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="CL_BATDAU">Thời gian bắt đầu<span class="required">*</span></label>
          <Field name="CL_BATDAU" type="time" class="form-control" v-model="shift.CL_BATDAU" :value="shift.CL_BATDAU" required />
          <ErrorMessage name="CL_BATDAU" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="CL_KETTHUC">Thời gian kết thúc<span class="required">*</span></label>
          <Field name="CL_KETTHUC" type="time" class="form-control" v-model="shift.CL_KETTHUC" :value="shift.CL_KETTHUC" required />
          <ErrorMessage name="CL_KETTHUC" class="error-feedback" />
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
    emits: ["submit:calam"],
    props: {
      CaLam: { type: Object, required: true },
    },
    data() {
      const CaLamFormSchema = yup.object().shape({
        CL_TENCA: yup.string().required("Tên ca làm phải có giá trị."),
        CL_BATDAU: yup.string().required("Thời gian bắt đầu phải có giá trị."),
        CL_KETTHUC: yup.string().required("Thời gian kết thúc phải có giá trị."),
      });
  
      return {
        shift: this.CaLam,
        CaLamFormSchema,
      };
    },
  
    methods: {
      submitCaLam() {
        this.$emit("submit:calam", this.shift);
      },
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/form.css";
  </style>
  