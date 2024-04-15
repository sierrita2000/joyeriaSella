import { useEffect, useState } from "react"

const { VITE_API_HOST } = import.meta.env

export const useFetch = (url, options) => {
    const [ data, setData] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        setLoading(true)

        fetch(VITE_API_HOST+url, options)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [url])
    
    return [ data, loading, error ]
}