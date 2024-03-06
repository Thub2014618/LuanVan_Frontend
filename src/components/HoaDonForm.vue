<template>
  <div class="container">
    <Form @submit="submitHoaDon" :validation-schema="HoaDonFormSchema">

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
            <label for="HD_TONGTIEN">Tổng tiền<span class="required">*</span></label>
            <Field name="HD_TONGTIEN" type="number" class="form-control" v-model="bill.HD_TONGTIEN" required />
            <ErrorMessage name="HD_TONGTIEN" class="error-feedback" />
          </div>

          <div class="form-group">
            <label for="HD_TRANGTHAI">Đã thanh toán<span class="required">*</span></label>
            <Field name="HD_TRANGTHAI" type="checkbox" class="" v-model="bill.HD_TRANGTHAI" value="1" true-value="Đã thanh toán" false-value="Chưa thanh toán" required />
            <ErrorMessage name="HD_TRANGTHAI" class="error-feedback" />
          </div>
        </div>
      </div>

      <!-- <div class="">
        <table>
          <thead>
            <tr>
              <th>MA_MA</th>
              <th>CTHD_SOLUONG</th>
              <th>CTHD_DONGIA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" name="MA_MA" placeholder="Nhập mã mặt hàng"></td>
              <td><input type="number" name="CTHD_SOLUONG" placeholder="Nhập số lượng"></td>
              <td><input type="number" name="CTHD_DONGIA" placeholder="Nhập đơn giá"></td>
            </tr>
          </tbody>
        </table>
    <button type="button" @:click=addRow()>Thêm dòng</button>
    <button type="button" @:click=deleteRow()>Xóa dòng</button>
    <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>
      </div> -->
      
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
      this.$emit("submit:hoadon", this.bill);
    },
    addRow() {
      // Lấy tham chiếu của table
      var table = document.getElementsByTagName("table")[0];

      // Lấy tham chiếu của tbody
      var tbody = table.getElementsByTagName("tbody")[0];

      // Tạo một thẻ <tr> mới
      var newRow = document.createElement("tr");

      // Tạo các thẻ <td> và <input> mới
      var newCell1 = document.createElement("td");
      var newInput1 = document.createElement("input");
      newInput1.type = "text";
      newInput1.name = "MA_MA";
      newInput1.placeholder = "Nhập mã mặt hàng";

      var newCell2 = document.createElement("td");
      var newInput2 = document.createElement("input");
      newInput2.type = "number";
      newInput2.name = "CTHD_SOLUONG";
      newInput2.placeholder = "Nhập số lượng";

      var newCell3 = document.createElement("td");
      var newInput3 = document.createElement("input");
      newInput3.type = "number";
      newInput3.name = "CTHD_DONGIA";
      newInput3.placeholder = "Nhập đơn giá";

      // Thêm các thẻ <input> vào các thẻ <td>
      newCell1.appendChild(newInput1);
      newCell2.appendChild(newInput2);
      newCell3.appendChild(newInput3);

      // Thêm các thẻ <td> vào thẻ <tr>
      newRow.appendChild(newCell1);
      newRow.appendChild(newCell2);
      newRow.appendChild(newCell3);

      // Thêm thẻ <tr> vào thẻ <tbody>
      tbody.appendChild(newRow);
    },
    deleteRow() {
      // Lấy tham chiếu của table
      var table = document.getElementsByTagName("table")[0];
      // Lấy tham chiếu của tbody
      var tbody = table.getElementsByTagName("tbody")[0];
      // Lấy số lượng dòng hiện có
      var rowCount = tbody.rows.length;
      // Nếu số lượng dòng lớn hơn 1, xóa dòng cuối cùng
      if (rowCount > 1) {
        tbody.deleteRow(rowCount - 1);
      }
    }
  },
};

 



</script>

<style scoped>
@import "@/assets/css/form.css";
</style>
