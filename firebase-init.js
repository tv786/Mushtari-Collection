// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update, remove } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTeYYuBt5EqZRnhhQfJ2d4rcLI-RP_4GU",
  authDomain: "mushtari-collection.firebaseapp.com",
  databaseURL: "https://mushtari-collection-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mushtari-collection",
  storageBucket: "mushtari-collection.firebasestorage.app",
  messagingSenderId: "541245067810",
  appId: "1:541245067810:web:9d8fa6f8fb35230260307b",
  measurementId: "G-X2NQZJYJGF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

window.database = database;
window.ref = ref;
window.get = get;
window.onValue = onValue;

// ─── SAFE WRITE HELPERS (never call set() on parent nodes) ───────────────────

// Write a single entry by its ID — never overwrites other entries
window.db_setEntry = function(entry) {
  if (!entry || !entry.id) { console.error('db_setEntry: entry must have an id'); return Promise.reject('no id'); }
  return set(ref(database, 'entries/' + entry.id), entry);
};

// Delete a single entry by ID
window.db_deleteEntry = function(id) {
  if (!id) return Promise.reject('no id');
  return remove(ref(database, 'entries/' + id));
};

// Set cleared status for one month key
window.db_setCleared = function(key, value) {
  return set(ref(database, 'clearedMonths/' + key), value);
};

// Remove cleared status for one month key
window.db_removeCleared = function(key) {
  return remove(ref(database, 'clearedMonths/' + key));
};

// Bulk import — writes entries one by one, never nukes the whole node
window.db_importEntries = function(entriesArray) {
  const updates = {};
  entriesArray.forEach(function(e) {
    if (e && e.id) updates['entries/' + e.id] = e;
  });
  return update(ref(database, '/'), updates);
};

// Manual backup — downloads all entries as JSON to the device
window.db_backupNow = function() {
  return get(ref(database, 'entries')).then(function(snapshot) {
    const data = snapshot.val();
    if (!data) { alert('No data to back up.'); return; }
    const json = JSON.stringify({ backup_date: new Date().toISOString(), entries: data }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mushtari_backup_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    console.log('Backup downloaded!');
  });
};