import {memo, useMemo, useState} from 'react';
import styles from './Efficiency.module.scss';
import {Box, Text} from "@chakra-ui/react";
import {CircleChevronDown, CircleChevronLeft, CircleChevronRight, CircleChevronUp} from "lucide-react";
import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge";


const Efficiency = ({isTotal = false, total, lastSeason, prevSeasons}) => {
    if (!total) return (
        <Box className={styles.effectivity}>
            <Text className="font-bold text-xl text-center mb-3">Эффективность</Text>
            <Text className="font-bold text-lg text-center">: Нет данных</Text>
        </Box>
    );
    const totalCoefficient = useMemo(() => Number(total.toFixed(2)), [total])

    if (!isTotal || (!lastSeason && !prevSeasons)) return (
        <Box className={twMerge("justify-center", styles.effectivity)}>
            <Text className="font-bold text-xl">Эффективность</Text>
            <Text className="font-bold text-3xl">: {totalCoefficient}</Text>
        </Box>
    )

    // states
    const [toggleDetail, setToggleDetail] = useState(false);

    // data
    const prevCoefficient = useMemo(() => Number(prevSeasons.toFixed(2)), [prevSeasons])
    const lastCoefficient = useMemo(() => Number(lastSeason.toFixed(2)), [lastSeason])

    const efficiencyChange = useMemo(() => {
        const difference = ((totalCoefficient - prevCoefficient) / prevCoefficient) * 100
        return difference.toFixed(2);
    }, [prevCoefficient, totalCoefficient])

    // handlers
    const toggleDetailHandler = () => {
        setToggleDetail(!toggleDetail)
    }


    return (
        <Box className={twMerge("flex-col justify-center", styles.effectivity)}
             maxH={toggleDetail ? "17rem" : "9rem"}>
            <Box className="w-full flex justify-center items-center pb-3"
                 borderBottom={"2px solid #fff"}>
                <Text className="font-bold text-xl">Эффективность</Text>
                <Text className="font-bold text-3xl">: {totalCoefficient}</Text>
            </Box>
            <Box className={twMerge("mt-3", styles.info, toggleDetail ? styles.show : styles.hide)}>
                <Box>
                    <Text className="text-center underline underline-offset-6">Предыдущие сезоны</Text>
                    <Text className="font-bold text-center text-2xl">{prevCoefficient}</Text>
                </Box>
                <Box>
                    <Text className="text-center underline underline-offset-6">Последний сезон</Text>
                    <Text className="font-bold text-center text-2xl">{lastCoefficient}</Text>
                </Box>
            </Box>
            <Text className="text-center text-md mt-3">Ваша эффективность {efficiencyChange > 0
                ? <span className="font-bold" style={{color: "#00ff00"}}>возросла</span>
                : <span className="font-bold"
                        style={{color: "#ff0000"}}>упала</span>} на <span
                className="font-bold">{Math.abs(Number(efficiencyChange))} %</span>
            </Text>
            {
                toggleDetail ? <CircleChevronUp
                    className={styles.btnDetail}
                    onClick={toggleDetailHandler}
                /> : <CircleChevronDown
                    className={styles.btnDetail}
                    onClick={toggleDetailHandler}
                />
            }
        </Box>
    );
};

Efficiency.propTypes = {
    isTotal: PropTypes.bool,
    total: PropTypes.number,
    lastSeason: PropTypes.number,
    prevSeasons: PropTypes.number
};

export default memo(Efficiency);