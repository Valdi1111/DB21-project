import {product_images_url} from "../../services/ApiUrls";

function CarouselButton(props) {
    return (
        <button type="button" data-bs-target="#images-carousel" data-bs-slide-to={props.to}
                aria-label={props.label} className={props.active ? "active" : ""}/>
    );

}

function CarouselItem(props) {
    return (
        <div className={"carousel-item" + (props.active ? " active" : "")}>
            <img src={props.src} className="d-block w-100" alt={props.alt}/>
        </div>
    );

}

function ProductImage(props) {

    function getButtons() {
        const buttons = [];
        let i = 0;
        props.images.forEach(e => {
            buttons.push(<CarouselButton key={i} to={`${i}`} label={`Slide ${i + 1}`} active={i === 0}/>);
            i++;
        });
        return buttons;
    }

    function getItems() {
        const items = [];
        let i = 0;
        props.images.forEach(e => {
            items.push(<CarouselItem key={i} src={product_images_url + e.path} alt={`Image ${i + 1}`} active={i === 0}/>);
            i++;
        });
        return items;
    }

    return (
        <div id="images-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {getButtons()}
            </div>
            <div className="carousel-inner">
                {getItems()}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#images-carousel"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#images-carousel"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );

}

export default ProductImage;
