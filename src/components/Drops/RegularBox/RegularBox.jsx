import styles from "./RegularBox.module.scss";
import {Box} from "@chakra-ui/react";
import {memo, useMemo} from "react";
import {boxes, content, defineBox} from "@/components/Drops/boxTypes.js";
import DropBox from "@/components/Drops/Box/DropBox.jsx";
import {useFormDrops} from "@/stores";

const filterBox = (array, box_variant) => {
    if (Object.keys(array).includes(box_variant)) {
        return content.filter((item) => array[box_variant].includes(item.quality));
    } else return content;
};

const RegularBox = () => {
    console.log("render: RegularBox");
    const dropBoxes = useFormDrops(state => state.dropBoxes);

    const regularContainers = useMemo(() => boxes.map((box) => (
        <DropBox
            key={box.box_variant}
            name={box.name}
            imgSrc={box.imgSrc}
            box_variant={box.box_variant}
            filteredContent={filterBox(defineBox, box.box_variant)}
            boxItems={dropBoxes[box.box_variant] || []}
        />
    )), [dropBoxes]);

    return (
        <Box className={styles.boxWrapper}>{regularContainers}</Box>
    );
};

export default memo(RegularBox);