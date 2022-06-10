const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Include the chrome driver
require("chromedriver");
const axios = require("axios");
//const gttl = require('./server.js');
// Include selenium webdriver
let swd = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");

/*let options   = new chrome.Options().headless();
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome")
//.setChromeOptions(options)
.build();*/

// Get the credentials from the JSON file
let configs = require("./config.json");

const app = express();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/setgtt", (req, res) => {
  //console.log("new user list===", JSON.parse(process.env.USER_LIST));
  //return;
  let { user, quantity, company, GTTPrice } = req.body;
  let { userid, pass, pin } = JSON.parse(process.env.USER_LIST)[user];
  //console.log("all users======",regusers[userid],req.body);return;
  //console.log("GTTDetail",GTTDetail);
  let options = new chrome.Options().headless();
  let browser = new swd.Builder();
  let tab = browser
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  // Step 1 - Opening the Zerodha sign in page
  let tabToOpen = tab.get(configs.appurl);
  tabToOpen
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      });
      return findTimeOutP;
    })
    .then(function () {
      // Step 2 - Finding the username input
      let promiseUsernameBox = tab.findElement(swd.By.css("#userid"));
      return promiseUsernameBox;
    })
    .then(function (usernameBox) {
      // Step 3 - Entering the username
      let promiseFillUsername = usernameBox.sendKeys(userid);
      return promiseFillUsername;
    })
    .then(function () {
      console.log(
        "Username entered successfully in" + "'login demonstration' for Zerodha"
      );

      // Step 4 - Finding the password input
      let promisePasswordBox = tab.findElement(swd.By.css("#password"));
      return promisePasswordBox;
    })
    .then(function (passwordBox) {
      // Step 5 - Entering the password
      let promiseFillPassword = passwordBox.sendKeys(pass);
      return promiseFillPassword;
    })
    .then(function () {
      console.log(
        "Password entered successfully in" +
          " 'login demonstration' for Zerodha"
      );

      // Step 6 - Finding the Sign In button
      let promiseSignInBtn = tab.findElement(swd.By.css(".button-orange.wide"));
      return promiseSignInBtn;
    })
    .then(function (signInBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickSignIn = signInBtn.click();
      return promiseClickSignIn;
    })
    .then(function () {
      console.log("Successfully signed in Zerodha!");
    })
    .then(function () {
      console.log("username and password entered correctly");

      // Step 4 - Finding the password input
      let promisePinBox = tab.findElement(swd.By.css("#pin"));
      return promisePinBox;
    })
    .then(function (pinBox) {
      // Step 5 - Entering the pin
      let promiseFillPin = pinBox.sendKeys(pin);
      return promiseFillPin;
    })
    .then(function () {
      console.log(
        "Pin entered successfully in" + " 'login demonstration' for Zerodha"
      );

      // Step 6 - Finding the Sign In button
      let promiseSignInPinBtn = tab.findElement(
        swd.By.css(".button-orange.wide")
      );
      return promiseSignInPinBtn;
    })
    .then(function (signInPinBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickPinSignIn = signInPinBtn.click();
      return promiseClickPinSignIn;
    })
    .then(function () {
      console.log("Successfully entered all details");

      let promiseOrderBox = tab.findElement(swd.By.css(".orders-nav-item"));
      return promiseOrderBox;
    })
    .then(function (OrderBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickOrder = OrderBtn.click();
      return promiseClickOrder;
    })
    .then(function () {
      console.log("Successfully clicked order link");

      let promiseGTTBox = tab.findElement(swd.By.linkText("GTT"));
      return promiseGTTBox;
    })
    .then(function (OrderGTTBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickGTT = OrderGTTBtn.click();
      return promiseClickGTT;
    })
    .then(function () {
      console.log("Successfully clicked GTT link");

      let promiseCreateGTTBox = tab.findElement(
        swd.By.css(".create-new.button.button-small.button-blue")
      );
      return promiseCreateGTTBox;
    })
    .then(function (CreateGTTBtn) {
      // Step 7 - Clicking the Sign In button
      let promiseClickGTTButton = CreateGTTBtn.click();
      return promiseClickGTTButton;
    })
    .then(function () {
      console.log("Successfully clicked GTT Final link");
      let promiseSearchBox = tab.findElement(
        swd.By.css(".modal-header .search input[type='text']")
      );
      return promiseSearchBox;
    })
    .then(function (searchBox) {
      // Step 5 - Entering the pin
      let promiseFillSearchBox = searchBox.sendKeys(company);
      return promiseFillSearchBox;
    })
    .then(function () {
      console.log("Successfully clicked GTT Final1 link");
      let searchListItems = tab.findElement(
        swd.By.css(".search-result-item.selected")
      );
      return searchListItems;
    })
    .then(function (searchListBtn) {
      // Step 7 - Clicking the Sign In button
      let suggestedListItems = searchListBtn.click();
      return suggestedListItems;
    })
    .then(function () {
      // Timeout to wait if connection is slow
      let findTimeOutP = tab.manage().setTimeouts({
        implicit: 10000, // 10 seconds
      });
      return findTimeOutP;
    })
    .then(function () {
      console.log("Successfully opened selected company");
      let createNewGTTButton = tab.findElement(
        swd.By.css(".modal-footer .four.columns .button-outline.button-blue")
      );
      return createNewGTTButton;
    })
    .then(function (createNewGttBtn) {
      // Step 7 - Clicking the Sign In button
      console.log("inside open window set GTT", createNewGttBtn);
      let gttButtonClick = createNewGttBtn.click();
      //let gttButtonClick_1 = createNewGttBtn.click();
      return gttButtonClick;
    })
    .then(function () {
      console.log("inside set trigger button");
      let Trigger_price = tab.findElement(
        swd.By.css("input[label='Trigger price']")
      );
      return Trigger_price;
    })
    .then(function (createNewTrigger_price) {
      // Step 7 - Clicking the Sign In button
      let triggerPriceButtonClickNew_1 = createNewTrigger_price.sendKeys(
        swd.Key.CONTROL,
        swd.Key.chord("a")
      );
      let triggerPriceButtonClickNew_2 = createNewTrigger_price.sendKeys(
        swd.Key.BACK_SPACE
      );
      let triggerPriceButtonClickNew_4 = createNewTrigger_price.clear();
      let triggerPriceButtonClickNew_3 =
        createNewTrigger_price.sendKeys(GTTPrice);
      return triggerPriceButtonClickNew_1;
    })
    .then(function () {
      console.log("price inserted successfully");
      let Trigger_quantity = tab.findElement(swd.By.css("input[label='Qty.']"));
      return Trigger_quantity;
    })
    .then(function (createNewTrigger_quantity) {
      // Step 7 - Clicking the Sign In button
      let triggerQuntityButtonClickNew_1 = createNewTrigger_quantity.sendKeys(
        swd.Key.CONTROL,
        swd.Key.chord("a")
      );
      let triggerQuntityButtonClickNew_2 = createNewTrigger_quantity.sendKeys(
        swd.Key.BACK_SPACE
      );
      let triggerQuntityButtonClickNew_3 =
        createNewTrigger_quantity.sendKeys(quantity);
      return triggerQuntityButtonClickNew_1;
    })
    .then(function () {
      console.log("quantity inserted successfully");
      let Trigger_price_new = tab.findElement(
        swd.By.css("input[label='Price']")
      );
      return Trigger_price_new;
    })
    .then(function (createNewTrigger_price) {
      // Step 7 - Clicking the Sign In button
      let triggerQuntityButtonClickNew_12 = createNewTrigger_price.sendKeys(
        swd.Key.CONTROL,
        swd.Key.chord("a")
      );
      let triggerPriceButtonClickNew_43 = createNewTrigger_price.clear();
      let triggerQuntityButtonClickNew_22 = createNewTrigger_price.sendKeys(
        swd.Key.BACK_SPACE
      );
      let triggerQuntityButtonClickNew_32 =
        createNewTrigger_price.sendKeys(GTTPrice);
      return triggerQuntityButtonClickNew_12;
    })
    .then(function () {
      console.log("new price inserted successfully");
      let Trigger_GTT_creation = tab.findElement(
        swd.By.css(".modal-footer .place.button-blue")
      );
      return Trigger_GTT_creation;
    })
    .then(function (newGttBtnClick) {
      // Step 7 - Clicking the Sign In button
      let gttButtonClickHandler = newGttBtnClick.click();
      return gttButtonClickHandler;
    })
    .then(function () {
      res.send("success");
    })
    .catch(function (err) {
      console.log("error occoured=====", err);
      res.send("failed");
    });
});

app.listen(process.env.PORT, () =>
  console.log(`GTT app listening on port ${process.env.PORT}!`)
);

/*console.log("request has come");
// Output the book to the console for debugging
console.log(book);
//books.push(book);

res.send('Book is added to the database');*/
