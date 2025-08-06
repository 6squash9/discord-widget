Discord json : - https://discord.com/api/guilds/1371191774793699348/widget.json

` "New users come once to join — they’ll get the invite link via onboarding or somewhere else.
This widget is for keeping existing members engaged." `


### 📐 High-Level Design (HLD) — “Discord Teaser Bubble” MVP

```mermaid
flowchart LR
    A[Course Web Page] --> B[Bubble Component<br>(fixed bottom-corner)]
    B -- click --> C[Popup Panel<br>(HTML/CSS card)]
    C -->|fetches| D[Data Fetcher Module<br>(vanilla JS)]
    D -->|GET JSON| E[Discord Widget API<br>https://discord.com/api/guilds/{ID}/widget.json]
    D --> F[LocalStorage<br>flag joinedDiscord]
    C -->|CTA link| G[Discord Deep Link<br>• New user → Invite URL<br>• Member → /channels/{ID}]
```

---

### 🔍 Components - What & Why

| Layer                   | Purpose                                                        | Key Points                                           |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| **Course Web Page**     | Host site that embeds our widget snippet                       | No layout changes; widget lives independently        |
| **Bubble Component**    | 56 × 56 px circular icon (💬 / Discord logo)                   | `position: fixed` so it follows scroll               |
| **Popup Panel**         | Slides open to \~320 px card showing live info & CTA           | Pure CSS transition; hidden by default               |
| **Data Fetcher Module** | Pulls live stats every 60 s                                    | Simple `fetch()` → JSON → DOM update                 |
| **Discord Widget API**  | Public endpoint (no token) returns online members, invite link | Non-expiring invite; zero backend maintenance        |
| **LocalStorage flag**   | Remembers if user already joined                               | Swaps button label **Join / Open** without OAuth     |
| **Discord Deep Link**   | One link serves both cases                                     | Discord auto-redirects members; invite flows newbies |

---

### ⚙️ Runtime Flow (Step-by-Step)

1. **Page loads** ➜ Bubble is injected & rendered.
2. **User clicks bubble** ➜ Popup panel becomes visible.
3. **Data Fetcher** fires:

   * Hits Widget API
   * Updates online count & avatars
   * Reads `localStorage.joinedDiscord` to choose CTA URL + label.
4. **User clicks CTA**

   * If new ➜ Discord joins via permanent invite.
   * If member ➜ Directs to server channel list.
5. **Fetcher refreshes every 60 s** (optional), panel reflects live activity.

---

### 🧱 Deployment / Ops

| Aspect              | Decision                                                      |
| ------------------- | ------------------------------------------------------------- |
| **Hosting**         | Embed `<script>` + CSS from your CDN / course platform assets |
| **Dependencies**    | None (vanilla JS, no build tools)                             |
| **Security**        | CSP-safe; all requests go to `discord.com`                    |
| **Monitoring (v2)** | Add simple click counter (`fetch('/count')`) or GA event      |

---

### 🚦 Scaling Roadmap (after MVP)

1. **Visual hooks** – pulsing glow, live badge.
2. **Analytics** – log bubble opens & CTA clicks.
3. **Smart triggers** – show after 30 s or post-lesson.
4. **React refactor** – only if multiple widgets or complex state appears.
5. **OAuth accuracy** – replace local flag with real guild-membership check.

---

#### TL;DR 🧠

The widget lives entirely on the front end: a fixed bubble ➜ popup panel ➜ tiny fetcher hitting Discord’s public JSON. No backend, no framework, easy to drop onto any page — and dead-simple to extend later. 🌱🚀
