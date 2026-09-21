export type Lang = 'vi' | 'en' | 'zh'
export const LANGS: { id: Lang; short: string; name: string }[] = [
  { id: 'vi', short: 'VI', name: 'Tiếng Việt' },
  { id: 'en', short: 'EN', name: 'English' },
  { id: 'zh', short: '中', name: '中文' },
]

export const EMAIL = 'keobong975110@gmail.com'
export const APPSTORE = 'https://apps.apple.com/vn/developer/vuong-hy-khang/id1777953383'
export const PLAYSTORE = 'https://play.google.com/store/apps/developer?id=WangXiKang'
export const GITHUB = 'https://github.com/kanglee079'

/* ---------- phần không phụ thuộc ngôn ngữ ---------- */
export interface Meta { id: string; year: string; panel: string; ink: string; icon?: string; shots?: string[]; href?: string }
export const meta: Meta[] = [
  { id: 'tieu', year: '2026', panel: '#0F6E6A', ink: '#F2F7F4', icon: 'assets/icon-hoctiengtieu.png', href: 'https://apps.apple.com/vn/app/id6803075590',
    shots: ['assets/shot-hoctiengtieu-1.jpg', 'assets/shot-hoctiengtieu-2.jpg', 'assets/shot-hoctiengtieu-3.jpg', 'assets/shot-hoctiengtieu-4.jpg'] },
  { id: 'meal', year: '2025', panel: '#E9E2D0', ink: '#1C2B22', icon: 'assets/icon-smartmeal.png', href: 'https://apps.apple.com/vn/app/id6741747881',
    shots: ['assets/shot-smartmeal-4.jpg', 'assets/shot-smartmeal-1.jpg', 'assets/shot-smartmeal-3.jpg', 'assets/shot-smartmeal-2.jpg'] },
  { id: 'drop', year: '2026', panel: '#EAE1D8', ink: '#2B1712', icon: 'assets/icon-donedrop.png', href: 'https://play.google.com/store/apps/details?id=com.donedrop.app',
    shots: ['assets/shot-donedrop-1.jpg', 'assets/shot-donedrop-2.jpg', 'assets/shot-donedrop-3.jpg'] },
  { id: 'pea', year: '2026', panel: '#DDEFD6', ink: '#14301A', icon: 'assets/icon-peapod.jpg',
    shots: ['assets/shot-peapod-1.jpg', 'assets/shot-peapod-2.jpg', 'assets/shot-peapod-3.jpg'] },
  { id: 'nuni', year: '2026', panel: '#1B2A44', ink: '#EEF2FA' },
  { id: 'crab', year: '2024', panel: '#7A2E1F', ink: '#FBEFEA' },
]

/* ---------- phần theo ngôn ngữ ---------- */
export interface PText { name: string; kind: string; lead: string; body: string[]; facts: [string, string][]; features?: { title: string; text: string }[]; linkLabel?: string }
export interface Content {
  nav: { work: string; about: string; contact: string; menu: string }
  hero: { lines: string[]; sub: string; place: string; sr: string }
  intro: { label: string; text: string }
  work: { label: string; view: string; more: string; next: string; close: string }
  archive: { label: string; note: string; rows: [string, string, string, string][] }
  about: { label: string; lines: string[]; paras: string[]; journey: [string, string][] }
  footer: { lines: string[]; write: string; copied: string; version: string; time: string; storeName: string }
  projects: Record<string, PText>
}

const archiveStack = ['Flutter · Node', 'Flutter · Go', 'Tauri · React · Python', 'Flutter', 'Flutter', 'Flutter · Firebase', 'Docs', 'Flutter · Node · PHP']
const archiveYears = ['2026', '2026', '2026', '2026', '2026', '2025', '2025', '2023–24']
const rows = (names: string[], notes: string[]): [string, string, string, string][] => names.map((n, i) => [archiveYears[i], n, notes[i], archiveStack[i]])

