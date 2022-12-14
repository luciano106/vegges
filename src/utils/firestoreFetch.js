import { query, orderBy, where, collection, getDocs } from '@firebase/firestore';
import { doc, getDoc, setDoc, updateDoc, increment} from "firebase/firestore";
import db from './firebaseConfig';

export const firestoreFetch = async (idCategory) => {
    let q;
    if (idCategory) {
        q = query(collection(db, "products"), where('categoryId', '==', idCategory));
    } else {
        q = query(collection(db, "products"), orderBy('name'));
    }
    const querySnapshot = await getDocs(q);
    const dataFromFirestore = querySnapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));
    return dataFromFirestore;
}

export const firestoreFetchOne = async (idItem) => {
    const docRef = doc(db, "products", idItem);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
          id: idItem,
          ...docSnap.data()
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}

export const createOrderInFirestore = async (order) => {
    // Add a new document with a generated id
    const newOrderRef = doc(collection(db, "orders"));

    // later...
    await setDoc(newOrderRef, order);
    return newOrderRef;
  }

export const decrementStockInFirestore = async (idItem, quantity) => {
    // Get and update item sotck
    const itemRef = doc(db, "products", idItem)
    // later ...
    await updateDoc(itemRef,{stock: increment(-quantity)})        
}