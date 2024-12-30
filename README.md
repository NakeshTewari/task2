step 1 - run npm install
step 2 - open new terminal, type   tsc -w   enter for watching file changes
step 3 - open new terminal  type go to build type   nodemon app.js


http://localhost:4000/user/signup 
{
    "email":"nak@gmail.com",
    "password":"12"
}


http://localhost:4000/user/login
{
    "email":"nak@gmail.com",
    "password":"12"
}

http://localhost:4000/transaction/createTransaction
{
    "userId": "1111",
    "amount":1111,
    "description": "fdsfdsf",
    "type":"credit",
    "status":"completed"
}


http://localhost:4000/transaction/readAllTransaction

http://localhost:4000/transaction/updateTransaction/67731204262fc35183986fb7
{
    "userId": "3424",
     "amount": 333333333,
     "description":"updated"
}

http://localhost:4000/transaction/deleteTransaction/67731204262fc35183986fb7
