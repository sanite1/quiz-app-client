import Api from "../api/api";

export const fetchUser = async ({ queryKey }) => {
  const [, { patientId }] = queryKey;
  return Api.get(`/patient/${patientId}`).then((res) => res.data);
};
export const fetchUserDoctor = async ({ queryKey }) => {
  const [, { doctorId }] = queryKey;
  return Api.get(`/doctor/${doctorId}`).then((res) => res.data);
};
export const fetchQuestions = async ({ queryKey }) => {
  // const [, { doctorId }] = queryKey;
  return Api.get(`/questions`).then((res) => res.data);
};
export const login = async (payload) => {
  return Api.post("/user/login/", payload).then((res) => res.data);
};
export const storeAnswer = async (payload) => {
  return Api.post("/store-answer", payload).then((res) => res.data);
};
export const calculateResult = async (payload) => {
  return Api.post("/calculate-result", payload).then((res) => res.data);
};
export const createQuestion = async (payload) => {
  return Api.post("/create-question", payload).then((res) => res.data);
};
export const createUser = async (payload) => {
  return Api.post("/user/signup", payload).then((res) => res.data);
};
export const fetchResults = async ({ queryKey }) => {
  // const [, { doctorId }] = queryKey;
  return Api.get(`/results`).then((res) => res.data);
};
