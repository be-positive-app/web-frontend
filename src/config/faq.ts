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
