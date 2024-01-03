import React from 'react'
import Loading from '@/components/LoadingComponent'
import Link from 'next/link'


export const metadata = {
  title: 'About - Chitrakala',
  description: 'Art marketplace and showcase.',
}

const Page = () => {
  return (
    <div className="container mx-auto p-8 max-w-[50rem] text-justify bg-white m-5">
      <header className="text-3xl font-bold mb-8">
        About Chitrakala
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to Chitrakala</h2>
        <p className=''>
          Chitrakala is an online art gallery and marketplace dedicated to showcasing the incredible talents of artists from around the world. We believe that art has the power to inspire, connect, and transform, and we are passionate about providing a platform for artists to share their masterpieces with the world.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <ul className="list-disc list-inside">
          <li><strong>Empowering Artists:</strong>{` Chitrakala is more than just a platform; it's a community that celebrates and empowers artists.`}</li>
          <li><strong>Curating Excellence:</strong> Our team of curators carefully selects each piece featured on Chitrakala to ensure a collection of high-quality, diverse, and captivating artworks.</li>
          <li><strong>Connecting Art Lovers:</strong>{` Whether you're an art connoisseur or a casual admirer, Chitrakala welcomes you to explore, discover, and connect with art that resonates with your soul.`}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
        <ul className="list-disc list-inside">
          <li><strong>Global Showcase:</strong> Chitrakala is a melting pot of artistic talent from every corner of the globe.</li>
          <li><strong>Art Marketplace:</strong> In addition to being a gallery, Chitrakala is also a marketplace where you can bring the beauty of art into your life.</li>
          <li><strong>Supporting the Arts:</strong> Chitrakala is dedicated to supporting the arts community. A portion of every sale goes directly to the artists.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Join the Chitrakala Community</h2>
        <p>
          {`Embark on a journey of artistic discovery with Chitrakala. Follow us on social media, engage with our vibrant community, and be the first to experience the latest additions to our ever-expanding gallery. Together, let's celebrate the beauty of art and the boundless creativity that defines Chitrakala.`}
        </p>
        <p className="mt-4">
          <Link href="/arts/popular" className="text-blue-500 hover:underline">Explore Our Gallery</Link> | <Link href="/artists" className="text-blue-500 hover:underline">Meet Our Artists</Link> | <Link href="/gallery" className="text-blue-500 hover:underline">Shop the Collection</Link>
        </p>
      </section>
    </div>
  )
}

export default Page