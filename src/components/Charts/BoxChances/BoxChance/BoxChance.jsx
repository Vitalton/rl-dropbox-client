import {memo, useMemo} from 'react';
import styles from './BoxChance.module.scss';
import {boxes, content, defineBox} from "@/components/Drops/boxTypes.js";
import PropTypes from "prop-types";
import {Box, Image, Stack, Text} from "@chakra-ui/react";
import {qualityLabel} from "@/components/Charts/variables.js";
import {twMerge} from "tailwind-merge";


const BoxChance = ({data = {}, label = ""}) => {
    // data.sort((a, b) => defaultOrder.indexOf(a.quality) - defaultOrder.indexOf(b.quality))

    const boxLogo = useMemo(() => boxes.find(item => item.box_variant === label).imgSrc, [label])
    const contentItems = useMemo(() => {
        const box = defineBox[label];
        const filteredItems = box ? content.filter(contentItem => box.includes(contentItem.quality)) : content
        return filteredItems.map((item, index) =>
            <Box
                key={index}
                className={twMerge("grid place-items-center gap-2", !data[item.quality] && "opacity-35")}
            >
                <Image src={item.imgSrc} alt={item.quality} maxH="7rem"/>
                <Text className={styles.percentage}>{data[item.quality] || 0} %</Text>
            </Box>
        )
    }, [data])

    return (
        <Box className={twMerge(styles.wrapper, (label === "golden") && styles.wrapperLg)}>
            <Stack className={styles.descWrapper}>
                <Image src={boxLogo} alt={label} boxSize="7rem"/>
                <Text className="font-bold text-xl">{qualityLabel[label]} контейнер</Text>
            </Stack>
            <Box className={twMerge(styles.contentWrapper, (label === "golden") && styles.contentWrapperLg)}>
                {contentItems}
            </Box>
        </Box>
    );
};

BoxChance.propTypes = {
    data: PropTypes.object,
    label: PropTypes.string
}

export default memo(BoxChance);