import { Routes, Route } from "react-router-dom";
import App from './../components/App';
import Admin from "../components/Result/index";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/admin-review" element={<Admin />} />
      
    </Routes>
  );
};
