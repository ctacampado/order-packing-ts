import { ContainerSpec } from "../../interfaces";
import { ProductOrder } from "../../productHandler";
import { getVolume, absDiff, isLess } from "../../utils";

describe("Utils Unit Tests", () => {
  const containerSpecs: ContainerSpec = {
    containerType: "Cardboard A",
    dimensions: {
      unit: "centimeter",
      length: 30,
      width: 30,
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

  test("given a product order, get product volume", () => {
    const expectedVolume = 3000;
    expect(getVolume(productOrder.dimensions)).toEqual(expectedVolume);
  });

  test("given 2 unequal volumes, get absolute difference", () => {
    let cVol = getVolume(containerSpecs.dimensions);
    let pVol = getVolume(productOrder.dimensions);

    //const diff = absDiff(pVol,cVol);
    const expectedDiff = 24000;
    expect(absDiff(pVol,cVol)).toEqual(expectedDiff);
  });

  test("given 2 volumes, tell which one is lesser", () => {

    let cVol = getVolume(containerSpecs.dimensions);
    let pVol = getVolume(productOrder.dimensions);
    
    var less = 0;
    if (isLess(pVol, cVol)) {
      less = pVol;
    } else {
      less = cVol;
    }

    const expectedLesserVolume = 3000;
    expect(less).toEqual(expectedLesserVolume);
  });

  test("given 2 volumes, tell which one is lesser using negation", () => {

    let cVol = getVolume(containerSpecs.dimensions);
    let pVol = getVolume(productOrder.dimensions);
    
    var less = 0;
    if (isLess(cVol, pVol)) {
      less = cVol;
    } else {
      less = pVol;
    }

    const expectedLesserVolume = 3000;
    expect(less).toEqual(expectedLesserVolume);
  });
});