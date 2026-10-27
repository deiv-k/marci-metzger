import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import GetItSold from './components/GetItSold.jsx';
import Search from './components/Search.jsx';
import Gallery from './components/Gallery.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GetItSold />
        <Search />
        <Gallery />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
