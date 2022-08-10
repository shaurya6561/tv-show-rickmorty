import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const SEARCH_API = 'https://api.tvmaze.com/search/shows?q='
const API_URL_FOR_SHOWS = 'https://api.tvmaze.com/shows';


const SearchBar = () => {
    const [searchResult, setSearchResult] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);
    const [dataForLink, setDataForLink] = useState(null);

    useEffect(() => {
        const fetchShowData = async () => {
            const response = await fetch(API_URL_FOR_SHOWS);
            const jsonResponse = await response.json();
            setDataForLink(jsonResponse);
        }

        fetchShowData();
    }, [])

    useEffect(() => {
        const fetchSearchedData = async () => {
            const response = await fetch(API_URL_FOR_SHOWS);
            const jsonResponse = await response.json();
            setFetchedData(jsonResponse);
        }
        fetchSearchedData();
        // console.log(fetchedData)

    }, [searchResult])

    const onChangeHandler = (e) => {

        const searchFiltered = fetchedData.filter(item => item.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
        setSearchResult(searchFiltered)
        // console.log(searchResult)
        if (e.target.value === "") {
            setSearchResult([])
            return;
        }
    }

    return (
        <div style={{ width: '100px' }}>
            <input className={styles.searchField} type="search" placeholder="Search.." onChange={onChangeHandler} />
            <div className={styles.resultContainer}>
                <div className={styles.result}>
                    {searchResult?.map((show, index) => {
                        return (
                            <Link href={{ pathname: '/[details]', query: { details: show?.id } }}>
                                <a>
                                    <p className={styles.resultItem}>{show?.name}</p>
                                </a>
                            </Link>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchBar
