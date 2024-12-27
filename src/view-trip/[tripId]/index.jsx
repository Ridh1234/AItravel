import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import Itineraries from './components/Itineraries';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("document:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("no such document");
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 bg-gradient-to-r from-blue-50 via-green-100 to-yellow-100 min-h-screen'>
            {/* Information section */}
            <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
                <InfoSection trip={trip} />
            </div>

            {/* Hotels section */}
            <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
                <Hotels trip={trip} />
            </div>

            {/* Itinerary section */}
            <div className='bg-white shadow-lg rounded-lg p-6'>
                <Itineraries trip={trip} />
            </div>
        </div>
    );
}

export default Viewtrip;
