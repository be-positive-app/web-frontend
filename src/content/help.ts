import type { Lang } from '../i18n'

/**
 * Help center articles. Each one is a few steps and, where it lives in the
 * web panel, a link that opens that page with the control framed in yellow
 * (`?spot=` is read by the panel's Spotlight).
 */
export type HelpGroup = 'start' | 'daily' | 'manage'

export interface HelpArticle {
  slug: string
  group: HelpGroup
  /** Panel page plus the `data-tour` key to frame; absent for app-only topics. */
  panel?: { path: string; spot: string }
  text: Record<Lang, { title: string; summary: string; steps: string[] }>
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'invite-people',
    group: 'start',
    panel: { path: '/employees', spot: 'invite' },
    text: {
      en: { title: 'Invite your team', summary: 'Add people by email or a CSV list; they work from the mobile app.', steps: ['Open Team and press Invite.', 'Enter one or more emails, pick a role (member or moderator) and a department.', 'People with a Be Positive account join at once; others get an email to install the app.', 'Many people at once: upload a CSV with name, email, department, role.'] },
      az: { title: 'Komandanı dəvət edin', summary: 'İşçiləri email və ya CSV siyahısı ilə əlavə edin; onlar mobil tətbiqdə işləyir.', steps: ['Komanda bölməsini açın və Dəvət et düyməsini basın.', 'Bir və ya bir neçə email yazın, rol (işçi və ya moderator) və şöbə seçin.', 'Be Positive hesabı olanlar dərhal qoşulur; qalanlara tətbiqi yükləmək üçün email gedir.', 'Çox adam üçün: ad, email, şöbə, rol sütunları olan CSV yükləyin.'] },
      ru: { title: 'Пригласите команду', summary: 'Добавьте людей по email или списком CSV; они работают в мобильном приложении.', steps: ['Откройте раздел Команда и нажмите Пригласить.', 'Введите один или несколько email, выберите роль (сотрудник или модератор) и отдел.', 'Люди с аккаунтом Be Positive подключаются сразу; остальным придёт письмо с приглашением установить приложение.', 'Сразу много людей: загрузите CSV с колонками имя, email, отдел, роль.'] },
      tr: { title: 'Ekibinizi davet edin', summary: 'Kişileri e-posta veya CSV listesiyle ekleyin; mobil uygulamadan çalışırlar.', steps: ['Ekip bölümünü açın ve Davet et düğmesine basın.', 'Bir veya birkaç e-posta yazın, rol (üye veya moderatör) ve departman seçin.', 'Be Positive hesabı olanlar hemen katılır; diğerlerine uygulamayı yüklemeleri için e-posta gider.', 'Toplu ekleme: ad, e-posta, departman, rol sütunları olan bir CSV yükleyin.'] },
    },
  },
  {
    slug: 'departments',
    group: 'start',
    panel: { path: '/departments', spot: 'department' },
    text: {
      en: { title: 'Set up departments', summary: 'Departments group people, tasks and reports, and limit what moderators see.', steps: ['Open Departments and create one per team (Sales, Marketing…).', 'Add people to a department from their profile or when you invite them.', 'A moderator can be given one or more departments; they manage only those.'] },
      az: { title: 'Şöbələri qurun', summary: 'Şöbələr işçiləri, tapşırıqları və hesabatları qruplaşdırır, moderatorun nə gördüyünü məhdudlaşdırır.', steps: ['Şöbələr səhifəsini açın və hər komanda üçün birini yaradın (Satış, Marketinq…).', 'İşçini şöbəyə profilindən və ya dəvət edərkən əlavə edin.', 'Moderatora bir və ya bir neçə şöbə verə bilərsiniz; o yalnız onları idarə edir.'] },
      ru: { title: 'Настройте отделы', summary: 'Отделы группируют людей, задачи и отчёты и ограничивают то, что видит модератор.', steps: ['Откройте Отделы и создайте по одному на каждую команду (Продажи, Маркетинг…).', 'Добавьте человека в отдел из его профиля или при приглашении.', 'Модератору можно дать один или несколько отделов; он управляет только ими.'] },
      tr: { title: 'Departmanları kurun', summary: 'Departmanlar kişileri, görevleri ve raporları gruplar; moderatörün ne gördüğünü sınırlar.', steps: ['Departmanlar sayfasını açın ve her ekip için bir tane oluşturun (Satış, Pazarlama…).', 'Kişiyi departmana profilinden veya davet ederken ekleyin.', 'Bir moderatöre bir veya birkaç departman verebilirsiniz; yalnızca onları yönetir.'] },
    },
  },
  {
    slug: 'first-task',
    group: 'start',
    panel: { path: '/tasks', spot: 'task-new' },
    text: {
      en: { title: 'Create a task (or write it in one sentence)', summary: 'Give work to one person or several; each gets their own copy on their phone.', steps: ['Press Create task at the top of any page.', 'Type one sentence such as "Aysel sends the offer tomorrow at 3, urgent" and press Fill — or fill the fields yourself.', 'Choose assignees, due date and priority. Turn on sign-off if you want to approve the result.', 'Assignees get a notification in the mobile app.'] },
      az: { title: 'Tapşırıq yaradın (və ya bir cümlə ilə yazın)', summary: 'İşi bir və ya bir neçə nəfərə verin; hər biri öz telefonunda öz nüsxəsini görür.', steps: ['İstənilən səhifənin yuxarısında Tapşırıq yarat düyməsini basın.', '"Sabah saat 3-də Aysel təklifi göndərsin, vacibdir" kimi bir cümlə yazıb Doldur basın — və ya xanaları özünüz doldurun.', 'İcraçıları, son tarixi və prioriteti seçin. Nəticəni özünüz təsdiq etmək istəyirsinizsə, təsdiqi aktiv edin.', 'İcraçılara mobil tətbiqdə bildiriş gedir.'] },
      ru: { title: 'Создайте задачу (или опишите её одной фразой)', summary: 'Поручите работу одному или нескольким людям; каждый получит свою копию в телефоне.', steps: ['Нажмите Создать задачу вверху любой страницы.', 'Напишите одну фразу, например «Айсель завтра в 3 отправит предложение, срочно», и нажмите Заполнить — или заполните поля сами.', 'Выберите исполнителей, срок и приоритет. Включите подтверждение, если хотите принять результат сами.', 'Исполнители получат уведомление в мобильном приложении.'] },
      tr: { title: 'Görev oluşturun (veya tek cümleyle yazın)', summary: 'İşi bir veya birkaç kişiye verin; her biri telefonunda kendi kopyasını görür.', steps: ['Herhangi bir sayfanın üstündeki Görev oluştur düğmesine basın.', '"Aysel yarın saat 3\'te teklifi göndersin, acil" gibi tek bir cümle yazıp Doldur\'a basın — veya alanları kendiniz doldurun.', 'Atananları, son tarihi ve önceliği seçin. Sonucu siz onaylamak istiyorsanız onayı açın.', 'Atananlara mobil uygulamada bildirim gider.'] },
    },
  },
  {
    slug: 'import-tasks',
    group: 'start',
    panel: { path: '/tasks', spot: 'task-import' },
    text: {
      en: { title: 'Import tasks from Excel, Trello or Asana', summary: 'Move your current task list over in a minute instead of retyping it.', steps: ['Export your list: Excel/Sheets as CSV, Trello as JSON or CSV, Asana/Jira/Monday as CSV.', 'On Tasks press Import and choose the file.', 'Check which column is the title, assignee, due date and priority; we guess from the headers.', 'Look at the preview and press Import. Finished rows and unknown people are flagged before anything is created.'] },
      az: { title: 'Excel, Trello və ya Asana-dan tapşırıq idxalı', summary: 'Mövcud tapşırıq siyahınızı yenidən yazmadan bir dəqiqəyə köçürün.', steps: ['Siyahını ixrac edin: Excel/Sheets — CSV, Trello — JSON və ya CSV, Asana/Jira/Monday — CSV.', 'Tapşırıqlar səhifəsində İdxal et basın və faylı seçin.', 'Hansı sütunun başlıq, icraçı, son tarix və prioritet olduğunu yoxlayın; başlıqlara görə özümüz təxmin edirik.', 'Önizləməyə baxın və İdxal et basın. Bitmiş sətirlər və tanınmayan şəxslər əvvəlcədən göstərilir.'] },
      ru: { title: 'Импорт задач из Excel, Trello или Asana', summary: 'Перенесите текущий список задач за минуту, не перепечатывая его.', steps: ['Экспортируйте список: Excel/Sheets — CSV, Trello — JSON или CSV, Asana/Jira/Monday — CSV.', 'На странице Задачи нажмите Импорт и выберите файл.', 'Проверьте, какой столбец — название, исполнитель, срок и приоритет; мы угадываем по заголовкам.', 'Посмотрите предпросмотр и нажмите Импортировать. Завершённые строки и незнакомые люди отмечаются заранее.'] },
      tr: { title: 'Excel, Trello veya Asana\'dan görev aktarma', summary: 'Mevcut görev listenizi yeniden yazmadan bir dakikada taşıyın.', steps: ['Listenizi dışa aktarın: Excel/Sheets — CSV, Trello — JSON veya CSV, Asana/Jira/Monday — CSV.', 'Görevler sayfasında İçe aktar\'a basın ve dosyayı seçin.', 'Hangi sütunun başlık, atanan, son tarih ve öncelik olduğunu kontrol edin; başlıklardan tahmin ediyoruz.', 'Önizlemeye bakın ve İçe aktar\'a basın. Biten satırlar ve tanınmayan kişiler önceden işaretlenir.'] },
    },
  },
  {
    slug: 'company-logo',
    group: 'start',
    panel: { path: '/settings', spot: 'logo' },
    text: {
      en: { title: 'Add your company logo', summary: 'Your logo appears in the panel next to the company name.', steps: ['Open Settings and find Branding.', 'Upload a square PNG or JPG logo.', 'It shows in the panel sidebar under Company.'] },
      az: { title: 'Şirkət loqosunu əlavə edin', summary: 'Loqonuz paneldə şirkət adının yanında görünür.', steps: ['Ayarlar səhifəsini açın və Brendinq bölməsini tapın.', 'Kvadrat PNG və ya JPG loqo yükləyin.', 'Loqo panelin sol menyusunda Şirkət hissəsində görünür.'] },
      ru: { title: 'Добавьте логотип компании', summary: 'Ваш логотип появится в панели рядом с названием компании.', steps: ['Откройте Настройки и найдите блок Брендинг.', 'Загрузите квадратный логотип PNG или JPG.', 'Он появится в боковом меню панели в разделе Компания.'] },
      tr: { title: 'Şirket logonuzu ekleyin', summary: 'Logonuz panelde şirket adının yanında görünür.', steps: ['Ayarlar\'ı açın ve Marka bölümünü bulun.', 'Kare bir PNG veya JPG logo yükleyin.', 'Panelin yan menüsünde Şirket altında görünür.'] },
    },
  },
  {
    slug: 'mobile-app',
    group: 'daily',
    text: {
      en: { title: 'How employees work from the mobile app', summary: 'Employees do not need the web panel: tasks, reminders and approvals are on their phone.', steps: ['The employee installs Be Positive from the App Store or Google Play and signs in with the invited email.', 'Their tasks from the company appear in the app with due dates and reminders.', 'They tick a task when it is done, add a comment, or mark it blocked; you see it in the panel at once.', 'Tasks that need sign-off go to the manager for approval.'] },
      az: { title: 'İşçilər mobil tətbiqdə necə işləyir', summary: 'İşçilərə veb panel lazım deyil: tapşırıqlar, xatırlatmalar və təsdiqlər telefonlarındadır.', steps: ['İşçi Be Positive-i App Store və ya Google Play-dən yükləyir və dəvət olunduğu email ilə daxil olur.', 'Şirkətdən gələn tapşırıqlar son tarix və xatırlatmalarla tətbiqdə görünür.', 'Tapşırıq bitəndə işarələyir, şərh yazır və ya "əngəl var" qeyd edir; siz bunu paneldə dərhal görürsünüz.', 'Təsdiq tələb edən tapşırıqlar menecerin təsdiqinə gedir.'] },
      ru: { title: 'Как сотрудники работают в мобильном приложении', summary: 'Сотрудникам не нужна веб-панель: задачи, напоминания и подтверждения — в телефоне.', steps: ['Сотрудник устанавливает Be Positive из App Store или Google Play и входит с email, на который пришло приглашение.', 'Задачи от компании появляются в приложении со сроками и напоминаниями.', 'Он отмечает выполненную задачу, пишет комментарий или отмечает блокер; вы сразу видите это в панели.', 'Задачи с подтверждением уходят руководителю на одобрение.'] },
      tr: { title: 'Çalışanlar mobil uygulamadan nasıl çalışır', summary: 'Çalışanların web paneline ihtiyacı yok: görevler, hatırlatmalar ve onaylar telefonlarında.', steps: ['Çalışan Be Positive\'i App Store veya Google Play\'den yükler ve davet edildiği e-postayla giriş yapar.', 'Şirketten gelen görevler son tarih ve hatırlatmalarla uygulamada görünür.', 'İş bitince görevi işaretler, yorum yazar veya engel bildirir; siz panelde hemen görürsünüz.', 'Onay gerektiren görevler yöneticinin onayına gider.'] },
    },
  },
  {
    slug: 'approvals',
    group: 'daily',
    panel: { path: '/waiting', spot: 'waiting-approve' },
    text: {
      en: { title: 'Approve finished work', summary: 'Tasks with sign-off wait for you before they count as done.', steps: ['Open Waiting for me.', 'Each row shows who finished what; open it to see comments and checklist.', 'Approve, or reject with a reason; the employee sees your answer in the app.'] },
      az: { title: 'Bitmiş işi təsdiqləyin', summary: 'Təsdiq tələb edən tapşırıqlar bitmiş sayılmazdan əvvəl sizi gözləyir.', steps: ['Məni gözləyənlər səhifəsini açın.', 'Hər sətirdə kimin nəyi bitirdiyi görünür; şərhlərə və yoxlama siyahısına baxmaq üçün açın.', 'Təsdiqləyin və ya səbəb yazaraq geri qaytarın; işçi cavabı tətbiqdə görür.'] },
      ru: { title: 'Подтверждайте выполненную работу', summary: 'Задачи с подтверждением ждут вас, прежде чем считаться выполненными.', steps: ['Откройте Ждут меня.', 'В каждой строке видно, кто что завершил; откройте, чтобы посмотреть комментарии и чек-лист.', 'Подтвердите или верните с причиной; сотрудник увидит ответ в приложении.'] },
      tr: { title: 'Biten işi onaylayın', summary: 'Onay gerektiren görevler bitmiş sayılmadan önce sizi bekler.', steps: ['Beni bekleyenler sayfasını açın.', 'Her satırda kimin neyi bitirdiği görünür; yorumları ve kontrol listesini görmek için açın.', 'Onaylayın veya gerekçeyle geri gönderin; çalışan cevabı uygulamada görür.'] },
    },
  },
  {
    slug: 'risk-signals',
    group: 'daily',
    panel: { path: '/tasks?filter=risk', spot: 'task-row' },
    text: {
      en: { title: 'Spot tasks at risk before they are late', summary: 'The Risky filter shows tasks due in the next two days that are likely to slip.', steps: ['On Tasks choose the Risky filter.', 'A task is flagged when the person has a very full week, often finished late recently, or has not started the checklist.', 'Open the task to see the reason and move the date or reassign it.'] },
      az: { title: 'Gecikəcək tapşırıqları əvvəlcədən görün', summary: '"Riskli" filtri növbəti iki gündə bitməli olan və gecikə biləcək tapşırıqları göstərir.', steps: ['Tapşırıqlar səhifəsində Riskli filtrini seçin.', 'İşçinin həftəsi çox doludursa, son vaxtlar tez-tez gecikibsə və ya yoxlama siyahısına başlamayıbsa, tapşırıq işarələnir.', 'Tapşırığı açıb səbəbə baxın, tarixi dəyişin və ya başqasına verin.'] },
      ru: { title: 'Замечайте рискованные задачи до просрочки', summary: 'Фильтр «Риск» показывает задачи на ближайшие два дня, которые могут не успеть.', steps: ['На странице Задачи выберите фильтр Риск.', 'Задача отмечается, если у человека перегружена неделя, он часто опаздывал в последнее время или не начал чек-лист.', 'Откройте задачу, посмотрите причину и перенесите срок или переназначьте.'] },
      tr: { title: 'Gecikecek görevleri önceden görün', summary: 'Riskli filtresi önümüzdeki iki gün içinde bitmesi gereken ve gecikebilecek görevleri gösterir.', steps: ['Görevler sayfasında Riskli filtresini seçin.', 'Kişinin haftası çok doluysa, son zamanlarda sık geciktiyse veya kontrol listesine başlamadıysa görev işaretlenir.', 'Görevi açıp nedenine bakın, tarihi değiştirin veya başkasına verin.'] },
    },
  },
  {
    slug: 'announcements',
    group: 'daily',
    panel: { path: '/announcements', spot: 'ann-new' },
    text: {
      en: { title: 'Send an announcement to everyone', summary: 'One message to the whole company, read on the phone.', steps: ['Open Announcements and press New.', 'Write a title and text; pin it if it should stay on top.', 'Everyone sees it in the app.'] },
      az: { title: 'Hamıya elan göndərin', summary: 'Bütün şirkətə bir mesaj, telefonda oxunur.', steps: ['Elanlar səhifəsini açın və Yeni basın.', 'Başlıq və mətn yazın; yuxarıda qalmalıdırsa, sancın.', 'Hamı onu tətbiqdə görür.'] },
      ru: { title: 'Отправьте объявление всем', summary: 'Одно сообщение на всю компанию, читается в телефоне.', steps: ['Откройте Объявления и нажмите Новое.', 'Напишите заголовок и текст; закрепите, если оно должно быть наверху.', 'Все увидят его в приложении.'] },
      tr: { title: 'Herkese duyuru gönderin', summary: 'Tüm şirkete tek mesaj, telefonda okunur.', steps: ['Duyurular\'ı açın ve Yeni\'ye basın.', 'Başlık ve metin yazın; üstte kalması gerekiyorsa sabitleyin.', 'Herkes uygulamada görür.'] },
    },
  },
  {
    slug: 'custom-fields',
    group: 'manage',
    panel: { path: '/settings', spot: 'custom-fields' },
    text: {
      en: { title: 'Add your own task fields', summary: 'Track what matters to you on every task: client, budget, order number…', steps: ['Open Settings → Custom fields.', 'Add a field: text, number, date, list or checkbox (up to 20).', 'The field appears on every task; managers and the assignee can fill it.'] },
      az: { title: 'Tapşırığa öz sahələrinizi əlavə edin', summary: 'Hər tapşırıqda sizin üçün vacib olanı izləyin: müştəri, büdcə, sifariş nömrəsi…', steps: ['Ayarlar → Xüsusi sahələr bölməsini açın.', 'Sahə əlavə edin: mətn, rəqəm, tarix, siyahı və ya qeyd qutusu (20-yə qədər).', 'Sahə hər tapşırıqda görünür; menecerlər və icraçı doldura bilir.'] },
      ru: { title: 'Добавьте свои поля в задачи', summary: 'Отслеживайте в каждой задаче то, что важно вам: клиент, бюджет, номер заказа…', steps: ['Откройте Настройки → Свои поля.', 'Добавьте поле: текст, число, дата, список или флажок (до 20).', 'Поле появится в каждой задаче; его заполняют руководители и исполнитель.'] },
      tr: { title: 'Görevlere kendi alanlarınızı ekleyin', summary: 'Her görevde sizin için önemli olanı izleyin: müşteri, bütçe, sipariş numarası…', steps: ['Ayarlar → Özel alanlar\'ı açın.', 'Alan ekleyin: metin, sayı, tarih, liste veya onay kutusu (20\'ye kadar).', 'Alan her görevde görünür; yöneticiler ve atanan kişi doldurabilir.'] },
    },
  },
  {
    slug: 'escalation',
    group: 'manage',
    panel: { path: '/settings', spot: 'escalation' },
    text: {
      en: { title: 'Escalate overdue work automatically', summary: 'Decide who hears about a task that stays late, and when.', steps: ['Open Settings and find Escalation.', 'Turn on automatic escalation.', 'Choose after how many days a late task reaches the manager, then you. The employee is reminded first.'] },
      az: { title: 'Gecikən işi avtomatik yuxarı ötürün', summary: 'Gecikən tapşırıqdan kimin və nə vaxt xəbər tutacağını seçin.', steps: ['Ayarlar səhifəsini açın və Eskalasiya bölməsini tapın.', 'Avtomatik eskalasiyanı aktiv edin.', 'Gecikən tapşırığın neçə gündən sonra menecerə, sonra sizə çatacağını seçin. Əvvəlcə işçiyə xatırladılır.'] },
      ru: { title: 'Автоматически эскалируйте просрочки', summary: 'Решите, кто и когда узнаёт о задаче, которая задерживается.', steps: ['Откройте Настройки и найдите Эскалация.', 'Включите автоматическую эскалацию.', 'Выберите, через сколько дней просроченная задача дойдёт до руководителя, а затем до вас. Сначала напоминание получает сотрудник.'] },
      tr: { title: 'Geciken işi otomatik olarak üste iletin', summary: 'Geciken bir görevden kimin ve ne zaman haberdar olacağını seçin.', steps: ['Ayarlar\'ı açın ve Eskalasyon bölümünü bulun.', 'Otomatik eskalasyonu açın.', 'Geciken görevin kaç gün sonra yöneticiye, sonra size ulaşacağını seçin. Önce çalışana hatırlatılır.'] },
    },
  },
  {
    slug: 'export-data',
    group: 'manage',
    panel: { path: '/settings', spot: 'export' },
    text: {
      en: { title: 'Export your data', summary: 'Download all tasks as CSV whenever you want; the data is yours.', steps: ['Open Settings and press Export all data (CSV).', 'The team list has its own Export CSV button on the Team page.', 'Open the files in Excel or Google Sheets.'] },
      az: { title: 'Məlumatlarınızı ixrac edin', summary: 'Bütün tapşırıqları istədiyiniz vaxt CSV kimi yükləyin; məlumat sizindir.', steps: ['Ayarlar səhifəsində Bütün məlumatı ixrac et (CSV) düyməsini basın.', 'İşçi siyahısının öz CSV ixrac düyməsi Komanda səhifəsindədir.', 'Faylları Excel və ya Google Sheets-də açın.'] },
      ru: { title: 'Экспортируйте данные', summary: 'Скачивайте все задачи в CSV когда угодно; данные принадлежат вам.', steps: ['В Настройках нажмите Экспорт всех данных (CSV).', 'Для списка сотрудников есть своя кнопка экспорта CSV на странице Команда.', 'Откройте файлы в Excel или Google Sheets.'] },
      tr: { title: 'Verilerinizi dışa aktarın', summary: 'Tüm görevleri istediğiniz zaman CSV olarak indirin; veriler sizindir.', steps: ['Ayarlar\'da Tüm verileri dışa aktar (CSV) düğmesine basın.', 'Çalışan listesinin kendi CSV dışa aktarma düğmesi Ekip sayfasındadır.', 'Dosyaları Excel veya Google Sheets\'te açın.'] },
    },
  },
  {
    slug: 'choose-plan',
    group: 'manage',
    panel: { path: '/billing', spot: 'plan-fit' },
    text: {
      en: { title: 'Choose a plan after the trial', summary: 'The plan that fits your team size is highlighted for you.', steps: ['Open Billing.', 'The plan that fits your number of people is framed.', 'Pay by card or request an invoice; your data stays as it is.'] },
      az: { title: 'Sınaqdan sonra plan seçin', summary: 'Komandanızın sayına uyğun plan sizin üçün işarələnir.', steps: ['Ödəniş səhifəsini açın.', 'İşçi sayınıza uyğun plan çərçivə ilə göstərilir.', 'Kartla ödəyin və ya hesab-faktura istəyin; məlumatlarınız olduğu kimi qalır.'] },
      ru: { title: 'Выберите тариф после пробного периода', summary: 'Тариф под размер вашей команды выделен для вас.', steps: ['Откройте Оплата.', 'Тариф, подходящий под число людей, выделен рамкой.', 'Оплатите картой или запросите счёт; данные остаются как есть.'] },
      tr: { title: 'Deneme sonrası plan seçin', summary: 'Ekip büyüklüğünüze uyan plan sizin için işaretlenir.', steps: ['Ödeme sayfasını açın.', 'Kişi sayınıza uyan plan çerçeveyle gösterilir.', 'Kartla ödeyin veya fatura isteyin; verileriniz olduğu gibi kalır.'] },
    },
  },
]
