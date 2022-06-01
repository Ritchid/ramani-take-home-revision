import { useContext, useEffect, useState } from "react";
import { isEmpty, map } from "lodash";
import useSWR from "swr";

import MediaContext from "../contexts/mediaContext";
import Media, { IMedia } from "../models/mediaModel";
import { getAllMovies, searchWords } from "../utilities/requests";
import { TIMERS } from "../resources/constants";


function useMedia() {
    const {setMedia} = useContext(MediaContext);
    const {data, error, isValidating} = useSWR("/trending/all/week", getAllMovies, {
        revalidateOnReconnect: true,
        revalidateOnMount: true,
        refreshWhenHidden: true,
        errorRetryCount: 10,
        refreshInterval: TIMERS.revalidation.media * 1000
    });
    const [isLoading, setIsLoading] = useState(!data && !error);
    const [displayedMedia, setDisplayedMedia] = useState<Array<IMedia>>([]);

    
    useEffect(() =>{
        try {            
            if(data && !isValidating){
                const mediaList: Array<IMedia> = [];
                map(data?.results, (media) => {
                    const serilizedMedia = new Media(media);
                    mediaList.push(serilizedMedia);
                });

                setMedia(mediaList);
                setDisplayedMedia(mediaList);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isValidating]);

    return {isLoading, displayedMedia, setDisplayedMedia};
}

export function useSeachMedia() {
    const {media: MEDIA} = useContext(MediaContext);
    const [searchResults, setSearchResults] = useState<Array<IMedia>>([]);
    const [isSearchLoading, setSearchLoading] = useState<boolean>(false);

    const searchMedia = async (srchString: string) =>{
        if(srchString.length > 2){
            let filteredResult: Array<IMedia> | any = [];
            try {
                setSearchLoading(true);
                // 
                const response = await searchWords("/search/multi", srchString);

                if(response) {
                    const data = response?.results;
                    if(data) {
                        map(data, (item) =>{
                            const createdMedia = new Media(item);
                            filteredResult.push(createdMedia);
                        });
                    }
                    
                }
            } catch(_error) { 
                // Search error or offline search
                if(!isEmpty(MEDIA)) {
                    filteredResult = MEDIA.filter((medium) =>(
                        medium.mediaType.toLowerCase().includes(srchString.toLowerCase()) ||
                        medium.title.toLowerCase().includes(srchString.toLowerCase()) ||
                        medium.overview.toLowerCase().includes(srchString.toLowerCase())
                    ));
                }
            } finally{
                setSearchResults(filteredResult);
                setSearchLoading(false);
            }
        }
    }

    return {searchResults, isSearchLoading, searchMedia }
}

export default useMedia;