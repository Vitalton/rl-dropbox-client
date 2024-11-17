import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import {ChevronRight} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {memo, useMemo} from "react";
// import startCase from "lodash/startCase"; // Uncomment if lodash is added

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Функция для преобразования имени из URL в читаемую строку (например, /profile -> Профиль)
    const formatBreadcrumb = (value) => {
        // return startCase(value); // Используйте, если lodash подключен
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    const dynamicBreadcrumbs = useMemo(
        () =>
            pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                    <BreadcrumbItem key={to} isCurrentPage={index === pathnames.length - 1}>
                        <BreadcrumbLink as={Link} to={to}>
                            {formatBreadcrumb(value)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            }),
        [pathnames]
    );

    return (
        <Breadcrumb
            separator={<ChevronRight size={14} color="gray"/>}
            spacing="8px"
            mb={3}
        >
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {dynamicBreadcrumbs}
        </Breadcrumb>
    );
};


export default memo(Breadcrumbs);
