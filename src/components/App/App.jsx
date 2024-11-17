import {useState} from "react";
import "./App.scss";
import theme from "../../theme.js";
import {Flex, HStack} from "@chakra-ui/react";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {useUser} from "@/stores/index.js";
import Dashboard from "@/pages/Dashboard/Dashboard.jsx";
import Sidebar from "@/components/Sidebar/Sidebar.jsx";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.jsx";
import Profile from "@/pages/User/Profile/Profile.jsx";
import Drops from "@/pages/Drops/Drops.jsx";
import Statistics from "@/pages/Statistics/Statistics.jsx";
import Season from "@/pages/Seasons/Season/Season.jsx";
import Seasons from "@/pages/Seasons/Seasons.jsx";
import Auth from "@/pages/User/Auth/Auth.jsx";

const App = () => {
    const isAuth = useUser(state => state.isAuth);
    const [collapse, setCollapse] = useState(false);

    // Определение роутов с `handle` для использования в `Breadcrumbs`
    const routes = [
        {
            path: "/",
            element: (
                <HStack w="100vw" h="100vh" gap={0}>
                    <Flex as="aside" maxW={collapse ? 200 : 70} bg={theme.variables.sectionBgColor}>
                        <Sidebar collapse={collapse}/>
                    </Flex>
                    <Flex as="main">
                        <Breadcrumbs/>
                        <Flex direction="column" w="full">
                            <Outlet/>
                        </Flex>
                    </Flex>
                </HStack>
            ),
            children: [
                {path: "/", element: <Dashboard/>, handle: {breadcrumb: "Главная"}},
                {path: "/profile", element: <Profile/>, handle: {breadcrumb: "Профиль"}},
                {path: "/drops", element: <Drops/>, handle: {breadcrumb: "Контейнеры"}},
                {path: "/stats", element: <Statistics/>, handle: {breadcrumb: "Статистика"}},
                {path: "/stats/seasons", element: <Seasons/>, handle: {breadcrumb: "Сезоны"}},
                {path: "/stats/seasons/:number", element: <Season/>, handle: {breadcrumb: "Сезон"}},
                {path: "*", element: <Navigate to="/"/>}
            ]
        }
    ];

    // Создаем роутер с учетом авторизации
    const router = createBrowserRouter(
        isAuth ? routes : [
            {path: "/auth", element: <Auth/>},
            {path: "*", element: <Navigate to="/auth"/>}
        ]
    );

    return (
        <RouterProvider router={router}/>
    );
};

export default App;
