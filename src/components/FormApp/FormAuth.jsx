import {memo, useState} from "react";
import {Field, Form, Formik} from "formik";
import {Button, Checkbox, Input, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styles from "./FormAuth.module.scss";
import theme from "@/theme.js";

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Email обязателен"),
    password: Yup.string().min(6, "Пароль должен быть не менее 6 символов").required("Пароль обязателен"),
});

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Email обязателен"),
    password: Yup.string().required("Пароль обязателен"),
});


const FormAuth = ({
                      variant = "signup",
                      handleSubmit,
                      initial = {}
                  }) => {
    const initialValues = {email: "", password: "", ...initial};
    const [show, setShow] = useState(false)
    const handlePassword = () => setShow(!show)
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={variant === "signup" ? SignUpSchema : SignInSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}  // Enable real-time validation
            validateOnBlur={true}
        >
            {({
                  errors,
                  touched,
                  isSubmitting
              }) => (
                <Form className={styles.form}>
                    <Text className="text-3xl mb-8 text-center font-bold">
                        {variant === "signup" ? "Регистрация" : "Вход"}
                    </Text>
                    <Field
                        as={Input}
                        name="email"
                        type="email"
                        placeholder="Email"
                        borderColor={errors.email && touched.email ? "red.500" : "none"}
                    />
                    <Field
                        as={Input}
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="Пароль"
                        borderColor={errors.password && touched.password ? "red.500" : "none"}
                    />
                    <Checkbox
                        isChecked={show}
                        onChange={handlePassword}
                        colorScheme='blue'
                    >Показать пароль</Checkbox>
                    <Button
                        as={motion.button}
                        className={styles.formBtnSubmit}
                        colorScheme="white"
                        color={theme.variables.blue.semibold}
                        type="submit"
                        isLoading={isSubmitting}  // Show loading spinner when submitting
                        variants="solid"
                        disabled={isSubmitting}  // Disable button during submission
                    >
                        {variant === "signup" ? "Зарегистрироваться" : "Войти"}
                    </Button>
                </Form>
            )}
        </Formik>

    );
};

FormAuth.propTypes = {
    variant: PropTypes.oneOf(["signup", "signin"]),
    handleSubmit: PropTypes.func,
    initial: PropTypes.object
};

export default memo(FormAuth);