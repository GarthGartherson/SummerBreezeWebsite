module.exports = function Cart(oldCart = {}) {
  this.items = oldCart.items ?? {};
  this.totalQuantity = oldCart.totalQuantity ?? 0;
  this.totalPrice = oldCart.totalPrice ?? 0;

  this.addItem = function (item, id, color = "Default", size = "Default") {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        quantity: 0,
        price: 0,
        color,
        size,
      };
    }
    storedItem.quantity++;
    storedItem.price = storedItem.item.price * storedItem.quantity;
    this.totalQuantity++;
    this.totalPrice += storedItem.item.price;
  };

  this.removeItem = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, quantity: 0, price: 0 };
    }
    storedItem.quantity--;
    storedItem.price = storedItem.item.price * storedItem.quantity;
    this.totalQuantity--;
    this.totalPrice -= storedItem.item.price;
    if (storedItem.quantity <= 0) {
      delete this.items[id];
      return;
    }
  };

  this.generateArray = function () {
    const arr = [];
    for (const id in this.items) {
      arr.push(this.items[id]);
    }
    // console.log(arr[3].item.title);
    for (let instance of arr) {
      console.log(instance.item.title);
    }
    return arr;
  };
};
