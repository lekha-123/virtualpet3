class Food {
    constructor() {
        this.foodstock = 0;
        this.lastfed;
        this.image = loadImage("Milk.png")
    }

    getfoodstock() {
        return this.foodstock;
    }

    updatefoodstock(foodStock) {
        this.foodstock = foodStock;
    }

    deductfood() {
        if (this.foodstock <= 0) {
            this.foodstock = 0;
        } else {
            this.foodstock = this.foodstock - 1
        }
    }

    getfedtime(lastfed) {
        this.lastfed = lastfed;
    }

    display() {
        imageMode(CENTER);

        textSize(30);
        fill ("red");
        if(lastfed>=12)
        {
          text("last feed:"+ lastfed%12+"pm",450,50)
        }
        else if(lastfed==0)
        {
          text("last feed:"+"12 am",450,50)
        }
        else
        {
          text("last feed:"+ lastfed+"am",450,50)
        }

        var x = 500,
            y = 350;
        
        if (this.foodstock != 0) {
            for (var i = 0; i < this.foodstock; i++) {
                if (i % 5 == 0) {
                    x = 200;
                    y = y + 100
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    bedroom() {
        background(bedroomimg,20, 20);
    }

    garden() {
        background(gardenimg, 20, 20);
    }

    washroom() {
        background(washroomimg,20, 20);
    }
}