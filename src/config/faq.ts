/**
 * Landing-page FAQ.
 *
 * The same entries render the visible section and the FAQPage JSON-LD in
 * vite.config.ts, so the structured data can never claim something the page
 * does not say. Answers are plain text for that reason.
 */
import { SITE_META } from './siteMeta'

export type FaqEntry = {
  question: string
  answer: string
}

export const FAQ: readonly FaqEntry[] = [
  // The first few are phrased the way people actually search — "how do I stop
  // forgetting tasks" rather than "features" — because these answers are also
  // the FAQPage structured data, which is where a search result gets its
  // expandable questions. They still have to be literally true of the app: the
  // structured data is a claim to Google, not marketing copy.
  {
    question: 'How do I stop forgetting tasks?',
    answer:
      'Write the task down the moment you think of it, give it a date and time, and let the app remind you instead of your memory. In Be Positive every task can carry a due date, a time, a repeat rule and a reminder, so nothing depends on you remembering it later.',
  },
  {
    question: 'How do I plan my day?',
    answer:
      'Start from what is already fixed, then fit the rest around it. Be Positive lays the day out in a calendar so you can see where the free hours are, and lets you mark each task low, medium or high priority so the important ones do not get lost among the small ones.',
  },
  {
    question: 'Can the app remind me before a task is due?',
    answer:
      'Yes. Each task has a reminder you can switch on when you create it, and tasks that come round again — daily, weekly or monthly — repeat without you setting them up each time.',
  },
  {
    question: 'How do I keep track of what I actually finished?',
    answer:
      'The Overview screen counts the tasks you completed, your completion rate, your active days and your current streak, and charts your week, so you can see whether the plan is working rather than guessing.',
  },
  {
    question: 'How much does Be Positive cost?',
    answer: `Be Positive is a subscription: ${SITE_META.pricing.monthly} per month or ${SITE_META.pricing.yearly} per year. You can subscribe from inside the app.`,
  },
  {
    question: 'What devices does Be Positive work on?',
    answer:
      'Be Positive is available for iPhone and Android. You can download it from the App Store or Google Play — the links are at the top of this page.',
  },
  {
    question: 'What can I do with the app?',
    answer:
      'Plan tasks and prioritise what matters, lay out your day in a calendar, get reminders so nothing slips, and track your progress over time.',
  },
  {
    question: 'Does Be Positive work offline?',
    answer: 'No. Be Positive needs an internet connection to work.',
  },
  {
    question: 'Does my data sync between devices?',
    answer:
      'No. Be Positive does not sync your data between devices, so your plans stay with the device you set them up on.',
  },
  {
    question: 'Do you sell my data?',
    answer:
      'No. We do not sell your data. The services the app relies on are described in our Privacy Policy.',
  },
  {
    question: 'How do I delete my account and my data?',
    answer:
      'Open your profile in the app and choose Delete account. You can also start the request from the Delete account page on this site: enter your email and confirm through the link we send, which is valid for 24 hours. Data is permanently deleted after a 30-day grace period, and you can cancel any time during it.',
  },
  {
    question: 'I forgot my password. What do I do?',
    answer:
      'Use Forgot password in the app. The reset link opens a page on this site where you set a new password.',
  },
  {
    question: 'How do I contact support?',
    answer: `Email ${SITE_META.supportEmail}. We typically respond within a few business days. Including your device type, app version and a screenshot helps us answer faster.`,
  },
]
