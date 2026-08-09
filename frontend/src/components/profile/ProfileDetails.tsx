import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ProfileDetails = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner, or a message
  }

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="profile-details-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="username" className="text-gray-600">Username</Label>
          <p id="username" className="text-lg font-medium" data-testid="profile-username">{user.username}</p>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="role" className="text-gray-600">Role</Label>
          <p id="role" className="text-lg font-medium" data-testid="profile-role">{user.role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;