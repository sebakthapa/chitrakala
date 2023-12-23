import { useState, useEffect } from 'react';

const useInfiniteScroll = ({ url, hasData=false, nextPage:np=1 }) => {
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState(Math.max(np+1, 1));
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingNewPage, setIsLoadingNewPage] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    let fetchedPage = np;
    let isAddingData = false; //useState has slight delay in updating. That caused it to take time to setLoading(true) and setLoadingNewPage(true) to take time resulting multiple load data to be called on scroll.


    const handleScroll = () => {
        const scrollOffset = 800; // value above the end of scroll to start fetching new page

        if (document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) < scrollOffset) {
            loadMore();
        }
    };

    const loadMore = async () => {

        if (isLoading || !hasMore || isLoadingNewPage || isAddingData ) return;
        if (nextPage <= fetchedPage) return;

        try {
            isAddingData = true;
            setIsLoadingNewPage(true)
            if (nextPage == 1) {
                setIsLoading(true)
            }

            const response = await fetch(`${url}&page=${nextPage}`);
            const newData = await response.json();

            if (newData.page == newData.totalPages || newData.data?.length == 0) {
                setHasMore(false);
            }
            if (newData.page <= newData.totalPages) {
                setNextPage((prevPage) => newData.page + 1);
                setData((prevData) => [...prevData, ...newData.data]);
                fetchedPage = newData.page;

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
            setIsLoadingNewPage(false)
            isAddingData = false
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, hasMore, isLoadingNewPage]);

    useEffect(() => {
        
        if (!hasData) {
            loadMore();
        }

    }, [])

    return { data, isLoading, loadMore, isLoadingNewPage, hasMore };
};

export default useInfiniteScroll;
