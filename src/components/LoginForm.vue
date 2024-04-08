<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <Form @submit="submitLogin" :validation-schema="loginFormSchema">
            <h2 class="text-center mt-3">Đăng nhập</h2>

            <div class="form-group">
              <label for="username">Tên đăng nhập</label>
              <Field name="username" type="text" class="form-control" v-model="loginLocal.username" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <Field name="password" type="password" class="form-control" v-model="loginLocal.password" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary">Đăng nhập</button>
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
  emits: ["submit:login"],
  data() {
    const loginFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên đăng nhập phải có giá trị.")
        .min(4, "Tên đăng nhập phải ít nhất 4 ký tự.")
        .max(20, "Tên đăng nhập có nhiều nhất 20 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
        .max(20, "Mật khẩu có nhiều nhất 20 ký tự."),
    });

    return {
      loginLocal: {
        username: "",
        password: "",
      },
      loginFormSchema,
    };
  },
  methods: {
    submitLogin() {
      this.$emit("submit:login", this.loginLocal);
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/form.css";
</style>