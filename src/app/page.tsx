import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Barcode, Bot, HeartPulse, LineChart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: 'Personalized Profile',
    description: 'Create a health profile with your conditions and allergies for tailored analysis.',
  },
  {
    icon: <Barcode className="h-10 w-10 text-primary" />,
    title: 'Instant Barcode Scanning',
    description: 'Use your camera to scan product barcodes and instantly get nutritional information.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Analysis',
    description: 'Our AI checks if products are safe, risky, or unsafe for you based on your profile.',
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: 'Health Dashboard',
    description: 'Track your scanning history and monitor your nutritional intake over time.',
  },
    {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'AI Health Assistant',
    description: 'Ask our chatbot any health or nutrition-related questions you have.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Shop Smarter. Eat Healthier.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Smart Consumer helps you understand what's in your food. Scan any
              product barcode to instantly check its compatibility with your
              health needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="font-bold">
                <Link href="/scan">Start Scanning Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/profile">Create Your Profile</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A simple, powerful tool for your nutritional well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-primary/20 py-20 md:py-32">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Join thousands of users making smarter dietary choices every day.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <Link href="/scan">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
