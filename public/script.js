import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config'; // Make sure to adjust the path if necessary

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = ''; // Clear existing entries

    try {
        // Reference to the collection in Firestore
        const dataCollection = collection(firestore, 'your-collection-name'); // Replace with your collection name

        // Fetch documents from the collection
        const querySnapshot = await getDocs(dataCollection);

        // Add the header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <td class="label">Name</td>
            <td class="label">Product</td>
            <td class="label">Address</td>
        `;
        entriesContainer.appendChild(headerRow);

        // Process each document in the collection
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.name || 'N/A'}</td>
                <td>${data.product || 'N/A'}</td>
                <td>${data.address || 'N/A'}</td>
            `;
            entriesContainer.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
