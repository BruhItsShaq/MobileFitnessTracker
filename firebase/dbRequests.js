import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAShAmJT6R3cEXA5pEeCU4sO-AyGN5ZeFM",
    authDomain: "mobilefitnesstracker-8dae7.firebaseapp.com",
    databaseURL: "https://mobilefitnesstracker-8dae7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mobilefitnesstracker-8dae7",
    storageBucket: "mobilefitnesstracker-8dae7.appspot.com",
    messagingSenderId: "1006972690213",
    appId: "1:1006972690213:web:d5b8c1fedaf0b6103d04cc",
    measurementId: "G-6XEE145XDZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export const signUp = async (email, password, username, age, gender, weight, height, activityLevel, goal, sleepGoal) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Get the user ID from the Firebase Authentication User object
        const userId = userCredential.user.uid;

        // Add the user data to the Firebase Realtime Database
        set(ref(database, 'users/' + userId), {
            activity_level: activityLevel,
            age: age,
            email: email,
            gender: gender,
            goal: goal,
            height: height,
            password_hash: password,
            sleep_goal: sleepGoal,
            total_calories_burned: 0,
            total_steps: 0,
            username: username,
            weight: weight
        });
    } catch (error) {
        // Handle errors here
        console.error(error);
        throw error;
    }
};

