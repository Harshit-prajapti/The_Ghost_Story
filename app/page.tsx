"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
    return null;
  }
  return (
    <div className="mt-14 min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6">
      {/* Hero Section */}
      <section className="text-center max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 animate-fade-up">Welcome to Ghost Stories</h1>
        <p className="text-lg opacity-90 mb-6">
          Dive into the world of horror and mystery. Read and share real-life ghost stories that will send shivers down your spine.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-white text-purple-600 hover:bg-gray-200" onClick={() => router.push("/api/login")}>
            Get Started
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" onClick={() => router.push("/api/login")}>
            Login
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-16 max-w-5xl text-center">
        <h2 className="text-4xl font-bold mb-4">About This Website</h2>
        <p className="text-lg opacity-90">
          "Ghost Stories" is a platform dedicated to horror lovers. Whether you believe in ghosts or not, our collection of terrifying experiences will
          keep you up at night. Join our community and share your own spooky encounters!
        </p>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        <Card className="bg-white/10 p-6 rounded-xl shadow-lg text-center
        ">
          <h3 className="text-2xl font-semibold mb-2">👻 Real Stories</h3>
          <p className="opacity-90">Read spine-chilling stories shared by real people.</p>
        </Card>

        <Card className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">🎤 Share Yours</h3>
          <p className="opacity-90">Have a ghostly encounter? Share it with the world.</p>
        </Card>

        <Card className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-2">📖 Community Discussions</h3>
          <p className="opacity-90">Discuss theories, hauntings, and supernatural experiences.</p>
        </Card>
      </section>

      {/* About the Creator */}
      <section className="mt-16 text-center max-w-4xl">
        <h2 className="text-4xl font-bold mb-4">👨‍💻 About Me</h2>
        <p className="text-lg opacity-90">
          Hi, I'm **Harshit Kumbhkar**, a passionate developer creating unique web experiences. I built this platform to connect horror enthusiasts worldwide.
          If you love ghost stories, you're in the right place!
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-16 mb-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to explore the unknown?</h2>
        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-200" onClick={() => router.push("/api/login")}>
          Join Now
        </Button>
      </section>
    </div>
  );
}
