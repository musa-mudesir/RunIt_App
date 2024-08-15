# RunIt App

RunIt is a mobile application that allows users to create and join local pickup soccer games. The app provides an easy way for soccer enthusiasts to connect with others, organize matches, and track their game records.

## Features

- **User Authentication**: Secure sign-in and sign-up functionality using Firebase Authentication.
- **Create and Join Games**: Users can create new pickup games or join existing ones in their local area.
- **Profile Management**: Users can view their profile, which includes their game records and rating.
- **Responsive UI**: Clean and user-friendly interface designed with React Native and Expo.

## Installation

```sh
git clone https://github.com/yourusername/runit-app.git
cd runit-app
npm install
```

### Configure Firebase:

- Replace the Firebase configuration in firebaseconfig.ts with your own Firebase project's configuration.
- Ensure Firebase Authentication is enabled in your Firebase console.

### Run the App:
```sh
npm start
```
This will start the development server using Expo. You can then use the Expo Go app on your phone or an emulator to view the app.

#Project Structure
Here's an overview of the key directories and files in the project:

```sh
runit-app/
├── app/
│   ├── (auth)/
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/
│   │   ├── layout.tsx
│   │   ├── home/
│   │   ├── games/
│   │   └── profile/
│   ├── firebaseconfig.ts
│   └── index.tsx
├── components/
│   ├── Button.tsx
│   └── ...
├── constants/
│   └── Colors.ts
├── images/
│   └── Soccer.png
├── assets/
├── node_modules/
├── package.json
├── README.md
└── ...

```

## Technologies Used
- **React Native**: For building the user interface.
- **Expo**: To facilitate the development process.
- **Firebase**: For backend.
- **TypeScript**: For type-safe development.

  ## How We Use Firebase

In the RunIt app, Firebase provides essential backend services:

- **Firebase Authentication**: Manages user sign-in and sign-up securely.
- **Firebase Firestore (Optional)**: Could be used for storing game-related data.

For more details on how to set up and use Firebase, check out the [Firebase Documentation](https://firebase.google.com/docs).
