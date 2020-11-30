import { ContainerSpec, Dimensions } from "./interfaces";
import { ProductHandler, Product } from "./productHandler";
import { getVolume } from "./utils";

export interface Container {
  containerType: string;
  containingProducts: Array<{
    id: string;
    quantity: number;
  }>;
}

export class ContainerHandler{
  constructor(private parameters: { containerSpecs: ContainerSpec[] }) {}

  newContainer(type: string, products: Product[]): Container {
    let container: Container = {
      containerType: type,
      containingProducts: products,
    };
    return container;
  }

  selectContainerSpec(product: ProductHandler): { fitCtr:number, qty:number, type: string } {
    let specs = this.parameters.containerSpecs
    var type = ""

    var qty = 0,    // number of products that can fit in the selected container spec
        fitCtr = 0, // checks how many containers can the product fit into. if it fits all containers, we should throw an error.
        cVol = 0,   // container volume
        pVol = 0;   // total product volume
  
    specs.forEach((s) => {
      // check if ordered product fits the conatiner spec
      if (!product.fitsContainer(s.dimensions)) {
        return;
      }

      fitCtr++
  
      // the products inside should not exceed the container.
      let tmpCVol = getVolume(s.dimensions)
      let tmpPVol = getVolume(product.getDimensions())
      
      cVol = tmpCVol
      pVol = tmpPVol
      type = s.containerType;
    });

    // compute how many can fit
    qty = cVol/pVol;
    return {fitCtr, qty, type}
  }
}
