import * as Yup from "yup";
import {
    Button, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import styles from "@/pages/User/Profile/Profile.module.scss";
import {motion} from "framer-motion";
import theme from "@/theme.js";
import {memo} from "react";
import PropTypes from "prop-types";
import {useUser} from "@/stores";
import {SquarePen} from "lucide-react";

const schema = Yup.object().shape({
    email: Yup.string().email("Неверный email").required("Email обязателен"),
});


const ChangeEmail = ({currentEmail}) => {
    // stores
    const updateUser = useUser(state => state.updateUser)

    // states
    const initialValues = {
        email: currentEmail || "",
    };

    // services hooks
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()


    // handlers
    const handleSubmit = async (values, actions) => {
        actions.resetForm();
        const response = await updateUser(values);

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
            <Button onClick={onOpen} className="border-2">Изменить электронную почту</Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Изменить электронная почту</ModalHeader>
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
                                    {(errors.email && touched.email) &&
                                        <Text className="text-center text-red-300">{errors.email}</Text>}
                                    <Field
                                        as={Input}
                                        name="email"
                                        type="email"
                                        placeholder="Электронная почта"
                                        borderColor={errors.email && touched.email ? "red.500" : "none"}
                                    />
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

ChangeEmail.propTypes = {
    currentEmail: PropTypes.string
}

export default memo(ChangeEmail)