import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import starSvg from '../images/star.png'
import clock from '../images/clock2.png'
import Image from 'next/image'

const Card = ({ data, showID }) => {
    // genres
    // rating.average
    // image.medium
    // runtime
    return (
        <div className={styles.card}>
            <Link href={{ pathname: '/[details]', query: { details: showID } }}>
                <a>
                    <img src={data.image.medium} className={styles.showImage} />

                    <div className={styles.showInfoContainer}>
                        <div className={styles.showName}>
                            <strong>{data.name}</strong>
                            <div className={styles.rating}>
                                {data.rating.average}&nbsp;
                                <Image src={starSvg} alt="star" height="20px" width="20px"/>
                            </div>
                        </div>

                        {/* <div className={styles.showName}> */}
                            <div className={styles.genres}>
                                {data?.genres.join(' | ')}
                            </div>
                            <div className={styles.time}>
                                {data?.runtime}&nbsp;
                                <Image src={clock} alt="star" height="10px" width="10px" />
                            </div>
                        {/* </div> */}
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default Card