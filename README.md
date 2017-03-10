# food-shop
simple Node.js API for food shop

### Requirements:
1) Node.js v 6.10.0

### How to use:
1) Open './config/config.json' and specify all needable data (mongoUri, port, deleteTimeout). To install mongoDB you can use 'https://1cloud.ru/help/linux/Ustanovka-MongoDB-na-Ubuntu' for Ubuntu.<br />
2) install node modules: "npm install"<br />
3) fill test DB: "node ./lib/fillDb" (data is retrieving from ./config/config.json)<br />
4) run tests: "npm test" (Note that it used test db in tests)<br />
5) run application "npm start"<br />

### Requests could be send for example with Postman (https://www.getpostman.com/):
1) get available products list: GET localhost:3000/api/products<br />
2) get your cart: GET localhost:3000/api/cart (cart is identified by sessionID and will be deleted in 5 min after last activity with cart)<br />
3) add product to cart: POST localhost:3000/api/cart Body={ "product_id": "2", "quantity": 2 } (quantity should be integer in range [1,10])<br />
4) delete product from cart: DEL localhost:3000/api/cart Body={"product_id": "2"}<br />
