import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import OrderHistory from '@/components/profile/OrderHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Layout>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center" data-testid="profile-title">
            My Profile
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Details Section */}
            <Card className="lg:col-span-1 p-6 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-700">
                  <p className="font-medium">Email:</p>
                  <p className="text-lg" data-testid="profile-email">{user?.email ?? 'N/A'}</p>
                </div>
                <Separator />
                <div className="text-gray-700">
                  <p className="font-medium">Name:</p>
                  <p className="text-lg">John Doe (Placeholder)</p>
                </div>
                <Separator />
                <div className="text-gray-700">
                  <p className="font-medium">Phone:</p>
                  <p className="text-lg">+91 98765 43210 (Placeholder)</p>
                </div>
                <Separator />
                <div className="text-gray-700">
                  <p className="font-medium">Delivery Address:</p>
                  <p className="text-lg">123 Main St, Anytown, India (Placeholder)</p>
                </div>
                <Button
                  onClick={logout}
                  className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 mt-6"
                  data-testid="logout-button"
                >
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Order History Section */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6" data-testid="order-history-title">
                Order History
              </h2>
              <OrderHistory />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;