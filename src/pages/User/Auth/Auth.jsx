import {useState} from "react";
import {Box, Button, Text, useToast} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useUser} from "@/stores";
import styles from "./Auth.module.scss";
import FormAuth from "@/components/FormApp/FormAuth.jsx";

const Auth = () => {
    // stores
    const [register, login] = useUser(state => [state.register, state.login]);

    // states
    const [isSignUp, setIsSignUp] = useState(false);

    // services hooks
    const toast = useToast();
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    }

    const handleSubmit = async (values, actions) => {
        actions.resetForm();
        const response = isSignUp ? await register(values) : await login(values);
        const title = isSignUp ? "Регистрация" : "Авторизация";


        if (response.status === 200 || response.status === 201) {
            toast({
                title: title,
                description: response.message,
                isClosable: true,
                status: "success",
                duration: 2000,
            })
            navigate("/")
        } else toast({
            description: response.message,
            isClosable: true,
            status: "error",
            duration: 2000,
        })

        actions.setSubmitting(false);
    };

    return (
        <Box h="100vh" className="grid place-items-center">
            <Box className={styles.wrapper}>
                <Box
                    as={motion.div}
                    variants={{
                        visible: {x: "-100%"},
                        hidden: {x: 0},
                    }}
                    animate={isSignUp ? "visible" : "hidden"}
                    transition={{duration: 2, ease: "easeInOut"}}
                    borderRadius={isSignUp ? " 0px 10rem 5rem 0px " : "10rem 0px 0px 5rem"}
                    className={styles.togglePanel}
                >
                    {isSignUp ? (
                        <>
                            <Text className="text-3xl mb-4">
                                Уже есть аккаунт?
                            </Text>
                            <Text className="mb-6">Авторизуйтесь, для использования функционала сайта</Text>
                            <Button
                                className={styles.toggleBtn}
                                colorScheme='purple.600'
                                variant="solid"
                                color="purple.50"
                                onClick={handleToggle}
                            >
                                Войти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text className="text-3xl mb-4">
                                Ещё нет аккаунта?
                            </Text>
                            <Text className="mb-6">Зарегистрируйтесь, для использования функционала сайта</Text>
                            <Button
                                className={styles.toggleBtn}
                                colorScheme='purple.600'
                                variant="solid"
                                color="purple.50"
                                onClick={handleToggle}
                            >
                                Регистрация
                            </Button>

                        </>
                    )}
                </Box>

                <Box className={styles.toggleBody}>

                    {/* Sign In Form */}
                    <Box
                        as={motion.div}
                        variants={{
                            visible: {x: 0, zIndex: 2, opacity: 1},
                            hidden: {x: "100%", zIndex: -1, opacity: 0},
                        }}
                        animate={isSignUp ? "hidden" : "visible"}
                        transition={{duration: 2, ease: "easeInOut"}}
                        className={styles.formWrapper}
                    >
                        <FormAuth variant="signin" handleSubmit={handleSubmit}/>
                    </Box>

                    {/*Sign Up Form */}
                    <Box
                        as={motion.div}
                        variants={{
                            visible: {x: "100%", zIndex: 2, opacity: 1},
                            hidden: {x: 0, zIndex: -1, opacity: 0},
                        }}
                        animate={isSignUp ? "visible" : "hidden"}
                        transition={{duration: 2, ease: "easeInOut"}}
                        className={styles.formWrapper}
                    >
                        <FormAuth variant="signup" handleSubmit={handleSubmit}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Auth;