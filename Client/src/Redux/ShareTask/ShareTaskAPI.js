import axios from "axios";

export const getShareTask = async (data) => {
  try {
    return await axios.get(
      `http://localhost:5000/promaneger/api/tasks/get/share/task/${data.id}`
    );
  } catch (error) {
    console.log(error.message);
  }
};
///get/share/task/:id"
