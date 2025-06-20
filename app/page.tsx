import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Master Languages with <span className="text-blue-600">LinguaLearn</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Learn Spanish, French, and German through interactive lessons, engaging quizzes, and comprehensive
          dictionaries. Start your language journey today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/quiz">Start Learning</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50">
            View Dictionaries
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose LinguaLearn?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Interactive Quizzes</CardTitle>
              <CardDescription>
                Test your knowledge with engaging quizzes designed to reinforce learning
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Comprehensive Dictionaries</CardTitle>
              <CardDescription>Access extensive dictionaries for Spanish, French, and German</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Fast Progress</CardTitle>
              <CardDescription>
                Our proven methods help you learn languages faster than traditional methods
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Languages We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🇪🇸</span>
                Spanish
              </CardTitle>
              <CardDescription>Learn the world's second most spoken language</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Link href="/dictionary/spanish">Explore Spanish</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🇫🇷</span>
                French
              </CardTitle>
              <CardDescription>Master the language of love and diplomacy</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Link href="/dictionary/french">Explore French</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🇩🇪</span>
                German
              </CardTitle>
              <CardDescription>Learn the language of innovation and precision</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Link href="/dictionary/german">Explore German</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 rounded-lg text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Join Thousands of Learners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
