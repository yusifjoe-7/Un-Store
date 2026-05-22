export type userType={
    useName:string;
    email:string;
    password:string;
    avatar:string;

}

export type Product = {
  availabilityStatus: string

  brand: string

  category: string

  description: string

  dimensions: {
    width: number
    height: number
    depth: number
  }

  discountPercentage: number

  id: number

  images: string[]

  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }

  minimumOrderQuantity: number

  price: number

  rating: number

  returnPolicy: string

  reviews: {
    rating: number
    comment: string
    date: string

    reviewerName: string
    reviewerEmail: string
  }[]

  shippingInformation: string

  sku: string

  stock: number

  tags: string[]

  thumbnail: string

  title: string

  warrantyInformation: string

  weight: number
}