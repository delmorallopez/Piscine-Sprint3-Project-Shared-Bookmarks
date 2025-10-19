// script.js

import { getUserIds, getData, setData, clearData} from "./storage.js";

let userDropdown;
let bookmarksDisplay;
let mainContent;
let newURLInput;
let newTitleInput;
let newDescriptionInput;
let addBookmarkForm;
let deleteBookmarksButton;
let currentUser;

function setup() {
  userDropdown = document.getElementById("user-dropdown");
  mainContent = document.getElementById("main-content");
  bookmarksDisplay = document.getElementById("bookmarks-display");
  newURLInput = document.getElementById("new-url");
  newTitleInput = document.getElementById("new-title");
  newDescriptionInput = document.getElementById("new-description");
  addBookmarkForm = document.getElementById("add-bookmark-form");
  deleteBookmarksButton = document.getElementById("delete-bookmarks-button");
 
  // Fill dropdown with user ids
  populateUserDropdown(); 
  

  // ----------- Event listeners ----------

  // When user selection changes
  userDropdown.addEventListener("change", handleUserChange); 
  // When new bookmark form is submitted
  addBookmarkForm.addEventListener("submit", handleAddBookmark);
  // When delete bookmarks button is clicked
  deleteBookmarksButton.addEventListener("click", handleDeleteBookmarks);

}

// Function to add a new bookmark for the current user
function handleAddBookmark(event) {
  event.preventDefault(); // Prevent form submission

  if (!currentUser) {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  const newBookmark = {
    url: newURLInput.value.trim(),
    title: newTitleInput.value.trim(),
    description: newDescriptionInput.value.trim(),
    timestamp: new Date().toString(), // Store readable date/time
  };

  // Basic validation for required fields
  if (!newBookmark.url || !newBookmark.title) {
    alert("URL and Title are required fields.");
    return;
  }

  // Get existing bookmarks
  const existingData = getData(currentUser) || [];
  existingData.push(newBookmark); // Add new bookmark

  // Save updated bookmarks
  setData(currentUser, existingData);

  // Refresh display
  displayBookmarks(currentUser);

  // Reset form
  addBookmarkForm.reset();
}

// Function to display bookmarks when the user selection changes
function handleUserChange(event) {
  currentUser = event.target.value;

  if (!currentUser) {
    // Hide main content
    mainContent.setAttribute("hidden", "");
    bookmarksDisplay.innerHTML =
      "<p>Please select a user to view their bookmarks.</p>";
    return;
  }

  // Show main content
  mainContent.removeAttribute("hidden");
  displayBookmarks(currentUser);
}

// Delete all bookmarks for the current user
function handleDeleteBookmarks() {
  if (!currentUser) {
    alert("Please select a user before deleting bookmarks.");
    return;
  }

  const confirmClear = confirm(
    "Are you sure you want to delete all bookmarks for this user?"
  );
  if (!confirmClear) return;

  // Clear bookmarks for the current user
  clearData(currentUser);
  // Refresh display
  displayBookmarks(currentUser);
  alert("Agenda cleared!");
}



// Populate the user dropdown with user ids
function populateUserDropdown() {
  const userIds = getUserIds();

  userDropdown.innerHTML = '<option value="">No user selected</option>';
  userIds.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userDropdown.appendChild(option);
  });
}



// Display bookmarks for the selected user
function displayBookmarks(userId) {
  const data = getData(userId); // Expecting an array of bookmarks 
  console.log("Bookmarks for user", userId, ":", data);

  // If there's no valid data or not an array, show message
  if (!Array.isArray(data) || data.length === 0) {
    bookmarksDisplay.innerHTML =
      "<p>No bookmarks yet. Add one to get started!</p>";
    return;
  }

  // Filter out invalid or empty entries
  const validBookmarks = data.filter(
    (b) => b && b.title && b.url
  );

  // If no valid bookmarks, show message
  if (validBookmarks.length === 0) {
    bookmarksDisplay.innerHTML =
      "<p>No bookmarks yet. Add one to get started!</p>";
    return;
  }

  // Order reverse order so most recent is first
  const orderedBookmarks = [...validBookmarks].reverse();


  // Render valid bookmarks
  bookmarksDisplay.innerHTML = orderedBookmarks
  .map((bookmark) => {
    const date = new Date(bookmark.timestamp); // parse ISO string
    const formattedDate = date.toLocaleString(); // toLocalString get the format "10/19/2025, 15:45:30"
    
    return `
      <div class="bookmark-item">
        <p>
          <a href="${bookmark.url}" target="_blank"><strong>${bookmark.title}</strong></a>
          — ${bookmark.description || ""}
        </p>
        <small>Added: ${formattedDate}</small>
      </div>
    `;
  })
  .join("");

}

// clear bookmarks of a user 


document.addEventListener("DOMContentLoaded", setup);
