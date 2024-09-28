interface Location {
  coordinates: number[];
}

interface CategoryInterface {
  name: string;
  _id: string;
}

interface Image {
  filename: string;
}

interface PlantInterface {
  _id: string;
  name: string;
  location: Location;
  createdAt: string;
  categories: CategoryInterface[];
  images: Image[];
  description: string;
}

export type { PlantInterface, CategoryInterface };
