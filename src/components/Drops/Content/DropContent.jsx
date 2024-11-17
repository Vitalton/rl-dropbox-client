import {memo, useEffect, useState} from 'react';
import {
    Box,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import styles from "./DropContent.module.scss";
import {useFormDrops} from "@/stores";
import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge";

const DropContent = ({imgSrc, name, updateItems, content}) => {
    console.log('render: ', name)
    const [count, setCount] = useState(Number(content));

    const resetInput = useFormDrops(state => state.resetInput);
    const onChange = (event) => setCount(Number(event))
    const increment = () => setCount(Number(count) + 1)

    useEffect(() => {
        setCount(content);
    }, [content]);

    useEffect(() => {
        updateItems({quality: name, quantity: count})
    }, [count]);

    useEffect(() => {
        resetInput && setCount(0)
    }, [resetInput]);

    return (
        <Box className={twMerge(styles.wrapper)}>
            <Image src={imgSrc} alt={name} onClick={increment} maxH="8rem"/>
            <NumberInput min={0} max={99} value={count} onChange={onChange} h='100%'>
                <NumberInputField
                    h='full'
                    className={styles.inputField}/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        </Box>
    );
}

DropContent.propTypes = {
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    updateItems: PropTypes.func,
    content: PropTypes.number
};

export default memo(DropContent);