function Card(props) {
    return (
        <div className="flex flex-col items-center justify-center w-40 h-40">
            <img src={props.img} alt={props.coin_name} width="50px" height="50px" />
            <span className="text-xl font-semibold">{props.coin_name}</span>
            <span className="text-lg">{props.priceTL}</span>
        </div>
    );
}

export default Card;