import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Card from '../components/Card';
import Header from '../components/Header';
import InfiniteScroll from 'react-infinite-scroll-component';


const API_URL_FOR_SHOWS = 'https://api.tvmaze.com/shows';

export default function Home() {

  const limit = 20;
  const [offset, setOffset] = useState(20)
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const getShowData = async () => {
      const response = await fetch(API_URL_FOR_SHOWS);
      const jsonResponse = await response.json();
      setShowData(jsonResponse);
    }

    getShowData();
  }, [])

  useEffect(() => {
    console.log("offset", offset)
    console.log("data", showData?.slice(0, offset))
  }, [offset])

  return (
    <>

      <Header />
        {
          showData?.length ? (
            <InfiniteScroll
              dataLength={showData?.slice(0, offset)?.length}
              next={() => setOffset(offset => offset + 20)}
              hasMore={showData?.slice(0, offset)?.length < showData?.length}
              className={styles.infiniteScroll} >
            <div className={styles.containerHomePage}>
              {
                showData?.slice(0, offset).map((data, index) => (
                  <Card data={data} key={data.id} showID={data.id} />
                ))
              }
              </div>

            </InfiniteScroll >
          ) : "No data"}
    </>
  )
}
