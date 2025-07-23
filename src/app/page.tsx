"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, you'd send this to your backend
      setTimeout(() => {
        setShowWaitlistModal(false);
        setIsSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Join the Waitlist</h3>
              <p className="text-muted-foreground">Be the first to know when LifeOS launches</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 rounded-xl">
                    Join Waitlist
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowWaitlistModal(false)}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h4>
                <p className="text-muted-foreground">We'll notify you when LifeOS is ready.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-40 bg-white/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-xl text-foreground">LifeOS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Button variant="outline" size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        data-animate
        className={`py-20 md:py-32 transition-all duration-1000 ${
          visibleSections.has('hero')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              An operating system
              <br />
              <span>
                for{' '}
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">your life</span>.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              A local-first, privacy-first dashboard that helps you manage everything in your life — notes, emails, files, tasks, calendars, and learning data — in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => setShowWaitlistModal(true)}
              >
                Join the Waitlist
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section
        id="social-proof"
        data-animate
        className={`py-12 bg-white/50 backdrop-blur-sm transition-all duration-1000 delay-200 ${
          visibleSections.has('social-proof')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">Trusted by productivity enthusiasts worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-foreground">12,847</span>
                <span className="text-muted-foreground">waitlist members</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-foreground">4.9★</span>
                <span className="text-muted-foreground">beta rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-foreground">50+</span>
                <span className="text-muted-foreground">companies testing</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">TechCorp</div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">InnovateHub</div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">CreativeStudio</div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">ProductiveLabs</div>
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600">FutureWorks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Showcase */}
      <section
        id="showcase"
        data-animate
        className={`py-20 transition-all duration-1000 delay-300 ${
          visibleSections.has('showcase')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See LifeOS in action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of an integrated life management system
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-border/40 rounded-3xl p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-1">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Tasks Widget */}
                    <Card className="border-border/40 bg-white/90 rounded-xl">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Today's Tasks</CardTitle>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-green-500 rounded-sm bg-green-500"></div>
                          <span className="text-sm line-through text-muted-foreground">Review quarterly goals</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-green-500 rounded-sm bg-green-500"></div>
                          <span className="text-sm line-through text-muted-foreground">Update project timeline</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-muted-foreground rounded-sm"></div>
                          <span className="text-sm">Prepare presentation deck</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-muted-foreground rounded-sm"></div>
                          <span className="text-sm">Team sync meeting</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Insights Widget */}
                    <Card className="border-border/40 bg-white/90 rounded-xl">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">AI Insights</CardTitle>
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">💡 You're most productive at 10 AM. Consider scheduling important tasks then.</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">🎯 You're on track to complete 95% of your weekly goals!</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm text-orange-800">⚡ Take a break! You've been focused for 2 hours.</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Progress Widget */}
                    <Card className="border-border/40 bg-white/90 rounded-xl">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Weekly Progress</CardTitle>
                          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">Level 12</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tasks Completed</span>
                            <span>18/25</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '72%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Productivity Score</span>
                            <span>847 XP</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '84%'}}></div>
                          </div>
                        </div>
                        <div className="flex justify-center space-x-2 pt-2">
                          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm">🏆</div>
                          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-sm">✅</div>
                          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm">🚀</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">✨ Interactive demo - Click widgets to explore features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        data-animate
        className={`py-20 bg-white/30 backdrop-blur-sm transition-all duration-1000 delay-400 ${
          visibleSections.has('features')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to organize your life
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you stay productive, focused, and in control.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-border/40 backdrop-blur-sm bg-white/60 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center group-hover:text-foreground transition-colors duration-300">
                  Smart automation and insights powered by AI to help you make better decisions and save time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300">Life Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center group-hover:text-foreground transition-colors duration-300">
                  A unified view of your tasks, notes, emails, files, and calendar in one beautiful interface.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-300">Gamified Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center group-hover:text-foreground transition-colors duration-300">
                  Turn your life into a game with achievement systems, progress tracking, and motivational rewards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors duration-300">Local-first Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center group-hover:text-foreground transition-colors duration-300">
                  Your data stays on your device. Complete privacy and control with optional cloud sync.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        data-animate
        className={`py-20 transition-all duration-1000 delay-500 ${
          visibleSections.has('blog')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest from our blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights on productivity, privacy, and life organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">Privacy</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-3">Why Local-First Software Matters in 2025</h3>
                <p className="text-muted-foreground mb-4">Exploring the benefits of keeping your data on your device and why privacy-first approaches are becoming essential.</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Sarah Chen</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                  <span className="mx-2">•</span>
                  <span>Jan 15, 2025</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-800 hover:bg-green-100">Productivity</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Science Behind Gamified Goal Setting</h3>
                <p className="text-muted-foreground mb-4">How turning your life into a game can increase motivation and help you achieve your most ambitious goals.</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Dr. Alex Rodriguez</span>
                  <span className="mx-2">•</span>
                  <span>8 min read</span>
                  <span className="mx-2">•</span>
                  <span>Jan 12, 2025</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-orange-100 text-orange-800 hover:bg-orange-100">AI & Automation</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-3">Building an AI Assistant That Respects Your Privacy</h3>
                <p className="text-muted-foreground mb-4">Our approach to creating intelligent features while keeping your personal data completely under your control.</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Team LifeOS</span>
                  <span className="mx-2">•</span>
                  <span>6 min read</span>
                  <span className="mx-2">•</span>
                  <span>Jan 10, 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        data-animate
        className={`py-20 bg-white/30 backdrop-blur-sm transition-all duration-1000 delay-600 ${
          visibleSections.has('faq')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about LifeOS privacy, features, and functionality.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">How does local-first storage work?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  LifeOS stores all your data directly on your device using encrypted local databases. This means your notes, tasks, and files never leave your computer unless you explicitly choose to sync them. You maintain complete control and ownership of your data at all times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">What AI features are included?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI assistant helps with task prioritization, content summarization, smart scheduling suggestions, and goal tracking insights. All AI processing can be done locally to maintain privacy, or you can opt-in to cloud-based AI for enhanced features like natural language processing and advanced analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Can I sync data across devices?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! LifeOS offers optional end-to-end encrypted cloud sync. Your data is encrypted on your device before being sent to our servers, ensuring that only you can access it. You can also use your own cloud storage providers like Dropbox or Google Drive for syncing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">How does the gamification system work?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  LifeOS turns your productivity into a game with experience points, achievement badges, and progress streaks. Complete tasks to earn XP, maintain habits to build streaks, and unlock new themes and features as you level up. The system is designed to motivate without becoming overwhelming.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">What platforms are supported?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  LifeOS is available for Windows, macOS, and Linux as a native desktop application. We also offer a web version for browser access and mobile apps for iOS and Android. All versions sync seamlessly while maintaining local-first principles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Is there a free version available?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! Our free tier includes the core dashboard, local storage, and basic goal tracking. This gives you a full-featured productivity system without any cost. Paid plans add AI assistance, cloud sync, advanced gamification, and team collaboration features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        data-animate
        className={`py-20 transition-all duration-1000 delay-700 ${
          visibleSections.has('testimonials')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by productivity enthusiasts
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sarah Martinez</h4>
                    <p className="text-sm text-muted-foreground">Product Designer</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "LifeOS has completely transformed how I manage my daily workflow. Having everything in one place with AI assistance has made me 3x more productive. The privacy-first approach is exactly what I was looking for."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">AC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Alex Chen</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The gamification features in LifeOS keep me motivated like no other productivity app. I love how it turns my goals into achievements and makes progress visible. It's like having a personal life coach."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        data-animate
        className={`py-20 bg-white/30 backdrop-blur-sm transition-all duration-1000 delay-800 ${
          visibleSections.has('pricing')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic dashboard
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Local storage only
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic goal tracking
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 rounded-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/50 backdrop-blur-sm bg-white/80 rounded-2xl relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-500">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">$9</div>
                <CardDescription>For power users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Free
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI assistant
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cloud sync
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced gamification
                  </li>
                </ul>
                <Button className="w-full mt-6 rounded-full">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40 backdrop-blur-sm bg-white/60 rounded-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">Premium</CardTitle>
                <div className="text-4xl font-bold text-foreground mb-2">$19</div>
                <CardDescription>For teams and professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 rounded-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="font-semibold text-xl text-foreground">LifeOS</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The operating system for your life. Organize, automate, and gamify your way to a more productive and fulfilling life.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 LifeOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
