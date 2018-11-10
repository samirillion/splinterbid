# Splinter Bid

Splinter bid is probably the best thing to happen to the sport since it stopped being whist.

The client side of the application is written with vuejs and the server side is written using python's flask framework. The server acts like an API for the vue app to query. All communication occurs via websockets.

## Project setup
Run `npm install` from the client directory.

## Development
Run `python server.py` from the server directory. The python script will tell you to go to `localhost:5000` to view the application, but if you are making any changes to the client side, you should instead run `npm run serve` from the client directory and then view the app at `localhost:8080`, where all client-side changes will be hot-reloaded.

### Lints and fixes files
```
npm run lint
```