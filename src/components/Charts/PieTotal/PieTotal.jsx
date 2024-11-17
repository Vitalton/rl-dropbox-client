import {useMemo} from "react";
import PropTypes from "prop-types";
import {Label, Pie, PieChart} from "recharts"
import {qualityColor, qualityLabel} from "@/components/Charts/variables.js";
import {Box, Text} from "@chakra-ui/react";
import theme from "@/theme.js";
import styles from "./PieTotal.module.scss";
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart.jsx"
import {twMerge} from "tailwind-merge";


const PieTotal = ({legend = false, data = {}, label = "", nameKey, dataKey}) => {
    if (!data) return (
        <Box className={styles.wrapper}>
            <Text className="font-bold text-xl text-center underline underline-offset-8 mb-6">{label}</Text>
            <Text className="font-bold text-lg text-center">Нет данных</Text>
        </Box>
    );

    const chartData = useMemo(() => data?.qualities.map(quality => (
        {...quality, fill: qualityColor[quality.quality]}
    )), [data.qualities]);

    const chartConfig = useMemo(() => {
        const config = {}
        data?.qualities.forEach(quality => config[quality.quality] = {
                label: qualityLabel[quality.quality],
                color: qualityColor[quality.quality]
            }
        )
        return config
    }, [data.qualities]);

    const legendData = useMemo(() => (
        chartData.map((item) => (
            <Box
                key={item.quality}
                className={styles.legendItem}
            >
                <Box h='1rem' w='1rem' style={{backgroundColor: item.fill, borderRadius: theme.variables.cardRadius}}/>
                <Text>{qualityLabel[item.quality]}</Text>-
                <Text className="font-bold text-lg">{item.count}</Text>
            </Box>
        ))
    ), [chartData]);

    return (
        <Box className={styles.wrapper}>
            <Text
                className="font-bold text-xl text-center underline underline-offset-8 col-span-full">{label}</Text>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[225px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel/>}
                    />
                    <Pie
                        data={chartData}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        innerRadius={60}
                        strokeWidth={5}
                        startAngle={180}
                        endAngle={-180}
                    >
                        <Label
                            content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="-translate-y-1"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-4xl font-bold"
                                            >
                                                {data?.totalBoxes}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                Предметов
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
            {legend && <Box className={styles.legend}>{legendData}</Box>}
        </Box>

    )
}

PieTotal.propTypes = {
    legend: PropTypes.bool,
    data: PropTypes.object,
    label: PropTypes.string,
    nameKey: PropTypes.string,
    dataKey: PropTypes.string
}

export default PieTotal
