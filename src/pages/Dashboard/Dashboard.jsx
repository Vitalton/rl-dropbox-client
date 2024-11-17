import {useEffect, useState} from 'react';
import {useDrops, useStats} from "@/stores";
import {Box, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, useToast} from "@chakra-ui/react";
import {labels} from "@/components/Charts/variables.js";
import theme from "@/theme.js";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper.jsx";


const Dashboard = () => {
    const toast = useToast();
    // stores
    const [
        totalByQuality,
        totalBySeasons,
        totalProbabilityByContent,
        getTotalProbabilityByContent,
        getTotalByQuality,
        getTotalBySeasons
    ] = useStats(state => ([
        state.totalByQuality,
        state.totalBySeasons,
        state.totalProbabilityByContent,
        state.getTotalProbabilityByContent,
        state.getTotalByQuality,
        state.getTotalBySeasons
    ]))
    const getCompletedSeasons = useDrops(state => state.getCompletedSeasons)

    // states
    const [loading, setLoading] = useState(false);

    // effects
    useEffect(() => {
        // Функция для параллельного вызова методов после авторизации
        const loadData = async () => {
            try {
                setLoading(true);
                const res = await getTotalByQuality()
                if (res && res.status === 500) toast({
                    description: res.message,
                    isClosable: true,
                    status: "error",
                    duration: 2000,
                })

                // Параллельный вызов методов fetchData1 и fetchData2
                await Promise.all([getTotalBySeasons(), getTotalProbabilityByContent(), getCompletedSeasons()]);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
            } finally {
                setLoading(false);
            }
        };

        // Вызов функции загрузки данных сразу после авторизации
        loadData();
    }, [getCompletedSeasons, getTotalByQuality, getTotalBySeasons, getTotalProbabilityByContent]);

    if (loading) return <Box><Spinner size='xl'/></Box>

    return (
        <Box>
            <Tabs isFitted variant='unstyled'>
                <TabList>
                    <Tab fontSize="1.5rem"
                         border={"2px solid " + theme.variables.cardBgColor}
                         _selected={{
                             bg: theme.variables.cardBgColor,
                             borderColor: "#ffffff"
                         }}
                    >{labels.regular}</Tab>
                    <Tab fontSize="1.5rem"
                         border={"2px solid " + theme.variables.cardBgColor}
                         _selected={{
                             bg: theme.variables.cardBgColor,
                             borderColor: "#ffffff"
                         }}
                    >{labels.tournament}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel padding="1rem 0">
                        <SectionWrapper
                            isTotal
                            variant="regular"
                            byQuality={totalByQuality?.regular}
                            bySeasons={totalBySeasons?.regular}
                            probabilityByContent={totalProbabilityByContent}
                        />
                    </TabPanel>
                    <TabPanel padding="1rem 0">
                        <SectionWrapper
                            isTotal
                            variant="tournament"
                            byQuality={totalByQuality?.tournament}
                            bySeasons={totalBySeasons?.tournament}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Dashboard;