import { ContainerSpec, OrderRequest, ShipmentRecord } from "./interfaces";
import { ContainerHandler, Container } from "./containerHandler";
import { ProductHandler, Product, ProductOrder } from "./productHandler";
import { getVolume } from "./utils";


export class OrderHandler {
  constructor(private parameters: { containerSpecs: ContainerSpec[] }) {}

  packOrder(orderRequest: OrderRequest): ShipmentRecord {
    /* TODO: replace with actual implementation */
    // select container for products
    var containers: Container[] = [];
    var totalVolume = 0;

    const containerHandler = new ContainerHandler({containerSpecs: this.parameters.containerSpecs})
    orderRequest.products.forEach((productOrder) => {
      var productHandler = new ProductHandler(productOrder);
      var selected = containerHandler.selectContainerSpec(productHandler);

      // if product does not fit any types of container, throw error
      if(selected.notFitCtr === this.parameters.containerSpecs.length) {
        throw new Error('perm exists in this id');
      } else {
        const product: Product = {
          id: productHandler.getProductID(),
          quantity: productHandler.getOrderedQty(),
        };
  
        const res = containerHandler.newContainer(selected, [product]);
        res.forEach((container) => {
          containers.push(container);
          totalVolume += getVolume(selected.dimensions);
        });
      }
    });

    const record: ShipmentRecord = {
      orderId: orderRequest.id,
      totalVolume: {
        unit: "cubic centimeter",
        value: totalVolume,
      },
      containers: containers,
    };

    return record;
  }
}