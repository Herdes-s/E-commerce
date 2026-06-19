import { useState } from "react";
import FormLog from "../../components/FormLog";
import FormCreate from "../../components/FormCreate";

function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div>
      {isLogin ? (
        <FormLog setIsLogin={setIsLogin} isLogin={isLogin} />
      ) : (
        <FormCreate setIsLogin={setIsLogin} isLogin={isLogin} />
      )}
    </div>
  );
}

export default Login;
