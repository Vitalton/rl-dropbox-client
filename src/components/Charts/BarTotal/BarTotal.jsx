import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from "recharts"

import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {memo, useMemo} from "react";
import styles from "./BarTotal.module.scss";
import {Box, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {qualityColor, qualityLabel} from "@/components/Charts/variables.js";
import {twMerge} from "tailwind-merge";

const BarTotal = ({data = [], label = "", xLine, yLine,}) => {
    if (!data) return (
        <Box className={styles.wrapper}>
            <Text className="font-bold text-xl text-center underline underline-offset-8 mb-6">{label}</Text>
            <Text className="font-bold text-lg text-center">Нет данных</Text>
        </Box>
    );
    const chartData = useMemo(() => data.map(item => ({
        ...item,
        fill: qualityColor[item.quality],
        [yLine]: Number(item[yLine])
    })), [data])

    const chartConfig = useMemo(() => {
        const config = {}
        data.forEach(item => {
            config[item.quality] = {label: qualityLabel[item.quality], color: qualityColor[item.quality]}
        })
        return config
    }, [data])

    return (
        <Box className={styles.wrapper}>
            <Text className="font-bold text-xl text-center underline underline-offset-8 mb-6">{label}</Text>
            <ChartContainer config={chartConfig} className="max-h-[300px]">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 20,
                    }}
                >
                    <CartesianGrid vertical={false}/>
                    <XAxis
                        dataKey={xLine}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => qualityLabel[value]}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
                    />
                    <Bar dataKey={yLine} radius={10}>
                        <LabelList
                            dataKey={yLine}
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </Box>
    )
}

BarTotal.propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    xLine: PropTypes.string,
    yLine: PropTypes.string
}

export default memo(BarTotal)
