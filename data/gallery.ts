export interface PlacePhoto {
  id: string;
  title: string;
  place: string;
  category: "Travel & Nature" | "City & Landmarks" | "Campus & Academia" | "Expeditions";
  image: string;
  date?: string;
  caption: string;
}

// Drop your photos into: public/gallery/ (e.g. public/gallery/vizag.jpg)
// and simply add or edit an item in this list below!
export const placesGallery: PlacePhoto[] = [
  {
    id: "place-1",
    title: "Temple & Heritage Trails",
    place: "Bhimavaram & Godavari Delta, AP",
    category: "City & Landmarks",
    image: "/images/landscape_bg.jpg",
    date: "2025",
    caption: "Explorations across the lush green coastal landscapes and serene waters of coastal Andhra Pradesh.",
  },
  {
    id: "place-2",
    title: "IIT Bhubaneswar Campus Expeditions",
    place: "Bhubaneswar, Odisha",
    category: "Campus & Academia",
    image: "/images/about_bg.jpg",
    date: "Summer 2026",
    caption: "Exploring the historic temples of Odisha, Barunei hills, and the green research corridors of IIT Bhubaneswar.",
  },
  {
    id: "place-3",
    title: "City of Pearls & Tech Corridors",
    place: "Hyderabad, Telangana",
    category: "City & Landmarks",
    image: "/images/hero_bg.jpg",
    date: "2026",
    caption: "Visiting DRDO/ISRO GAETEC foundry hub, historic Charminar, Golconda, and the vibrant tech city avenues.",
  },
  {
    id: "place-4",
    title: "Coastal Horizons & Bay of Bengal",
    place: "Visakhapatnam Coast, AP",
    category: "Travel & Nature",
    image: "/images/engineering_bg.jpg",
    date: "2025",
    caption: "Sea breeze, coastal sunsets, and weekend road trips along the Bay of Bengal coastline.",
  },
];
