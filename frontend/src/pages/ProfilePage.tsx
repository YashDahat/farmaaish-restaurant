"use client";

import UserProfileForm from "@/components/profile/UserProfileForm";
import OrderHistoryList from "@/components/profile/OrderHistoryList";

export default function ProfilePage() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <UserProfileForm />
        </div>
        <div className="col-span-1">
          <OrderHistoryList />
        </div>
      </div>
    </section>
  );
}