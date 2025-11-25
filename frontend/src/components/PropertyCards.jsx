const PropertyCards = ({
    image,
    name,
    address,
    aircon,
    comfortroom,
    internet,
    price,
}) => {
    return (
        <div className="card w-72 bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-base-200">
            <figure className="h-40 overflow-hidden">
                <img className="w-full object-cover" src={image} alt={name} />
            </figure>

            <div className="card-body p-4 space-y-2">
                <div>
                    <h2 className="card-title text-base font-bold">{name}</h2>
                    <p className="text-xs text-gray-600">{address}</p>
                </div>

                <div className="space-y-1">
                    <h3 className="font-semibold text-xs">Amenities</h3>
                    <div className="flex flex-wrap gap-1">
                        <div className={`badge badge-xs ${aircon ? "badge-primary" : "badge-outline"}`}>
                            Aircon {aircon ? "✓" : "✗"}
                        </div>

                        <div className={`badge badge-xs ${comfortroom ? "badge-primary" : "badge-outline"}`}>
                            CR {comfortroom ? "✓" : "✗"}
                        </div>

                        <div className={`badge badge-xs ${internet ? "badge-primary" : "badge-outline"}`}>
                            Internet {internet ? "✓" : "✗"}
                        </div>
                    </div>
                </div>

                <div className="card-actions justify-between items-center">
                    <span className="font-semibold text-primary text-base">
                        ₱{price}/mo
                    </span>
                    <button className="btn btn-primary btn-xs">Rent me</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCards;
