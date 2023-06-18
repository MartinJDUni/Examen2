import Header from "./components/header"
import Body from "./components/main"
import Footer from "./components/footer"
import Cta from "./components/cta"

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Cta />
        <Body />
      </main>
      <Footer />
    </div>
  )
}
