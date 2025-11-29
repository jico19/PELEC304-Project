const ProfileField = ({ label, value, icon }) => (
    <div className="flex items-center gap-2">
        {icon}
        <div>
            <span className="block text-sm font-medium text-gray-500">{label}</span>
            <span className="text-gray-800">{value || "Not Set"}</span>
        </div>
    </div>
);

export default ProfileField