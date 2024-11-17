import styles from "./Seasons.module.scss";
import {Box, Heading, Text} from "@chakra-ui/react";
import {Link, Outlet, useParams} from "react-router-dom";
import {useDrops} from "@/stores/index.js";

const Seasons = () => {
    const seasonsOfUser = useDrops((state) => state.seasonsOfUser);
    const {number} = useParams();
    const isSeasonSelected = !!number;
    return (
        <>
            {/* Only display the season list if no season is selected */}
            {!isSeasonSelected && (
                <Box>
                    <Heading className="text-center mb-8">Сезонная статистика</Heading>
                    <Box className={styles.seasonsWrapper}>
                        {seasonsOfUser.length > 0 ? (
                            seasonsOfUser.map((season) => (
                                <Link
                                    key={season}
                                    className={styles.seasonCard}
                                    to={`/stats/seasons/${season}`}
                                >
                                    <Text className={styles.title}>Сезон</Text>
                                    <Text className={styles.number}>{season}</Text>
                                    <Text className={styles.description}>Нажмите для просмотра<br/> статистики за сезон</Text>
                                </Link>
                            ))
                        ) : (
                            <Box>
                                <Heading textAlign="center">Нет данных</Heading>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            {/* Renders Season component when a specific season route is active */}
            <Outlet/>
        </>
    );
};

export default Seasons;