export default function OkadaRideHailingMVP() {
  const adminStats = [
    { title: 'Total Rides', value: '12,450' },
    { title: 'Active Riders', value: '1,245' },
    { title: 'Passengers', value: '8,900' },
    { title: 'Revenue', value: 'GHS 145,000' },
  ];

  const riderRequests = [
    {
      passenger: 'Kwame Mensah',
      pickup: 'Circle',
      destination: 'East Legon',
      fare: 'GHS 45',
    },
    {
      passenger: 'Ama Serwaa',
      pickup: 'Madina',
      destination: 'Accra Mall',
      fare: 'GHS 30',
    },
  ];

  const rideHistory = [
    {
      route: 'Osu → Airport',
      fare: 'GHS 50',
      duration: '25 mins',
    },
    {
      route: 'Lapaz → Kaneshie',
      fare: 'GHS 28',
      duration: '18 mins',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="bg-green-700 text-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-4xl font-bold">Okada Ride-Hailing App</h1>
          <p className="mt-2 text-lg opacity-90">
            Admin, Rider, and Passenger Dashboard Prototype
          </p>
        </header>

        {/* ADMIN DASHBOARD */}
        <section className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-700">
              Admin Dashboard
            </h2>
            <button className="bg-green-700 text-white px-5 py-2 rounded-xl hover:opacity-90">
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {adminStats.map((stat, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-100 rounded-2xl p-5"
              >
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-5 border">
              <h3 className="text-xl font-semibold mb-4">
                Rider Verification Queue
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                  <div>
                    <p className="font-semibold">Kofi Addo</p>
                    <p className="text-sm text-gray-500">
                      License & Insurance Pending
                    </p>
                  </div>

                  <div className="space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border">
              <h3 className="text-xl font-semibold mb-4">
                Active Ride Monitoring
              </h3>

              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-500 text-lg">
                Live Map Tracking Area
              </div>
            </div>
          </div>
        </section>

        {/* RIDER DASHBOARD */}
        <section className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-700">
              Rider Dashboard
            </h2>

            <div className="flex items-center gap-3">
              <span className="font-medium">Status:</span>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                Online
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-5 border">
              <h3 className="text-xl font-semibold mb-4">
                Incoming Ride Requests
              </h3>

              <div className="space-y-4">
                {riderRequests.map((ride, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 shadow-sm border"
                  >
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">Passenger:</span>{' '}
                        {ride.passenger}
                      </p>
                      <p>
                        <span className="font-semibold">Pickup:</span>{' '}
                        {ride.pickup}
                      </p>
                      <p>
                        <span className="font-semibold">Destination:</span>{' '}
                        {ride.destination}
                      </p>
                      <p>
                        <span className="font-semibold">Fare:</span>{' '}
                        {ride.fare}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-green-600 text-white py-2 rounded-xl">
                        Accept
                      </button>

                      <button className="flex-1 bg-red-500 text-white py-2 rounded-xl">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Navigation</h3>

                <div className="bg-gray-200 rounded-2xl h-56 flex items-center justify-center text-gray-500 text-lg">
                  Turn-by-turn Navigation Map
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-yellow-500 text-white py-3 rounded-xl font-semibold">
                  Arrived
                </button>

                <button className="bg-blue-600 text-white py-3 rounded-xl font-semibold">
                  Picked Up
                </button>

                <button className="bg-green-700 text-white py-3 rounded-xl font-semibold">
                  Dropped Off
                </button>

                <button className="bg-red-600 text-white py-3 rounded-xl font-semibold">
                  SOS Emergency
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="text-gray-500">Today's Earnings</p>
              <h3 className="text-3xl font-bold mt-2">GHS 320</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="text-gray-500">Weekly Earnings</p>
              <h3 className="text-3xl font-bold mt-2">GHS 2,100</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="text-gray-500">Rating</p>
              <h3 className="text-3xl font-bold mt-2">4.9 ⭐</h3>
            </div>
          </div>
        </section>

        {/* PASSENGER DASHBOARD */}
        <section className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-700">
              Passenger Dashboard
            </h2>

            <button className="bg-green-700 text-white px-5 py-2 rounded-xl">
              Book Ride
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-5 border space-y-4">
              <h3 className="text-xl font-semibold">Book a Ride</h3>

              <input
                type="text"
                placeholder="Pickup Location"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Drop-off Location"
                className="w-full border rounded-xl px-4 py-3"
              />

              <div className="bg-white rounded-xl p-4 border">
                <p className="text-gray-500">Estimated Fare</p>
                <h3 className="text-2xl font-bold">GHS 42</h3>
              </div>

              <select className="w-full border rounded-xl px-4 py-3">
                <option>Cash</option>
                <option>Mobile Money</option>
                <option>Card</option>
              </select>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="helmet" />
                <label htmlFor="helmet">Request Helmet</label>
              </div>

              <button className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold">
                Confirm Ride
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border space-y-5">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Live Ride Tracking
                </h3>

                <div className="bg-gray-200 rounded-2xl h-56 flex items-center justify-center text-gray-500 text-lg">
                  Real-time Rider Map
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border space-y-2">
                <p>
                  <span className="font-semibold">Rider:</span> Ibrahim Yakubu
                </p>
                <p>
                  <span className="font-semibold">Bike:</span> Honda CB 125
                </p>
                <p>
                  <span className="font-semibold">Plate Number:</span> GR-4582-26
                </p>
                <p>
                  <span className="font-semibold">ETA:</span> 4 mins
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> 4.8 ⭐
                </p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
                Share Trip Details
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              Ride History
            </h3>

            <div className="space-y-4">
              {rideHistory.map((ride, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-lg">{ride.route}</h4>
                    <p className="text-gray-500">
                      Duration: {ride.duration}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0 flex items-center gap-6">
                    <p className="font-bold text-lg">{ride.fare}</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
                      Rate Ride
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
