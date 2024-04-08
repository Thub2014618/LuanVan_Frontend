<template>
    <div class="container">
      <Form @submit="submitBan" :validation-schema="BanFormSchema">
        <div class="form-group">

            <label for="B_STT">STT<span class="required">*</span></label>
            <Field name="B_STT" type="text" class="form-control" v-model="ban.B_STT" :value="ban.B_STT" required />
            <ErrorMessage name="B_STT" class="error-feedback" />
            
            <label for="B_LOAIBAN">Loại Bàn<span class="required">*</span></label>
            <Field name="B_LOAIBAN" type="text" class="form-control" v-model="ban.B_LOAIBAN" :value="ban.B_LOAIBAN" required />
            <ErrorMessage name="B_LOAIBAN" class="error-feedback" />
    
            <label for="B_SOCHONGOI">Số Chỗ<span class="required">*</span></label>
            <Field name="B_SOCHONGOI" type="number" class="form-control" v-model="ban.B_SOCHONGOI" :value="ban.B_SOCHONGOI" required />
            <ErrorMessage name="B_SOCHONGOI" class="error-feedback" />

            <label for="KV_MA">Chọn khu vực<span class="required">*</span></label>
            <select id="KV_MA" v-model="ban.KV_MA" required>
              <option v-for="kv in MAKV" :key="kv.KV_MA" :value="kv.KV_MA">
                {{ kv.KV_TENKHUVUC }}
              </option>
            </select>
            <ErrorMessage name="KV_MA" class="error-feedback" />
            
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
    emits: ["submit:ban"],
    props: {
      Ban: { type: Object, required: true },
    },
    data() {
      const BanFormSchema = yup.object().shape({
        B_STT: yup.string().required("STT bàn phải có giá trị."),
        B_LOAIBAN: yup.string().required("Loại Bàn phải có giá trị."),
        B_SOCHONGOI: yup.number().required("Số Chỗ phải có giá trị."),
        // KV_MA: yup.string().required("Tên Khu Vực phải có giá trị."),
      });
  
      return {
        ban: this.Ban,
        BanFormSchema,
        MAKV: {},

      };
    },
  
    methods: {
      submitBan() {
        this.$emit("submit:ban", this.ban);
      },
      async getMAKV() {
        try {
            this.MAKV = await AdminService.getKhuVuc();
          this.message = "Bàn đã được thêm thành công!";
        } catch (error) {
          console.error(error);
          this.message = "Đã xảy ra lỗi khi thêm bàn."; 
        }
      }
    },
    created (){
      this.getMAKV();
    }
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/form.css";
  </style>
  