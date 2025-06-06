import { saveUser } from "@/actions/save-user";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await saveUser();
  const {userId} = await auth();
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
    
      <section className="py-20 px-6 text-center bg-slate-100 dark:bg-slate-800">
        <h1 className="text-5xl font-bold mb-4">🎨 AI Thumbnail Generator</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Generate stunning, high-quality thumbnails from text prompts using AI – perfect for YouTube, blogs, and social media!
        </p>
        <Link href={userId ? "/generate" : "/sign-in"}>
           <Button className="text-lg px-6 py-4 rounded-xl">Generate Now</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-200 dark:bg-slate-700">
        <h2 className="text-3xl font-semibold text-center mb-12">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Prompt to Image",
              desc: "Type your idea and get an AI-generated thumbnail instantly."
            },
            {
              title: "1280x720 HD",
              desc: "Optimized for YouTube and other platforms with high resolution."
            },
            {
              title: "Light & Dark Mode",
              desc: "Seamless experience across both themes."
            }
          ].map((feature, idx) => (
            <Card key={idx} className="bg-slate-100 dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Generator?</h2>
          <p className="text-md text-slate-600 dark:text-slate-300">
            We combine cutting-edge AI with creative design principles to give you eye-catching thumbnails that convert. Whether you're a content creator or marketer, this tool saves you time and effort.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-slate-100 dark:bg-slate-800 text-center">
        <h2 className="text-2xl font-bold mb-4">🚀 Ready to transform your content?</h2>
        <p className="mb-6 text-slate-700 dark:text-slate-300">Start generating thumbnails with AI in seconds.</p>
        <Button className="text-lg px-6 py-4 rounded-xl">Try it Now</Button>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
        © {new Date().getFullYear()} Thumbly AI. All rights reserved.
      </footer>
    </main>
  );
}
