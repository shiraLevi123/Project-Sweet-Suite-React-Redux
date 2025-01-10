import axios from 'axios';

export const createDiaryEntry = async (diaryData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/diary', diaryData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getDiaries = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/diary');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

