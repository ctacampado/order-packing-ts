import { ContainerSpec, Dimensions} from "../../interfaces";
import { ProductHandler, ProductOrder } from "../../productHandler";

describe("Product Handler Unit Tests", () => {
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

  test("Given a product, return its dimensions", () => {
    const dimensions = productHandler.getDimensions();
    const expectedDimensions: Dimensions = {
      unit: "centimeter",
      length: 10,
      width: 10,
      height: 30,
    };

    expect(dimensions).toEqual(expectedDimensions);
  })

  test("Given a productOrder, return the total volume", () => {
    const total = productHandler.getTotalVolume();
    const expectedTotalVolume = 27000;
    expect(total).toEqual(expectedTotalVolume);
  })

  test("Given a productOrder and a container spec, see if a single product will fit the container", () => {
    const fits = productHandler.fitsContainer(containerSpecsA.dimensions);
    const expectedTotalVolume = true;
    expect(fits).toEqual(expectedTotalVolume);
  })

  test("Given a productOrder and a container spec, see if a single product will not fit the container", () => {
    const fits = productHandler.fitsContainer(containerSpecsB.dimensions);
    const expectedTotalVolume = false;
    expect(fits).toEqual(expectedTotalVolume);
  })
});