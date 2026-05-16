// ─────────────────────────────────────────────────────────────────────────────
// MotoGO — Shared Database & Auth Module (db.js)
// All three portals import this file. It simulates a backend using localStorage.
// In production, replace with real API calls (Node/Express + PostgreSQL).
// ─────────────────────────────────────────────────────────────────────────────

const MotoDB = (() => {

  // ── Key prefix to namespace all app data ──────────────────────────────────
  const PREFIX = 'motogo_';

  // ── Low-level storage helpers ─────────────────────────────────────────────
  function get(key) {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)) ?? null; }
    catch { return null; }
  }

  function set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    // Dispatch a storage event so other open tabs/portals can react
    window.dispatchEvent(new CustomEvent('motogo:update', { detail: { key, value } }));
  }

  function remove(key) {
    localStorage.removeItem(PREFIX + key);
  }

  // ── Seed default data if DB is empty ──────────────────────────────────────
  function seed() {
    if (get('seeded')) return;

    set('users', [
      // role: 'admin' | 'rider' | 'passenger'
      { id: 'admin1', role: 'admin',     name: 'Admin User',      email: 'admin@motogo.com',   password: 'admin123',  phone: '+233 30 000 0000' },
      { id: 'r1',     role: 'rider',     name: 'Kofi Asante',     email: 'kofi@motogo.com',    password: 'rider123',  phone: '+233 24 111 0001' },
      { id: 'r2',     role: 'rider',     name: 'Yaw Boateng',     email: 'yaw@motogo.com',     password: 'rider123',  phone: '+233 24 111 0002' },
      { id: 'r3',     role: 'rider',     name: 'Nii Darko',       email: 'nii@motogo.com',     password: 'rider123',  phone: '+233 24 111 0003' },
      { id: 'r4',     role: 'rider',     name: 'Akwesi Frimpong', email: 'akwesi@motogo.com',  password: 'rider123',  phone: '+233 24 111 0004' },
      { id: 'r5',     role: 'rider',     name: 'Kwame Asante',    email: 'kwame@motogo.com',   password: 'rider123',  phone: '+233 24 222 0005' },
      { id: 'p1',     role: 'passenger', name: 'Efua Owusu',      email: 'efua@motogo.com',    password: 'pass123',   phone: '+233 20 111 0001' },
      { id: 'p2',     role: 'passenger', name: 'James Mensah',    email: 'james@motogo.com',   password: 'pass123',   phone: '+233 20 111 0002' },
      { id: 'p3',     role: 'passenger', name: 'Abena Boateng',   email: 'abena@motogo.com',   password: 'pass123',   phone: '+233 20 111 0003' },
    ]);

    set('riders', [
      { id: 'r1', userId: 'r1', name: 'Kofi Asante',     plate: 'GR-2847-21', rating: 4.9, trips: 312, earnings: 6240,  status: 'online',  approved: true,  joinedDate: '2023-06-12' },
      { id: 'r2', userId: 'r2', name: 'Yaw Boateng',     plate: 'GR-1122-19', rating: 4.7, trips: 204, earnings: 4100,  status: 'online',  approved: true,  joinedDate: '2023-09-01' },
      { id: 'r3', userId: 'r3', name: 'Nii Darko',       plate: 'GR-3344-22', rating: 4.8, trips: 451, earnings: 9020,  status: 'riding',  approved: true,  joinedDate: '2022-11-20' },
      { id: 'r4', userId: 'r4', name: 'Akwesi Frimpong', plate: 'GR-5566-23', rating: 4.6, trips: 88,  earnings: 1760,  status: 'offline', approved: true,  joinedDate: '2024-01-05' },
      { id: 'r5', userId: 'r5', name: 'Kwame Asante',    plate: 'GR-7788-24', rating: 0,   trips: 0,   earnings: 0,     status: 'pending', approved: false, joinedDate: '2024-05-10' },
    ]);

    set('passengers', [
      { id: 'p1', userId: 'p1', name: 'Efua Owusu',   savedHome: 'Osu, Accra',    savedWork: 'Airport City',   totalTrips: 24, totalSpent: 432, joinedDate: '2024-01-10' },
      { id: 'p2', userId: 'p2', name: 'James Mensah', savedHome: 'Labone, Accra', savedWork: 'Cantonments',    totalTrips: 11, totalSpent: 198, joinedDate: '2024-03-22' },
      { id: 'p3', userId: 'p3', name: 'Abena Boateng',savedHome: 'Circle, Accra', savedWork: 'Dansoman',       totalTrips: 37, totalSpent: 666, joinedDate: '2023-11-05' },
    ]);

    set('rides', [
      { id: 'RD1042', passengerId: 'p1', passengerName: 'Efua Owusu',   riderId: 'r1', riderName: 'Kofi Asante',     from: 'Osu',    to: 'Airport',      fare: 18, status: 'completed', time: '09:14', date: '2024-05-14', rating: 5,    duration: 14 },
      { id: 'RD1041', passengerId: 'p2', passengerName: 'James Mensah', riderId: 'r2', riderName: 'Yaw Boateng',     from: 'Labone', to: 'Cantonments',  fare: 12, status: 'completed', time: '09:02', date: '2024-05-14', rating: 4,    duration: 10 },
      { id: 'RD1040', passengerId: 'p3', passengerName: 'Abena Boateng',riderId: 'r3', riderName: 'Nii Darko',       from: 'Circle', to: 'Dansoman',     fare: 22, status: 'active',    time: '09:20', date: '2024-05-14', rating: null, duration: null },
      { id: 'RD1039', passengerId: 'p1', passengerName: 'Efua Owusu',   riderId: 'r4', riderName: 'Akwesi Frimpong', from: 'Madina', to: 'Legon',         fare: 9,  status: 'completed', time: '08:50', date: '2024-05-14', rating: 5,    duration: 8  },
      { id: 'RD1038', passengerId: 'p2', passengerName: 'James Mensah', riderId: 'r1', riderName: 'Kofi Asante',     from: 'Tema',   to: 'Accra Mall',   fare: 35, status: 'completed', time: '08:30', date: '2024-05-14', rating: 4,    duration: 32 },
      { id: 'RD1037', passengerId: 'p3', passengerName: 'Abena Boateng',riderId: 'r2', riderName: 'Yaw Boateng',     from: 'Legon',  to: 'East Legon',   fare: 14, status: 'completed', time: '08:10', date: '2024-05-13', rating: 5,    duration: 12 },
      { id: 'RD1036', passengerId: 'p1', passengerName: 'Efua Owusu',   riderId: 'r3', riderName: 'Nii Darko',       from: 'Osu',    to: 'Spintex',      fare: 28, status: 'completed', time: '17:40', date: '2024-05-13', rating: 4,    duration: 24 },
    ]);

    set('stats', {
      tripsToday: 247, revenueToday: 1840, activeRides: 14, onlineRiders: 38,
      tripsWeek: [36, 44, 30, 50, 56, 48, 60],
      revenueWeek: [1100, 1350, 900, 1540, 1720, 1480, 1840],
    });

    set('session', null);
    set('seeded', true);
  }

  // ── AUTH ──────────────────────────────────────────────────────────────────

  /**
   * Login: returns { success, user, error }
   * In production: POST /api/auth/login → JWT token
   */
  function login(email, password) {
    const users = get('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    const session = { userId: user.id, role: user.role, name: user.name, email: user.email, loggedInAt: Date.now() };
    set('session', session);
    return { success: true, user: session };
  }

  function logout() {
    set('session', null);
  }

  function getSession() {
    return get('session');
  }

  function requireAuth(expectedRole) {
    const session = getSession();
    if (!session) { window.location.href = expectedRole === 'admin' ? 'admin.html' : expectedRole === 'rider' ? 'rider.html' : 'passenger.html'; return null; }
    if (session.role !== expectedRole) { logout(); window.location.reload(); return null; }
    return session;
  }

  // ── RIDERS ────────────────────────────────────────────────────────────────
  function getRiders(filter = {}) {
    let riders = get('riders') || [];
    if (filter.approved !== undefined) riders = riders.filter(r => r.approved === filter.approved);
    if (filter.status) riders = riders.filter(r => r.status === filter.status);
    return riders;
  }

  function getRiderByUserId(userId) {
    return (get('riders') || []).find(r => r.userId === userId) || null;
  }

  function updateRider(id, changes) {
    const riders = get('riders') || [];
    const idx = riders.findIndex(r => r.id === id);
    if (idx === -1) return false;
    riders[idx] = { ...riders[idx], ...changes };
    set('riders', riders);
    return true;
  }

  function approveRider(id) { return updateRider(id, { approved: true, status: 'offline' }); }
  function rejectRider(id) {
    const riders = (get('riders') || []).filter(r => r.id !== id);
    set('riders', riders);
    return true;
  }

  // ── PASSENGERS ────────────────────────────────────────────────────────────
  function getPassengers() { return get('passengers') || []; }
  function getPassengerByUserId(userId) {
    return (get('passengers') || []).find(p => p.userId === userId) || null;
  }
  function updatePassenger(id, changes) {
    const pax = get('passengers') || [];
    const idx = pax.findIndex(p => p.id === id);
    if (idx === -1) return false;
    pax[idx] = { ...pax[idx], ...changes };
    set('passengers', pax);
    return true;
  }

  // ── RIDES ─────────────────────────────────────────────────────────────────
  function getRides(filter = {}) {
    let rides = get('rides') || [];
    if (filter.passengerId) rides = rides.filter(r => r.passengerId === filter.passengerId);
    if (filter.riderId)     rides = rides.filter(r => r.riderId     === filter.riderId);
    if (filter.status)      rides = rides.filter(r => r.status      === filter.status);
    return rides;
  }

  function createRide(data) {
    const rides = get('rides') || [];
    const id = 'RD' + (1043 + rides.length);
    const now = new Date();
    const ride = {
      id,
      passengerId:   data.passengerId,
      passengerName: data.passengerName,
      riderId:       data.riderId,
      riderName:     data.riderName,
      from:          data.from,
      to:            data.to,
      fare:          data.fare,
      status:        'active',
      time:          now.toTimeString().slice(0, 5),
      date:          now.toISOString().slice(0, 10),
      rating:        null,
      duration:      null,
    };
    rides.unshift(ride);
    set('rides', rides);
    // Update stats
    const stats = get('stats');
    stats.activeRides++;
    set('stats', stats);
    return ride;
  }

  function completeRide(rideId, { duration }) {
    const rides = get('rides') || [];
    const idx = rides.findIndex(r => r.id === rideId);
    if (idx === -1) return false;
    rides[idx].status = 'completed';
    rides[idx].duration = duration;
    set('rides', rides);
    // Update stats & rider earnings
    const stats = get('stats');
    stats.tripsToday++;
    stats.revenueToday += rides[idx].fare;
    stats.activeRides = Math.max(0, stats.activeRides - 1);
    set('stats', stats);
    updateRider(rides[idx].riderId, {
      trips: (getRiders().find(r => r.id === rides[idx].riderId)?.trips || 0) + 1,
      earnings: (getRiders().find(r => r.id === rides[idx].riderId)?.earnings || 0) + rides[idx].fare,
    });
    return rides[idx];
  }

  function rateRide(rideId, rating) {
    const rides = get('rides') || [];
    const idx = rides.findIndex(r => r.id === rideId);
    if (idx === -1) return false;
    rides[idx].rating = rating;
    set('rides', rides);
    return true;
  }

  function cancelRide(rideId) {
    const rides = get('rides') || [];
    const idx = rides.findIndex(r => r.id === rideId);
    if (idx === -1) return false;
    rides[idx].status = 'cancelled';
    set('rides', rides);
    const stats = get('stats');
    stats.activeRides = Math.max(0, stats.activeRides - 1);
    set('stats', stats);
    return true;
  }

  // ── STATS ─────────────────────────────────────────────────────────────────
  function getStats() { return get('stats') || {}; }

  // ── PUBLIC API ────────────────────────────────────────────────────────────
  return {
    seed,
    // Auth
    login, logout, getSession, requireAuth,
    // Riders
    getRiders, getRiderByUserId, updateRider, approveRider, rejectRider,
    // Passengers
    getPassengers, getPassengerByUserId, updatePassenger,
    // Rides
    getRides, createRide, completeRide, rateRide, cancelRide,
    // Stats
    getStats,
    // Raw
    get, set,
  };
})();

// Auto-seed on first load
MotoDB.seed();