export const content: Record<Lang, Content> = {
  /* ================================================================ VI */
  vi: {
    nav: { work: 'Dự án', about: 'Về tôi', contact: 'Liên hệ', menu: 'Menu' },
    hero: {
      lines: ['Tôi làm app,', 'từ *ý tưởng* cho tới', 'lúc nó lên store.'],
      sub: 'Lập trình viên Flutter và iOS. Hai app trên App Store, một app trên Google Play, vài app nữa đang trên đường tới.',
      place: 'Đang làm việc tại Đà Nẵng',
      sr: 'Vương Hỷ Khang — lập trình viên ứng dụng độc lập',
    },
    intro: {
      label: 'Đôi lời',
      text: 'Tôi bắt đầu viết code từ năm 2022 và gần như chưa nghỉ ngày nào. Tôi thích làm trọn một sản phẩm: tự nghĩ, tự thiết kế, tự viết app lẫn backend, tự đưa lên store rồi tự ngồi trả lời email người dùng. Làm một mình thì chậm, nhưng hiểu được mọi ngóc ngách của thứ mình làm ra.',
    },
    work: { label: 'Dự án chọn lọc', view: 'Xem', more: 'Đọc thêm về dự án', next: 'Dự án tiếp theo', close: 'Đóng' },
    archive: {
      label: 'Còn lại',
      note: 'Những thứ nhỏ hơn, làm cho khách, hoặc làm chỉ vì tò mò. Vài dự án riêng tư tôi không kể ở đây.',
      rows: rows(
        ['Tấm Shop', 'HanziFlow', 'ChannelForge Studio', 'Tử Vi AI', 'Zombie LifeSim', 'Whispeer', 'Flutter Setup Guide', 'Hơn hai mươi app tập luyện'],
        ['Quản lý cho thuê, thanh toán Pay2S', 'Học tiếng Trung, kho âm thanh gần 10.000 từ', 'Công cụ desktop vận hành kênh YouTube', 'Lập và luận lá số', 'Game mô phỏng sinh tồn, thử sức với game loop', 'Nhắn tin thời gian thực', 'Ghi chép cài đặt cho người mới', 'Đọc sách, thời tiết, tin tức, rạp phim, todo…'],
      ),
    },
    about: {
      label: 'Về tôi',
      lines: ['Chậm mà chắc,', 'như *cây lớn*', 'từng vòng gỗ.'],
      paras: [
        'Tôi chủ yếu viết Flutter, gần đây thêm Swift khi cần đụng sâu vào iOS. Phía sau thường là Go hoặc Node, dữ liệu nằm ở Postgres, SQLite hay Firebase tuỳ bài toán. Web thì Next.js.',
        'Thứ tôi giỏi nhất có lẽ là đưa một sản phẩm đi hết đường: qua được khâu kiểm duyệt của Apple và Google, xử lý thanh toán trong app, chứng chỉ, chính sách, ảnh chụp màn hình — những việc không ai thích làm nhưng thiếu thì app không bao giờ ra đời.',
      ],
      journey: [
        ['2022', 'Viết những dòng code đầu tiên. Chưa biết mình sẽ đi xa đến đâu.'],
        ['2023', 'Gặp Flutter và ở lại. Làm liên tục các app nhỏ để học — phần lớn vẫn nằm trên GitHub.'],
        ['2024', 'Sổ thu mua cua đi vào vận hành. Lần đầu tiên phần mềm của tôi có người dùng hằng ngày.'],
        ['2025', 'SmartMeal AI được Apple duyệt. App đầu tiên mang tên tôi trên App Store.'],
        ['2026', 'Phát hành Học Tiếng Tiều và DoneDrop. Bắt đầu viết Swift native với Peapod.'],
        ['2028', 'Dự định mở một studio nhỏ làm app và game ở TP.HCM.'],
      ],
    },
    footer: { lines: ['Mình cùng', 'làm *gì đó* nhé'], write: 'Viết cho tôi', copied: 'Đã chép địa chỉ email', version: 'Phiên bản', time: 'Giờ ở Việt Nam', storeName: 'Tên trên App Store' },
    projects: {
      tieu: {
        name: 'Học Tiếng Tiều', kind: 'App Store', linkLabel: 'Xem trên App Store',
        lead: 'App học tiếng Triều Châu cho người Việt. Tôi làm nó vì gần như không tìm được tài liệu học tiếng Tiều nào viết bằng tiếng Việt.',
        body: [
          'Phần khó nhất không nằm ở code mà ở dữ liệu. Tiếng Tiều hầu như không có nguồn nào chuẩn hoá sẵn, nên tôi phải tự gom từng mục từ, đối chiếu phiên âm Peng\'im và ghép với giọng đọc bản xứ. Đến giờ kho dữ liệu có khoảng 6.000 mục từ và 4.600 bản ghi âm.',
          'App chạy được hoàn toàn khi không có mạng. Dữ liệu nằm trong SQLCipher, file âm thanh được mã hoá riêng — công sức thu thập quá lớn để ai đó chép đi trong một buổi chiều. Lịch ôn tập dùng thuật toán SM-2, có thêm widget ngoài màn hình chính để mỗi ngày nhìn thấy một câu.',
          'Người dùng có thể báo lỗi, góp cách đọc ở vùng của họ. Mọi đóng góp đi qua một trang quản trị tôi viết riêng trước khi vào app.',
        ],
        facts: [['Vai trò', 'Một mình — dữ liệu, thiết kế, app, backend, phát hành'], ['Nền tảng', 'iOS'], ['Công nghệ', 'Flutter, SQLCipher, Supabase, Python'], ['Phiên bản', '1.2.0 · 5,0 sao trên App Store']],
        features: [
          { title: 'Mỗi ngày một bài ngắn', text: 'Mở app là thấy ngay bài tiếp theo và một câu nói thường ngày, có chữ Hán, phiên âm và giọng đọc. Năm phút là xong.' },
          { title: '471 bài, chia năm cấp', text: 'Lộ trình đi từ chào hỏi, số đếm, gia đình rồi mới tới hội thoại dài.' },
          { title: 'Từ điển hai chiều', text: 'Gõ tiếng Việt ra tiếng Tiều và ngược lại. Có cả bộ thành ngữ, họ người Tiều, món ăn Triều Châu, và những từ tiếng Việt miền Tây mượn từ tiếng Tiều.' },
          { title: 'Tám thanh điệu, nghe là hiểu', text: 'Mỗi mục từ có giọng người bản xứ, chú thích thanh điệu và cách biến điệu khi đứng trong câu — thứ mà sách vở thường bỏ qua.' },
        ],
      },
      meal: {
        name: 'SmartMeal AI', kind: 'App Store', linkLabel: 'Xem trên App Store',
        lead: 'Chọn những thứ đang có trong bếp, app gợi ý món nấu được ngay. Đây là app đầu tiên tôi đưa lên App Store.',
        body: [
          'Từ bản 2.0 tôi đổi hướng sang offline trước: một thư viện công thức nằm sẵn trong máy lo phần lớn công việc, nên app vẫn dùng tốt khi không có mạng. AI chỉ còn là lớp tuỳ chọn cho ai cần thêm.',
          'Tôi cũng bỏ SDK thanh toán bên thứ ba và tự viết lại bằng StoreKit 2, phần xác thực biên nhận chạy trên Cloudflare Workers. Tốn công hơn, nhưng đổi lại tôi hiểu rõ từng giao dịch đi qua hệ thống của mình.',
        ],
        facts: [['Vai trò', 'Một mình — sản phẩm, app, backend, thanh toán'], ['Nền tảng', 'iOS'], ['Công nghệ', 'Flutter, StoreKit 2, Cloudflare Workers, D1'], ['Phiên bản', '2.1 · 5,0 sao trên App Store']],
        features: [
          { title: 'Bắt đầu từ thứ đang có', text: 'Chạm vào trứng, đậu hũ, cơm nguội — app đưa ra món làm được trong ba mươi phút, kèm từng bước nấu.' },
          { title: 'Lưu lại món đã ưng', text: 'Công thức, kế hoạch tuần và lịch sử nấu nướng nằm chung một chỗ, không cần tài khoản, không cần mạng.' },
          { title: 'Danh sách đi chợ tự gộp', text: 'Lên kế hoạch cả tuần xong, app gom nguyên liệu theo quầy hàng và ước tính luôn số tiền.' },
          { title: 'Cả nhà dùng chung', text: 'Tối đa mười hai hồ sơ thành viên, mỗi người một khẩu vị và chế độ ăn. Tủ bếp dùng chung để biết thứ gì sắp hết.' },
        ],
      },
      drop: {
        name: 'DoneDrop', kind: 'Google Play', linkLabel: 'Xem trên Google Play',
        lead: 'App theo dõi thói quen, nhưng mỗi lần hoàn thành bạn phải chụp một tấm ảnh làm chứng và gửi cho người đồng hành.',
        body: [
          'Đánh dấu "đã xong" thì dễ tự dối mình, còn gửi ảnh cho một người bạn thì không. Ảnh chỉ chia sẻ riêng tư trong nhóm nhỏ, không có bảng tin công khai.',
          'App viết một lần cho cả Android, iOS và macOS, có widget ngoài màn hình chính và phần xử lý ảnh chạy trên một backend Python riêng. Bản Android đã có trên Google Play, bản iOS đang chuẩn bị.',
        ],
        facts: [['Vai trò', 'Một mình — sản phẩm, app, media backend'], ['Nền tảng', 'Android · iOS đang chuẩn bị'], ['Công nghệ', 'Flutter, Firebase, Fastlane, Python'], ['Trạng thái', 'Đã phát hành trên Google Play']],
      },
      pea: {
        name: 'Peapod', kind: 'Sắp phát hành',
        lead: 'Đặt giờ tập trung, điện thoại khoá các app gây xao nhãng, và một hạt đậu nhỏ lớn dần theo số phút bạn giữ được.',
        body: [
          'Khác với các app trước, Peapod viết hoàn toàn bằng SwiftUI thay vì Flutter. Lý do đơn giản: Screen Time API chỉ dùng được từ native, và phải chia thành bốn app extension chạy riêng mới chặn được app khác.',
          'Backend là một service Go rất nhỏ. Phần tốn thời gian nhất lại là vòng lặp nuôi đậu — làm sao để người ta muốn quay lại mà không thấy bị ép. App đang chờ Apple duyệt quyền Family Controls.',
        ],
        facts: [['Vai trò', 'Một mình — iOS native, backend, game design'], ['Nền tảng', 'iOS'], ['Công nghệ', 'SwiftUI, FamilyControls, DeviceActivity, Go'], ['Trạng thái', 'Chờ Apple duyệt entitlement']],
      },
      nuni: {
        name: 'Nuni HSK', kind: 'Web & mobile',
        lead: 'Nền tảng luyện thi HSK gồm web, app di động và backend viết bằng Go.',
        body: [
          'Dự án dài hơi nhất của tôi tính tới giờ. Tôi dựng một design system riêng trước khi viết màn hình đầu tiên, để web và app dùng chung một bộ quy tắc.',
          'Phần tôi tâm đắc là đồng bộ tiến độ giữa các thiết bị: làm bài dở trên điện thoại, mở máy tính ra làm tiếp, không mất câu nào kể cả khi rớt mạng giữa chừng.',
        ],
        facts: [['Vai trò', 'Full-stack'], ['Nền tảng', 'Web, iOS, Android'], ['Công nghệ', 'Next.js, TypeScript, Flutter, Go, PostgreSQL'], ['Trạng thái', 'Đang phát triển']],
      },
      crab: {
        name: 'Sổ thu mua cua', kind: 'Doanh nghiệp',
        lead: 'Phần mềm cho một cơ sở thu mua cua: cân, tính tiền, in phiếu ngay tại chỗ. Sản phẩm đầu tiên của tôi được dùng trong công việc hằng ngày.',
        body: [
          'Hệ thống gồm một app cho người đứng cân, một app quản trị để xem sổ sách và chỉnh bảng giá, cùng một backend ở giữa. Phiếu in ra từ máy in nhiệt.',
          'Làm phần mềm cho người không ngồi bàn giấy dạy tôi nhiều điều: thao tác phải thật ít, chữ phải thật to, và dữ liệu thì không được phép mất — nên tôi làm thêm phần sao lưu theo từng phần cho những bộ dữ liệu lớn.',
        ],
        facts: [['Vai trò', 'Full-stack — hai app và backend'], ['Nền tảng', 'Android, iOS'], ['Công nghệ', 'Flutter, Node.js, MongoDB'], ['Trạng thái', 'Vận hành từ 2024']],
      },
    },
  },

  /* ================================================================ EN */
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact', menu: 'Menu' },
    hero: {
      lines: ['I build apps,', 'from a rough *idea*', 'to the store shelf.'],
      sub: 'Flutter and iOS developer. Two apps on the App Store, one on Google Play, and a few more on the way.',
      place: 'Currently working in Da Nang',
      sr: 'Vuong Hy Khang — independent app developer',
    },
    intro: {
      label: 'A few words',
      text: 'I wrote my first line of code in 2022 and have barely taken a day off since. I like owning a product end to end: the idea, the design, the app, the backend, the store listing, and the support inbox afterwards. Working alone is slow, but I get to know every corner of what I make.',
    },
    work: { label: 'Selected work', view: 'View', more: 'Read the full story', next: 'Next project', close: 'Close' },
    archive: {
      label: 'Everything else',
      note: 'Smaller things, client work, or things I built out of curiosity. A few private projects are left out.',
      rows: rows(
        ['Tam Shop', 'HanziFlow', 'ChannelForge Studio', 'Tu Vi AI', 'Zombie LifeSim', 'Whispeer', 'Flutter Setup Guide', 'Twenty-odd practice apps'],
        ['Rental management with Pay2S payments', 'Chinese learning, audio for nearly 10,000 words', 'Desktop tool for running a YouTube channel', 'Vietnamese astrology charts, read by AI', 'Survival sim — my first go at a game loop', 'Real-time messaging', 'Setup notes for newcomers', 'Books, weather, news, cinema, todos…'],
      ),
    },
    about: {
      label: 'About',
      lines: ['Slow and steady,', 'like a *tree* adding', 'one ring a year.'],
      paras: [
        'Most of what I write is Flutter, with Swift when I need to go deep into iOS. Behind it there is usually Go or Node, with Postgres, SQLite or Firebase depending on the job. On the web I use Next.js.',
        'What I am probably best at is getting a product all the way out the door: app review at Apple and Google, in-app payments, certificates, policies, screenshots — the work nobody enjoys, and without which no app ever ships.',
      ],
      journey: [
        ['2022', 'First lines of code. No idea yet how far this would go.'],
        ['2023', 'Found Flutter and stayed. Built small apps non-stop to learn — most are still on GitHub.'],
        ['2024', 'The crab ledger went into daily use. My first software with people relying on it.'],
        ['2025', 'SmartMeal AI approved by Apple. My first app on the App Store under my own name.'],
        ['2026', 'Shipped Learn Teochew and DoneDrop. Started writing native Swift for Peapod.'],
        ['2028', 'The plan: a small app and game studio in Ho Chi Minh City.'],
      ],
    },
    footer: { lines: ["Let's make", '*something* together'], write: 'Write to me', copied: 'Email address copied', version: 'Version', time: 'Local time', storeName: 'App Store name' },
    projects: {
      tieu: {
        name: 'Learn Teochew', kind: 'App Store', linkLabel: 'View on the App Store',
        lead: 'A Teochew language course for Vietnamese speakers. I built it because there was almost nothing written in Vietnamese for learning Teochew.',
        body: [
          'The hard part was never the code, it was the data. Teochew has next to no standardised sources, so I collected entries one by one, checked them against Peng\'im romanisation and paired them with native recordings. The corpus now holds about 6,000 entries and 4,600 recordings.',
          'The app works fully offline. Data lives in SQLCipher and the audio is encrypted separately — too much work went into collecting it to have it copied in an afternoon. Reviews run on the SM-2 algorithm, and a home-screen widget shows one sentence a day.',
          'Learners can report mistakes and contribute the way words are said where they live. Every contribution goes through an admin console I wrote before it reaches the app.',
        ],
        facts: [['Role', 'Solo — data, design, app, backend, release'], ['Platform', 'iOS'], ['Stack', 'Flutter, SQLCipher, Supabase, Python'], ['Version', '1.2.0 · 5.0 stars on the App Store']],
        features: [
          { title: 'One short lesson a day', text: 'Open the app and the next lesson is right there, with an everyday sentence in characters, romanisation and audio. Five minutes and you are done.' },
          { title: '471 lessons, five levels', text: 'The path goes from greetings, numbers and family before it gets to longer conversations.' },
          { title: 'A two-way dictionary', text: 'Vietnamese to Teochew and back. It also covers idioms, Teochew surnames, Teochew food, and the southern Vietnamese words borrowed from Teochew.' },
          { title: 'Eight tones you can hear', text: 'Every entry has a native recording, tone marks, and the tone changes that happen inside a sentence — the part textbooks tend to skip.' },
        ],
      },
      meal: {
        name: 'SmartMeal AI', kind: 'App Store', linkLabel: 'View on the App Store',
        lead: 'Pick what is already in your kitchen and the app suggests what you can cook right now. This was my first app on the App Store.',
        body: [
          'From version 2.0 I went offline-first: a recipe library on the device does most of the work, so the app stays useful without a connection. AI became an optional layer for people who want more.',
          'I also dropped the third-party payment SDK and rewrote purchases on StoreKit 2, with receipt verification running on Cloudflare Workers. More effort, but now I understand every transaction that passes through my system.',
        ],
        facts: [['Role', 'Solo — product, app, backend, payments'], ['Platform', 'iOS'], ['Stack', 'Flutter, StoreKit 2, Cloudflare Workers, D1'], ['Version', '2.1 · 5.0 stars on the App Store']],
        features: [
          { title: 'Start with what you have', text: 'Tap eggs, tofu, leftover rice — the app comes back with dishes you can make in thirty minutes, step by step.' },
          { title: 'Keep what you liked', text: 'Recipes, weekly plans and cooking history live in one place. No account, no connection needed.' },
          { title: 'A grocery list that merges itself', text: 'Plan the week and the app groups ingredients by aisle and estimates the bill.' },
          { title: 'Shared by the household', text: 'Up to twelve member profiles, each with their own taste and diet. A shared pantry shows what is running low.' },
        ],
      },
      drop: {
        name: 'DoneDrop', kind: 'Google Play', linkLabel: 'View on Google Play',
        lead: 'A habit tracker with a catch: each time you finish, you take a photo as proof and send it to your accountability partner.',
        body: [
          'Ticking a box makes it easy to lie to yourself. Sending a photo to a friend does not. Photos are shared privately within a small circle; there is no public feed.',
          'One codebase covers Android, iOS and macOS, with a home-screen widget and image processing on a separate Python backend. The Android version is live on Google Play; iOS is being prepared.',
        ],
        facts: [['Role', 'Solo — product, app, media backend'], ['Platform', 'Android · iOS in preparation'], ['Stack', 'Flutter, Firebase, Fastlane, Python'], ['Status', 'Live on Google Play']],
      },
      pea: {
        name: 'Peapod', kind: 'Coming soon',
        lead: 'Set a focus timer, the phone locks the apps that distract you, and a little bean grows with every minute you hold on.',
        body: [
          'Unlike my earlier apps, Peapod is written entirely in SwiftUI rather than Flutter. The reason is simple: the Screen Time API is native-only, and blocking other apps takes four separate app extensions.',
          'The backend is a very small Go service. What took the longest was the bean itself — making people want to come back without feeling pushed. The app is waiting for Apple to grant the Family Controls entitlement.',
        ],
        facts: [['Role', 'Solo — native iOS, backend, game design'], ['Platform', 'iOS'], ['Stack', 'SwiftUI, FamilyControls, DeviceActivity, Go'], ['Status', 'Awaiting entitlement from Apple']],
      },
      nuni: {
        name: 'Nuni HSK', kind: 'Web & mobile',
        lead: 'An HSK exam-prep platform: a web app, a mobile app and a backend written in Go.',
        body: [
          'My longest-running project so far. I built a design system before the first screen, so web and mobile follow one set of rules.',
          'The part I am proudest of is progress sync across devices: start a test on the phone, continue on the laptop, and lose nothing even if the connection drops halfway.',
        ],
        facts: [['Role', 'Full-stack'], ['Platform', 'Web, iOS, Android'], ['Stack', 'Next.js, TypeScript, Flutter, Go, PostgreSQL'], ['Status', 'In development']],
      },
      crab: {
        name: 'Crab Trading Ledger', kind: 'Client work',
        lead: 'Software for a crab wholesaler: weigh, price and print the receipt on the spot. My first product used in day-to-day work.',
        body: [
          'There is an app for the person at the scale, an admin app for the books and the price table, and a backend in between. Receipts come out of a thermal printer.',
          'Building for people who do not sit at desks taught me a lot: as few taps as possible, big type, and data that must never be lost — so I added chunked backups for the larger datasets.',
        ],
        facts: [['Role', 'Full-stack — two apps and a backend'], ['Platform', 'Android, iOS'], ['Stack', 'Flutter, Node.js, MongoDB'], ['Status', 'In use since 2024']],
      },
    },
  },

  /* ================================================================ ZH */
  zh: {
    nav: { work: '作品', about: '关于', contact: '联系', menu: '菜单' },
    hero: {
      lines: ['我做应用，', '从一个*想法*开始，', '一直做到上架。'],
      sub: 'Flutter 与 iOS 开发者。两款应用已上架 App Store，一款上架 Google Play，还有几款正在路上。',
      place: '目前在岘港工作',
      sr: 'Vương Hỷ Khang — 独立应用开发者',
    },
    intro: {
      label: '几句话',
      text: '我从 2022 年开始写代码，几乎没有停过一天。我喜欢把一个产品从头做到尾：自己想，自己设计，自己写应用和后端，自己上架，再自己回复用户的邮件。一个人做会慢一些，但自己做出来的东西，每个角落我都清楚。',
    },
    work: { label: '精选作品', view: '查看', more: '阅读完整介绍', next: '下一个项目', close: '关闭' },
    archive: {
      label: '其他',
      note: '一些更小的东西：客户项目，或者纯粹出于好奇做的。还有几个私有项目，这里就不提了。',
      rows: rows(
        ['Tấm Shop', 'HanziFlow', 'ChannelForge Studio', '紫微 AI', 'Zombie LifeSim', 'Whispeer', 'Flutter 安装指南', '二十多个练手应用'],
        ['租赁管理，接入 Pay2S 支付', '中文学习，近一万词的语音库', '运营 YouTube 频道的桌面工具', '排盘与解读', '生存模拟游戏，第一次尝试 game loop', '实时聊天', '写给新手的环境配置笔记', '读书、天气、新闻、影院、待办……'],
      ),
    },
    about: {
      label: '关于我',
      lines: ['慢一点，稳一点，', '像*树*一样，', '一年长一圈。'],
      paras: [
        '我主要写 Flutter，需要深入 iOS 的时候用 Swift。后端一般是 Go 或 Node，数据按需求放在 Postgres、SQLite 或 Firebase。网页端用 Next.js。',
        '我最擅长的，大概是把一个产品真正送出门：通过 Apple 和 Google 的审核、应用内支付、证书、隐私政策、商店截图——这些没人喜欢做的事，少了任何一件，应用都上不了架。',
      ],
      journey: [
        ['2022', '写下第一行代码。那时还不知道会走多远。'],
        ['2023', '遇到 Flutter，就留了下来。为了学习不停地做小应用，大部分还放在 GitHub 上。'],
        ['2024', '螃蟹收购账本投入使用。第一次有人每天依赖我写的软件。'],
        ['2025', 'SmartMeal AI 通过 Apple 审核。第一款署我名字的 App Store 应用。'],
        ['2026', '发布「学潮州话」和 DoneDrop。开始用原生 Swift 写 Peapod。'],
        ['2028', '计划在胡志明市开一间小工作室，做应用和游戏。'],
      ],
    },
    footer: { lines: ['一起做点', '*有意思*的事吧'], write: '给我写信', copied: '邮箱地址已复制', version: '版本', time: '越南时间', storeName: 'App Store 开发者名' },
    projects: {
      tieu: {
        name: '学潮州话', kind: 'App Store', linkLabel: '在 App Store 查看',
        lead: '一款为越南人做的潮州话学习应用。做它的原因很简单：几乎找不到用越南语写的潮州话教材。',
        body: [
          '最难的不是代码，而是数据。潮州话几乎没有现成的标准化资料，我只能一条一条收集词条，对照潮州话拼音（Peng\'im），再配上母语者的录音。现在词库大约有 6,000 个词条和 4,600 条录音。',
          '应用可以完全离线使用。数据存放在 SQLCipher 里，音频单独加密——这些资料花了太多功夫，不能让人一个下午就拷走。复习用的是 SM-2 算法，另外还有一个桌面小组件，每天显示一句话。',
          '用户可以报错，也可以补充自己家乡的读法。所有投稿都要先经过我自己写的管理后台，才会进入应用。',
        ],
        facts: [['角色', '独立完成——数据、设计、应用、后端、发布'], ['平台', 'iOS'], ['技术', 'Flutter, SQLCipher, Supabase, Python'], ['版本', '1.2.0 · App Store 5.0 星']],
        features: [
          { title: '每天一节短课', text: '打开应用就是下一课，还有一句日常用语，附汉字、拼音和录音。五分钟就能学完。' },
          { title: '471 课，分五级', text: '从问候、数字、家庭开始，再慢慢进入较长的对话。' },
          { title: '双向词典', text: '越南语查潮州话，也可以反过来查。还收录了成语、潮州姓氏、潮州菜，以及越南南部从潮州话借来的词。' },
          { title: '八个声调，听了就懂', text: '每个词条都有母语者录音、声调标注，以及在句子里的变调——这是课本常常略过的部分。' },
        ],
      },
      meal: {
        name: 'SmartMeal AI', kind: 'App Store', linkLabel: '在 App Store 查看',
        lead: '选出厨房里现有的食材，应用马上告诉你能做什么菜。这是我上架 App Store 的第一款应用。',
        body: [
          '从 2.0 版开始我改为离线优先：设备里自带的菜谱库承担了大部分工作，没有网络也能正常使用。AI 只是留给需要的人的可选功能。',
          '我还去掉了第三方支付 SDK，用 StoreKit 2 重写了购买流程，收据验证跑在 Cloudflare Workers 上。更费功夫，但每一笔经过我系统的交易，我都清清楚楚。',
        ],
        facts: [['角色', '独立完成——产品、应用、后端、支付'], ['平台', 'iOS'], ['技术', 'Flutter, StoreKit 2, Cloudflare Workers, D1'], ['版本', '2.1 · App Store 5.0 星']],
        features: [
          { title: '从手边的食材开始', text: '点一下鸡蛋、豆腐、剩饭——应用给出三十分钟内能做好的菜，并附上每一步做法。' },
          { title: '留下喜欢的菜', text: '菜谱、每周计划和做菜记录都在同一个地方，不需要账号，也不需要联网。' },
          { title: '自动合并的购物清单', text: '排好一周的菜单，应用会按货架把食材归类，顺便估算花费。' },
          { title: '全家一起用', text: '最多十二个家庭成员档案，各有各的口味和饮食习惯。共用的储物柜会提醒你什么快用完了。' },
        ],
      },
      drop: {
        name: 'DoneDrop', kind: 'Google Play', linkLabel: '在 Google Play 查看',
        lead: '一款习惯打卡应用，但有个条件：每次完成都要拍一张照片作证，发给你的监督伙伴。',
        body: [
          '勾一下「已完成」很容易骗自己，把照片发给朋友就没那么容易了。照片只在小圈子里私下分享，没有公开的动态。',
          '一套代码同时支持 Android、iOS 和 macOS，有桌面小组件，图片处理由单独的 Python 后端负责。Android 版已上架 Google Play，iOS 版正在准备中。',
        ],
        facts: [['角色', '独立完成——产品、应用、媒体后端'], ['平台', 'Android · iOS 准备中'], ['技术', 'Flutter, Firebase, Fastlane, Python'], ['状态', '已上架 Google Play']],
      },
      pea: {
        name: 'Peapod', kind: '即将发布',
        lead: '设定专注时间，手机锁住让你分心的应用，一颗小豆子随着你坚持的每一分钟慢慢长大。',
        body: [
          '和之前的应用不同，Peapod 完全用 SwiftUI 写，而不是 Flutter。原因很简单：Screen Time API 只能在原生环境使用，而且要拆成四个独立的 App Extension 才能屏蔽其他应用。',
          '后端是一个很小的 Go 服务。最花时间的反而是养豆子的循环——怎样让人想回来，又不觉得被逼着。应用正在等 Apple 批准 Family Controls 权限。',
        ],
        facts: [['角色', '独立完成——原生 iOS、后端、游戏设计'], ['平台', 'iOS'], ['技术', 'SwiftUI, FamilyControls, DeviceActivity, Go'], ['状态', '等待 Apple 批准权限']],
      },
      nuni: {
        name: 'Nuni HSK', kind: '网页与移动端',
        lead: 'HSK 备考平台：网页、移动应用，以及用 Go 写的后端。',
        body: [
          '这是我到目前为止做得最久的项目。在写第一个页面之前，我先搭了一套设计系统，让网页和应用遵循同一套规则。',
          '我最满意的是跨设备同步进度：手机上做到一半，打开电脑接着做，就算中途断网也不会丢一道题。',
        ],
        facts: [['角色', '全栈'], ['平台', 'Web, iOS, Android'], ['技术', 'Next.js, TypeScript, Flutter, Go, PostgreSQL'], ['状态', '开发中']],
      },
      crab: {
        name: '螃蟹收购账本', kind: '企业项目',
        lead: '给一家螃蟹收购商做的软件：称重、算钱、当场打印单据。这是我第一个被用在日常工作里的产品。',
        body: [
          '系统包括一个给称重人员用的应用、一个查看账目和调整价格表的管理应用，以及中间的后端。单据由热敏打印机打出。',
          '给不坐办公室的人做软件，让我学到很多：操作要尽量少，字要足够大，数据绝对不能丢——所以我另外做了针对大数据集的分块备份。',
        ],
        facts: [['角色', '全栈——两个应用和后端'], ['平台', 'Android, iOS'], ['技术', 'Flutter, Node.js, MongoDB'], ['状态', '2024 年起投入使用']],
      },
    },
  },
}
