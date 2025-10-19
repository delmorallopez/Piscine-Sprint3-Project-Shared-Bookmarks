// script.js

import { getUserIds, getData } from "./storage.js";

let userDropdown;
let bookmarksDisplay;
let mainContent;
let currentUser;

function setup() {
  userDropdown = document.getElementById("user-dropdown");
  mainContent = document.getElementById("main-content");
  bookmarksDisplay = document.getElementById("bookmarks-display");

  populateUserDropdown();
  userDropdown.addEventListener("change", handleUserChange);
}

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

function populateUserDropdown() {
  const userIds = getUserIds();
  console.log("User IDs:", userIds);

  userDropdown.innerHTML = '<option value="">No user selected</option>';
  userIds.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userDropdown.appendChild(option);
  });
}

function displayBookmarks(userId) {
  const data = getData(userId);

  if (!data || data.length === 0) {
    bookmarksDisplay.innerHTML =
      "<p>No bookmarks yet. Add one to get started!</p>";
    return;
  }

  // We can later expand this to actually show bookmarks
  
  /*bookmarksDisplay.innerHTML = data
    .map(
      (bookmark) => `
        <div>
          <h3>${bookmark.title}</h3>
          <p>${bookmark.description}</p>
          <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
        </div>
      `
    )
    .join(""); */
}

document.addEventListener("DOMContentLoaded", setup);
