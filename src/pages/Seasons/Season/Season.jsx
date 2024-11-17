import {memo, useEffect, useState} from "react";
import {Box, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useDrops, useStats} from "@/stores/index.js";
import theme from "@/theme.js";
import SectionWrapper from "@/components/SectionWrapper/SectionWrapper.jsx";
import {useParams} from "react-router-dom";
import {labels} from "@/components/Charts/variables.js";

const Season = () => {
    const {number} = useParams();
// stores
    const [
        seasonByQuality,
        seasonProbabilityByContent,
        getSeasonByQuality,
        getSeasonProbabilityByContent
    ] = useStats(state => ([
        state.seasonByQuality,
        state.seasonProbabilityByContent,
        state.getSeasonByQuality,
        state.getSeasonProbabilityByContent
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

                // Параллельный вызов методов fetchData1 и fetchData2
                await Promise.all([
                    getSeasonByQuality(Number(number)),
                    getSeasonProbabilityByContent(Number(number)),
                    getCompletedSeasons()
                ]);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
            } finally {
                setLoading(false);
            }
        };

        // Вызов функции загрузки данных сразу после авторизации
        loadData();
    }, [getSeasonByQuality, getSeasonProbabilityByContent, getCompletedSeasons, number]);

    if (loading) return <Box><Spinner size='xl'/></Box>

    return (
        <Box>
            <Heading className="text-center mb-8">Сезон {number}</Heading>
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
                            variant="regular"
                            byQuality={seasonByQuality?.regular}
                            probabilityByContent={seasonProbabilityByContent}
                        />
                    </TabPanel>
                    <TabPanel padding="1rem 0">
                        <SectionWrapper
                            variant="tournament"
                            byQuality={seasonByQuality?.tournament}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default memo(Season);