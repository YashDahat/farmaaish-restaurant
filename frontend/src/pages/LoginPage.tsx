import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/routes';
import Layout from '@/components/Layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md border border-gray-100" data-testid="login-form">
            <h1 className="text-3xl font-bold text-[#36454F] text-center">Welcome Back to Farmaaish</h1>
            <p className="mt-2 text-gray-600 text-center">Sign in to savor the authentic Mughlai experience.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  data-testid="login-email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  data-testid="login-password"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                disabled={isLoading}
                data-testid="login-submit"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;