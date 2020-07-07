class Product {
  constructor(
    public ProductId: number,
    public ProductName: string,
    public Category: string,
    public Manufacturer: string,
    public Description: string,
    public Price: number
  ) {}
}

class CreateProductRequest {
  constructor(
    public ProductName: string,
    public Category: string,
    public Manufacturer: string,
    public Description: string,
    public Price: string
  ) {}
}

class UpdateProductRequest extends CreateProductRequest {
  constructor(
    public ProductId: string,
    ProductName: string,
    Category: string,
    Manufacturer: string,
    Description: string,
    Price: string
  ) {
    super(ProductName, Category, Manufacturer, Description, Price);
  }
}

class ProductGroup {
  constructor(
    public GroupType: string,
    public GroupDescription: string,
    public Prodcuts: Array<Product>
  ) {}
}

class OperationResponse {
  constructor(public message: string, public Success: boolean) {}
}
class ModelState {
  constructor(public Error: string, public isValid: boolean) {}
}

class ProductManager {
  private products: Array<Product>;
  constructor() {
    this.products = new Array<Product>();
    this.products.push(
      new Product(12, "Laptop", "Electronics", "HP", "some laptop text", 125)
    );
    this.products.push(
      new Product(172, "PC", "Electronics", "HP", "some PC text", 658)
    );
    this.products.push(
      new Product(126, "Seeds", "Gardening", "Surya", "spme Seeds text", 125)
    );
    this.products.push(
      new Product(112, "Pots", "Gardening", "Surya", "spme Pots text", 125)
    );
  }

  private getProductId(): number {
    var num = Math.floor(Math.random() * 100000 + 1);
    let product = this.products.find((p) => p.ProductId === num);
    while (typeof product !== "undefined") {
      num = Math.floor(Math.random() * 100000 + 1);
      product = this.products.find((p) => p.ProductId === num);
    }
    return num;
  }
  toProduct(createProductRequest: CreateProductRequest): Product {
    return new Product(
      this.getProductId(),
      createProductRequest.ProductName,
      createProductRequest.Category,
      createProductRequest.Manufacturer,
      createProductRequest.Description,
      parseInt(createProductRequest.Price)
    );
  }

  getProducts(groupType: string): Array<ProductGroup> {
    console.log(`Group by ${groupType}`);
    let response = this.groupBy(groupType);
    return response;
  }

  groupBy(groupType: string): Array<ProductGroup> {
    let productGroupList = new Array<ProductGroup>();
    switch (groupType.toLowerCase()) {
      case "all":
        productGroupList.push(
          new ProductGroup(groupType, "All products", this.products)
        );
        break;
      case "category":
        for (let product of this.products) {
          let group = productGroupList.find(
            (g) => g.GroupType === product.Category
          );
          if (group === undefined) {
            let newGroupProductList = new Array<Product>();
            newGroupProductList.push(product);
            let newGroup = new ProductGroup(
              product.Category,
              `Group by ${groupType}`,
              newGroupProductList
            );
            productGroupList.push(newGroup);
          } else {
            group.Prodcuts.push(product);
          }
        }
        break;
      case "manufacturer":
        for (let product of this.products) {
          let group = productGroupList.find(
            (g) => g.GroupType === product.Manufacturer
          );
          if (group === undefined) {
            let newGroupProductList = new Array<Product>();
            newGroupProductList.push(product);
            let newGroup = new ProductGroup(
              product.Manufacturer,
              `Group by ${groupType}`,
              newGroupProductList
            );
            productGroupList.push(newGroup);
          } else {
            group.Prodcuts.push(product);
          }
        }
        break;
    }
    return productGroupList;
  }

  addProduct(newProductRequest: CreateProductRequest): OperationResponse {
    let model = this.validate(newProductRequest);
    if (!model.isValid) {
      return new OperationResponse(model.Error, false);
    }
    let product = this.toProduct(newProductRequest);
    this.products.push(product);
    return new OperationResponse("New product added", true);
  }

  updateProduct(updateProductRequest: UpdateProductRequest): OperationResponse {
    let model = this.validate(updateProductRequest);
    if (!model.isValid) {
      return new OperationResponse(model.Error, false);
    }
    let updateOperationStatus = this.update(updateProductRequest);
    return updateOperationStatus;
  }

  deleteProduct(pId: string): OperationResponse {
    let productId = parseInt(pId);
    if (!isNaN(productId)) {
      let productIndex = this.products.findIndex(
        (p) => p.ProductId == productId
      );
      if (productIndex >= 0) {
        let newProductList = new Array<Product>();
        for (let index = 0; index < this.products.length; index++) {
          if (index != productIndex) {
            newProductList.push(this.products[index]);
          }
        }
        this.products = newProductList;
        return new OperationResponse(`Product ${pId} deleted`, false);
      } else {
        return new OperationResponse(`Product id ${pId} not found`, false);
      }
    } else {
      return new OperationResponse("Invalid product id", false);
    }
  }

  private update(
    updateProductRequest: UpdateProductRequest
  ): OperationResponse {
    let productId = parseInt(updateProductRequest.ProductId);
    let product = this.products.find((p) => p.ProductId == productId);
    if (typeof product !== "undefined") {
      let newProduct = this.toProduct(updateProductRequest);
      product.ProductName = newProduct.ProductName;
      product.Price = newProduct.Price;
      product.Manufacturer = newProduct.Manufacturer;
      product.Description = newProduct.Description;
      product.Category = newProduct.Category;
      return new OperationResponse(
        `Product ${updateProductRequest.ProductId} updated`,
        true
      );
    } else {
      return new OperationResponse(
        `Product ${updateProductRequest.ProductId} not found`,
        true
      );
    }
  }

  validate(newProductRequest: CreateProductRequest): ModelState {
    //check if price is not negative
    let price = parseInt(newProductRequest.Price);
    if (isNaN(price) || price <= 0) {
      return new ModelState(`Product price should be greater than zero`, false);
    }
    //check if description is not more than 100 character
    if (newProductRequest.Description.length > 100) {
      return new ModelState(
        `A product description should not be more than 100 character`,
        false
      );
    }

    return new ModelState("", true);
  }
}
