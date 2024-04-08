<template>
  <div class="container">
    <Form @submit="submitHoaDon" :validation-schema="HoaDonFormSchema">

      <!-- {{ HoaDon }} -->

      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="NV_MA">Mã nhân viên<span class="required">*</span></label>
            <Field name="NV_MA" type="text" class="form-control" v-model="bill.NV_MA" required />
            <ErrorMessage name="NV_MA" class="error-feedback" />
          </div>

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
            <label for="HD_TRANGTHAI">Đã thanh toán<span class="required">*</span></label>
            <Field name="HD_TRANGTHAI" type="checkbox" class="" v-model="bill.HD_TRANGTHAI" value="1" true-value="Đã thanh toán" false-value="Chưa thanh toán" required />
            <ErrorMessage name="HD_TRANGTHAI" class="error-feedback" />
          </div>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>

    </Form>
  </div>
</template>

<script>

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// import AdminService from "@/services/admin.service"

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:hoaDon"],
  props: {
    HoaDon: { type: Object, required: true },
  },
  data() {
    const HoaDonFormSchema = yup.object().shape({
      // HD_MA: yup.string().required("Mã hóa đơn phải có giá trị."),
    });

    return {
      bill: this.HoaDon,
      HoaDonFormSchema,
    };
  },

  methods: {
    submitHoaDon() {
      this.$emit("submit:hoaDon", this.bill);
    },
   
  },
};

</script>

<style scoped>
@import "@/assets/css/form.css";
</style>
