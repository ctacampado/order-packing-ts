import { ContainerSpec, OrderRequest, ShipmentRecord } from "./interfaces";
import { ContainerHandler } from "./containerHandler";
import { getVolume } from "./utils";

export class OrderHandler {
  constructor(private parameters: { containerSpecs: ContainerSpec[] }) {}

  packOrder(orderRequest: OrderRequest): ShipmentRecord {
    /* TODO: replace with actual implementation */
    // select container for product
    // if product fit multiple types of container, throw error
    // else store products to container
    // create shipment record
    // return shipment record

    const dummyObject: ShipmentRecord = {
      orderId: "",
      totalVolume: {
        unit: "",
        value: 0,
      },
      containers: [],
    };

    return dummyObject;
  }
}