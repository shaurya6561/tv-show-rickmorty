import React, { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import parse from 'html-react-parser';
import Header from '../../components/Header';

const DetailPage = () => {
  const [singleShowData, setSingleShowData] = useState(null);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.details) {
      const getSingleShowData = async () => {
        const response = await fetch(`https://api.tvmaze.com/shows/${query.details}`);
        const jsonResponse = await response.json();
        setSingleShowData(jsonResponse);
      }
      getSingleShowData();
    }
  }, [query.details])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.showDetail}>

            <img className={styles.showDetailMainImage} src={singleShowData?.image.original}/>

          <div className={styles.showInformation}>
            <h1>{singleShowData?.name}</h1>
            <div>
              {parse(`${singleShowData?.summary}`)}
            </div>
            <div className={styles.additionalShowInfo}>
              <div className={styles.additionalInfo}>
                <b>Genres</b> : {singleShowData?.genres.join(' | ')}
              </div>
              <div className={styles.additionalInfo}>
                <b>Schedule</b> : {singleShowData?.schedule.days[0]}s @ {singleShowData?.schedule.time} ({singleShowData?.averageRuntime} min)
              </div>
              <div className={styles.additionalInfo}>
                <b>Rating</b> : {singleShowData?.rating.average}
              </div>
              <div className={styles.additionalInfo}>
                <b>Language</b> : {singleShowData?.language}
              </div>
              <div className={styles.additionalInfo}>
                <b>Status</b> : {singleShowData?.status}
              </div>
              <div className={styles.additionalInfo}>
                <b>Show-Type</b> : {singleShowData?.type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPage;