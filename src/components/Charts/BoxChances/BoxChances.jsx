import styles from "./BoxChances.module.scss";
import {memo, useMemo} from "react";
import {Box, Text} from "@chakra-ui/react";
import {twMerge} from 'tailwind-merge'
import PropTypes from "prop-types";
import BoxChance from "@/components/Charts/BoxChances/BoxChance/BoxChance.jsx";

const BoxChances = ({data}) => {
    if (!data) return (
        <Box className={twMerge(styles.wrapper)}>
            <Text className="font-bold text-xl text-center underline underline-offset-8">Вероятности</Text>
            <Text className="font-bold text-lg text-center">Нет данных</Text>
        </Box>
    );

    const boxesChances = useMemo(() => data.map((item) =>
        <BoxChance key={item.box_variant} data={item.qualities} label={item.box_variant}/>
    ), [data])

    return (
        <Box className={twMerge(styles.wrapper)}>
            <Text className="font-bold text-xl text-center underline underline-offset-8">Вероятности</Text>
            <Box className={styles.contentWrapper}>{boxesChances}</Box>
        </Box>
    );
};

BoxChances.propTypes = {
    data: PropTypes.array || null
}

export default memo(BoxChances);