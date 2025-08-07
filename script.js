const WIDGET_URL =
  "https://discord.com/api/guilds/1371191774793699348/widget.json";

const SERVER_ID = "1371191774793699348";

// DOM elements
const picsContainer = document.querySelector(".pics");
const membersCount = document.querySelector(".badge");

// Add click event listener when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".discord-bar").addEventListener("click", () => {
    window.open(
      "https://discord.com/channels/1371191774793699348/1372945962716233779",
      "_blank"
    );
  });
});

// fetch widget data
fetch(WIDGET_URL)
  .then((response) => response.json())
  .then((data) => {
    const members = data.members || [];
    const countMember = data.presence_count;
    // update members count
    membersCount.textContent = countMember;
    renderAvatars(members);

    // Show popup after 5 seconds delay
    setTimeout(() => {
      showBasicPopup();
    }, 5000);
  })
  .catch((error) => {
    console.error("Error fetching widget data:", error);
  });

//function to get random numbers
function getRandomMembers(arr, n = 4) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// function to render avatars in DOM
function renderAvatars(members) {
  // update pics
  picsContainer.innerHTML = ""; // clear existing pics
  const selectedMembers = getRandomMembers(members, 4);
  selectedMembers.forEach((member) => {
    const img = document.createElement("img");
    img.src = member.avatar_url;
    // img.title = member.username; // This already provides native tooltip
    img.classList.add("avtar");

    // Add custom hover events for better styling control
    img.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div");
      tooltip.textContent = member.username;
      tooltip.classList.add("custom-tooltip");
      const rect = img.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 + "px";
      tooltip.style.top = rect.top - 30 + "px";

      document.body.appendChild(tooltip);
      img.tooltipElement = tooltip; //store reference
    });

    img.addEventListener("mouseleave", (e) => {
      if (img.tooltipElement) {
        document.body.removeChild(img.tooltipElement);
        img.tooltipElement = null;
      }
    });

    picsContainer.appendChild(img);
  });
}

function showBasicPopup() {
  const popup = document.createElement("div");
  popup.className = "activity-popup";
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-icon">
        <img src="./assets/lovepreet.jpeg" alt="Custom Icon" class="popup-custom-photo" title="Lovepreet" />
      </div>
      <div class="popup-text">
        <div class="popup-message">Check out the latest updates here !</div>
        <div class="popup-channel">announcements</div>
      </div>
    </div>
  `;

  // Add click event to redirect to Discord server
  popup.addEventListener("click", () => {
    window.open(
      "https://discord.com/channels/1371191774793699348/1372929829783076968",
      "_blank"
    );
  });

  document.body.appendChild(popup);

  // Trigger fade-in animation
  setTimeout(() => {
    popup.classList.add("show");
  }, 100);

  // Start fade-out after 9.5 seconds, then remove after transition
  setTimeout(() => {
    popup.classList.add("fade-out");

    // Remove from DOM after transition completes
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 500); // 500ms matches the transition duration
  }, 9500); // 9.5s + 0.5s transition = 10s total
}

