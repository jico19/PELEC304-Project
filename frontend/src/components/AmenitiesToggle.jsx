
const AmenitiesToggle = ({ label, Icon, active, setActive }) => (
    <button
        type="button"
        onClick={() => setActive(!active)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${active ? "bg-blue-200" : "bg-gray-100 hover:bg-blue-100"
            }`}
    >
        <Icon size={16} /> {label}
    </button>
);

export default AmenitiesToggle