<template>
  <Form @submit="submitCTHD" :validation-schema="CTHDFormSchema">  
    <table>
      <thead>
        <tr>
          <th>MA_MA</th>
          <th>CTHD_SOLUONG</th>
          <th>CTHD_GIA</th>
          <th>Tích</th>
        </tr>
      </thead>
      <td><input type="text" name="HD_MA" placeholder="Nhập mã hóa đơn" v-model="CTHD.HD_MA" ></td>

      <tbody>
        <tr v-for="item in cthdOlds" :key="item.CTHD_MA">
          <td>{{ item.MA_Ten}} </td>
          <td>{{ item.CTHD_SOLUONG}}</td>
          <td>{{ item.CTHD_GIA}}</td>
          <td>{{ item.CTHD_GIA * item.CTHD_SOLUONG }}</td>
        </tr>
        <tr>
          <td>
            <select v-model="CTHD.MA_MA" @change="updatePrice" required>
              <option disabled value="">Vui lòng chọn mã mặt hàng</option>
              <option v-for="item in monAns" :key="item.MA_MA" :value="item.MA_MA">
                {{ item.MA_TEN }}
              </option>
            </select>
          </td>
          <td><input type="number" name="CTHD_SOLUONG" placeholder="Nhập số lượng" v-model="CTHD.CTHD_SOLUONG" required></td>
          <td><input type="number" name="CTHD_GIA" placeholder="Nhập đơn giá" v-model="CTHD.CTHD_GIA" required></td>
          <td><input type="number" name="CTHD_TONG" placeholder="Tổng tiền" :value="total" disabled></td>
        </tr>
      </tbody>
      
    </table>
    <div class="alert-success mt-2 mb-2">
      {{ this.message }}
    </div>
    <button type="submit" class="btn btn-primary"><div class="fa fa-save"></div> Lưu</button>
  </Form>
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
      cthdOlds: { type: Object, required: true },
      monAns: { type: Object, required: true },
      message: {type: String}

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
    computed: {
      total() {
        return this.CTHD.CTHD_SOLUONG * this.CTHD.CTHD_GIA;
      },
    },
  
    methods: {
      submitCTHD() {
        this.$emit("submit:CTHD", this.infor);
      },
      updatePrice() {
        const selectedMonAn = this.monAns.find(item => item.MA_MA === this.CTHD.MA_MA);
        if (selectedMonAn) {
          this.CTHD.CTHD_GIA = selectedMonAn.G_GIA;
        }
      },
    },
  };

</script>
  
<style scoped>
@import "@/assets/css/form.css";
</style>
  