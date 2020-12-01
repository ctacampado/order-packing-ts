import { errors, ErrorHandler } from "../../errors";
import { OrderRequest } from "../../interfaces";
import { ProductOrder } from "../../productHandler";

describe("Container Handler Unit Tests", () => {
  const err = new ErrorHandler();

  test("generate error string given a message and data for error context", () => {
    const productOrder: ProductOrder = {
      id: 'PRODUCT-003',
      name: 'GIANT FORTUNE COOKIES',
      orderedQuantity: 1,
      unitPrice: 99.95,
      dimensions: {
        unit: "centimeter",
        length: 30,
        width: 30,
        height: 50,
      }
    }

    const orderRequest: OrderRequest = {
      id: "ORDER-003",
      products: [
        {
          id: "PRODUCT-001",
          name: "GOOD FORTUNE COOKIES",
          orderedQuantity: 1,
          unitPrice: 13.4,
          dimensions: {
            unit: "centimeter",
            length: 10,
            width: 10,
            height: 30,
          },
        },
        {
          id: "PRODUCT-003",
          name: "GIANT FORTUNE COOKIES",
          orderedQuantity: 1,
          unitPrice: 99.95,
          dimensions: {
            unit: "centimeter",
            length: 30,
            width: 30,
            height: 50,
          },
        },
      ],
    }

    const errstr = err.new(errors.get('NoContainerFit'), {product:productOrder, order:{id:orderRequest.id}});
    expect(errstr).toEqual(expect.any(Error));
  });
});