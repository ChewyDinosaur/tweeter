# Tweeter Project

Tweeter is a simple, single-page Twitter clone powered by Express, MongoDB, and jQuery.

[You can view a Heroku hosted version of the app here.](https://frozen-ravine-43182.herokuapp.com/)

Users are able to submit new tweets and will be assigned a random name, handle and avatar when doing so. Users can also "like" other tweets.

![Tweeter App](https://github.com/ChewyDinosaur/tweeter/blob/master/docs/appNew.gif)

## Setup

* After cloning the repo, run `npm install` to install the dependencies.
* Create a .env file in the directory, and include the following:
```
MONGODB_URI='mongodb://localhost:27017/tweeter
PORT=8080
```
* Run the server using the `npm start` command.
* Tweeter will then be accessible at localhost:8080

## Dependencies

- Express
- Nodejs
- Body Parser
- Momentjs
- Chance
- dotenv
- Md5
- Mongodb
