# Book-app
the application stores books  information (name,serial number, and price), it allws users to signup , login , register book information and retrive a report of all available books 

Controllers 
#user.js 
#books.js

Helpers
#validate.js 
validate the user inputs base on the criteria of case sensitivity , numbers, characters and required fields. 
if user inputs does not meet the criterias , an error is prompted  otherwise user is succefully signed up 

Middlewares
#verifyToken.js
verifies the token given to user upon login, checks the correspondance to the user ID and type before access is granted.

Models
#db.js
creates database // checks conenction to the database 
#tables.js 

drop /creates user and book tables 

Routes
    books
#books.js 

    users 
#auth.js
#index.js
#app.js
#server.js
