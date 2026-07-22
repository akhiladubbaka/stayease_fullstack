function Profile() {

const user = JSON.parse(localStorage.getItem("user"));

return (

<div className="max-w-3xl mx-auto p-8">

<div className="bg-white rounded-2xl shadow-xl p-8">

<div className="flex flex-col items-center">

<div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">

{user?.name?.charAt(0).toUpperCase()}

</div>

<h1 className="text-3xl font-bold mt-5">

{user?.name}

</h1>

<p className="text-gray-500 mt-2">

{user?.email}

</p>

<span className="mt-4 px-5 py-2 bg-green-100 text-green-700 rounded-full font-semibold">

🛡 {user?.role}

</span>

</div>

<hr className="my-8"/>

<div className="space-y-6">

<div>

<label className="block text-gray-600 mb-2">

Name

</label>

<input

value={user?.name}

readOnly

className="w-full border rounded-lg p-3 bg-gray-100"

/>

</div>

<div>

<label className="block text-gray-600 mb-2">

Email

</label>

<input

value={user?.email}

readOnly

className="w-full border rounded-lg p-3 bg-gray-100"

/>

</div>

<div>

<label className="block text-gray-600 mb-2">

Role

</label>

<input

value={user?.role}

readOnly

className="w-full border rounded-lg p-3 bg-gray-100"

/>

</div>

</div>

</div>

</div>

);

}

export default Profile;