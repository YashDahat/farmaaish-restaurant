import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      toast.success('Login successful!');
      navigate(ROUTES.HOME);
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="py-16 px-4 bg-[#F5F5DC] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <Card className="bg-white rounded-xl shadow-lg p-8">
          <CardHeader className="text-center mb-6">
            <h1 className="text-[#36454F] font-bold text-3xl mb-2">Welcome Back to Farmaaish</h1>
            <p className="text-gray-600 text-lg">Savor the Royal Flavors</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Enter your email"
                          {...field}
                          className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                          data-testid="login-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                          data-testid="login-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full"
                  disabled={form.formState.isSubmitting}
                  data-testid="login-submit"
                >
                  {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <a href="#" className="text-[#D4AF37] hover:underline text-sm">
                Forgot Password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}