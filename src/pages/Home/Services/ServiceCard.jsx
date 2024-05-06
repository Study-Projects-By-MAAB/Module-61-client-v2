import React from "react"
import { Link } from "react-router-dom"
// import PropTypes from "prop-types"

const ServiceCard = ({ service }) => {
    const { _id, img, title, price } = service

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-orange-500 text-xl">${price}</p>
                <div className="card-actions">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// ServiceCard.propTypes = {
//     service: PropTypes.object,
// }

export default ServiceCard
