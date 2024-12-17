import React, { useState, useRef } from 'react';
import { 
  Camera,
  LogOut, Menu, 
//   Bell,
//    Search,
    Home
} from 'lucide-react';
import logo from '../../assets/logo.webp'
import { useNavigate } from 'react-router-dom';

const OfficerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    formNumber: "OSS/2024/001",
    image: "/api/placeholder/150/150",
    personalInfo: {
      fullName: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      bloodType: "O+",
      maritalStatus: "Single",
      email: "john.doe@example.com",
      phone: "+234 801 234 5678",
      address: "123 Main Street, Abeokuta, Ogun State"
    },
    officialInfo: {
      rank: "Corporal",
      department: "Patrol Division",
      dateJoined: "2022-03-01",
      serviceYears: "2",
      station: "Central Command",
      supervisor: "Capt. Sarah Johnson",
      status: "Active"
    },
    education: {
      qualification: "Bachelor's Degree",
      institution: "University of Lagos",
      yearCompleted: "2020"
    }
  });
  const [fullName, setFullName] = useState<string>(profile.personalInfo.fullName)
  const [email, setEmail] = useState<string>(profile.personalInfo.email)
  const [phone, setPhone] = useState<string>(profile.personalInfo.phone)
  const [address, setAddress] = useState<string>(profile.personalInfo.address)
//   const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 fixed h-full`}>
        <div className="p-4 flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="SO-SAFE Logo" className="h-12 w-12" />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1">
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-700 text-white">
                <Home className="h-5 w-5" />
                <span className={isSidebarOpen ? 'block text-sm' : 'hidden'}>Dashboard</span>
              </button>
              {/* <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 text-white">
                <Shield className="h-5 w-5" />
                <span className={isSidebarOpen ? 'block' : 'hidden'}>Duties</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 text-white">
                <Calendar className="h-5 w-5" />
                <span className={isSidebarOpen ? 'block' : 'hidden'}>Schedule</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-700 text-white">
                <FileText className="h-5 w-5" />
                <span className={isSidebarOpen ? 'block' : 'hidden'}>Reports</span>
              </button> */}
            </div>
          </nav>

          {/* Profile Quick Access */}
          <div className="border-t border-green-700 pt-4">
            <div className="flex items-center justify-center space-x-3 px-4 py-3">
              {isSidebarOpen ? (
                <>
                    <img
                        src={profile.image}
                        alt="Profile"
                        className="h-9 w-9 rounded-full"
                    />
                    <div className="flex-1">
                    <p className="text-sm font-medium truncate">{profile.personalInfo.fullName}</p>
                    <p className="text-xs text-green-300">{profile.officialInfo.rank}</p>
                    </div>
                </>
              ) : (
                <img
                src={profile.image}
                alt="Profile"
                className="h-6 w-6 rounded-full"
              />
              )
            }
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div> */}
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 rounded-lg hover:bg-gray-100 relative" title='notification'>
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button> */}
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-800" title='Log Out'
                    onClick={() => navigate(-1)}
              >
                <LogOut className="h-5 w-5" />
                <span className=' text-sm'>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-[1.3rem] font-bold text-gray-900">Welcome, {profile.personalInfo.fullName}</h1>
            <p className="text-gray-600 text-[0.86rem]">Form Number: {profile.formNumber}</p>
          </div>

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Current Duty Status</h3>
              <p className="text-2xl font-bold">Active</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Next Shift</h3>
              <p className="text-2xl font-bold">08:00 AM</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Reports Filed</h3>
              <p className="text-2xl font-bold">28</p>
            </div>
          </div> */}

          {/* Profile Content */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Officer Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-green-800 text-sm text-white rounded-lg hover:bg-green-900 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-800 text-sm text-white rounded-lg hover:bg-green-900 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 border text-sm border-gray-300 rounded-lg hover:bg-gray-50  disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center p-6 bg-gray-50  disabled:cursor-not-allowed rounded-lg">
                    <div className="relative">
                        <img
                        src={profile.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-green-800 text-white rounded-full shadow-lg hover:bg-green-900"
                        title='image upload'
                        >
                        <Camera className="h-5 w-5" />
                        </button>
                        <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        title='image upload'
                        />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{profile.personalInfo.fullName}</h3>
                    <p className="text-gray-600">{profile.officialInfo.rank}</p>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                            type="text"
                            value={fullName}
                            disabled={!isEditing}
                            onChange={(e) => setFullName(e.target.value)}
                            title='Officer Full Name'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-[0.91rem] disabled:opacity-80 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                            title='Officer Email'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[0.91rem] disabled:opacity-80 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                            title='Officer Phone number'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-[0.91rem] disabled:opacity-80 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditing}
                            title='Officer Address'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-[0.91rem] disabled:opacity-80 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        </div>
                    </div>

                    {/* Official Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Official Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rank</label>
                            <input
                            type="text"
                            value={profile.officialInfo.rank}
                            disabled
                            title='rank'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[0.91rem] disabled:opacity-80  disabled:cursor-not-allowed bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <input
                            type="text"
                            value={profile.officialInfo.department}
                            disabled
                            title='department'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-[0.91rem] disabled:opacity-80 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Station</label>
                            <input
                            type="text"
                            value={profile.officialInfo.station}
                            disabled
                            title='station'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg  text-[0.91rem] disabled:opacity-80 bg-gray-50  disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date Joined</label>
                            <input
                            type="date"
                            value={profile.officialInfo.dateJoined}
                            disabled
                            title='Date Joined'
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[0.91rem] disabled:opacity-80 bg-gray-50  disabled:cursor-not-allowed" 
                            />
                            </div>
                            <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Supervisor
                        </label>
                        <input
                        type="text"
                        value={profile.officialInfo.supervisor}
                        disabled
                        title='Supervisor'
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50  disabled:cursor-not-allowed text-gray-500"
                        />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                                </label>
                                <input
                                type="text"
                                value={profile.officialInfo.status}
                                disabled
                                title='status'
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50  disabled:cursor-not-allowed text-gray-500"
                                />
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Education Information */}
                    <div className="bg-white rounded-lg shadow w-[74vw]">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">Education</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Highest Qualification
                                </label>
                                <input
                                    type="text"
                                    value={profile.education.qualification}
                                    disabled
                                    title='Qualifications'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50  disabled:cursor-not-allowed text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    value={profile.education.institution}
                                    disabled
                                    title='Education'
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50  disabled:cursor-not-allowed text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </main>
        </div>
    </div>
  );
};

export default OfficerDashboard;