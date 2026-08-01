import { LoginForm } from '@/components/auth/LoginForm';
import Layout from '@/components/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/login-background.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6 text-center">
            Welcome to Farmaaish
          </h1>
          <p className="text-md text-gray-600 mb-8 text-center">
            Savor the Royal Flavors
          </p>
          <LoginForm />
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;