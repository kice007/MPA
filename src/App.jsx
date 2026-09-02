import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Ecosysteme from './components/Ecosysteme'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import Stats from './components/Stats'
import News from './components/News'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Ecosysteme />
        <Products />
        <Testimonials />
        <Stats />
        <News />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
