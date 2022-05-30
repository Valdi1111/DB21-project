import {Component} from "react";

class CarouselButton extends Component {

    render() {
        return (
            <button type="button" data-bs-target="#images-carousel" data-bs-slide-to={this.props.to}
                    aria-label={this.props.label} className={this.props.active ? "active" : ""}/>
        );
    }

}

class CarouselItem extends Component {

    render() {
        return (
            <div className={"carousel-item" + (this.props.active ? " active" : "")}>
                <img src={this.props.src} className="d-block w-100" alt={this.props.alt}/>
            </div>
        );
    }

}

function ProductImage(props) {
    const img = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";

    return (
        <div id="images-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <CarouselButton to="0" label="Slide 1" active={true} />
                <CarouselButton to="1" label="Slide 2" />
                <CarouselButton to="2" label="Slide 3" />
                <CarouselButton to="3" label="Slide 4" />
            </div>
            <div className="carousel-inner">
                <CarouselItem src={img} alt="Image 1" active={true} />
                <CarouselItem src={img} alt="Image 2" />
                <CarouselItem src={img} alt="Image 3" />
                <CarouselItem src={img} alt="Image 4" />
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