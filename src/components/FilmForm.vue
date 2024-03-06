<template>
  <div class="container">
    <Form @submit="submitFilm" :validation-schema="filmFormSchema">
      <div class="form-group">
        <label for="cover_image">Hình ảnh bìa của film<span class="required">*</span></label>
        <Field name="cover_image" type="text" class="form-control" v-model="filmLocal.cover_image" required/>
        <ErrorMessage name="cover_image" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="name">Tên của film<span class="required">*</span></label>
        <Field name="name" type="text" class="form-control" v-model="filmLocal.name" required/>
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="description">Mô tả nội dung của film</label>
        <Field name="description" type="text" class="form-control" v-model="filmLocal.description"/>
        <ErrorMessage name="description" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="length">Thời lượng của film<span class="required">*</span></label>
        <Field name="length" type="number" class="form-control" v-model="filmLocal.length" required min="1"/>
        <ErrorMessage name="length" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="release_year">Năm phát hành của film<span class="required">*</span></label>
        <Field name="release_year" type="number" class="form-control" v-model="filmLocal.release_year" required min="1900" max="2023"/>
        <ErrorMessage name="release_year" class="error-feedback" />
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
  emits: ["submit:film"],
  props: {
    film: { type: Object, required: true }
  },
  data() {
    const filmFormSchema = yup.object().shape({
      cover_image: yup
        .mixed()
        .required("Hình ảnh bìa của film phải có giá trị."),
      name: yup
        .string()
        .required("Tên của film phải có giá trị.")
        .max(100, "Tên của film tối đa 100 ký tự."),
      description: yup.string().max(500, "Mô tả nội dung của film tối đa 500 ký tự."),
      length: yup
        .number()
        .required("Thời lượng của film phải có giá trị.")
        .min(1, "Thời lượng của film phải lớn hơn 0."),
      release_year: yup
        .number()
        .required("Năm phát hành của film phải có giá trị.")
        .min(1900, "Năm phát hành của film phải lớn hơn hoặc bằng 1900.")
        .max(2023, "Năm phát hành của film phải nhỏ hơn hoặc bằng 2023."),
    });
    return {       
      // Đặt giá trị ban đầu cho filmLocal hoặc truyền film như một props
      // filmLocal: {
      //   cover_image: 'https://th.bing.com/th/id/OIP.au5oa0yk7aN4BGnMEK75fwHaGq?w=192&h=180&c=7&r=0&o=5&pid=1.7',
      //   name: '',
      //   description: '',
      //   length: 90,
      //   release_year: 2023
      // }, 
      filmLocal: this.film,
      filmFormSchema,
    };
  },
  
  methods: {
    submitFilm() {
      this.$emit("submit:film", this.filmLocal);
    },
   
    // handleFileUpload(event) {
    //   let file = event.target.files[0];
    //   let reader = new FileReader();
    //   reader.onload = (e) => {
    //       this.filmLocal.cover_image = e.target.result;
    //   };
    //   reader.readAsDataURL(file);
    // } 

  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
