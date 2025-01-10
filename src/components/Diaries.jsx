import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiariesAsync } from '../slice/diarySlice';

const Diaries = () => {
  const dispatch = useDispatch();

  const diaries = useSelector((state) => state.diary.diaryEntries);
  useEffect(() => {
    dispatch(getDiariesAsync());
  }, [dispatch]);

  return (
    <div>
      {diaries && diaries.length > 0 ? (
        diaries.map((d) => (
          <div key={d.id}>
            <h3>Suite ID: {d.suite.id}</h3>
            <p>City: {d.suite.city}</p>
            <p>Address: {d.suite.address}</p>
            <p>Check-in: {d.checkIn}</p>
            <p>Check-out: {d.checkOut}</p>
          </div>
        ))
      ) : (
        <p>No diaries available</p>
      )}
    </div>
  );

};

export default Diaries;
