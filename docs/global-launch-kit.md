# Be Positive Teams: global launch kit

Working document for taking Be Positive Teams to an English-speaking audience. Everything here is a draft to edit, not a script to follow. Claims in public copy must stay literally true of the product on the day they go out.

## 1. Positioning (one sentence, use it everywhere)

**Be Positive Teams is the team planner built for the owner: it gives every task an owner and a deadline, shows you what is late, who is stuck and who may leave, and tells the right person before you have to ask.**

Audience: owners and managing directors of companies with 5 to 500 people, in service businesses (restaurants, retail, agencies, clinics, education, beauty, construction). Not developers, not enterprise IT.

Three proof points we can say today:
- Flat price per company, not per seat.
- Interface in English, Azerbaijani, Russian and Turkish; web plus iOS and Android.
- Director dashboard, sign-off, "I'm blocked", automatic escalation, retention signal, work calendar and leave, starter packs by industry, API and webhooks.

What we do not say (yet): customer counts, logos, testimonials, "#1", "trusted by thousands". Add them only when real.

## 2. Launch sequence (6 weeks)

| Week | Step | Done when |
|---|---|---|
| 1 | Merge and deploy the product branches; switch on People Pack and AI briefing for 3 friendly companies | Three owners use the People page for a week |
| 1 | Deploy the new /teams page; verify titles and hreflang in Google Search Console | Search Console shows the three editions indexed |
| 2 | Record a 90-second product video of the director dashboard and People page (demo data, English UI) | MP4 and a 15-second cut for social |
| 2 | Collect 3 short quotes from the friendly companies (name, role, company, with permission) | Quotes approved in writing |
| 3 | Add the quotes and video to /teams; publish the "stop chasing tasks" article | Page updated, article live |
| 3 | Product Hunt: prepare the listing below, line up 20 people to comment on launch day (Tuesday, 00:01 PT) | Listing scheduled |
| 4 | Product Hunt launch day; LinkedIn post series starts (one per day for 5 days) | Launched |
| 5 | Directory listings: G2, Capterra, GetApp, AlternativeTo, SaaSHub (free tiers) | Five listings live |
| 6 | Cold outreach to 50 owners found on LinkedIn in one industry (restaurants or agencies) with the one-line pitch and a 10-minute demo offer | 10 demos booked |

## 3. Product Hunt listing

**Name:** Be Positive Teams

**Tagline (60 chars):** The team planner built for the owner, not the employee

**Description:**
Most project tools are built for the person doing the work. Be Positive Teams is built for the person responsible for all of it.

Every task has an owner and a deadline. When work is late, the system escalates on its own: employee, then manager, then you. When someone is stuck they press "I'm blocked" and say why. Before a task counts as done, the manager signs off.

The owner gets a director dashboard: today, this week, which department is behind, who is overloaded, who is away, what waits for your decision. The People Pack adds a retention signal (who may leave and why, with talking points), an anonymous stay survey, a skills map that shows growth, thanks, employee of the month and year with badges, and a monthly to-do so none of it is forgotten.

Starter packs set up restaurants, stores, agencies, clinics and schools in one click. Flat price per company. Web, iOS and Android, in English, Azerbaijani, Russian and Turkish. 30-day free trial, no card.

**First comment (from the maker):**
Hi everyone. I run a small company myself and built this because every tool I tried assumed I had a project manager. I did not; I had a phone full of "what happened to X?" messages. Be Positive Teams is the tool that answers that question before I ask it. Happy to answer anything about how the retention signal or escalation works.

**Topics:** Productivity, SaaS, Task Management, HR, Remote Work

## 4. LinkedIn post series (5 posts, one per day)

**Post 1, the problem.**
I gave the task. I set the deadline. And "what happened to it?" still came back to me.
That is the owner's job in most companies: chasing.
Gallup says only 22% of managers are engaged at work. The owner is the last manager standing.
We built Be Positive Teams so the chasing happens by itself. Link in comments.

**Post 2, escalation.**
A late task in our system does four things on its own:
Day 0: reminds the employee.
Day 1: tells them it is overdue.
Day 2: tells the manager.
Day 3: tells the owner.
Nobody has to remember to check. The owner only hears about the ones that really got stuck.

**Post 3, "I'm blocked".**
The most expensive words in a company are the ones nobody says: "I'm stuck."
So we made it a button. Pick a reason, add a line, and the manager gets it the same minute.
The dashboard shows every blocked task and how long it has been blocked.

**Post 4, retention signal.**
60% of owners fear losing their best people (Principal, 2026).
Good people rarely announce they are unhappy. They go quiet, skip time off, stop growing.
Be Positive reads those signals from data you already have and tells you who to talk to this week, with what to say.

**Post 5, the offer.**
Flat price per company. Hire someone, the bill does not change.
Starter packs for restaurants, stores, agencies, clinics and schools.
30 days free, no card. If it does not save you an hour a week, you lost nothing.

## 5. SEO

Primary keywords for /teams (English): "task management for small business", "team task tracker for owners", "employee task management software", "task escalation software", "employee retention software small business".

Article ideas (one per month, 1200 words, each ends with the free trial):
1. How to stop chasing tasks: five habits for owners (already a template e-mail; expand it).
2. Why your best employee leaves without warning, and the six signals that show it first.
3. The 2-minute "I'm blocked" rule that cut our late work in half.
4. A flat-price alternative to per-seat project tools for teams under 50.
5. Setting up a restaurant's task system in ten minutes (walkthrough with the starter pack).

Technical: the three editions (/teams, /az/teams, /ru/teams) carry hreflang and their own titles; keep them in sync in `src/config/routes.json`. Add an Organization and SoftwareApplication JSON-LD node for Teams in `vite.config.ts` once a pricing snippet is final.

## 6. Launch-day checklist

- [ ] Production has the latest backend and web-app (People Pack, escalation, campaigns).
- [ ] `RESEND_FROM_EMAIL` is a verified bepositive.cc address, not resend.dev.
- [ ] `SETUP_NOTIFY_EMAIL` set, so setup and add-on requests reach a person.
- [ ] Demo company with English department names and sample data for screenshots and video.
- [ ] /teams loads in under 3 seconds on mobile (check Lighthouse).
- [ ] Contact form tested end to end.
- [ ] Support inbox watched for 48 hours after launch.
- [ ] First e-mail campaign ("New features") ready in the admin panel for existing owners.

## 7. What to measure

Weekly: visitors to /teams, trial sign-ups, trials that invite 3+ people in the first week (the activation signal), paid conversions, and which industry pack was applied. Monthly: churn and the reasons from the stay survey of our own customers.
