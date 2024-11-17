import {useState} from 'react';
import {Field, Form, Formik} from "formik";
import styles from "./ProfileEditor.module.scss";
import {Button, Checkbox, Input, Text, Box} from "@chakra-ui/react";
import {motion} from "framer-motion";
import theme from "@/theme.js";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Email обязателен"),
    password: Yup.string().min(6, "Пароль должен быть не менее 6 символов").required("Пароль обязателен"),
});

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Email обязателен"),
    password: Yup.string().required("Пароль обязателен"),
});


const ProfileEditor = () => {
    const initialValues = {email: "", password: ""};

    const [show, setShow] = useState(false)

    const handlePassword = () => setShow(!show)

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Box>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignInSchema}
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
                                Электронная почта
                            </Text>
                            <Field
                                as={Input}
                                name="email"
                                type="email"
                                placeholder="Email"
                                borderColor={errors.email && touched.email ? "red.500" : "none"}
                            />
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
                                Сохранить изменения
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignInSchema}
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
                                Пароль
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
                                Сохранить изменения
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default ProfileEditor;