import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirection handled by useEffect
    } catch (error) {
      toast.error('Login failed. Please check your username and password.');
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-md mx-auto" data-testid="login-form">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#36454F]">Admin Login</CardTitle>
            <p className="text-gray-600 mb-6">Access the Farmaaish Restaurant management portal.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                  data-testid="login-username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                  data-testid="login-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                disabled={isLoading}
                data-testid="login-submit"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}