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

const FAQ_AZ: readonly FaqEntry[] = [
  {
    question: 'Tapşırıqları unutmağı necə dayandırım?',
    answer:
      'Tapşırığı ağlınıza gələn an yazın, ona tarix və vaxt verin, qoy yaddaşınız yox, tətbiq xatırlatsın. Be Positive-də hər tapşırığın son tarixi, vaxtı, təkrar qaydası və xatırlatması ola bilər, beləcə heç nə sonradan xatırlamağınızdan asılı qalmır.',
  },
  {
    question: 'Günümü necə planlayım?',
    answer:
      'Artıq sabit olanlardan başlayın, qalanını onların ətrafına yerləşdirin. Be Positive günü təqvimdə göstərir ki, boş saatları görəsiniz, hər tapşırığı aşağı, orta və ya yüksək prioritetlə işarələməyə imkan verir ki, vacib olanlar kiçiklərin arasında itməsin.',
  },
  {
    question: 'Tətbiq tapşırığın vaxtı çatmazdan əvvəl xatırlada bilər?',
    answer:
      'Bəli. Hər tapşırığı yaradarkən xatırlatmanı aça bilərsiniz. Gündəlik, həftəlik və ya aylıq təkrarlanan tapşırıqlar hər dəfə yenidən qurulmadan təkrarlanır.',
  },
  {
    question: 'Həqiqətən nəyi bitirdiyimi necə izləyim?',
    answer:
      'İcmal ekranı tamamladığınız tapşırıqları, tamamlanma faizinizi, aktiv günlərinizi və cari seriyanızı sayır, həftənizi qrafikdə göstərir. Beləcə planın işləyib-işləmədiyini təxmin etmədən görürsünüz.',
  },
  {
    question: 'Be Positive nə qədərdir?',
    answer: `Be Positive abunəlikdir: ayda ${SITE_META.pricing.monthly} və ya ildə ${SITE_META.pricing.yearly}. Abunəliyi tətbiqin içindən ala bilərsiniz.`,
  },
  {
    question: 'Be Positive hansı cihazlarda işləyir?',
    answer:
      'Be Positive iPhone və Android üçün mövcuddur. Onu App Store və ya Google Play-dən yükləyə bilərsiniz, keçidlər bu səhifənin yuxarısındadır.',
  },
  {
    question: 'Tətbiqlə nə edə bilərəm?',
    answer:
      'Tapşırıqları planlayın və vacibini önə çəkin, gününüzü təqvimdə qurun, heç nə yaddan çıxmasın deyə xatırlatmalar alın və irəliləyişinizi zamanla izləyin.',
  },
  {
    question: 'Be Positive internetsiz işləyir?',
    answer: 'Xeyr. Be Positive-in işləməsi üçün internet bağlantısı lazımdır.',
  },
  {
    question: 'Məlumatlarım cihazlar arasında sinxronlaşır?',
    answer:
      'Xeyr. Be Positive məlumatlarınızı cihazlar arasında sinxronlaşdırmır, planlarınız onları qurduğunuz cihazda qalır.',
  },
  {
    question: 'Məlumatlarımı satırsınız?',
    answer:
      'Xeyr. Biz məlumatlarınızı satmırıq. Tətbiqin istifadə etdiyi xidmətlər Məxfilik siyasətimizdə təsvir olunub.',
  },
  {
    question: 'Hesabımı və məlumatlarımı necə silim?',
    answer:
      'Tətbiqdə profilinizi açın və Hesabı sil seçin. Sorğunu bu saytdakı Hesabı sil səhifəsindən də başlada bilərsiniz: e-poçtunuzu yazın və göndərdiyimiz, 24 saat keçərli olan keçidlə təsdiqləyin. Məlumatlar 30 günlük gözləmə müddətindən sonra birdəfəlik silinir, bu müddətdə istənilən vaxt ləğv edə bilərsiniz.',
  },
  {
    question: 'Parolumu unutmuşam. Nə edim?',
    answer:
      'Tətbiqdə Parolu unutdum seçin. Sıfırlama keçidi bu saytda yeni parol təyin etdiyiniz səhifəni açır.',
  },
  {
    question: 'Dəstəklə necə əlaqə saxlayım?',
    answer: `${SITE_META.supportEmail} ünvanına yazın. Adətən bir neçə iş günü içində cavab veririk. Cihaz növü, tətbiq versiyası və ekran görüntüsü daha tez cavab verməyə kömək edir.`,
  },
]

