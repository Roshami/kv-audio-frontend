import "./productCard.css";

export default function ProductCard(props) {
console.log(props);
    return(
        <div class="productCard">
            <img src={props.photoURL} />
            <span>{props.name}</span>
            <span>LKR. {props.price}</span>
            <p>{props.description}</p>
        </div>
    )

}

