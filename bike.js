class Bike {
    constructor(id = null, brand = "", model = "", color = "Black", serviceDue = 100) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;  // 'color' is now a string
        this.serviceDue = serviceDue;
    }
}

// You can also define a static property for available colors, but it's not necessary
Bike.Colors = {
    RED: 'Red',
    BLUE: 'Blue',
    GREEN: 'Green',
    YELLOW: 'Yellow',
    ORANGE: 'Orange',
    PURPLE: 'Purple',
    BLACK: 'Black',
    WHITE: 'White'
};

module.exports = Bike;