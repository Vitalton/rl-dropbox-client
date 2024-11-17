import styles from "./LineTotal.module.scss";
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Box, Text} from "@chakra-ui/react";
import {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {twMerge} from "tailwind-merge";


const chartConfig = {
    count: {
        label: "Открыто",
        color: "hsl(var(--chart-1))",
    },
}

const LineTotal = ({data = [], label = "", xLine, yLine}) => {
    if (!data) return (
        <Box className={twMerge(styles.wrapper)}>
            <Text className="font-bold text-xl text-center underline underline-offset-8 mb-6">{label}</Text>
            <Text className="font-bold text-lg text-center">Нет данных</Text>
        </Box>
    );
    const chartData = useMemo(() => data, [data])

    return (
        <Box className={twMerge(styles.wrapper)}>
            <Text className="font-bold text-xl text-center underline underline-offset-8 mb-4">{label}</Text>
            <ChartContainer config={chartConfig} className="max-h-[225px] w-full">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 20,
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false}/>
                    <XAxis
                        dataKey={xLine}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
                    />
                    <Line
                        dataKey={yLine}
                        type="natural"
                        stroke={`var(--color-${yLine})`}
                        strokeWidth={3}
                        dot={{
                            fill: `var(--color-${yLine})`,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    >
                        <LabelList
                            position="top"
                            offset={14}
                            className="fill-foreground"
                            fontSize={14}
                        />
                    </Line>
                </LineChart>
            </ChartContainer>
        </Box>
    )
}

LineTotal.propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    xLine: PropTypes.string,
    yLine: PropTypes.string
}


export default memo(LineTotal);