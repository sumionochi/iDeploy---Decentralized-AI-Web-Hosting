'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Cpu, Search, BarChart, Network, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const features = [
    {
      icon: Globe,
      title: "Permanent Decentralized Hosting",
      description: "Host your website eternally on the blockchain—accessible anywhere, forever, and free of charge.",
    },
    {
      icon: Zap,
      title: "Seamless CI/CD with Instant Previews",
      description: "Effortlessly deploy from GitHub with real-time preview links and robust version control.",
    },
    {
      icon: Cpu,
      title: "AI-Powered Website Creation",
      description: "Design interactive websites using AI—transform images, text, or sketches into a fully editable site and deploy directly to the blockchain.",
    },
    {
      icon: Search,
      title: "Blockchain Search Engine",
      description: "Leverage our search engine to explore all websites indexed on the decentralized blockchain network.",
    },
    {
      icon: BarChart,
      title: "Advanced Analytics & Monitoring",
      description: "Access comprehensive real-time dashboards and uptime insights for your decentralized projects.",
    },
    {
      icon: Network,
      title: "Decentralized Content Delivery",
      description: "Accelerate access with our blockchain-based CDN, ensuring faster and more reliable content distribution.",
    },
  ]; 
  

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-secondary/10">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-between items-center mb-16 gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">iDeploy</span>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Link href="/about">
              <Button variant="ghost" className="text-sm">About</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-sm">Pricing</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-sm">Contact</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-sm">Login</Button>
            </Link>
            <button onClick={toggleTheme} className="flex items-center gap-2">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        <div className="text-center max-w-3xl mx-auto px-4">
          <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
            Web3 Hosting Revolution
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            The Future of Web3 Hosting on Smart Contracts
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground mb-8">
            Host your legacy websites like calculators and unit converters on the blockchain, absolutely free! No hosting fees, no expiration dates. Preserve your simple web projects forever with iDeploy's decentralized hosting.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="px-4 w-full sm:w-auto">
                Deploy for Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Learn How It Works
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Revolutionary Web3 Hosting Platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Trusted by Developers Worldwide</h2>
          <div className="flex flex-wrap justify-center space-x-4">
            {["GitHub", "GitLab", "Bitbucket", "SourceForge"].map((logo) => (
              <div key={logo} className="bg-muted text-muted-foreground px-6 py-3 rounded-lg">
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8">
            Join thousands of developers who are already using iDeploy for their Web3 projects.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8 w-full sm:w-auto">
              Sign Up for Free
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/community">Community</Link></li>
                <li><Link href="/support">Support</Link></li>
                <li><Link href="/status">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 iDeploy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
