import {memo} from 'react';
import PropTypes from "prop-types";
import PieTotal from "@/components/Charts/PieTotal/PieTotal.jsx";
import {Box, Text} from "@chakra-ui/react";
import styles from "./SectionWrapper.module.scss";
import BarTotal from "@/components/Charts/BarTotal/BarTotal.jsx";
import Efficiency from "@/components/Charts/Efficiency/Efficiency.jsx";
import LineTotal from "@/components/Charts/LineTotal/LineTotal.jsx";
import BoxChances from "@/components/Charts/BoxChances/BoxChances.jsx";

const SectionWrapper = (
    {
        variant = "",
        isTotal = false,
        byQuality,
        bySeasons,
        probabilityByContent
    }
) => {
    // states
    if (!byQuality || !byQuality.total) {
        return <Box className={styles.wrapper} flexDirection="column" alignItems="center">
            <Text>Нет данных</Text>
        </Box>
    }

    // values
    return (
        <Box className={styles.wrapper}>
            <Efficiency
                isTotal={isTotal}
                total={byQuality?.efficiency?.total}
                lastSeason={byQuality?.efficiency?.lastSeason || null}
                prevSeasons={byQuality?.efficiency?.prevSeasons || null}
            />
            <PieTotal legend data={byQuality?.total} nameKey="quality" dataKey="count"
                      label="Качество"/>
            <BarTotal data={byQuality?.chances || null} label="Шанс выпадения, %" xLine="quality"
                      yLine="chance"/>
            {variant === "regular" && <BoxChances data={probabilityByContent}/>}
            {isTotal && <LineTotal data={bySeasons?.seasons || null} label="Сезонный прогрес" xLine="season"
                                   yLine="count"/>}
        </Box>
    );
};

SectionWrapper.propTypes = {
    variant: PropTypes.string,
    isTotal: PropTypes.bool,
    byQuality: PropTypes.object,
    bySeasons: PropTypes.object,
    probabilityByContent: PropTypes.array
}

export default memo(SectionWrapper);