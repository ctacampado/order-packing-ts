import { ContainerSpec, Dimensions } from "./interfaces";
import { ProductHandler, Product } from "./productHandler";
import { getVolume, absDiff, isLess, simpleDiv } from "./utils";

export interface Container {
  containerType: string;
  containingProducts: Array<{
    id: string;
    quantity: number;
  }>;
}

export interface SelectedContainerStats {
  notFitCtr: number;
  fitQty: number;
  totPVol: number;
  type: string;
  dimensions: Dimensions;
}

export class ContainerHandler{
  constructor(private parameters: { containerSpecs: ContainerSpec[] }) {}

  newContainer(selected: SelectedContainerStats, products: Product[]): Container[] {
    var containers: Container[] = [];
    
    products.forEach((product) => {
      const cQty = initContainerQty(selected.fitQty, product.quantity);
      var remPQty = product.quantity;

      var i;
      for(i = 0; i < cQty; i++) {
        var pQty = selected.fitQty;
        if(remPQty - selected.fitQty < 0 ) {
          pQty = remPQty;
        } 

        const c: Container = {
          containerType: selected.type,
          containingProducts: [
            {
              id: product.id,
              quantity: pQty,
            }
          ]
        };

        containers.push(c);
        remPQty -= pQty;
      }
    }) 

    return containers;
  }

  selectContainerSpec(product: ProductHandler): SelectedContainerStats {
    let specs = this.parameters.containerSpecs;

    var dummy: Dimensions = {
      unit: "",
      length: 0,
      width: 0,
      height: 0,
    };

    var stats: SelectedContainerStats = {
      fitQty: 0,     // number of products that can fit in the selected container spec
      notFitCtr: 0,  // checks how many containers can the product fit into. if it fits all containers, we should throw an error.
      totPVol: 0, // total product order volume
      type: "",
      dimensions: dummy,
    };
  
    var cVol = 0,    // container volume
        pVol = 0,    // single product volume
        rem = -1;    // remaining space after placing products inside currently selected container

    specs.forEach((s) => {
      // check if ordered product fits the conatiner spec
      if (!product.fitsContainer(s.dimensions)) {
        stats.notFitCtr++;
        return;
      }

      // the products inside should not exceed the container.
      let tmpCVol = getVolume(s.dimensions);
      let tmpPVol = getVolume(product.getDimensions());
      let tmpFitQty = simpleDiv(tmpCVol,tmpPVol);
      let tmpTotPVol = tmpPVol*product.getOrderedQty();
      let tmpRem = absDiff(tmpCVol,tmpTotPVol);
      
      // assign the first container that fits. we only change containers
      // if remaining space for the new container is less than the current one
      // so that we won't waste container space by using a much larger container
      if (-1 === rem || tmpRem <= rem) {
        cVol = tmpCVol;
        pVol = tmpPVol;
        rem = tmpRem;
        stats.type = s.containerType;
        stats.totPVol = tmpTotPVol;
        stats.fitQty = tmpFitQty;
        stats.dimensions = s.dimensions;
      }
    });

    return stats;
  }
}

function initContainerQty(cFitQty: number, pQty: number): number {
  var cQty = 0;
  if(isLess(cFitQty, pQty)) {
    // check how many full containers we can have
    cQty += simpleDiv(pQty,cFitQty);
    // add another container for the remaining quantity
    if(0 != pQty%cFitQty) { cQty++; }
  } else {
    // just use one container if less than container max capacity
    cQty = 1;
  }
  return cQty;
}
