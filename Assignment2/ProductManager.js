var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(ProductId, ProductName, Category, Manufacturer, Description, Price) {
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Category = Category;
        this.Manufacturer = Manufacturer;
        this.Description = Description;
        this.Price = Price;
    }
    return Product;
}());
var CreateProductRequest = /** @class */ (function () {
    function CreateProductRequest(ProductName, Category, Manufacturer, Description, Price) {
        this.ProductName = ProductName;
        this.Category = Category;
        this.Manufacturer = Manufacturer;
        this.Description = Description;
        this.Price = Price;
    }
    return CreateProductRequest;
}());
var UpdateProductRequest = /** @class */ (function (_super) {
    __extends(UpdateProductRequest, _super);
    function UpdateProductRequest(ProductId, ProductName, Category, Manufacturer, Description, Price) {
        var _this = _super.call(this, ProductName, Category, Manufacturer, Description, Price) || this;
        _this.ProductId = ProductId;
        return _this;
    }
    return UpdateProductRequest;
}(CreateProductRequest));
var ProductGroup = /** @class */ (function () {
    function ProductGroup(GroupType, GroupDescription, Prodcuts) {
        this.GroupType = GroupType;
        this.GroupDescription = GroupDescription;
        this.Prodcuts = Prodcuts;
    }
    return ProductGroup;
}());
var OperationResponse = /** @class */ (function () {
    function OperationResponse(message, Success) {
        this.message = message;
        this.Success = Success;
    }
    return OperationResponse;
}());
var ModelState = /** @class */ (function () {
    function ModelState(Error, isValid) {
        this.Error = Error;
        this.isValid = isValid;
    }
    return ModelState;
}());
var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = new Array();
        this.products.push(new Product(12, "Laptop", "Electronics", "HP", "some laptop text", 125));
        this.products.push(new Product(172, "PC", "Electronics", "HP", "some PC text", 658));
        this.products.push(new Product(126, "Seeds", "Gardening", "Surya", "spme Seeds text", 125));
        this.products.push(new Product(112, "Pots", "Gardening", "Surya", "spme Pots text", 125));
    }
    ProductManager.prototype.getProductId = function () {
        var num = Math.floor(Math.random() * 100000 + 1);
        var product = this.products.find(function (p) { return p.ProductId === num; });
        while (typeof product !== "undefined") {
            num = Math.floor(Math.random() * 100000 + 1);
            product = this.products.find(function (p) { return p.ProductId === num; });
        }
        return num;
    };
    ProductManager.prototype.toProduct = function (createProductRequest) {
        return new Product(this.getProductId(), createProductRequest.ProductName, createProductRequest.Category, createProductRequest.Manufacturer, createProductRequest.Description, parseInt(createProductRequest.Price));
    };
    ProductManager.prototype.getProducts = function (groupType) {
        console.log("Group by " + groupType);
        var response = this.groupBy(groupType);
        return response;
    };
    ProductManager.prototype.groupBy = function (groupType) {
        var productGroupList = new Array();
        switch (groupType.toLowerCase()) {
            case "all":
                productGroupList.push(new ProductGroup(groupType, "All products", this.products));
                break;
            case "category":
                var _loop_1 = function (product) {
                    var group = productGroupList.find(function (g) { return g.GroupType === product.Category; });
                    if (group === undefined) {
                        var newGroupProductList = new Array();
                        newGroupProductList.push(product);
                        var newGroup = new ProductGroup(product.Category, "Group by " + groupType, newGroupProductList);
                        productGroupList.push(newGroup);
                    }
                    else {
                        group.Prodcuts.push(product);
                    }
                };
                for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
                    var product = _a[_i];
                    _loop_1(product);
                }
                break;
            case "manufacturer":
                var _loop_2 = function (product) {
                    var group = productGroupList.find(function (g) { return g.GroupType === product.Manufacturer; });
                    if (group === undefined) {
                        var newGroupProductList = new Array();
                        newGroupProductList.push(product);
                        var newGroup = new ProductGroup(product.Manufacturer, "Group by " + groupType, newGroupProductList);
                        productGroupList.push(newGroup);
                    }
                    else {
                        group.Prodcuts.push(product);
                    }
                };
                for (var _b = 0, _c = this.products; _b < _c.length; _b++) {
                    var product = _c[_b];
                    _loop_2(product);
                }
                break;
        }
        return productGroupList;
    };
    ProductManager.prototype.addProduct = function (newProductRequest) {
        var model = this.validate(newProductRequest);
        if (!model.isValid) {
            return new OperationResponse(model.Error, false);
        }
        var product = this.toProduct(newProductRequest);
        this.products.push(product);
        return new OperationResponse("New product added", true);
    };
    ProductManager.prototype.updateProduct = function (updateProductRequest) {
        var model = this.validate(updateProductRequest);
        if (!model.isValid) {
            return new OperationResponse(model.Error, false);
        }
        var updateOperationStatus = this.update(updateProductRequest);
        return updateOperationStatus;
    };
    ProductManager.prototype.deleteProduct = function (pId) {
        var productId = parseInt(pId);
        if (!isNaN(productId)) {
            var productIndex = this.products.findIndex(function (p) { return p.ProductId == productId; });
            if (productIndex >= 0) {
                var newProductList = new Array();
                for (var index = 0; index < this.products.length; index++) {
                    if (index != productIndex) {
                        newProductList.push(this.products[index]);
                    }
                }
                this.products = newProductList;
                return new OperationResponse("Product " + pId + " deleted", false);
            }
            else {
                return new OperationResponse("Product id " + pId + " not found", false);
            }
        }
        else {
            return new OperationResponse("Invalid product id", false);
        }
    };
    ProductManager.prototype.update = function (updateProductRequest) {
        var productId = parseInt(updateProductRequest.ProductId);
        var product = this.products.find(function (p) { return p.ProductId == productId; });
        if (typeof product !== "undefined") {
            var newProduct = this.toProduct(updateProductRequest);
            product.ProductName = newProduct.ProductName;
            product.Price = newProduct.Price;
            product.Manufacturer = newProduct.Manufacturer;
            product.Description = newProduct.Description;
            product.Category = newProduct.Category;
            return new OperationResponse("Product " + updateProductRequest.ProductId + " updated", true);
        }
        else {
            return new OperationResponse("Product " + updateProductRequest.ProductId + " not found", true);
        }
    };
    ProductManager.prototype.validate = function (newProductRequest) {
        //check if price is not negative
        var price = parseInt(newProductRequest.Price);
        if (isNaN(price) || price <= 0) {
            console.log("Inside invalid price");
            return new ModelState("A product price should be greater than zero", false);
        }
        console.log("Outside invalid price");
        //check if description is not more than 100 character
        if (newProductRequest.Description.length > 100) {
            return new ModelState("A product description should not be more than 100 character", false);
        }
        return new ModelState("", true);
    };
    return ProductManager;
}());
