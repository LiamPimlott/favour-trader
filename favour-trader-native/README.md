# COMP 4350: Software Engineering 2
# Project: FavourTrader (Native Mobile Application)

## Please note: This application has NOT been tested on iOS!
## Please use Android

Group 8 (Team 8x8):
- Alexander Mark
- Joseph Bernshine
- Barry Yakimchuk
- Eric Dyck
- Liam Pimlott
- Jian Wen Chen
- Ismail Khowaja
- Beom-Jin Park

## Expo:
This application uses a nifty tool called Expo to run on mobile devices and emulators! The following instructions will guide you through running our mobile application on the Expo app (so that you don't have to do any further installation!).

Please download the Expo mobile client on your mobile device, or install an Android emulator (we personally used our mobile devices, but the Android Studio emulator should work).

## Installation/Running:

To run the Native Application please go through the following steps:
1. Navigate to this directory (/favour-trader-native/)
2. run 'npm install'
3. run 'npm start'

This will start up an Expo instance of the application, with a scannable barcode to open the application inside of the Expo mobile app! (This allows our app to run inside Expo on your phone.

4. (Optional) Press 'a' to open the application in an Android emulator.

## Note:
We ran into trouble at this point, depending on your laptop - you will not be able to connect to your mobile device at this step. Our solution is to use the Expo GUI (https://docs.expo.io/versions/latest/introduction/installation.html). This will allow you to select the /favour-trader-native/ directory and click "share" to get that same scannable barcode.

## If all else fails:
We have a backup version of the application available at https://exp.host/@ismailkhowaja/favourtrader.
You should be able to scan the bar code on that page with the Expo mobile app in order to run it :)

## Running snapshot testing
- Navigate to /favour-trader-native
- Run `npm install`
- Run `npm test`

## Setting up / Running acceptance tests

1. To get codecept and appium working, follow these (https://codecept.io/mobile/) instructions under the setting up section.
2. Run 'appium-doctor' in a terminal and make sure you have the proper requirements installed.
3. navigate to /favour-trader-native/codecept.json and ensure the "app" field is set to the full path of /myapp2.apk on your machine.
4. open a new terminal run 'appium'
5. open a second terminal, ensure you are in /favour-trader-native and run 'codeceptjs run --steps'

## Final Note:
The mobile version of our application connects to our production environment located at http://favour-trader.appspot.com.