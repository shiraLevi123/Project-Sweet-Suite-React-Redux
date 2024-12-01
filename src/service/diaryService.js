import axios from 'axios';

export const createDiaryEntry = async (diaryData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/diary', diaryData);
    return response.data;
  } catch (error) {
    //  console.log('Error during request:', error);
    throw error.response ? error.response.data : error.message;
  }
};


// const getAllDiaryEntries = async () => {
//     try {
//         const response = await axios.get('/api/diary'); // פונה ל-backend לקבל את כל היומנים
//         console.log(response.data); // מציג את הנתונים שהתקבלו
//     } catch (error) {
//         console.error('There was an error!', error);
//     }
// };