let obj = {
  buy: 10,
  sell: 20,
  quantity: 50,
  get profit() {
    return [this.sell - this.buy, (this.sell - this.buy) * this.quantity, this.sell * this.quantity - this.buy * this.quantity];
  },
};

console.log(obj.profit);
