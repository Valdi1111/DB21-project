import {useParams} from "react-router-dom";

function Product() {
    const {id} = useParams();

    return (
        <main className="px-3">
            <h1>{"Product " + id}</h1>
        </main>
    );

}

export default Product;