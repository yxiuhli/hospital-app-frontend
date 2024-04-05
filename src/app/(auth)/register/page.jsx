import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-1/3 bg-[--bgSoft] flex flex-col text-center rounded-lg p-8">
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;
