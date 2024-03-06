<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <Form @submit="submitRegister" :validation-schema="registerFormSchema">
            <h2 class="text-center mt-3">Đăng ký</h2>

            <div class="form-group">
              <label for="username">Tên đăng nhập</label>
              <Field name="username" type="text" class="form-control" v-model="registerLocal.username"/>
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="fullname">Họ và tên</label>
              <Field name="fullname" type="text" class="form-control" v-model="registerLocal.fullname" />
              <ErrorMessage name="fullname" class="error-feedback" />
            </div>

            <div class="form-group">
            <label for="gender">Giới tính (Nam 0 - Nu 1)</label>
            <Field type="text" name="gender" class="form-control" v-model="registerLocal.gender"/>
            <ErrorMessage name="gender" class="error-feedback" />
          </div>



            <div class="form-group">
              <label for="birthday">Ngày sinh</label>
              <Field type="date" name="birthday" class="form-control" v-model="registerLocal.birthday" />
              <ErrorMessage name="birthday" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <Field name="email" type="email" class="form-control" v-model="registerLocal.email" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <Field name="password" type="password" class="form-control" v-model="registerLocal.password" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Xác nhận mật khẩu</label>
              <Field name="confirmPassword" type="password" class="form-control" v-model="registerLocal.confirmPassword" />
              <ErrorMessage name="confirmPassword" class="error-feedback" />
            </div>

            <div class="form-group">
              <button type="submit"  class="btn btn-primary">Đăng ký</button>
              <button type="button" class="ml-2 btn btn-secondary" @click="resetRegister">
                Đặt lại
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
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
  emits: ["submit:register", "reset:register"],
  data() {
    const registerFormSchema = yup.object().shape({
      fullname: yup.string().required("Họ và tên phải có giá trị."),
      gender: yup.number().required("Giới tính phải có giá trị."),
      birthday: yup.date().required("Ngày sinh phải có giá trị."),
      email: yup.string().email("Email không đúng.").required("Email phải có giá trị."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(6, "Mật khẩu phải ít nhất 6 ký tự.")
        .max(20, "Mật khẩu có nhiều nhất 20 ký tự."),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp."),
    });

    return {
      registerLocal: {
        username: "",
        fullname: "",
        gender: "",
        birthday: null,
        password: "",
        },
        registerFormSchema,
      };
    },
  
     methods: {
         submitRegister() {
             this.$emit("submit:register", this.registerLocal);
         },
         resetRegister() {
             this.$emit("reset:register");
         },
     },
 };
</script>
<style scoped>
 @import "@/assets/form.css";
</style>
