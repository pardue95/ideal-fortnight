// create variable to hold db connection
let db;
// establish a connection to IndexedDB database
const request = indexedDB.open("budget_tracker", 1);

// this event will emit if the database version changes
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("new_transaction", { autoIncrement: true });
};

// upon a successful
request.onsuccess = function (event) {
  // when db is successfully created with its object store
  db = event.target.result;
  // check if app is online
  if (navigator.onLine) {
    uploadTransaction();
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

// Will be executed if we attempt to submit a new transaction and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions
  const transaction = db.transaction(["new_transaction"], "readwrite");

  // access the object store
  const budgetObjectStore = transaction.objectStore("new_transaction");

  // add record to your store with add method
  budgetObjectStore.add(record);
}
