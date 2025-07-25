"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "./loading";
import MovieCard from "@/components/MovieCard/MovieCard";

function Page() {
  const movies_url = "http://localhost:8080/movies"
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)
  const [totalImgCount, setTotalImgCount] = useState(0)

  const fetchMovieData = async () => {
    let resposnse = await fetch(movies_url)
    if (resposnse.status == 502) {
        console.log('server issue')
        await fetchMovieData()
    } 
    else if (resposnse.status != 200) {
      console.log('response.statusText: ', resposnse.statusText)
      await new Promise(resolve => setTimeout(resolve, 100))
      await fetchMovieData()
    }  
    else {
      console.log('movie data returned')
      resposnse.json().then((data) => {
        setMovies(data.movies)
        setTotalImgCount(data.movie_count)
      })
    }
  }

  
  // fetch movie data
  useEffect(
    () => {
      fetchMovieData()
    }
    ,
    []
  )

  // once all images are loaded
  useEffect(() => {
    if (totalImgCount === loadedImagesCount) {
      setLoading(false)
      console.log('all images loaded')
    }
  }, [loadedImagesCount, totalImgCount])


  return (
    <div className="mx-auto max-w-screen-xl">
      {/* movies page header */}
      <h1 className="text-2xl pb-4 z-0">Movies</h1>

      {/* movies card */}
      {loading ? (
        <Loading />
      )
        :

        (
          <div className="flex-wrap flex gap-1 grow mx-auto max-w-full">

            {movies.map((movie_info, index) => {
              const { movie_title, movie_thumbnail } = movie_info
              return (
                <MovieCard setLoadedImagesCount={setLoadedImagesCount} source="local" movie_thumbnail={movie_thumbnail} movie_title={movie_title} key={index} />
              )
            })}

          </div>
        )
      }
    </div>
  )
}

export default Page;
