
import { useEffect, useState } from "react";

function fetchAds() {
    const [ads, setAds] = useState([]);
    useEffect(() => {
        async function fetchAds() {
            try {
                const res = await fetch("http://localhost:5000/api/ingatlan");
                const data = await res.json();
                setAds(data);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        }

        fetchAds();
    }, []);
    return(
        <table className="table table-dark">
            <thead>
                <tr>
                <th>kategoria</th>
                <th>leiras</th>
                <th>hirdetesDatuma</th>
                <th>tehermentes</th>
                <th>ar</th>
                <th>kepUrl</th>
                </tr>
            </thead>
            <tbody>
        {ads.length > 0 ? (
            
            ads.map(ad => (
                <tr  key={ad.id}>
                    <td>{ad.kategoria}</td>
                    <td>{ad.leiras}</td>
                    <td>{ad.hirdetesDatuma}</td>
                    <td>{ad.tehermentes}</td>
                    <td>{ad.ar}</td>
                    <td><img src={ad.kepUrl} alt="ad" className="img img-fluid" /></td>
                    
                </tr>
            ))
            
        ) : (
            <tr>
                <td colSpan="6">No ads found</td>
            </tr>
        )}
        </tbody>
    </table>
    )
}

export default function Ads() {
    return (
        fetchAds()
    )
}