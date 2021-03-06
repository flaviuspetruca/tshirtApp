# Ecommerce Web App built with React Node.js Express and MongoDB.


### Backend

RESTful API for Authentication and passing data for the items. SignIn , Register route. Using MongoDB via Mongoose for the data manipulation.
Authentication is done via JWT.
Using Mutler in oreder to pass an image to DB.
In order to upload/delete data to DB user must be ADMIN.
A collection in the DB has the emails of the users allowed to be ADMINS. At registration the email is verified if it is in this collection, otherwise is will have a BASIC role.
Passwords are crypted using Bcrypt.

### FrontEnd

Using React.
Validate Token function that verifies if the user is still Logged in. Check if the token is still valid(hasn't expired).
On the home page fetching data to show the items available in store.
A modal appears every time an item is added to cart.
SignIn Register Cart components.
Cart items are stored in the localStorage for limiting requests to the API.

#### More work to be done on styling and remove some bugs when authenticated.



