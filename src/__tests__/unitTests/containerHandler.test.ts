import { ContainerHandler, Container } from "../../containerHandler";
import { ContainerSpec } from "../../interfaces";
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

  const productHandler = new ProductHandler(productOrder);
  const specs:ContainerSpec[] = [containerSpecsA, containerSpecsB];
  const containerHandler = new ContainerHandler({containerSpecs:specs})

  test("Given a product, select the correct containter type", () => {
    var selected = {
      fitCtr: 0,
      qty: 0,
      type: "",
    }
    selected = containerHandler.selectContainerSpec(productHandler)
    
    const expectedSelection = {
      fitCtr: 1,
      qty: 9,
      type: "Cardboard A",
    }

    expect(selected).toEqual(expectedSelection);
  });

  test("Given a product order, create the container containing the order", () => {
    var selected = {
      fitCtr: 0,
      qty: 0,
      type: "",
    }
    selected = containerHandler.selectContainerSpec(productHandler)

    const product: Product = {
      id: productHandler.getProductID(),
      quantity: selected.qty,
    }

    const products: Product[] = [product]
    const container = containerHandler.newContainer(selected.type, products)
    
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
});