import LoginForm from "@/components/loginForm/LoginForm";

const LoginPage = () => {

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/3 bg-[--bgSoft] flex flex-col text-center rounded-lg p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
