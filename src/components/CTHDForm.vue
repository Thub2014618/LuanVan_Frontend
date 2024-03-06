<template>
    <div class="container">
        <Form @submit="submitCTHD" :validation-schema="CTHDFormSchema">  
            <table>
                <thead>
                <tr>
                    <th>MA_MA</th>
                    <th>CTHD_SOLUONG</th>
                    <th>CTHD_DONGIA</th>
                    <th>Tổng cộng</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="text" name="MA_MA" placeholder="Nhập mã mặt hàng" v-model="CTHD.MA_MA" required></td>
                    <td><input type="number" name="CTHD_SOLUONG" placeholder="Nhập số lượng" v-model="CTHD.CTHD_SOLUONG" required></td>
                    <td><input type="number" name="CTHD_DONGIA" placeholder="Nhập đơn giá" v-model="CTHD.CTHD_DONGIA" required></td>
                    <!-- <td><input type="number" name="CTHD_TONGCONG" placeholder="Tổng cộng" v-model="CTHD.CTHD_TONGCONG" required >{{ CTHD.DONGIA*CTHD.SOLUONG }}</td> -->

                </tr>
                </tbody>
            </table>
            <button type="button" @:click=addRow()>Thêm dòng</button>
            <button type="button" @:click=deleteRow()>Xóa dòng</button>
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
    emits: ["submit:CTHD"],
    props: {
      CTHD: { type: Object, required: true },
    },
    data() {
      const CTHDFormSchema = yup.object().shape({
        // HD_MA: yup.string().required("Mã hóa đơn phải có giá trị."),
      });
  
      return {
        infor: this.CTHD,
        CTHDFormSchema,
      };
    },
  
    methods: {
      submitCTHD() {
        this.$emit("submit:CTHD", this.infor);
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

        var newCell4 = document.createElement("td");
        var newInput4 = document.createElement("input");
        newInput4.type = "number";
        newInput4.name = "CTHD_TONGCONG";
        newInput4.placeholder = "Tổng cộng";
        newInput4.required = true;
        newInput4.setAttribute("v-model", "CTHD.TONGCONG");
        newInput4.setAttribute(":value", "CTHD_DONGIA * CTHD_SOLUONG");


  
        // Thêm các thẻ <input> vào các thẻ <td>
        newCell1.appendChild(newInput1);
        newCell2.appendChild(newInput2);
        newCell3.appendChild(newInput3);
        newCell4.appendChild(newInput4);

  
        // Thêm các thẻ <td> vào thẻ <tr>
        newRow.appendChild(newCell1);
        newRow.appendChild(newCell2);
        newRow.appendChild(newCell3);
        newRow.appendChild(newCell4);

  
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
  