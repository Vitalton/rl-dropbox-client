import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import DropContent from "@/components/Drops/Content/DropContent.jsx";
import {Box, Image, Stack, Text} from "@chakra-ui/react";
import styles from "./DropBox.module.scss";
import {useFormDrops} from "@/stores";
import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge";


const DropBox = ({imgSrc, name, box_variant, filteredContent, boxItems}) => {
    console.log('render: ', name)
    // stores
    const updateDropBoxes = useFormDrops(state => state.updateDropBoxes);

    // states
    const [items, setItems] = useState(boxItems);

    // functions
    const updateItems = useCallback((value) => {
        setItems((prevState) => {
            const updatedItems = [...prevState];
            const index = updatedItems.findIndex((i) => i.quality === value.quality);
            if (index === -1 && value.quantity !== 0) updatedItems.push(value)
            else value.quantity === 0 ? updatedItems.splice(index, 1) : updatedItems[index] = value
            return updatedItems;
        });
    }, [])

    const contentItems = useMemo(
        () =>
            filteredContent.map((item) => (
                <DropContent
                    key={item.quality}
                    name={item.quality}
                    imgSrc={item.imgSrc}
                    updateItems={updateItems}
                    content={boxItems.find(i => i.quality === item.quality)?.quantity || 0}
                />
            )),
        [boxItems]
    );

    // effects
    useEffect(() => {
        updateDropBoxes(box_variant, items)
    }, [items]);

    return (
        <Box
            className={twMerge(styles.boxWrapper, (contentItems.length !== 3) && styles.boxGoldWrapper)}
            margin="15px 0"
        >
            <Stack className={styles.boxDesc} marginBottom="25px">
                <Image src={imgSrc} alt={name} boxSize="7rem"/>
                <Text>{name}</Text>
            </Stack>
            <Box className={twMerge(styles.contentDesc, (contentItems.length !== 3) && styles.contentGoldDesc)}>
                {contentItems}
            </Box>
        </Box>
    );
}

DropBox.propTypes = {
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    box_variant: PropTypes.string,
    filteredContent: PropTypes.array,
    boxItems: PropTypes.array
};
export default memo(DropBox);