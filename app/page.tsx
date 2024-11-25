"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Cpu, Search, BarChart, Network, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TryDeployment from "@/components/TryDeployment";
import { useTheme } from "next-themes";
import Navbar from "@/components/NavBar";

export default function Home() {
  const features = [
    {
      icon: Globe,
      title: "Everlasting Blockchain Presence",
      description: "Secure your digital legacy with our blockchain-powered hosting—your site lives on, free from time constraints or costs.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast Deployment Pipeline",
      description: "Streamline your workflow with GitHub integration, offering instant previews and bulletproof version tracking.",
    },
    {
      icon: Cpu,
      title: "AI-Driven Web Wizardry",
      description: "Design interactive websites with AI using images, text, or sketches into a fully editable site and deploy directly to the blockchain.",
    },
    {
      icon: Search,
      title: "Blockchain Explorer",
      description: "Dive into our decentralized web index, uncovering the vast landscape of blockchain-hosted content.",
    },
    {
      icon: BarChart,
      title: "Insight Command Center",
      description: "Gain unparalleled visibility into your decentralized projects with our real-time analytics and uptime tracking.",
    },
    {
      icon: Network,
      title: "Decentralized Speed Boost",
      description: "Supercharge your content delivery with our blockchain CDN, ensuring lightning-fast access worldwide.",
    },
  ];

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <header className="container mx-auto px-4 py-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
            Revolutionizing Web3 Presence
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Forge Your Digital Legacy on the Blockchain
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground mb-8">
            Breathe new life into your passion projects! From retro calculators to quirky converters, give your digital creations an eternal home on the blockchain. Zero fees, zero expiration—just pure, decentralized preservation with iDeploy.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="px-4 w-full sm:w-auto">
                Deploy at no cost <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Discover How it Works
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Pioneering the Web3 Frontier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Embraced by Innovators Worldwide</h2>
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5">
            {['GitHub', 'GitLab', 'Bitbucket', 'SourceForge'].map((logo) => (
              <div key={logo} className="bg-muted text-muted-foreground px-6 py-3 rounded-lg">
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-xl mb-10 p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Immortalize Your Work?</h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8">
            Join the vanguard of developers shaping the future of the web with iDeploy's revolutionary platform.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8 w-full sm:w-auto">
              Begin Your Web3 Journey
            </Button>
          </Link>
        </section>

        <TryDeployment/>
      </main>

      <footer className="bg-muted mt-0 pb-8 py-0">
      <div className="mt-0 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 iDeploy. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}