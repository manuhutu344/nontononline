import axios from 'axios'
import React, {useCallback, useMemo} from 'react'
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import {AiFillLike} from 'react-icons/ai'
import {GiLoveLetter} from 'react-icons/gi'

interface FavoriteButtonProps{
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId})=>{
    const {mutate: mutateFavorites} = useFavorites()
    const {data: currentUser, mutate} = useCurrentUser()
    const isFavorite = useMemo(()=>{
        const list = currentUser?.favoriteIds || []
        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggelFavorites = useCallback(async () =>{
        let response;

        if (isFavorite) {
            response = await axios.delete('/api/favorite', {data: {movieId} })
          } else {
            response = await axios.post('/api/favorite', {movieId})
          }
        const updateFavoriteIds = response?.data?.favoriteIds
        mutate({
            ...currentUser,
            favoriteIds: updateFavoriteIds,
        })
        mutateFavorites()
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ?  GiLoveLetter : AiFillLike

    return(
        <div onClick={toggelFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white" size={25} />
        </div>
    )
}

export default FavoriteButton