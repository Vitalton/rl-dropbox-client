import {
    Avatar,
    Box,
    Text, Wrap,
} from '@chakra-ui/react'
import styles from './Profile.module.scss'
import {useUser} from "@/stores";
import {twMerge} from "tailwind-merge";
import ChangeEmail from "@/pages/User/Profile/Editor/ChangeEmail.jsx";
import ChangePassword from "@/pages/User/Profile/Editor/ChangePassword.jsx";


const Profile = () => {
    // stores
    const user = useUser(state => state.user)

    // format date
    const date = new Date(user.createdAt);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });


    return (
        <Box className={styles.profileWrapper}>
            <Box className={twMerge(styles.userAvatar, "mb-8")}>
                <Avatar src='https://bit.ly/broken-link' w={'100%'} h={'100%'}/>
            </Box>
            <Box className={styles.userInfo}>
                <Box>
                    <Text
                        className="font-bold text-xl text-slate-500 underline underline-offset-8 mb-2">Электронная
                        почта</Text>
                    <Text className="text-lg">{user.email}</Text>
                </Box>
                <Box>
                    <Text
                        className="font-bold text-xl text-slate-500 underline underline-offset-8 mb-2">Статус
                        аккаунта</Text>
                    <Text className="text-lg">{user.isVerified ? 'Подтверждён' : 'Не подтверждён'}</Text>
                </Box>
                <Box>
                    <Text
                        className="font-bold text-xl text-slate-500 underline underline-offset-8 mb-2">Дата
                        регистрации</Text>
                    <Text className="text-lg">{formattedDate}</Text>
                </Box>

            </Box>
            <ChangeEmail currentEmail={user.email}/>
            <ChangePassword/>
        </Box>
    )
}

export default Profile