const WIDGET_URL =
  "https://discord.com/api/guilds/1371191774793699348/widget.json";
const SERVER_ID = "1371191774793699348";

const genericMessages = [
  "📝 Someone shared their progress in #weekly-learnings",
  "🚀 Check out the latest build in #monthly-builds",
  "📢 New announcement from Lovepreet – don’t miss it!",
  "❓ A fresh question popped up in #doubts – can you help?"
];
// dom elements
const picsContainer = document.querySelector(".pics");
const membersCount = document.querySelector(".badge");

// fetch widget data
fetch(WIDGET_URL)
  .then((response) => response.json())
  .then((data) => {
    const members = data.members || [];
    const countMember = data.presence_count;
    // update members count
    membersCount.textContent = countMember;
    function getRandomMembers(arr, n = 3) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    }
    // update pics
    picsContainer.innerHTML = ""; // clear existing pics
    const selectedMembers = getRandomMembers(members, 3);
    selectedMembers.forEach((member) => {
      const img = document.createElement("img");
      img.src = member.avatar_url;
      img.title = member.username;
      img.classList.add("avtar");
      picsContainer.appendChild(img);
    });

    // pop up for Channel actvities
    const channelMap = {};
    data.channels.forEach((ch) => {
      channelMap[ch.id] = ch.name;
    });

    const activeVCs = {};
    data.members.forEach((member) => {
      if (member.channel_id && channelMap[member.channel_id]) {
        if (!activeVCs[member.channel_id]) {
          activeVCs[member.channel_id] = [];
        }
        activeVCs[member.channel_id].push(member);
      }
    });

    //to be considered 
   





  })
  .catch((error) => {
    console.error("Error fetching widget data:", error);
  });
