import * as yup from "yup";
import {
  nameNotLongEnough,
  invalidEmail,
  passwordNotLongEnough,
} from "../modules/user/register/errorMessages";


const fullName = yup.string().min(4, nameNotLongEnough);
const email = yup.string().max(255).email(invalidEmail);
const password = yup.string().min(3, passwordNotLongEnough);

export const userRegistrationRules = yup.object().shape({
  fullName,
  email,
  password,
});

// User Authentication Validation Schema
export const UserAuthenticationRules = yup.object().shape({
    email,
    password
});
