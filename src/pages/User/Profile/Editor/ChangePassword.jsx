import * as Yup from "yup";
import {
    Button, Checkbox, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {Field, Form, Formik, useFormikContext} from "formik";
import styles from "@/pages/User/Profile/Profile.module.scss";
import {motion} from "framer-motion";
import theme from "@/theme.js";
import {memo, useId, useState} from "react";
import PropTypes from "prop-types";
import {useUser} from "@/stores";
import {SquarePen} from "lucide-react";

const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Старый пароль обязателен"),
    newPassword: Yup.string().min(6, "Пароль должен быть не менее 6 символов").required("Новый пароль обязателен"),
    confirmPassword: Yup.string().required("Подтверждение пароля обязательно").oneOf([Yup.ref("newPassword"), null], "Пароли не совпадают"),
});

const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const ChangePassword = () => {
    // stores
    const updatePassword = useUser(state => state.updatePassword)

    // states
    const [show, setShow] = useState(false)

    // services hooks
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()


    // handlers
    const handleShow = () => setShow(!show)
    const handleSubmit = async (values, actions) => {
        actions.resetForm();
        const response = await updatePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        });

        if (response.status === 200) {
            toast({
                description: response.message,
                isClosable: true,
                status: "success",
                duration: 2000,
            })
        } else toast({
            description: response.message,
            isClosable: true,
            status: "error",
            duration: 2000,
        })

        actions.setSubmitting(false);
    };


    return (
        <>
            <Button onClick={onOpen} className="border-2">Изменить пароль</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Изменить пароль</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                            validateOnChange={true}  // Enable real-time validation
                            validateOnBlur={true}
                        >
                            {({
                                  errors,
                                  touched,
                                  isSubmitting
                              }) => (
                                <Form className="flex flex-col gap-4">
                                    {(errors.oldPassword && touched.oldPassword) &&
                                        <Text className="text-center text-red-300">{errors.oldPassword}</Text>}
                                    <Field
                                        as={Input}
                                        name="oldPassword"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Старый пароль"
                                        borderColor={
                                            errors.oldPassword && touched.oldPassword
                                                ? 'red.500'
                                                : 'none'
                                        }
                                    />
                                    {(errors.newPassword && touched.newPassword) &&
                                        <Text className="text-center text-red-300">{errors.newPassword}</Text>}
                                    <Field
                                        as={Input}
                                        name="newPassword"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Новый пароль"
                                        borderColor={
                                            errors.newPassword && touched.newPassword
                                                ? 'red.500'
                                                : 'none'
                                        }
                                    />
                                    {(errors.confirmPassword && touched.confirmPassword) &&
                                        <Text className="text-center text-red-300">{errors.confirmPassword}</Text>}
                                    <Field
                                        as={Input}
                                        name="confirmPassword"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Подтвердите пароль"
                                        borderColor={
                                            errors.confirmPassword && touched.confirmPassword
                                                ? 'red.500'
                                                : 'none'
                                        }
                                    />
                                    <Checkbox
                                        isChecked={show}
                                        onChange={handleShow}
                                        colorScheme='blue'
                                    >Показать пароль</Checkbox>
                                    <ModalFooter>
                                        <Button
                                            as={motion.button}
                                            colorScheme="green"
                                            type="submit"
                                            isLoading={isSubmitting}  // Show loading spinner when submitting
                                            variants="solid"
                                            disabled={isSubmitting}  // Disable button during submission

                                        >
                                            Сохранить изменения
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ChangePassword