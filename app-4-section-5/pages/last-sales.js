import {useEffect, useState} from "react";
import useSWR from 'swr'

const LastSalesPage = (props) => {

    const [sales, setSales] = useState(props.sales)
    // const [isLoading, setIsLoading] = useState(false)

    const { data, error } = useSWR(
        'https://nextjs--course-default-rtdb.firebaseio.com/sales.json',
        (url) => fetch(url).then(res => res.json())
    )

    useEffect(() => {
        if(data){
            const transformedSales = []
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(transformedSales)
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch(
    //         'https://nextjs--course-default-rtdb.firebaseio.com/sales.json'
    //     ).then(
    //         response => response.json()
    //     ).then(
    //         data => {
    //             const transformedSales = []
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setSales(transformedSales)
    //             setIsLoading(false)
    //         }
    //     )
    // }, [])

    if(error) {
        return (
            <p>Failed to Load</p>
        )
    }

    if(!data && !sales) {
       return (
           <p>Loading...</p>
       )
    }

    return (
        <div>
            <ul>
                {sales.map((sale) => {
                    return (
                        <li key={sale.id}>{sale.username} - $ {sale.volume}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default LastSalesPage

export async function getStaticProps() {
    const response = await fetch('https://nextjs--course-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json()
    const transformedSales = []
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }

    return {
        props: {
            sales: transformedSales
        }
    }
}