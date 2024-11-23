// import React, { useEffect } from 'react';
// import { getAllSuites } from '../slice/suiteSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import './SuiteDisplay.css';

// const SuitDisplay = () => {
//     const dispatch = useDispatch();
//     const { allSuites, loading } = useSelector((state) => state.suite);

//     useEffect(() => {
//         dispatch(getAllSuites());
//     }, [dispatch]);

//     if (loading) return <>הדף נטען...</>;

//     return (
//         <div>
//             <h1>סוויטות</h1>
//             <div className="suites-container">
//                 {allSuites.map((suite) => (
//                     <div className="suite-card" key={suite.id}>
//                         <h2>{suite.numberBeds}</h2>
//                         <p>דירוג: {suite.rating}</p>
//                         <p>עיר : {suite.city} ₪</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SuitDisplay;


import React, { useEffect } from 'react';
import { getAllSuites } from '../slice/suiteSlice';
import { useDispatch, useSelector } from 'react-redux';
import './SuiteDisplay.css';

const SuitDisplay = () => {
    const dispatch = useDispatch();
    const { allSuites, loading } = useSelector((state) => state.suite);

    useEffect(() => {
        dispatch(getAllSuites());
    }, [dispatch]);

    if (loading) return <>הדף נטען...</>;

    // אם allSuites לא מערך, נסמן אותו ככזה
    const suites = Array.isArray(allSuites) ? allSuites : [];

    return (
        <div>
            <h1>סוויטות</h1>
            <div className="suites-container">
                {suites.map((suite) => (
                    <div className="suite-card" key={suite.id}>
                        <h2>{suite.numberBeds}</h2>
                        <p>דירוג: {suite.rating}</p>
                        <p>עיר: {suite.city} ₪</p>
                        
                        {/* הצגת התמונות של הסוויטה */}
                        <div className="suite-images">
                            {suite.imageList && suite.imageList.length > 0 ? (
                                suite.imageList.map((image) => (
                                    <img 
                                        key={image.id}
                                        src={image.imageUrl} 
                                        alt={`Suite Image ${image.id}`} 
                                        className="suite-image"
                                    />
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuitDisplay;

