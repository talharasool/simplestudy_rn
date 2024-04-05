This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!


# Project Scalability with REDUX

To achieve scalability and lay a robust foundation for your project, Redux can be a valuable tool. Here's how Redux can help with the mentioned future features:

Deep-linking: Redux can store the state of your application, including deep-linking information. You can manage deep-linking actions and states in Redux, making it easier to handle navigation and data persistence across different parts of your app.

PDF Visualization/Printing/Saving: Redux can manage the state related to PDF files, such as their content, visibility, and actions like printing or saving. You can use Redux actions to update PDF-related states and connect them to your UI components.

File Upload: Redux can handle file upload states, such as upload progress, success, or failure. You can use Redux to manage the file upload process and update UI components based on the upload status stored in Redux state.

Camera Integration: Redux can manage camera-related states, such as capturing images or videos, permissions, and camera settings. You can use Redux actions to trigger camera actions and update camera-related states in your app.

Apple In-App Purchases: Redux can handle in-app purchase states, such as purchase status, receipts, and user entitlements. You can use Redux to manage the purchase flow, update purchase-related states, and handle interactions with Apple's in-app purchase APIs.

By using Redux to manage these features, you create a centralized and predictable state management system that helps in scaling your project and adding new features seamlessly. Additionally, Redux's debugging tools and middleware support can further enhance the development and maintenance of your application.
