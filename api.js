import { initializeApp } from "firebase/app";
import { collection, getDocs, getDoc, doc, getFirestore, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyC57nnCdcCy9oIEKTqiLpuTwwE6KxOZTZE",
    authDomain: "van-life-3ecb9.firebaseapp.com",
    projectId: "van-life-3ecb9",
    storageBucket: "van-life-3ecb9.appspot.com",
    messagingSenderId: "680756665901",
    appId: "1:680756665901:web:79719dd0238a13563ea2a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return {
        id: vanSnapshot.id,
        ...vanSnapshot.data()
    };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    );
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        };
    }

    return data;
}