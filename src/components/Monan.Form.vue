<template>
  <div class="container">
    <Form @submit="submitMonan" :validation-schema="MonanFormSchema">
  <div class="form-group">
    <label for="name">Tên sản phẩm<span class="required">*</span></label>
    <Field name="MA_TEN" type="text" class="form-control" v-model="food.MA_TEN" required />
    <ErrorMessage name="name" class="error-feedback" />
  </div>
  <div class="form-group">
    <label for="description">Mô tả<span class="required">*</span></label>
    <Field name="MA_MOTA" type="text" class="form-control" v-model="food.MA_MOTA" required />
    <ErrorMessage name="description" class="error-feedback" />
  </div>
  <div class="form-group">
    <label for="DM_MA">Mã danh mục<span class="required">*</span></label>
    <select v-model="food.DM_MA" required>
      <option v-for="ma in DM_MA" :key="ma" :value="ma.DM_MA">
        {{ ma.DM_MA }}
      </option>
    </select>
    <ErrorMessage name="DM_MA" class="error-feedback" />
  </div> 

  <div class="form-group">
    <label for="status">Trạng thái<span class="required">*</span></label>
    <Field name="MA_TRANGTHAI" type="text" class="form-control" v-model="food.MA_TRANGTHAI" required />
    <ErrorMessage name="status" class="error-feedback" />
  </div>
  <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>
</Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AdminService from "@/services/admin.service"

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:monan"],
  props: {
    Monan: { type: Object, required: true },
  },
  data() {
    const MonanFormSchema = yup.object().shape({
      MA_MOTA: yup.string().required("Mô tả phải có giá trị."),
      // DM_MA: yup.string().required("DM_MA phải có giá trị."),
      MA_TRANGTHAI: yup.string().required("Trạng thái chế biến món ăn phải có giá trị."),
    });

    return {
      food: this.Monan,
      MonanFormSchema,
      DM_MA: {}
    };
  },

  methods: {
    async getDMMA() {
      try {
        this.DM_MA = await AdminService.getDMMA();
        this.message = "Thao tác thành công!";
      } catch (error) {
        console.error(error);
        this.message = "Đã xảy ra lỗi."; 
      }
    },
    submitMonan() {
      this.$emit("submit:monan", this.food);
    },
  },
  created() {
    this.getDMMA();
  }
};
</script>

<style scoped>
@import "@/assets/css/form.css";
</style>
