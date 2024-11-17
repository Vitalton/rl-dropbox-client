import {Box, Heading, Icon, Text, Tooltip} from "@chakra-ui/react";
import {Link, useMatch} from "react-router-dom";
import styles from "./Sidebar.module.scss";
import {memo} from "react";
import PropTypes from "prop-types";

const NavItem = ({collapse, item}) => {
    const {label} = item;

    if (item.type) {
        if (item.type === "header") {
            return (
                <Heading
                    w='full'
                    color='gray.400'
                    fontWeight='bold'
                    textTransform='uppercase'
                    fontSize='sm'
                    borderTopWidth={1}
                    borderColor='gray.100'
                    pt={collapse ? 8 : 0}
                >
                    <Text display={collapse ? "flex" : "none"}>{label}</Text>
                </Heading>
            );
        }
        if (item.type === "logout") {
            return (
                <Tooltip hasArrow isDisabled={collapse} label={label} placement='right'>
                    <Box className={styles.navLink}>
                        <Icon as={item.icon} className={styles.navIcon}/>
                        {collapse && <Text>{label}</Text>}
                    </Box>
                </Tooltip>
            );
        }
    }

    return (
        <Tooltip hasArrow isDisabled={collapse} label={label} placement='right'>
            <Link className={styles.navLink} to={item.path}>
                <Icon as={item.icon} className={styles.navIcon}/>
                {collapse && <Text>{label}</Text>}
            </Link>
        </Tooltip>
    );


};

NavItem.propTypes = {
    collapse: PropTypes.bool,
    item: PropTypes.object
}

export default memo(NavItem);
