import React from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";

const PLACES = [
  {
    id: "uiui1",
    imageUrl:
      "https://www.eligasht.com/Blog/wp-content/uploads/2017/01/Taj-Mahal.jpg",
    title: "Taj Mahal",
    address: "Tajganj, Agra, Uttar Pradesh 282001، India",
    description:
      "تاج محل از پرآوازه‌ترین بناهای جهان و آرامگاه زیبا و باشکوهی است که در نزدیکی شهر آگرا و در ۲۰۰ کیلومتری جنوب دهلی پایتخت هندوستان واقع شده‌است و یکی از عجایب هفتگانه جدید دنیا به‌شمار می‌رود.",
    userId: "8678y",
    coordinates: {
      lat: "27.1751448",
      lng: "78.0421422",
    },
  },
  {
    id: "uiui2",
    imageUrl:
      "https://www.visitberlin.de/system/files/styles/visitberlin_content_image_medium_visitberlin_desktop_1x/private/image/brandenburger_tor_fruehling_650696492_gettyimages_sborisov.jpg.webp?itok=Kt79RzcO",
    title: "Brandenburger Tor",
    address: "Pariser Platz, 10117 Berlin, Germany",
    description:
      "دروازه بازسازی‌شده قرن هجدهمی، مکانی دیدنی با ۱۲ ستون دوریک که مجسمه کلاسیک الهه‌ای در بالای آن قرار دارد.",
    userId: "8678y",
    coordinates: {
      lat: "52.5162778",
      lng: "13.3798928",
    },
  },
];

const Places = () => {
  const userId = useParams().userId;
  return <PlacesList items={PLACES.filter((item) => item.userId === userId)} />;
};

export default Places;
export {PLACES};