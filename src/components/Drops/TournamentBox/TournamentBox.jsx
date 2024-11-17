import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styles from "@/components/Drops/TournamentBox/TournamentBox.module.scss";
import {Box} from "@chakra-ui/react";
import {content} from "@/components/Drops/boxTypes.js";
import DropContent from "@/components/Drops/Content/DropContent.jsx";
import {useFormDrops} from "@/stores";
import PropTypes from "prop-types";

const TournamentBox = ({boxItems}) => {
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
            content.map((item) => (
                <DropContent
                    key={item.quality}
                    name={item.quality}
                    imgSrc={item.imgSrc}
                    updateItems={updateItems}
                    content={boxItems.find(i => i.quality === item.quality)?.quantity || 0}
                />

            )), [boxItems]
    );

    // effects
    useEffect(() => {
        updateDropBoxes("tournament", items)
    }, [items]);

    return (
        <Box className={styles.contentWrapper}>{contentItems}</Box>
    );
}

TournamentBox.propTypes = {
    boxItems: PropTypes.array
};

export default memo(TournamentBox);