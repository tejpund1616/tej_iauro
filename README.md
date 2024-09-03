1.Start your Node.js application using
node app.js

2.Below are the curls to test the APIs

Sign Up as Admin or User:
curl -X POST http://localhost:3000/api/users/signup \
-H "Content-Type: application/json" \
-d '{"username": "admin1", "password": "password", "role": "admin"}'


Sign In:
curl -X POST http://localhost:3000/api/users/signin \
-H "Content-Type: application/json" \
-d '{"username": "admin1", "password": "password"}'


Create a Product:
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{"name": "Product1", "description": "A new product", "userId": 1, "visible": true}'


Display Products: 
curl -X GET http://localhost:3000/api/products


Update a User/Product:
curl -X PUT http://localhost:3000/api/users/1 \
-H "Content-Type: application/json" \
-d '{"username": "newUsername", "password": "newPassword", "role": "user"}'

curl -X PUT http://localhost:3000/api/products/1 \
-H "Content-Type: application/json" \
-d '{"name": "UpdatedProduct", "description": "Updated description", "userId": 1, "visible": false}'


Delete a User/Product:
curl -X DELETE http://localhost:3000/api/users/1

curl -X DELETE http://localhost:3000/api/products/1
