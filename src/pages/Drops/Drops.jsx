import styles from "./Drops.module.scss";

// import
import {Box, Button, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast} from "@chakra-ui/react";
import {useDrops, useFormDrops} from "@/stores";
import {Save} from 'lucide-react';
import Header from "@/components/Drops/Header/Header.jsx";
import TournamentBox from "@/components/Drops/TournamentBox/TournamentBox.jsx";
import theme from "@/theme.js";
import RegularBox from "@/components/Drops/RegularBox/RegularBox.jsx";


const Drops = () => {
    console.log('render: Drops')
    // Stores
    const [dropBoxes, selectedSeason, selectedMode, seasonId, resetInputFlag, clearBoxData] = useFormDrops(state => [
        state.dropBoxes,
        state.selectedSeason,
        state.selectedMode,
        state.seasonId,
        state.resetInputFlag,
        state.clearBoxData
    ]);
    const [createSeason, updateSeason, getCompletedSeasons] = useDrops((state) => [
        state.createSeason,
        state.updateSeason,
        state.getCompletedSeasons
    ]);

    // Service hooks
    const toast = useToast()

    // Functions
    const handleSave = async () => {
        try {
            const boxes = []
            Object.values(dropBoxes).forEach((item, index) => {
                if (item.length !== 0) {
                    const box = {
                        items: item
                    }
                    const quality = Object.keys(dropBoxes)[index];
                    if (quality === "tournament") box.type = "tournament"
                    else {
                        box.type = "regular"
                        box.box_variant = quality
                    }
                    boxes.push(box)
                }
            })
            if (boxes.length === 0 && selectedMode === "create") toast({
                description: "Нужно заполнить хотя бы один контейнер",
                isClosable: true,
                status: "error",
                duration: 2000,
            })
            else {
                if (selectedMode === "create") {
                    const response = await createSeason({
                        season_number: selectedSeason,
                        boxes
                    });
                    if (response.status === 201 || response.status === 200) {
                        getCompletedSeasons()
                        clearBoxData()
                        setTimeout(() => {
                            resetInputFlag();
                        }, 0);
                        toast({
                            description: response.message,
                            isClosable: true,
                            status: "success",
                            duration: 2000,
                        })
                    } else toast({
                        description: response.message,
                        isClosable: true,
                        status: "error",
                        duration: 2000,
                    })
                }
                if (selectedMode === "update") {
                    const response = await updateSeason(seasonId, boxes);
                    if (response.status === 200) {
                        getCompletedSeasons()
                        clearBoxData()
                        setTimeout(() => {
                            resetInputFlag();
                        }, 0);

                        toast({
                            description: response.message,
                            isClosable: true,
                            status: "success",
                            duration: 2000,
                        })
                    } else toast({
                        description: response.message,
                        isClosable: true,
                        status: "error",
                        duration: 2000,
                    })
                }
            }
        } catch (error) {
            console.error(error);
            toast({
                description: "Произошла ошибка при сохранении",
                isClosable: true,
                status: "error",
                duration: 2000,
            })
        }
    };


    return (
        <Box className={styles.wrapper} w='full'>
            <Header/>

            <Tabs
                isFitted
                variant="unstyled"
            >
                <TabList
                    mb='2rem'
                >
                    <Tab
                        fontSize="1.5rem"
                        border={"2px solid " + theme.variables.cardBgColor}
                        _selected={{
                            bg: theme.variables.cardBgColor,
                            borderColor: "#ffffff"
                        }}
                    >СЕЗОННЫЕ КОНТЕЙНЕРЫ</Tab>
                    <Tab fontSize="1.5rem"
                         border={"2px solid " + theme.variables.cardBgColor}
                         _selected={{
                             bg: theme.variables.cardBgColor,
                             borderColor: "#ffffff"
                         }}
                    >ТУРНИРНЫЕ КОНТЕЙНЕРЫ</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <RegularBox/>
                    </TabPanel>
                    <TabPanel>
                        <TournamentBox boxItems={dropBoxes["tournament"] || []}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Stack className={styles.footer}>
                <Text color="red">Обратите внимание на содержимое контейнеров! <br/>Контейнеры, которые
                    не
                    содержат <i>НИ ОДНОГО</i> предмета, не будут сохранены.</Text>
                <Button
                    leftIcon={<Save/>}
                    colorScheme='green'
                    variant='solid'
                    mt="15px"
                    onClick={handleSave}
                >
                    Сохранить
                </Button>
            </Stack>
        </Box>
    );
};
export default Drops;
