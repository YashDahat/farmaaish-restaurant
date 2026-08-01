import Layout from '@/components/Layout';
import { CateringInquiryForm } from '@/components/inquiry/CateringInquiryForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CateringPage = () => {
  return (
    <Layout>
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/catering-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="catering-hero-title">
            Experience Farmaaish Catering
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Bring the exquisite flavors of Farmaaish Restaurant to your next event. From intimate gatherings to grand celebrations, our catering services promise an unforgettable culinary journey.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Catering Services</h2>
          <p className="text-lg text-[#36454F] leading-relaxed mb-10 max-w-3xl mx-auto">
            At Farmaaish, we believe every event is unique. Our dedicated team works with you to craft a bespoke menu that perfectly suits your taste, theme, and budget. We offer a wide range of options, from traditional Indian feasts to contemporary fusion dishes, all prepared with the freshest ingredients and our signature touch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Weddings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#36454F]">
                  Make your special day even more memorable with our exquisite wedding catering.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="p-6 transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Corporate Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#36454F]">
                  Impress your clients and colleagues with a sophisticated culinary experience.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="p-6 transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Private Parties</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#36454F]">
                  Celebrate birthdays, anniversaries, and other milestones with our custom menus.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <CateringInquiryForm />
        </div>
      </section>
    </Layout>
  );
};

export default CateringPage;