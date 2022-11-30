import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

type exploreDataType = {
  img: string;
  location: string;
  distance: string;
};
type cardsDataType = {
  img: string;
  title: string;
};

const Home = ({
  exploreData,
  cardsData,
}: {
  exploreData: exploreDataType[];
  cardsData: cardsDataType[];
}) => {
  return (
    <div className="">
      <Head>
        <title>AirBnB copy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header placeholder="" />
      <Banner />
      <main className="max-w-7xl mx-auto px-8">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, location, distance }, id) => (
              <SmallCard
                key={id}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex overflow-x-scroll scrollbar-hide space-x-3 p-3 -ml-3">
            {cardsData?.map(({ img, title }, id) => (
              <MediumCard key={id} img={img} title={title} />
            ))}
          </div>
        </section>
        <LargeCard
          img={'https://links.papareact.com/4cj'}
          title={'The Greatest Outdoors'}
          description={'Whishlists curated by Airbnb'}
          buttonText={'Get Inspired'}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const exploreData = await fetch('https://www.jsonkeeper.com/b/4G1G').then(
    response => response.json(),
  );
  const cardsData = await fetch('https://www.jsonkeeper.com/b/VHHT').then(res =>
    res.json(),
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
