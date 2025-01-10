import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getAllComment } from '../slice/reviewSlice';
import { Rating } from '@mui/material';
import { getCustomers } from '../slice/customerSlice';

export default function Comment() {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const mySuite = useSelector((state) => state.suite.mySuite);
    const currentCustomer = useSelector((state) => state.customer.currentCustomer);
    const comments = useSelector((state) => state.review.comments);
    const customers = useSelector((state) => state.customer.allCustomers);
    const loading = useSelector((state) => state.review.loading);
    const error = useSelector((state) => state.review.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            rating,
            comment,
            idSuite: mySuite,
            idCustomer: currentCustomer?.id,
        };
        dispatch(addComment(newComment));
    };

    useEffect(() => {
        dispatch(getAllComment());
        dispatch(getCustomers());
    }, [dispatch]);

    const filterComments = comments.filter((c) => c.idSuite === mySuite);

    return (
        <div style={{ paddingTop: '130px', direction: 'rtl', textAlign: 'right' }}>
            {currentCustomer != null && (
                <div>
                    <h3>תגובות</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(e, newValue) => setRating(newValue)}
                                size="large"
                            />
                        </div>
                        <div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="2"
                                placeholder="התגובה שלך"
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: '#B3E5FC',  // צבע תכלת
                                color: '#fff',  // צבע טקסט לבן
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '30px',  // צורה עגולה
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            {loading ? 'שולח...' : 'שלח תגובה'}
                        </button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            )}

            <div>
                <h3>תגובות קודמות:</h3>
                {filterComments.length === 0 ? (
                    <p>אין תגובות עדיין</p>
                ) : (
                    filterComments.map((comment) => {
                        const customer = customers.find((c) => c.id === comment.idCustomer);
                        console.log(customer);
                        return (
                            <div
                                key={comment.id}
                                style={{
                                    borderBottom: '3px solid #ddd',  // פסי גבול רחבים יותר
                                    padding: '15px',  // מרווח פנימי גדול יותר
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${customer?.image}`}
                                    alt={customer?.name || 'User'}
                                    style={{
                                        width: '50px',  // תמונה יותר גדולה
                                        height: '50px', // תמונה יותר גדולה
                                        borderRadius: '50%',
                                        marginRight: '15px',  // מרווח בין התמונה לטקסט
                                    }}
                                />
                                <div>
                                    <Rating value={comment.rating} readOnly size="large" /> {/* כוכבים גדולים */}
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );

}
