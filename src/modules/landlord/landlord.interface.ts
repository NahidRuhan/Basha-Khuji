export interface ICreateProperty {
  categoryName: string;
  locationName: string;
  propertyName: string;
  price: number;
  address: string;
  description: string;
  isAvailable?: boolean;
  amenities: string[];
  vacantFrom: string;
  images: string[];
  bedroomCount: number;
  squarefoot: number;
}

export interface IUpdateProperty {
  categoryName?: string;
  locationName?: string;
  propertyName?: string;
  price?: number;
  address?: string;
  description?: string;
  isAvailable?: boolean;
  amenities?: string[];
  vacantFrom?: string | Date;
  images?: string[];
  bedroomCount?: number;
  squarefoot?: number;
}
