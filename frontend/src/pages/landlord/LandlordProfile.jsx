import Sidebar from "src/components/SideBar"
import { useProfile } from "src/store/useProfile"
import {
    Save,
    X,
    User,
    Phone,
    Home,
    Briefcase,
    Mars,
    Venus,
    Heart,
    UserPlus,
    Hash,
    ChevronDown
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ProfileField from "src/components/ProfileField";
import api from "src/utils/Api";
import toast from "react-hot-toast";
import CustomDropdown from "src/components/CustomDropdown";

const LandlordProfile = () => {
    const { profile } = useProfile()
    const [isEditing, setIsEditing] = useState(false);


    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            occupation_status: "",
            marital_status: "",
            gender: "",
            permanent_address: "",
            phone_number: ""
        }
    });

    // Reset form when profile changes
    useEffect(() => {
        if (profile) {
            reset({
                username: profile.username || "",
                occupation_status: profile.occupation_status || "",
                marital_status: profile.marital_status || "",
                gender: profile.gender || "",
                permanent_address: profile.permanent_address || "",
                phone_number: profile.phone_number || ""
            });
        }
    }, [profile, reset]);

    const OCCUPATION_STATUS_CHOICES = [
        { label: "Working", icon: <Briefcase className="w-4 h-4 text-gray-500" /> },
        { label: "Student", icon: <UserPlus className="w-4 h-4 text-gray-500" /> },
        { label: "Unemployed", icon: <Briefcase className="w-4 h-4 text-gray-500" /> },
    ];

    const MARITAL_STATUS_CHOICES = [
        { label: "Married", icon: <Heart className="w-4 h-4 text-gray-500" /> },
        { label: "Single", icon: <Heart className="w-4 h-4 text-gray-500" /> },
    ];

    const GENDER_CHOICES = [
        { label: "Male", icon: <Mars className="w-4 h-4 text-gray-500" /> },
        { label: "Female", icon: <Venus className="w-4 h-4 text-gray-500" /> },
        { label: "Others", icon: <User className="w-4 h-4 text-gray-500" /> },
    ];

    const onSubmit = async (data) => {
        try {
            const payload = { ...data };
            delete payload.username;

            await toast.promise(
                api.patch(`user/${profile.user_id}/`, payload),
                {
                    loading: "Updating...",
                    success: "Profile Updated Successfyll.",
                    error: "Failed to update your profile."
                }
            )
            setIsEditing(false);
            window.location.reload()
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8 space-y-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 shadow-lg gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-inner">
                        {localStorage.getItem("profile_pic") ? (
                            <img
                                src={localStorage.getItem("profile_pic")}
                                alt={profile.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-12 h-12" />
                        )}
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center sm:justify-start">
                            <User className="w-5 h-5 text-gray-500" />
                            {profile.username || "Welcome"}
                        </h1>
                        <p className="text-gray-600">{profile.email}</p>
                        <p className="text-gray-400 text-sm flex items-center gap-1 justify-center sm:justify-start">
                            <Hash className="w-4 h-4" />
                            User ID: {profile.user_id}
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-8 relative">
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-6 right-6 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-lg font-medium transition flex items-center gap-1"
                        >
                            <Save className="w-4 h-4" /> Edit Profile
                        </button>
                    )}

                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Identity & Preferences</h2>

                    {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input
                                type="text"
                                {...register("username")}
                                disabled
                                className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                            />

                            <Controller
                                name="occupation_status"
                                control={control}
                                rules={{ required: "Occupation status is required" }}
                                render={({ field }) => (
                                    <CustomDropdown
                                        options={OCCUPATION_STATUS_CHOICES}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.occupation_status}
                                    />
                                )}
                            />

                            <Controller
                                name="marital_status"
                                control={control}
                                rules={{ required: "Marital status is required" }}
                                render={({ field }) => (
                                    <CustomDropdown
                                        options={MARITAL_STATUS_CHOICES}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.marital_status}
                                    />
                                )}
                            />

                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Gender is required" }}
                                render={({ field }) => (
                                    <CustomDropdown
                                        options={GENDER_CHOICES}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.gender}
                                    />
                                )}
                            />

                            <input
                                type="text"
                                placeholder="Permanent Address"
                                {...register("permanent_address", { required: "Permanent address is required" })}
                                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${errors.permanent_address ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
                                    }`}
                            />
                            {errors.permanent_address && <p className="text-red-500 text-sm">{errors.permanent_address.message}</p>}

                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register("phone_number", { required: "Phone number is required" })}
                                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${errors.phone_number ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
                                    }`}
                            />
                            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}

                            <div className="sm:col-span-2 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => { reset(); setIsEditing(false); error("You cancelled your edit.") }}
                                    className="flex items-center gap-2 bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 font-medium transition"
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-medium transition"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                            <ProfileField label="Username" value={profile.username} icon={<User className="w-4 h-4 text-gray-500" />} />
                            <ProfileField label="Occupation Status" value={profile.occupation_status} icon={<Briefcase className="w-4 h-4 text-gray-500" />} />
                            <ProfileField label="Marital Status" value={profile.marital_status} icon={<Heart className="w-4 h-4 text-gray-500" />} />
                            <ProfileField
                                label="Gender"
                                value={profile.gender}
                                icon={profile.gender === "Male" ? <Mars className="w-4 h-4 text-gray-500" /> : profile.gender === "Female" ? <Venus className="w-4 h-4 text-gray-500" /> : <User className="w-4 h-4 text-gray-500" />}
                            />
                            <ProfileField label="Phone Number" value={profile.phone_number} icon={<Phone className="w-4 h-4 text-gray-500" />} />
                            <ProfileField label="Permanent Address" value={profile.permanent_address} icon={<Home className="w-4 h-4 text-gray-500" />} />
                            <ProfileField label="Budget Range" value={profile.budget} icon={<Briefcase className="w-4 h-4 text-gray-500" />} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default LandlordProfile