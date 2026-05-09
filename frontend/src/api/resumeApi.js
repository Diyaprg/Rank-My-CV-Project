import axios from "axios";

const API = axios.create({
  baseURL:`${import.meta.env.VITE_API_URL}/api`,
});

export const uploadResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);  // matches upload.single("resume")
  formData.append("jd", jobDescription);  // matches req.body.jd

  const response = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export default API;