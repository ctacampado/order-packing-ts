import { ContainerHandler, Container, SelectedContainerStats } from "../../containerHandler";
import { ContainerSpec, Dimensions } from "../../interfaces";
import { ProductHandler, ProductOrder, Product } from "../../productHandler";

describe("Container Handler Unit Tests", () => {
  const containerSpecsA: ContainerSpec = {
    containerType: "Cardboard A",
    dimensions: {
      unit: "centimeter",
      length: 30,
      width: 30,
      height: 30,
    }
  };

  const containerSpecsB: ContainerSpec = {
    containerType: "Cardboard B",
    dimensions: {
      unit: "centimeter",
      length: 5,
      width: 10,
      height: 30,
    }
  };

  const containerSpecsC: ContainerSpec = {
    containerType: "Cardboard C",
    dimensions: {
      unit: "centimeter",
      length: 60,
      width: 60,
      height: 30,
    }
  };

  const productOrder: ProductOrder = {
    id: "PRODUCT-001",
    name: "GOOD FORTUNE COOKIES",
    orderedQuantity: 9,
    unitPrice: 13.4,
    dimensions: {
      unit: "centimeter",
      length: 10,
      width: 10,
      height: 30,
    }
  };

  const productOrderMany: ProductOrder = {
    id: "PRODUCT-001",
    name: "GOOD FORTUNE COOKIES",
    orderedQuantity: 20,
    unitPrice: 13.4,
    dimensions: {
      unit: "centimeter",
      length: 10,
      width: 10,
      height: 30,
    }
  };

  const productHandler = new ProductHandler(productOrder);
  const productHandlerMany = new ProductHandler(productOrderMany);
  const specs:ContainerSpec[] = [containerSpecsA, containerSpecsB, containerSpecsC];
  const containerHandler = new ContainerHandler({containerSpecs:specs})

  test("Given a product, select the correct containter type", () => {
    var dummy: Dimensions = {
      unit: "",
      length: 0,
      width: 0,
      height: 0,
    }

    var selected: SelectedContainerStats = {
      notFitCtr: 0,
      fitQty: 0,
      totPVol: 0,
      type: "",
      dimensions: dummy,
    }
    selected = containerHandler.selectContainerSpec(productHandler)
    
    const expectedSelection = {
      notFitCtr: 1,
      fitQty: 9,
      type: "Cardboard A",
      totPVol: 27000,
      dimensions: {
        unit: "centimeter",
        length: 30,
        width: 30,
        height: 30,
      }
    }

    expect(selected).toEqual(expectedSelection);
  });

  test("Given a product order, create the container containing the order", () => {
    var dummy: Dimensions = {
      unit: "",
      length: 0,
      width: 0,
      height: 0,
    }
    
    var selected = {
      notFitCtr: 0,
      fitQty: 0,
      totPVol: 0,
      type: "",
      dimensions: dummy,
    }
    selected = containerHandler.selectContainerSpec(productHandler)

    const product: Product = {
      id: productHandler.getProductID(),
      quantity: productHandler.getOrderedQty(),
    }

    const products: Product[] = [product]
    const containers = containerHandler.newContainer(selected, products)
    const container = containers[0]
    
    const expectedContainer:Container = {
      containerType: "Cardboard A",
      containingProducts: [
        {
          id:"PRODUCT-001",
          quantity: 9,
        },
      ]
    };

    expect(container).toEqual(expectedContainer);
  });

  test("Given many product orders, create containers to fullfil the order", () => {
    var dummy: Dimensions = {
      unit: "",
      length: 0,
      width: 0,
      height: 0,
    }
    
    var selected = {
      notFitCtr: 0,
      fitQty: 0,
      totPVol: 0,
      type: "",
      dimensions: dummy,
    }
    selected = containerHandler.selectContainerSpec(productHandlerMany)

    const product: Product = {
      id: productHandlerMany.getProductID(),
      quantity: productHandlerMany.getOrderedQty(),
    }

    const products: Product[] = [product]
    const containers = containerHandler.newContainer(selected, products)
    const expectedContainers:Container[] = [
      {
        containerType: "Cardboard A",
        containingProducts: [
          {
            id:"PRODUCT-001",
            quantity: 9,
          }
        ]
      },
      {
        containerType: "Cardboard A",
        containingProducts: [
          {
            id:"PRODUCT-001",
            quantity: 9,
          }
        ]
      },
      {
        containerType: "Cardboard A",
        containingProducts: [
          {
            id:"PRODUCT-001",
            quantity: 2,
          }
        ]
      },
    ]

    expect(containers).toEqual(expectedContainers);
  });
});