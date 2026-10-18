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
export interface Meta {
  id: string; year: string; panel: string; ink: string; icon?: string; shots?: string[]; href?: string
  /** dòng trong mục "Đã phát hành": ngày lên store lần đầu (hoặc chỉ năm nếu store không công khai), bản hiện tại */
  shipped?: { date: string; version: string; store: 'App Store' | 'Google Play' }
  /** có phần giới thiệu với điện thoại ghim */
  spot?: boolean
}
export const meta: Meta[] = [
  { id: 'hiyoko', year: '2026', panel: '#FBEBD4', ink: '#3A2414', icon: 'assets/icon-hiyoko.jpg', href: 'https://apps.apple.com/vn/app/id6815570504', spot: true,
    shipped: { date: '2026-10-17', version: '2.0.3', store: 'App Store' },
    shots: ['assets/shot-hiyoko-1.jpg', 'assets/shot-hiyoko-2.jpg', 'assets/shot-hiyoko-3.jpg', 'assets/shot-hiyoko-4.jpg'] },
  { id: 'ganba', year: '2026', panel: '#1A2350', ink: '#F4F1EA', icon: 'assets/icon-ganba.jpg', href: 'https://apps.apple.com/vn/app/id6815570410', spot: true,
    shipped: { date: '2026-10-01', version: '1.1.0', store: 'App Store' },
    shots: ['assets/shot-ganba-1.jpg', 'assets/shot-ganba-2.jpg', 'assets/shot-ganba-3.jpg', 'assets/shot-ganba-4.jpg'] },
  { id: 'tieu', year: '2026', panel: '#0F6E6A', ink: '#F2F7F4', icon: 'assets/icon-hoctiengtieu.png', href: 'https://apps.apple.com/vn/app/id6803075590', spot: true,
    shipped: { date: '2026-08-22', version: '1.2.0', store: 'App Store' },
    shots: ['assets/shot-hoctiengtieu-1.jpg', 'assets/shot-hoctiengtieu-2.jpg', 'assets/shot-hoctiengtieu-3.jpg', 'assets/shot-hoctiengtieu-4.jpg'] },
  { id: 'pea', year: '2026', panel: '#DDEFD6', ink: '#14301A', icon: 'assets/icon-peapod.jpg', href: 'https://apps.apple.com/vn/app/id6814148941',
    shipped: { date: '2026-09-22', version: '1.0', store: 'App Store' },
    shots: ['assets/shot-peapod-1.jpg', 'assets/shot-peapod-2.jpg', 'assets/shot-peapod-3.jpg', 'assets/shot-peapod-4.jpg'] },
  { id: 'meal', year: '2025', panel: '#E9E2D0', ink: '#1C2B22', icon: 'assets/icon-smartmeal.png', href: 'https://apps.apple.com/vn/app/id6741747881',
    shipped: { date: '2025-02-11', version: '2.1', store: 'App Store' },
    shots: ['assets/shot-smartmeal-4.jpg', 'assets/shot-smartmeal-1.jpg', 'assets/shot-smartmeal-3.jpg', 'assets/shot-smartmeal-2.jpg'] },
  { id: 'drop', year: '2026', panel: '#EAE1D8', ink: '#2B1712', icon: 'assets/icon-donedrop.png', href: 'https://play.google.com/store/apps/details?id=com.donedrop.app',
    shipped: { date: '2026', version: '1.1.1', store: 'Google Play' },
    shots: ['assets/shot-donedrop-1.jpg', 'assets/shot-donedrop-2.jpg', 'assets/shot-donedrop-3.jpg'] },
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
  ledger: { label: string; title: string; note: string; first: string; current: string; next: string; nextItems: string[] }
  play: { label: string; title: string; note: string }
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
      sub: 'Lập trình viên Flutter và iOS. Năm app trên App Store, một app trên Google Play, vài app nữa đang trên đường tới.',
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
        'Tôi viết Flutter lâu nhất. Năm nay tôi chuyển hẳn sang Swift và SwiftUI cho các app iOS, và Jetpack Compose khi cần một bản Android riêng. Phía sau thường là Go hoặc Node, dữ liệu nằm ở Postgres, SQLite hay Firebase tuỳ bài toán. Web thì Next.js.',
        'Thứ tôi giỏi nhất có lẽ là đưa một sản phẩm đi hết đường: qua được khâu kiểm duyệt của Apple và Google, xử lý thanh toán trong app, chứng chỉ, chính sách, ảnh chụp màn hình — những việc không ai thích làm nhưng thiếu thì app không bao giờ ra đời.',
      ],
      journey: [
        ['2022', 'Viết những dòng code đầu tiên. Chưa biết mình sẽ đi xa đến đâu.'],
        ['2023', 'Gặp Flutter và ở lại. Làm liên tục các app nhỏ để học — phần lớn vẫn nằm trên GitHub.'],
        ['2024', 'Sổ thu mua cua đi vào vận hành. Lần đầu tiên phần mềm của tôi có người dùng hằng ngày.'],
        ['2025', 'SmartMeal AI được Apple duyệt. App đầu tiên mang tên tôi trên App Store.'],
        ['2026', 'Phát hành Học Tiếng Tiều, DoneDrop, Peapod, Ganba và Hiyoko. Ba app sau cùng viết hoàn toàn bằng Swift.'],
        ['2028', 'Dự định mở một studio nhỏ làm app và game ở TP.HCM.'],
      ],
    },
    play: { label: 'Thử ngay', title: 'Đừng chỉ xem ảnh, *chạm thử*.', note: 'Ba tương tác đặc trưng của Hiyoko, Peapod và Ganba, dựng lại bằng HTML để bạn bấm thử ngay trên trang. Đây là bản demo, không phải app thật.' },
    ledger: { label: 'Đã phát hành', title: 'Mỗi lần lên store là *một con dấu*.', note: 'Ngày lên store lần đầu và phiên bản hiện tại. Google Play không công khai ngày đầu tiên nên DoneDrop chỉ ghi năm.', first: 'Lên store', current: 'Hiện tại', next: 'Đang trên đường', nextItems: ['Peapod 1.1 — chặn app bằng Screen Time', 'Ganba cho Android', 'Nuni HSK'] },
    footer: { lines: ['Mình cùng', 'làm *gì đó* nhé'], write: 'Viết cho tôi', copied: 'Đã chép địa chỉ email', version: 'Phiên bản', time: 'Giờ ở Việt Nam', storeName: 'Tên trên App Store' },
    projects: {
      hiyoko: {
        name: 'Hiyoko', kind: 'App Store', linkLabel: 'Xem trên App Store',
        lead: 'App học tiếng Nhật cho người bắt đầu từ con số không: từ Hiragana, Katakana tới lộ trình N5–N1, có chú gà con Hiyo đi cùng.',
        body: [
          'Hiyoko dạy trước rồi mới hỏi: chữ nào chưa học luôn có romaji bên cạnh, kana mở dần theo từng bài, và không bao giờ có câu hỏi về thứ bạn chưa gặp. Mỗi vòng chỉ 3–4 phút.',
          'Thẻ đã học đi vào lịch ôn FSRS với các mức nhớ có tên rõ ràng; nghỉ lâu quay lại thì app chỉ đưa vài thẻ trước khi học tiếp. Có giải đấu theo tuần và hai khiên giữ chuỗi ngày.',
          'Hiyoko và Ganba chung một repo và một Swift package cho nội dung, đồng bộ và lịch ôn. Ở bản 2.0 tôi bỏ RevenueCat, thanh toán chỉ còn qua StoreKit của Apple, và có test khẳng định app không còn mang SDK đó.',
        ],
        facts: [['Vai trò', 'Một mình — app, nội dung, backend, phát hành'], ['Nền tảng', 'iOS 17+'], ['Công nghệ', 'SwiftUI, FSRS, StoreKit 2, Go'], ['Phiên bản', '2.0.3 · phát hành 17/10/2026']],
        features: [
          { title: 'Vòng học 3–4 phút', text: 'Bản đồ bài học đi từ kana tới N5–N1. Nút Tiếp tục gộp thẻ đến hạn, một vòng mới và phần thêm, nên bước tiếp theo luôn rõ ràng.' },
          { title: 'Lật thẻ, đóng dấu hanko', text: 'Chạm để lật thẻ 3D, vuốt phải để đóng dấu khi đã nhớ. Một lớp sương che cách đọc; lau đi để xem trộm thì tính là chưa nhớ hẳn.' },
          { title: 'Viết từng nét, được chấm điểm', text: 'Hiragana, Katakana và kanji: viết từng nét, app báo nét nào đúng, gần đúng hay cần xem lại.' },
          { title: 'Nhìn thấy ngữ điệu', text: 'Từ nào có dữ liệu cao độ thì đường lên xuống hiện ngay trên thẻ, kèm giọng đọc của người bản xứ.' },
        ],
      },
      ganba: {
        name: 'Ganba', kind: 'App Store', linkLabel: 'Xem trên App Store',
        lead: 'App luyện thi JLPT từ N5 đến N1: làm đề thi thử, biết mình còn thiếu bao nhiêu điểm để đậu, rồi luyện đúng phần đang kéo điểm xuống.',
        body: [
          'Ganba mở đầu bằng một bài kiểm tra 8 câu trong khoảng ba phút, ước tính điểm rồi lên lịch học tới ngày thi. Hơn 200 đề luyện theo đúng định dạng JLPT, tính giờ từng phần như thi thật, phần nghe có âm thanh, làm dở thoát ra vẫn giữ nguyên bài.',
          'Mọi tiến độ nằm trong SQLite trên máy, không cần tài khoản; đăng nhập bằng Apple chỉ để đồng bộ nếu muốn. Server không nằm trên đường học: mất mạng vẫn làm đề, vẫn mua gói Pro, vẫn mở khoá.',
          'Phần khó nhất là nội dung. Câu hỏi do AI soạn phải qua kiểm tra chéo của hai mô hình khác nhau mới được xuất bản, lời giải do AI viết được gắn nhãn ngay trong app, và pipeline tự chặn mọi tài nguyên chưa rõ quyền sử dụng.',
          'Bản 1.1 ra hai tuần sau: thêm các bộ đề ngắn theo chủ đề, sổ câu sai có ghi chú và bộ lọc, nghe lặp một đoạn A–B, và làm riêng một phần thi có tính giờ. Bản Android đang được viết bằng Jetpack Compose.',
        ],
        facts: [['Vai trò', 'Một mình — iOS, Android, backend, pipeline nội dung'], ['Nền tảng', 'iOS 17+ · Android đang phát triển'], ['Công nghệ', 'SwiftUI, GRDB, FSRS, StoreKit 2, Go, Jetpack Compose'], ['Phiên bản', '1.1.0 · 5,0 sao trên App Store']],
        features: [
          { title: 'Biết hôm nay cần làm gì', text: 'Màn Hôm nay đếm ngược tới ngày thi, cho biết điểm ước tính và còn thiếu bao nhiêu điểm để đậu, kèm một nhiệm vụ 5, 10 hoặc 20 phút.' },
          { title: 'Đề thi thử đúng định dạng', text: 'Hàng trăm đề từ N5 tới N1, tính giờ từng phần như thi thật. Thoát giữa chừng vẫn giữ nguyên bài làm.' },
          { title: 'Điểm theo từng phần', text: 'Nộp bài là có điểm ước tính kèm khoảng dao động, cảnh báo phần sắp chạm điểm liệt và việc nên làm tiếp theo.' },
          { title: 'Luyện đúng chỗ yếu', text: 'Luyện theo dạng câu hỏi, sổ câu sai, thẻ ôn tập và nghe chép chính tả — mỗi buổi 5, 10 hoặc 20 phút.' },
        ],
      },
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
        facts: [['Vai trò', 'Một mình — sản phẩm, app, media backend'], ['Nền tảng', 'Android · iOS đang chuẩn bị'], ['Công nghệ', 'Flutter, Firebase, Fastlane, Python'], ['Phiên bản', '1.1.1 trên Google Play']],
      },
      pea: {
        name: 'Peapod', kind: 'App Store', linkLabel: 'Xem trên App Store',
        lead: 'Hẹn giờ tập trung kèm một hạt đậu nhỏ lớn dần theo từng phút bạn giữ được. Miễn phí, không cần đăng nhập.',
        body: [
          'Peapod là app đầu tiên tôi viết hoàn toàn bằng SwiftUI thay vì Flutter, vì tôi muốn chặn app gây xao nhãng bằng Screen Time API — thứ chỉ làm được từ native và phải chia thành nhiều app extension chạy riêng.',
          'Quyền Family Controls phải chờ Apple duyệt riêng, và lúc nộp bản 1.0 thì chưa có. Tôi đã dựng sẵn một target "chỉ hẹn giờ" cùng bundle id, không cần quyền đó, để app vẫn lên đúng hạn. Một ngày sau Apple cấp quyền; bản 1.1 có chặn app thật và giao diện tiếng Việt đã sẵn sàng.',
          'Focus Duo cho hai người ghép cặp bằng một mã mời, không cần tài khoản: thấy hạt đậu của nhau, cổ vũ nhau và giữ chung một chuỗi ngày. Backend Go chỉ biết một mã thiết bị ẩn danh.',
        ],
        facts: [['Vai trò', 'Một mình — iOS native, backend, game design'], ['Nền tảng', 'iOS 17+'], ['Công nghệ', 'SwiftUI, FamilyControls, WidgetKit, Go'], ['Phiên bản', '1.0 trên App Store · 1.1 có chặn app đang chuẩn bị']],
        features: [
          { title: 'Một hạt đậu lớn theo từng phút', text: 'Mỗi phiên tập trung làm hạt đậu lớn thêm, từ hạt giống tới Golden Pod. Bỏ cuộc giữa chừng thì đậu buồn một tiếng, vậy thôi.' },
          { title: 'Vườn và bộ sưu tập', text: 'Đậu lớn hết cỡ thì đem trồng và ấp một hạt bí ẩn — tám loại đậu từ thường tới huyền thoại để sưu tầm.' },
          { title: 'Thống kê không khoá sau paywall', text: 'Số phút mỗi ngày, tỷ lệ hoàn thành, giờ tập trung tốt nhất, thời gian đã dành cho việc gì — tất cả miễn phí và nằm trên máy.' },
          { title: 'Chọn việc, chọn độ nghiêm', text: 'Ghi một việc cần làm, chọn từ 15 đến 120 phút. Ở chế độ Khó, rời app quá 30 giây là mất phiên.' },
        ],
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
      sub: 'Flutter and iOS developer. Five apps on the App Store, one on Google Play, and a few more on the way.',
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
        'Flutter is what I have written longest. This year I moved my iOS apps to Swift and SwiftUI, and use Jetpack Compose when an app needs its own Android build. Behind them there is usually Go or Node, with Postgres, SQLite or Firebase depending on the job. On the web I use Next.js.',
        'What I am probably best at is getting a product all the way out the door: app review at Apple and Google, in-app payments, certificates, policies, screenshots — the work nobody enjoys, and without which no app ever ships.',
      ],
      journey: [
        ['2022', 'First lines of code. No idea yet how far this would go.'],
        ['2023', 'Found Flutter and stayed. Built small apps non-stop to learn — most are still on GitHub.'],
        ['2024', 'The crab ledger went into daily use. My first software with people relying on it.'],
        ['2025', 'SmartMeal AI approved by Apple. My first app on the App Store under my own name.'],
        ['2026', 'Shipped Learn Teochew, DoneDrop, Peapod, Ganba and Hiyoko. The last three are written entirely in Swift.'],
        ['2028', 'The plan: a small app and game studio in Ho Chi Minh City.'],
      ],
    },
    play: { label: 'Try it', title: 'Don\'t just look, *tap*.', note: 'The signature interactions of Hiyoko, Peapod and Ganba, rebuilt in HTML so you can try them right here. These are demos, not the real apps.' },
    ledger: { label: 'Shipped', title: 'Every release is *a stamp*.', note: 'First store release and current version. Google Play does not publish the first release date, so DoneDrop shows the year only.', first: 'First release', current: 'Current', next: 'On the way', nextItems: ['Peapod 1.1 — app blocking with Screen Time', 'Ganba for Android', 'Nuni HSK'] },
    footer: { lines: ["Let's make", '*something* together'], write: 'Write to me', copied: 'Email address copied', version: 'Version', time: 'Local time', storeName: 'App Store name' },
    projects: {
      hiyoko: {
        name: 'Hiyoko', kind: 'App Store', linkLabel: 'View on the App Store',
        lead: 'Japanese for people starting from zero: from Hiragana and Katakana to the N5–N1 path, with a chick named Hiyo beside you.',
        body: [
          'Hiyoko teaches before it tests: every character you have not learned comes with romaji beside it, kana unlock lesson by lesson, and you are never asked about something you have not met. Each round takes 3–4 minutes.',
          'Learned cards go into an FSRS review schedule with named memory stages; after a break, the app brings back just a few cards before you continue. There is a weekly league and two streak shields.',
          'Hiyoko and Ganba share a repository and a Swift package for content, sync and reviews. In 2.0 I removed RevenueCat so purchases go through Apple\'s StoreKit alone, with a test that asserts the SDK is gone.',
        ],
        facts: [['Role', 'Solo — app, content, backend, release'], ['Platform', 'iOS 17+'], ['Stack', 'SwiftUI, FSRS, StoreKit 2, Go'], ['Version', '2.0.3 · released 17 October 2026']],
        features: [
          { title: 'Rounds of 3–4 minutes', text: 'A lesson map runs from kana to N5–N1. Continue combines due reviews, a new round and an optional extra, so the next step is always clear.' },
          { title: 'Flip a card, stamp a hanko', text: 'Tap to flip a 3D card, swipe right to stamp it when you remember. A fog hides the reading; wipe it away to peek and it counts as not fully remembered.' },
          { title: 'Write every stroke, get a score', text: 'Hiragana, Katakana and kanji: write each stroke and see which ones are right, close, or need another look.' },
          { title: 'See the pitch', text: 'Words with pitch data show the high-low line right on the card, with native-speaker audio.' },
        ],
      },
      ganba: {
        name: 'Ganba', kind: 'App Store', linkLabel: 'View on the App Store',
        lead: 'JLPT prep from N5 to N1: take a mock test, see how many points you still need to pass, then practise the parts pulling your score down.',
        body: [
          'Ganba opens with an eight-question check that takes about three minutes, estimates your score and plans your study up to exam day. Over 200 practice tests follow the JLPT format, timed section by section like the real exam, with audio for listening, and you can leave mid-test without losing answers.',
          'All progress lives in SQLite on the device, with no account; Sign in with Apple is only there if you want sync. The server is never on the learning path: offline you can still take tests, buy Pro and unlock content.',
          'The hard part is the content. AI-drafted questions must pass a cross-check by two different models before they are published, AI-written explanations are labelled in the app, and the pipeline blocks any asset whose usage rights are unclear.',
          'Version 1.1 followed two weeks later: short sets by topic, a mistake log with notes and filters, A–B looping of listening clips, and single timed sections. An Android version is being written in Jetpack Compose.',
        ],
        facts: [['Role', 'Solo — iOS, Android, backend, content pipeline'], ['Platform', 'iOS 17+ · Android in development'], ['Stack', 'SwiftUI, GRDB, FSRS, StoreKit 2, Go, Jetpack Compose'], ['Version', '1.1.0 · 5.0 stars on the App Store']],
        features: [
          { title: 'Know what to do today', text: 'The Today screen counts down to exam day, shows your estimated score and how many points you still need, with a 5, 10 or 20 minute mission.' },
          { title: 'Mock tests in the real format', text: 'Hundreds of tests from N5 to N1, timed section by section like the real exam. Leave halfway and your answers are kept.' },
          { title: 'Scores by section', text: 'Submit and get an estimated score with a range, a warning when a section is near its minimum, and what to do next.' },
          { title: 'Practise where you are weak', text: 'Practice by question type, a mistake log, review cards and dictation — in 5, 10 or 20 minute sessions.' },
        ],
      },
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
        facts: [['Role', 'Solo — product, app, media backend'], ['Platform', 'Android · iOS in preparation'], ['Stack', 'Flutter, Firebase, Fastlane, Python'], ['Version', '1.1.1 on Google Play']],
      },
      pea: {
        name: 'Peapod', kind: 'App Store', linkLabel: 'View on the App Store',
        lead: 'A focus timer with a tiny pea that grows every minute you stay focused. Free, with no login.',
        body: [
          'Peapod is the first app I wrote entirely in SwiftUI rather than Flutter, because I wanted to block distracting apps with the Screen Time API — which only works natively and has to be split across several app extensions.',
          'The Family Controls entitlement needs a separate approval from Apple, and it had not arrived when 1.0 was due. I had already built a timer-only target on the same bundle id that does not need it, so the app shipped on time. Apple granted the entitlement a day later; version 1.1, with real app blocking and a Vietnamese interface, is ready.',
          'Focus Duo pairs two people with an invite code and no accounts: you see each other\'s pea, cheer each other on and keep a shared streak. The Go backend only knows an anonymous device ID.',
        ],
        facts: [['Role', 'Solo — native iOS, backend, game design'], ['Platform', 'iOS 17+'], ['Stack', 'SwiftUI, FamilyControls, WidgetKit, Go'], ['Version', '1.0 on the App Store · 1.1 with app blocking in preparation']],
        features: [
          { title: 'A pea that grows by the minute', text: 'Every focus session grows your pea, from seed to Golden Pod. Give up halfway and it is sad for an hour. That is all.' },
          { title: 'A garden to collect', text: 'Once fully grown, plant it and hatch a mystery seed — eight peas to collect, from Common to Legendary.' },
          { title: 'Insights without a paywall', text: 'Minutes per day, completion rate, your best time of day, where your focus went — all free and all on your iPhone.' },
          { title: 'Pick a task, pick how strict', text: 'Name one thing to work on and choose 15 to 120 minutes. In Hard mode, leaving for 30 seconds ends the session.' },
        ],
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
      sub: 'Flutter 与 iOS 开发者。五款应用已上架 App Store，一款上架 Google Play，还有几款正在路上。',
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
        '我写得最久的是 Flutter。今年我的 iOS 应用全面转向 Swift 和 SwiftUI，需要单独做 Android 版时用 Jetpack Compose。后端一般是 Go 或 Node，数据按需求放在 Postgres、SQLite 或 Firebase。网页端用 Next.js。',
        '我最擅长的，大概是把一个产品真正送出门：通过 Apple 和 Google 的审核、应用内支付、证书、隐私政策、商店截图——这些没人喜欢做的事，少了任何一件，应用都上不了架。',
      ],
      journey: [
        ['2022', '写下第一行代码。那时还不知道会走多远。'],
        ['2023', '遇到 Flutter，就留了下来。为了学习不停地做小应用，大部分还放在 GitHub 上。'],
        ['2024', '螃蟹收购账本投入使用。第一次有人每天依赖我写的软件。'],
        ['2025', 'SmartMeal AI 通过 Apple 审核。第一款署我名字的 App Store 应用。'],
        ['2026', '发布「学潮州话」、DoneDrop、Peapod、Ganba 和 Hiyoko。后三款完全用 Swift 编写。'],
        ['2028', '计划在胡志明市开一间小工作室，做应用和游戏。'],
      ],
    },
    play: { label: '试一试', title: '别只看截图，*动手点点*。', note: 'Hiyoko、Peapod 和 Ganba 的招牌交互，用 HTML 重新做了一遍，可以直接在页面上试。这些是演示，不是真正的应用。' },
    ledger: { label: '已发布', title: '每次上架，*盖一个章*。', note: '首次上架日期和当前版本。Google Play 不公开首次发布日期，所以 DoneDrop 只写年份。', first: '首次上架', current: '当前版本', next: '正在路上', nextItems: ['Peapod 1.1——用 Screen Time 屏蔽应用', 'Ganba Android 版', 'Nuni HSK'] },
    footer: { lines: ['一起做点', '*有意思*的事吧'], write: '给我写信', copied: '邮箱地址已复制', version: '版本', time: '越南时间', storeName: 'App Store 开发者名' },
    projects: {
      hiyoko: {
        name: 'Hiyoko', kind: 'App Store', linkLabel: '在 App Store 查看',
        lead: '给零基础学习者的日语应用：从平假名、片假名一路走到 N5–N1，身边有一只叫 Hiyo 的小鸡陪着。',
        body: [
          'Hiyoko 先教后考：没学过的字旁边总有罗马音，假名随课程逐步解锁，绝不会考你没见过的东西。每一轮只要 3–4 分钟。',
          '学过的卡片进入 FSRS 复习计划，记忆阶段都有明确名称；隔了很久再回来，应用只先拿几张卡热身再继续。另有每周联赛和两个连续天数护盾。',
          'Hiyoko 和 Ganba 共用一个仓库和一个负责内容、同步与复习的 Swift package。2.0 版我去掉了 RevenueCat，购买只走 Apple 的 StoreKit，并有测试确认应用里已不再带这个 SDK。',
        ],
        facts: [['角色', '独立完成——应用、内容、后端、发布'], ['平台', 'iOS 17+'], ['技术', 'SwiftUI, FSRS, StoreKit 2, Go'], ['版本', '2.0.3 · 2026 年 10 月 17 日发布']],
        features: [
          { title: '每轮 3–4 分钟', text: '课程地图从假名一直到 N5–N1。「继续」把到期复习、新一轮和可选加练合在一起，下一步永远清楚。' },
          { title: '翻卡片，盖印章', text: '点一下翻转 3D 卡片，记住了就右滑盖章。读音被一层雾挡住，擦开偷看就算没完全记住。' },
          { title: '一笔一画，都有评分', text: '平假名、片假名和汉字：每一笔写下去，应用会告诉你哪笔对了、差一点、还是需要再看看。' },
          { title: '看得见的音调', text: '有音高数据的单词，高低线直接画在卡片上，并配有母语者发音。' },
        ],
      },
      ganba: {
        name: 'Ganba', kind: 'App Store', linkLabel: '在 App Store 查看',
        lead: '从 N5 到 N1 的 JLPT 备考应用：做一套模拟题，看清离及格还差多少分，再专门练拉低分数的部分。',
        body: [
          'Ganba 先用大约三分钟、八道题做一次测评，估算分数，再把学习计划排到考试当天。200 多套练习题完全按 JLPT 格式，像真实考试一样分部分计时，听力配有音频，中途退出也不会丢失作答。',
          '所有进度都存在设备上的 SQLite 里，不需要账号；用 Apple 登录只是为了可选的同步。服务器从不挡在学习路径上：断网时照样能做题、买 Pro、解锁内容。',
          '最难的是内容。AI 起草的题目必须经过两个不同模型的交叉检查才能发布，AI 写的解析在应用里会明确标注，流水线还会自动拦下任何使用权不明的素材。',
          '两周后发布了 1.1 版：按主题划分的短套题、可加笔记和筛选的错题本、听力 A–B 段循环，以及单独计时的某一部分考试。Android 版正在用 Jetpack Compose 编写。',
        ],
        facts: [['角色', '独立完成——iOS、Android、后端、内容流水线'], ['平台', 'iOS 17+ · Android 开发中'], ['技术', 'SwiftUI, GRDB, FSRS, StoreKit 2, Go, Jetpack Compose'], ['版本', '1.1.0 · App Store 5.0 星']],
        features: [
          { title: '知道今天该做什么', text: '「今天」页面倒数到考试日，显示估算分数和离及格还差几分，并给出 5、10 或 20 分钟的任务。' },
          { title: '真实格式的模拟考', text: 'N5 到 N1 共数百套题，像真实考试一样分部分计时。中途退出也会保留作答。' },
          { title: '按部分给分', text: '交卷后给出带区间的估算分数，提醒哪个部分接近及格线，并告诉你下一步做什么。' },
          { title: '专攻薄弱点', text: '按题型练习、错题本、复习卡片和听写——每次 5、10 或 20 分钟。' },
        ],
      },
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
        facts: [['角色', '独立完成——产品、应用、媒体后端'], ['平台', 'Android · iOS 准备中'], ['技术', 'Flutter, Firebase, Fastlane, Python'], ['版本', 'Google Play 1.1.1']],
      },
      pea: {
        name: 'Peapod', kind: 'App Store', linkLabel: '在 App Store 查看',
        lead: '一个专注计时器，配一颗小豆子，你每坚持一分钟它就长大一点。免费，无需登录。',
        body: [
          'Peapod 是我第一款完全用 SwiftUI 而不是 Flutter 写的应用，因为我想用 Screen Time API 屏蔽让人分心的应用——这只能在原生环境做，而且要拆成好几个独立的 App Extension。',
          'Family Controls 权限需要 Apple 单独审批，1.0 提交时还没批下来。我事先做好了一个同 bundle id、不需要该权限的「仅计时」target，所以应用按时上架。一天后 Apple 批准了权限；带真正应用屏蔽和越南语界面的 1.1 版已经准备好。',
          'Focus Duo 用一个邀请码让两个人配对，不需要账号：互相看到对方的豆子、互相打气、一起保持连续天数。Go 后端只知道一个匿名的设备 ID。',
        ],
        facts: [['角色', '独立完成——原生 iOS、后端、游戏设计'], ['平台', 'iOS 17+'], ['技术', 'SwiftUI, FamilyControls, WidgetKit, Go'], ['版本', 'App Store 1.0 · 带应用屏蔽的 1.1 准备中']],
        features: [
          { title: '一分钟一分钟长大的豆子', text: '每次专注都让豆子长大一点，从种子长到金豆荚。中途放弃，豆子会难过一小时，仅此而已。' },
          { title: '可以收集的花园', text: '豆子长满后种下去，孵出一颗神秘种子——从普通到传说，一共八种豆子可以收集。' },
          { title: '不设付费墙的统计', text: '每天的分钟数、完成率、最佳专注时段、时间花在了哪里——全部免费，全部留在你的 iPhone 上。' },
          { title: '选一件事，选严格程度', text: '写下要做的一件事，选 15 到 120 分钟。困难模式下，离开应用超过 30 秒就算失败。' },
        ],
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
