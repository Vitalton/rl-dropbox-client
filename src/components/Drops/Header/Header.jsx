import styles from './Header.module.scss';
import {Button, Flex, Heading, Radio, RadioGroup, Select, Stack, Text, useToast, VStack} from "@chakra-ui/react";
import {Package, PackageOpen} from "lucide-react";
import {gameSeasons} from "@/components/Drops/boxTypes.js";
import {useEffect, useMemo, useState} from "react";
import {useDrops, useFormDrops} from "@/stores";
import theme from "@/theme.js";


const Header = () => {
    console.log('render: Header')
    // Stores
    const [seasonsOfUser, getSeason, getCompletedSeasons] = useDrops((state) => ([
        state.seasonsOfUser,
        state.getSeason,
        state.getCompletedSeasons
    ]));
    const [
        setSelectedSeason,
        setSelectedMode,
        setSeasonId,
        updateDropBoxes,
        selectedSeason,
        selectedMode,
        clearBoxData,
        resetInputFlag,
        setDropBoxes
    ] = useFormDrops((state) => ([
        state.setSelectedSeason,
        state.setSelectedMode,
        state.setSeasonId,
        state.updateDropBoxes,
        state.selectedSeason,
        state.selectedMode,
        state.clearBoxData,
        state.resetInputFlag,
        state.setDropBoxes
    ]));

    // States
    const [mode, setMode] = useState(selectedMode);
    const seasonsArray = useMemo(() => {
        return mode === 'create' ? gameSeasons.filter((season) => !seasonsOfUser.includes(season)) : seasonsOfUser;
    }, [mode, seasonsOfUser]);
    const [season, setSeason] = useState(selectedSeason || seasonsArray[0]);


    // Service Hooks
    const toast = useToast();


    // Effects
    useEffect(() => {
        getCompletedSeasons()
    }, []);

    useEffect(() => {
        setMode(selectedMode)
    }, [selectedMode]);


    useEffect(() => {
        setSelectedSeason(seasonsArray[0]);
    }, [seasonsArray, mode, setSelectedSeason]);


    // Actions
    const handleModeChange = (value) => {
        if (value === 'update' && seasonsOfUser.length === 0) {
            toast({
                description: "Сначала создайте сезон",
                isClosable: true,
                status: "warning",
                duration: 2000,
            })
        } else {
            if (value === 'create') {
                clearBoxData()
                resetInputFlag()
            }
            setSelectedMode(value);
            setMode(value)
        }
    };

    const handleSeasonChange = (event) => {
        const newSeason = Number(event.target.value);
        setSelectedSeason(newSeason)
        setSeason(newSeason);
    };

    const handleFilterBtn = async () => {
        if (mode === 'update') {
            const response = await getSeason(selectedSeason);
            if (response.status && response.message) toast({
                title: response.status,
                description: response.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            else {
                setDropBoxes({});
                setSeasonId(response.id);
                response.boxes.forEach((box) => {
                    let nameBox = ''
                    if (box.type === 'tournament') nameBox = box.type
                    else nameBox = box.box_variant
                    updateDropBoxes(nameBox, box.items)
                });
            }
        }
    };

    return (
        <>
            <Heading className={styles.title} marginBottom="20px">
                <Package size={50}/>Лутбоксы от RocketLeague<PackageOpen size={50}/>
            </Heading>

            <Flex
                className={styles.wrapper}
                bg={theme.variables.sectionBgColor}
            >
                <VStack>
                    <Text textAlign='center' textDecor='underline'>Выберите дейстие</Text>
                    <RadioGroup
                        onChange={handleModeChange}
                        value={mode}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'end',
                        }}
                    >
                        <Stack direction='row' gap={15}>
                            <Radio value='create'>Создать</Radio>
                            <Radio value='update'>Изменить</Radio>
                        </Stack>
                    </RadioGroup>
                </VStack>
                <VStack>
                    <Text textAlign='center' textDecor='underline'>Выберите сезон</Text>
                    <Select
                        value={season}
                        onChange={handleSeasonChange}
                        isRequired
                        width='auto'
                    >
                        {seasonsArray.map((season) => (
                            <option
                                key={season}
                                value={season}
                            >
                                {season}
                            </option>
                        ))}
                    </Select>
                </VStack>
                {
                    mode === 'update' &&
                    <Button onClick={handleFilterBtn} w='auto' m='0 auto' className="border-2">Применить</Button>
                }
            </Flex>
        </>
    );
};


export default Header;