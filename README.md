# Node
In this project I have created Created Multiple APIs for Login, Logout, Registration, Crete Delete Update Get Products, 
Add Product Id into Users Id, Forget Password Using Nodemailer and etc. Plz insert all the required details into the .env file to purform the 
tasks. I am providing all the Api and Payloads in the bottom.

1) Get All and One CRUD Products
   API Get http://localhost:6000/api/auth/v2/product

2) POST CRUD Products
   API Post http://localhost:6000/api/auth/v2/product
   Payload {
    "productName":"SagarSamui",
    "title":"OMG",
    "description":"BSDK",
    "rating":5,
    "cheepestPrice":1500
   }
   
3) Delete CRUD Product
   API Del Delete http://localhost:6000/api/auth/v2/product/:id

4) Update CRUD Product
   API Put http://localhost:6000/api/auth/v2/product/:id
   Payload {
    "productName":"SagarSamul",
    "title":"OMG",
    "description":"BSDK",
    "rating":5,
    "cheepestPrice":1500
  }
  
5) User Registration
   API Post http://localhost:6000/api/auth/v1/register
   Payload {
    "name":"Sagar",
    "age":"23",
    "email":"samuisagar4268@gmail.com",
    "password":"12345678",
    "cPassword":"12345678",
    "address":"mombai,Maharashtra",
    "products":"Shirts"
  }

6) User Login
   API Post http://localhost:6000/api/auth/v1/login
   Payload {
    "name":"Sagar",
    "email":"sagar.samui@grab.in",
    "password":"12345678"
 }

7) User Logout
   API Get http://localhost:6000/api/auth/v1/logout
   
8) Send Email Forgot Password
   API Post http://localhost:6000/api/auth/v1/forgetpassword  
   Payload {
    "email":"samuisagar4268@gmail.com"
 }

9) Verify OTP
   API Post http://localhost:6000/api/auth/v1/getOtp
   Payload{
    "email":"samuisagar4268@gmail.com",
    "code":"OTP"
}

10) POST User Product
    Only Login Usrer can access this API
    Api Post http://localhost:6000/api/auth/v3/userProduct/:userid
    Payload {
    "productName":"pajama",
    "productPrice":500,
    "productTitle":"Pajama",
    "productRating":5,
    "productDescription":"Its realy a good product"
}

11) GET One and All User Product
    Only Login Usrer can access this API
    Api Get http://localhost:6000/api/auth/v3/userProduct  
    Api GetOne http://localhost:6000/api/auth/v3/userProduct/:id
    
12) Delete User Product
    Only Login Usrer can access this API
    API Del http://localhost:6000/api/auth/v3/userProduct/:id/:userid