const FAQ_RU: readonly FaqEntry[] = [
  {
    question: 'Как перестать забывать задачи?',
    answer:
      'Записывайте задачу в тот момент, когда о ней подумали, задайте дату и время и пусть напоминает приложение, а не память. В Be Positive у каждой задачи может быть срок, время, правило повтора и напоминание, так что ничего не зависит от того, вспомните ли вы потом.',
  },
  {
    question: 'Как спланировать день?',
    answer:
      'Начните с того, что уже зафиксировано, и распределите остальное вокруг. Be Positive показывает день в календаре, чтобы были видны свободные часы, и позволяет отмечать задачи низким, средним или высоким приоритетом, чтобы важные не терялись среди мелких.',
  },
  {
    question: 'Может ли приложение напомнить о задаче заранее?',
    answer:
      'Да. При создании задачи можно включить напоминание, а задачи, которые повторяются ежедневно, еженедельно или ежемесячно, повторяются без повторной настройки.',
  },
  {
    question: 'Как отслеживать, что я на самом деле сделал?',
    answer:
      'Экран «Обзор» считает выполненные задачи, процент выполнения, активные дни и текущую серию и показывает график недели, так что видно, работает ли план, без догадок.',
  },
  {
    question: 'Сколько стоит Be Positive?',
    answer: `Be Positive — это подписка: ${SITE_META.pricing.monthly} в месяц или ${SITE_META.pricing.yearly} в год. Оформить её можно в приложении.`,
  },
  {
    question: 'На каких устройствах работает Be Positive?',
    answer:
      'Be Positive доступен для iPhone и Android. Скачайте его в App Store или Google Play — ссылки вверху этой страницы.',
  },
  {
    question: 'Что можно делать в приложении?',
    answer:
      'Планировать задачи и расставлять приоритеты, раскладывать день в календаре, получать напоминания, чтобы ничего не упустить, и следить за прогрессом со временем.',
  },
  {
    question: 'Работает ли Be Positive без интернета?',
    answer: 'Нет. Для работы Be Positive нужно подключение к интернету.',
  },
  {
    question: 'Синхронизируются ли данные между устройствами?',
    answer:
      'Нет. Be Positive не синхронизирует данные между устройствами, планы остаются на устройстве, где вы их создали.',
  },
  {
    question: 'Вы продаёте мои данные?',
    answer:
      'Нет. Мы не продаём ваши данные. Сервисы, на которые опирается приложение, описаны в нашей Политике конфиденциальности.',
  },
  {
    question: 'Как удалить аккаунт и данные?',
    answer:
      'Откройте профиль в приложении и выберите «Удалить аккаунт». Запрос можно начать и на странице удаления аккаунта на этом сайте: введите e-mail и подтвердите по ссылке из письма, она действует 24 часа. Данные удаляются безвозвратно через 30 дней, и в течение этого срока удаление можно отменить.',
  },
  {
    question: 'Я забыл пароль. Что делать?',
    answer:
      'Нажмите «Забыли пароль» в приложении. Ссылка для сброса откроет страницу на этом сайте, где можно задать новый пароль.',
  },
  {
    question: 'Как связаться с поддержкой?',
    answer: `Напишите на ${SITE_META.supportEmail}. Обычно отвечаем в течение нескольких рабочих дней. Тип устройства, версия приложения и скриншот помогут ответить быстрее.`,
  },
]

/** The visible FAQ in each site language. The FAQPage structured data stays on the English list. */
export const FAQ_BY_LANG: Record<'en' | 'az' | 'ru', readonly FaqEntry[]> = {
  en: FAQ,
  az: FAQ_AZ,
  ru: FAQ_RU,
}
