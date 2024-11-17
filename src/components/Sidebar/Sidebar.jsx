import {Flex} from "@chakra-ui/react";
import NavItem from "@/components/Sidebar/NavItem";
import {Box as BoxIcon, ChartLine, House, LogOut, UserRound} from "lucide-react";
import styles from "./Sidebar.module.scss";
import {useNavigate} from "react-router-dom";
import {useDrops, useFormDrops, useStats, useUser} from "@/stores";
import {twMerge} from "tailwind-merge";
import {memo} from "react";
import PropTypes from "prop-types";

const items = [
    {
        label: "Главная",
        icon: House,
        path: "/",
    },
    {
        label: "Контейнеры",
        icon: BoxIcon,
        path: "/drops",
    },
    {
        label: "Статистика",
        icon: ChartLine,
        path: "/stats/seasons",
    },
    {
        type: "header",
        label: "Аккаунт",
    },
    {
        label: "Профиль",
        icon: UserRound,
        path: "/profile",
    },
    {
        type: "logout",
        label: "Выйти",
        icon: LogOut,
    }
];


const Sidebar = ({collapse}) => {
    // stores
    const logout = useUser(state => state.logout)
    const clearDrops = useDrops(state => state.clearDrops)
    const clearFormDrops = useFormDrops(state => state.clearFormDrops)
    const clearStats = useStats(state => state.clearStats)

    // services hooks
    const navigate = useNavigate()

    // functions
    const handleLogout = () => {
        logout()
        clearDrops()
        clearFormDrops()
        clearStats()
        localStorage.clear()
        navigate('/auth')
    }

    return (
        <Flex w="full" className={styles.navList} margin="1.5rem 0">
            {
                items.map((item, index) => {
                    if (index === items.length - 1) {
                        return <Flex
                            key={index}
                            w="full"
                            className={styles.navItem}
                            justifyContent={collapse ? "left" : "center"}
                            position="absolute"
                            bottom={25}
                            right={0}
                            onClick={handleLogout}
                        >
                            <NavItem item={item} collapse={collapse}/>
                        </Flex>
                    }
                    const isActive = location.pathname === item.path;
                    return <Flex
                        w="full"
                        key={index}
                        className={twMerge(styles.navItem, isActive && styles.active)}
                        justifyContent={collapse ? "left" : "center"}
                    >
                        <NavItem item={item} collapse={collapse}/>
                    </Flex>
                })
            }

        </Flex>
    )
};

Sidebar.propTypes = {
    collapse: PropTypes.bool
}

export default memo(Sidebar)