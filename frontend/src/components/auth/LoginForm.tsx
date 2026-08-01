import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { AuthRequest } from '@/types/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AuthRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: AuthRequest) => {
    try {
      await login(values);
      toast.success('Login successful!');
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} data-testid="login-username" />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} data-testid="login-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full"
          disabled={form.formState.isSubmitting}
          data-testid="login-submit"
        >
          {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};