import sport_content from "@/images/content/sport_content.jpg";
import special_content from "@/images/content/special_content.jpg";
import lux_content from "@/images/content/lux_content.jpg";
import import_content from "@/images/content/import_content.jpg";
import exotic_content from "@/images/content/exotic_content.jpg";
import black_market_content from "@/images/content/black_market_content.jpg";
import golden_box from "@/images/box/gold_box.jpg";
import sport_box from "@/images/box/sport_box.png";
import special_box from "@/images/box/special_box.png";
import lux_box from "@/images/box/lux_box.png";
import import_box from "@/images/box/import_box.png";

const gameSeasons = [11, 12, 13, 14, 15, 16]; // seasons

const defaultOrder = ["sport", "special", "lux", "import", "exotic", "black_market"]

const boxes = [
    {imgSrc: sport_box, name: "Спортивный Контейнер", box_variant: "sport"},
    {imgSrc: special_box, name: "Специальный Контейнер", box_variant: "special"},
    {imgSrc: lux_box, name: "ЛЮКС Контейнер", box_variant: "lux"},
    {imgSrc: import_box, name: "Импортный Контейнер", box_variant: "import"},
    {imgSrc: golden_box, name: "Золотой Контейнер", box_variant: "golden"},
] // Regular boxes

const defineBox = {
    sport: ["sport", "special", "lux"],
    special: ["special", "lux", "import"],
    lux: ["lux", "import", "exotic"],
    import: ["import", "exotic", "black_market"],
}  // Regular boxes contents

const content = [
    {imgSrc: sport_content, quality: "sport"},
    {imgSrc: special_content, quality: "special"},
    {imgSrc: lux_content, quality: "lux"},
    {imgSrc: import_content, quality: "import"},
    {imgSrc: exotic_content, quality: "exotic"},
    {imgSrc: black_market_content, quality: "black_market"},
]  // Content


export {gameSeasons, content, boxes, defineBox, defaultOrder};