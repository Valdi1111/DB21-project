import ShopProduct from "./ShopProduct";
import {useEffect, useState} from "react";
import axios from 'axios';
import {apiUrl} from "../services/api";

function Shop() {
    const prod = {
        id: 2,
        image: "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg",
        title: "Card title",
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        price: 12
    }

    const [products, setProducts] = useState(null);
    useEffect(() => {
        axios
            .get(apiUrl + "products")
            .then((res) => {
                console.log(res.data)
                setProducts(res.data);
            });
    }, []);

    return (
        <main className="px-3">
            <ShopProduct product={prod} />
            {/*products?.map(p => {return <ShopProduct key={p.id} product={p} />})*/}
        </main>
    );

}

export default Shop;