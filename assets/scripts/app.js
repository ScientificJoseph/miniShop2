class Product { //template for building instance objects of Product class
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) { // accepts parameters, assigns to class fields, returns object
        this.title = title; // this refers to the oject being created. initializes objects values
        this.imageUrl = image; //defines properties for class
        this.description = desc;
        this.price = price
    }
}

class ShoppingCart { //template for product Cart
    items = []; //receives prod from addProduct

    set cartItems(value) { // used to set new cart total. receives prod from addProduct() below
        this.items = value; //overwrites items array with values from updatedItems below
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`; //calls totalAmount() to get total amount
    }

    get totalAmount() {
        const sum = this.items.reduce((prevVal, curItem) => { //iterates through array
            return prevVal + curItem.price
        },0);
        return sum;
    }

    addProduct(product) { // called from App where prod is received from
        const updatedItems = [...this.items];
        updatedItems.push(product)
        this.cartItems = updatedItems; //triggers the setter & passes updatedItems to cartItems
    }

    render() {
       const cartEl = document.createElement('section') 
       cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
       `;
       cartEl.className = 'cart';
       this.totalOutput = cartEl.querySelector('h2') //
       return cartEl;
    }   
}

class ProductItem {
    constructor(product) { // parameter to recieves ProductList (prod) instance objects
        this.product = product; //adds new product property to store ProductList instances
    }

    addToCart() { // called from eventListener click event
        App.addProductToCart(this.product)//calls static addProductToCart() in App where addProduct() is called & receives prod instances 
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src='${this.product.imageUrl}' alt='${this.product.title}'>
                <div class='product-item__content'>
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add To Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector('button'); // selects button from instance
        addCartButton.addEventListener('click', this.addToCart.bind(this)) //bind(this) is added to tie button to instance
        return prodEl; //returns prodEl to prodItem render call below
    }
}

class ProductList{
    products = [ //default array property for storing future objects
        new Product(//calls constructor passes parameters and receives a new object instance of Product Class
            'A Pillow',
            'http://tiny.cc/en48vz',
            'The Pillow Of Manifestation',
            19.99
        ), 
        new Product(//calls constructor passes parameters and receives a new object instance of Product Class
            'A Rug',
            'http://tiny.cc/co48vz',
            'Like Walking On A Cloud',
            89.99
        )
    ];
    // constructor() {};
    render() {
        
        const prodList = document.createElement('ul'); // ul to append to app Hook
        prodList.className = 'product-list';
        for (const prod of this.products) { //iterates through products array and stors objects to prod
            const productItem = new ProductItem(prod)//calls & passes ProductList Objects (prod)to ProductItem Class to create new object
            const prodEl = productItem.render() // calls render method in newly created productItem object. Store in prodEl-li
            prodList.append(prodEl); // appends li to ul
        }
        return prodList
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app'); // app Hook where code will be rendered 

        this.cart = new ShoppingCart(); //creates instance of ShoppingCart
        const cartEl = this.cart.render();//calls render method in the new cart instance of ShoppingCart
        const productList = new ProductList(); // calls and creates instance of ProductList and receivs props and methods
        const prodListEl = productList.render() //calls render() in the new productList intance of ProductList 

        renderHook.append(cartEl)//appends cart to app Hook
        renderHook.append(prodListEl); // appends ul to app Hook 
    }
}

class App {
    static cart; //refered to by this.cart below

    static init() {
        const shop = new Shop();//instance of Shop who's props and methods can be shared among all objects created from the same class
        shop.render(); //calls render method in the the new instamce of Shop (shop)
        this.cart = shop.cart //refers to new App object property shop which provides access to addProduct() in ShoppingCart
    }

    static addProductToCart(product) { //static method receives product from call of event listener in ProducItem addToCart()
        this.cart.addProduct(product)//calls addProduct method from this.cart and passes product to addProduct method in ShoppingCart
    }
}

App.init();