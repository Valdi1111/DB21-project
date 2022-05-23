import ShopProduct from "./ShopProduct";

function Shop() {
    const id = 2;
    const img = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";
    const title = "Card title";
    const desc = "Some quick example text to build on the card title and make up the bulk of the card's content.";
    const price = 12;

    return (
        <main className="px-3">
            <ShopProduct id={id} image={img} title={title} description={desc} price={price} />
        </main>
    );

}

export default Shop;