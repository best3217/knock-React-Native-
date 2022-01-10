import * as yup from "yup";

export const editProfileValidationSchema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
});
