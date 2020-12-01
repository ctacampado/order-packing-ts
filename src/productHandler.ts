import { Dimensions } from "./interfaces";
import { getVolume } from "./utils";

export interface Product {
  id: string;
  quantity: number;
}

export interface ProductOrder {
  id: string;
  name: string;
  orderedQuantity: number;
  dimensions: Dimensions;
  unitPrice: number;
}

export class ProductHandler {
  constructor(private productOrder: ProductOrder ) {}
  
  fitsContainer(cDim: Dimensions): boolean {
    let pDim = this.productOrder.dimensions
    if (pDim.height <= cDim.height
      && pDim.length <= cDim.length 
      && pDim.width <= cDim.width) {
      return true;
    }
    return false;
  }

  getDimensions(): Dimensions {
    return this.productOrder.dimensions;
  }

  getTotalVolume(): number {
    let d = this.productOrder.dimensions;
    let q = this.productOrder.orderedQuantity;
    return getVolume(d)*q;
  }

  getOrderedQty(): number {
    return this.productOrder.orderedQuantity;
  }

  getProductID(): string {
    return this.productOrder.id;
  }
}