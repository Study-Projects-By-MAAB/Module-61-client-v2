import React, { useContext } from "react"
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"

const CheckOut = () => {
    const service = useLoaderData()
    const { _id, title, price, img } = service
    const { user } = useContext(AuthContext)

    const handleCheckOut = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = user?.email || form.email.value
        const date = form.date.value
        const order = {
            customerName: name,
            email,
            date,
            img,
            service: title,
            service_id: _id,
            price: price,
        }
        // console.log(order)

        fetch(`https://car-doctor-server-v2-nine.vercel.app/checkouts`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data.insertedId) alert("checkout successfully")
            })
    }

    return (
        <div>
            <h2 className="text-center text-3xl">Book Service: {title}</h2>
            <form onSubmit={handleCheckOut} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            defaultValue={user?.displayName}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            defaultValue={user?.email}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" defaultValue={"$" + price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary btn-block">Order Confirm</button>
                </div>
            </form>
        </div>
    )
}

export default CheckOut
