
'use client';
import { Settings } from './QuranReader';

interface HeaderProps {
  settings: Settings;
  onSettingsClick: () => void;
  onBackClick?: () => void;
  currentSurah?: number | null;
  scriptType?: 'latin' | 'cyrillic';
}

// Complete list of all 114 Surah names with both latin and cyrillic
const surahNames = [
  { arabic: "الفاتحة", uzbek: { latin: "Fotiha", cyrillic: "Фотиҳа" }, english: "Al-Fatiha" },
  { arabic: "البقرة", uzbek: { latin: "Baqara", cyrillic: "Бақара" }, english: "Al-Baqara" },
  { arabic: "آل عمران", uzbek: { latin: "Oli Imron", cyrillic: "Оли Имрон" }, english: "Ali 'Imran" },
  { arabic: "النساء", uzbek: { latin: "Niso", cyrillic: "Нисо" }, english: "An-Nisa'" },
  { arabic: "المائدة", uzbek: { latin: "Moida", cyrillic: "Моида" }, english: "Al-Ma'idah" },
  { arabic: "الأنعام", uzbek: { latin: "An'om", cyrillic: "Анъом" }, english: "Al-An'am" },
  { arabic: "الأعراف", uzbek: { latin: "A'rof", cyrillic: "Аъроф" }, english: "Al-A'raf" },
  { arabic: "الأنفال", uzbek: { latin: "Anfol", cyrillic: "Анфол" }, english: "Al-Anfal" },
  { arabic: "التوبة", uzbek: { latin: "Tavba", cyrillic: "Тавба" }, english: "At-Tawbah" },
  { arabic: "يونس", uzbek: { latin: "Yunus", cyrillic: "Юнус" }, english: "Yunus" },
  { arabic: "هود", uzbek: { latin: "Hud", cyrillic: "Ҳуд" }, english: "Hud" },
  { arabic: "يوسف", uzbek: { latin: "Yusuf", cyrillic: "Юсуф" }, english: "Yusuf" },
  { arabic: "الرعد", uzbek: { latin: "Ra'd", cyrillic: "Раъд" }, english: "Ar-Ra'd" },
  { arabic: "إبراهيم", uzbek: { latin: "Ibrohim", cyrillic: "Иброҳим" }, english: "Ibrahim" },
  { arabic: "الحجر", uzbek: { latin: "Hijr", cyrillic: "Ҳижр" }, english: "Al-Hijr" },
  { arabic: "النحل", uzbek: { latin: "Nahl", cyrillic: "Наҳл" }, english: "An-Nahl" },
  { arabic: "الإسراء", uzbek: { latin: "Isro", cyrillic: "Исро" }, english: "Al-Isra'" },
  { arabic: "الكهف", uzbek: { latin: "Kahf", cyrillic: "Каҳф" }, english: "Al-Kahf" },
  { arabic: "مريم", uzbek: { latin: "Maryam", cyrillic: "Марям" }, english: "Maryam" },
  { arabic: "طه", uzbek: { latin: "Toha", cyrillic: "Тоҳа" }, english: "Ta-Ha" },
  { arabic: "الأنبياء", uzbek: { latin: "Anbiyo", cyrillic: "Анбиё" }, english: "Al-Anbiya'" },
  { arabic: "الحج", uzbek: { latin: "Haj", cyrillic: "Ҳаж" }, english: "Al-Hajj" },
  { arabic: "المؤمنون", uzbek: { latin: "Mu'minun", cyrillic: "Муъминун" }, english: "Al-Mu'minun" },
  { arabic: "النور", uzbek: { latin: "Nur", cyrillic: "Нур" }, english: "An-Nur" },
  { arabic: "الفرقان", uzbek: { latin: "Furqon", cyrillic: "Фурқон" }, english: "Al-Furqan" },
  { arabic: "الشعراء", uzbek: { latin: "Shu'aro", cyrillic: "Шуъаро" }, english: "Ash-Shu'ara'" },
  { arabic: "النمل", uzbek: { latin: "Naml", cyrillic: "Намл" }, english: "An-Naml" },
  { arabic: "القصص", uzbek: { latin: "Qasas", cyrillic: "Қасас" }, english: "Al-Qasas" },
  { arabic: "العنكبوت", uzbek: { latin: "Ankabut", cyrillic: "Анкабут" }, english: "Al-'Ankabut" },
  { arabic: "الروم", uzbek: { latin: "Rum", cyrillic: "Рум" }, english: "Ar-Rum" },
  { arabic: "لقمان", uzbek: { latin: "Luqmon", cyrillic: "Луқмон" }, english: "Luqman" },
  { arabic: "السجدة", uzbek: { latin: "Sajda", cyrillic: "Сажда" }, english: "As-Sajdah" },
  { arabic: "الأحزاب", uzbek: { latin: "Ahzob", cyrillic: "Аҳзоб" }, english: "Al-Ahzab" },
  { arabic: "سبأ", uzbek: { latin: "Saba", cyrillic: "Саба" }, english: "Saba'" },
  { arabic: "فاطر", uzbek: { latin: "Fotir", cyrillic: "Фотир" }, english: "Fatir" },
  { arabic: "يس", uzbek: { latin: "Yaasin", cyrillic: "Яасин" }, english: "Ya-Sin" },
  { arabic: "الصافات", uzbek: { latin: "Soffot", cyrillic: "Соффот" }, english: "As-Saffat" },
  { arabic: "ص", uzbek: { latin: "Sod", cyrillic: "Сод" }, english: "Sad" },
  { arabic: "الزمر", uzbek: { latin: "Zumar", cyrillic: "Зумар" }, english: "Az-Zumar" },
  { arabic: "غافر", uzbek: { latin: "G'ofir", cyrillic: "Ғофир" }, english: "Ghafir" },
  { arabic: "فصلت", uzbek: { latin: "Fussilat", cyrillic: "Фуссилат" }, english: "Fussilat" },
  { arabic: "الشورى", uzbek: { latin: "Shuro", cyrillic: "Шуро" }, english: "Ash-Shura" },
  { arabic: "الزخرف", uzbek: { latin: "Zuxruf", cyrillic: "Зухруф" }, english: "Az-Zukhruf" },
  { arabic: "الدخان", uzbek: { latin: "Duxon", cyrillic: "Духон" }, english: "Ad-Dukhan" },
  { arabic: "الجاثية", uzbek: { latin: "Josiya", cyrillic: "Жосия" }, english: "Al-Jathiyah" },
  { arabic: "الأحقاف", uzbek: { latin: "Ahqof", cyrillic: "Аҳқоф" }, english: "Al-Ahqaf" },
  { arabic: "محمد", uzbek: { latin: "Muhammad", cyrillic: "Муҳаммад" }, english: "Muhammad" },
  { arabic: "الفتح", uzbek: { latin: "Fath", cyrillic: "Фатҳ" }, english: "Al-Fath" },
  { arabic: "الحجرات", uzbek: { latin: "Hujurot", cyrillic: "Ҳужурот" }, english: "Al-Hujurat" },
  { arabic: "ق", uzbek: { latin: "Qof", cyrillic: "Қоф" }, english: "Qaf" },
  { arabic: "الذاريات", uzbek: { latin: "Zoriyot", cyrillic: "Зориёт" }, english: "Adh-Dhariyat" },
  { arabic: "الطور", uzbek: { latin: "Tur", cyrillic: "Тур" }, english: "At-Tur" },
  { arabic: "النجم", uzbek: { latin: "Najm", cyrillic: "Нажм" }, english: "An-Najm" },
  { arabic: " القمر", uzbek: { latin: "Qamar", cyrillic: "Қамар" }, english: "Al-Qamar" },
  { arabic: "الرحمن", uzbek: { latin: "Rahman", cyrillic: "Раҳмон" }, english: "Ar-Rahman" },
  { arabic: "الواقعة", uzbek: { latin: "Voqia", cyrillic: "Воқиа" }, english: "Al-Waqi'ah" },
  { arabic: "الحديد", uzbek: { latin: "Hadid", cyrillic: "Ҳадид" }, english: "Al-Hadid" },
  { arabic: "المجادلة", uzbek: { latin: "Mujodala", cyrillic: "Мужодала" }, english: "Al-Mujadila" },
  { arabic: "الحشر", uzbek: { latin: "Hashr", cyrillic: "Ҳашр" }, english: "Al-Hashr" },
  { arabic: "الممتحنة", uzbek: { latin: "Mumtahana", cyrillic: "Мумтаҳана" }, english: "Al-Mumtahanah" },
  { arabic: "الصف", uzbek: { latin: "Saf", cyrillic: "Саф" }, english: "As-Saff" },
  { arabic: "الجمعة", uzbek: { latin: "Juma", cyrillic: "Жума" }, english: "Al-Jumu'ah" },
  { arabic: "المنافقون", uzbek: { latin: "Munofiqun", cyrillic: "Мунофиқун" }, english: "Al-Munafiqun" },
  { arabic: "التغابن", uzbek: { latin: "Tag'obun", cyrillic: "Тағобун" }, english: "At-Taghabun" },
  { arabic: "الطلاق", uzbek: { latin: "Taloq", cyrillic: "Талоқ" }, english: "At-Talaq" },
  { arabic: "التحريم", uzbek: { latin: "Tahrim", cyrillic: "Таҳрим" }, english: "At-Tahrim" },
  { arabic: "الملك", uzbek: { latin: "Mulk", cyrillic: "Мулк" }, english: "Al-Mulk" },
  { arabic: "القلم", uzbek: { latin: "Qalam", cyrillic: "Қалам" }, english: "Al-Qalam" },
  { arabic: "الحاقة", uzbek: { latin: "Haqqa", cyrillic: "Ҳаққа" }, english: "Al-Haqqah" },
  { arabic: "المعارج", uzbek: { latin: "Ma'orij", cyrillic: "Маориж" }, english: "Al-Ma'arij" },
  { arabic: "نوح", uzbek: { latin: "Nuh", cyrillic: "Нуҳ" }, english: "Nuh" },
  { arabic: "الجن", uzbek: { latin: "Jin", cyrillic: "Жин" }, english: "Al-Jinn" },
  { arabic: "المزمل", uzbek: { latin: "Muzzammil", cyrillic: "Муззаммил" }, english: "Al-Muzzammil" },
  { arabic: "المدثر", uzbek: { latin: "Muddassir", cyrillic: "Муддассир" }, english: "Al-Muddaththir" },
  { arabic: "القيامة", uzbek: { latin: "Qiyoma", cyrillic: "Қиёма" }, english: "Al-Qiyamah" },
  { arabic: "الإنسان", uzbek: { latin: "Inson", cyrillic: "Инсон" }, english: "Al-Insan" },
  { arabic: "المرسلات", uzbek: { latin: "Mursolot", cyrillic: "Мурсолот" }, english: "Al-Mursalat" },
  { arabic: "النبأ", uzbek: { latin: "Naba", cyrillic: "Наба" }, english: "An-Naba'" },
  { arabic: "النازعات", uzbek: { latin: "Nozi'ot", cyrillic: "Нозиот" }, english: "An-Nazi'at" },
  { arabic: "عبس", uzbek: { latin: "Abasa", cyrillic: "Абаса" }, english: "Abasa" },
  { arabic: "التكوير", uzbek: { latin: "Takvir", cyrillic: "Таквир" }, english: "At-Takwir" },
  { arabic: "الإنفطار", uzbek: { latin: "Infitor", cyrillic: "Инфитор" }, english: "Al-Infitar" },
  { arabic: "المتطفين", uzbek: { latin: "Mutaffifin", cyrillic: "Мутаффифин" }, english: "Al-Mutaffifin" },
  { arabic: "الإنشقاق", uzbek: { latin: "Inshiqoq", cyrillic: "Иншиқоқ" }, english: "Al-Inshiqaq" },
  { arabic: "البروج", uzbek: { latin: "Buruj", cyrillic: "Буруж" }, english: "Al-Buruj" },
  { arabic: "الطارق", uzbek: { latin: "Toriq", cyrillic: "Ториқ" }, english: "At-Tariq" },
  { arabic: "الأعلى", uzbek: { latin: "A'lo", cyrillic: "Аъло" }, english: "Al-A'la" },
  { arabic: "الغاشية", uzbek: { latin: "G'oshiya", cyrillic: "Ғошия" }, english: "Al-Ghashiyah" },
  { arabic: "الفجر", uzbek: { latin: "Fajr", cyrillic: "Фажр" }, english: "Al-Fajr" },
  { arabic: "البلد", uzbek: { latin: "Balad", cyrillic: "Балад" }, english: "Al-Balad" },
  { arabic: "الشمس", uzbek: { latin: "Shams", cyrillic: "Шамс" }, english: "Ash-Shams" },
  { arabic: "الليل", uzbek: { latin: "Layl", cyrillic: "Лайл" }, english: "Al-Layl" },
  { arabic: "الضحى", uzbek: { latin: "Zuho", cyrillic: "Зуҳо" }, english: "Ad-Duha" },
  { arabic: "الشرح", uzbek: { latin: "Sharh", cyrillic: "Шарҳ" }, english: "Ash-Sharh" },
  { arabic: "التين", uzbek: { latin: "Tin", cyrillic: "Тин" }, english: "At-Tin" },
  { arabic: "العلق", uzbek: { latin: "Alaq", cyrillic: "Алақ" }, english: "Al-'Alaq" },
  { arabic: "القدر", uzbek: { latin: "Qadr", cyrillic: "Қадр" }, english: "Al-Qadr" },
  { arabic: "البينة", uzbek: { latin: "Bayyina", cyrillic: "Баййина" }, english: "Al-Bayyinah" },
  { arabic: "الزلزلة", uzbek: { latin: "Zalzala", cyrillic: "Залзала" }, english: "Az-Zalzalah" },
  { arabic: "العاديات", uzbek: { latin: "Adiyot", cyrillic: "Адиёт" }, english: "Al-'Adiyat" },
  { arabic: "القارعة", uzbek: { latin: "Qoria", cyrillic: "Қориа" }, english: "Al-Qari'ah" },
  { arabic: "التكاثر", uzbek: { latin: "Takosur", cyrillic: "Такосур" }, english: "At-Takathur" },
  { arabic: "العصر", uzbek: { latin: "Asr", cyrillic: "Аср" }, english: "Al-'Asr" },
  { arabic: "الهمزة", uzbek: { latin: "Humaza", cyrillic: "Ҳумаза" }, english: "Al-Humazah" },
  { arabic: "الفيل", uzbek: { latin: "Fil", cyrillic: "Фил" }, english: "Al-Fil" },
  { arabic: "قريش", uzbek: { latin: "Qurash", cyrillic: "Қураш" }, english: "Quraysh" },
  { arabic: "الماعون", uzbek: { latin: "Mo'un", cyrillic: "Моун" }, english: "Al-Ma'un" },
  { arabic: "الكوثر", uzbek: { latin: "Kavsar", cyrillic: "Кавсар" }, english: "Al-Kawthar" },
  { arabic: "الكافرون", uzbek: { latin: "Kofirun", cyrillic: "Кофирун" }, english: "Al-Kafirun" },
  { arabic: "النصر", uzbek: { latin: "Nasr", cyrillic: "Наср" }, english: "An-Nasr" },
  { arabic: "المسد", uzbek: { latin: "Masad", cyrillic: "Масад" }, english: "Al-Masad" },
  { arabic: "الإخلاص", uzbek: { latin: "Ixlos", cyrillic: "Ихлос" }, english: "Al-Ikhlas" },
  { arabic: "الفلق", uzbek: { latin: "Falaq", cyrillic: "Фалақ" }, english: "Al-Falaq" },
  { arabic: "الناس", uzbek: { latin: "Nos", cyrillic: "Нос" }, english: "An-Nas" }
];

export default function Header({ settings, onSettingsClick, onBackClick, currentSurah, scriptType = 'latin' }: HeaderProps) {
  const getCurrentSurahName = () => {
    if (currentSurah && surahNames[currentSurah - 1]) {
      return surahNames[currentSurah - 1].uzbek[scriptType];
    }
    return scriptType === 'latin' ? `Sura ${currentSurah}` : `Сура ${currentSurah}`;
  };

  return (
    <div 
      className="fixed top-0 w-full z-50 border-b transition-colors duration-300"
      style={{ 
        backgroundColor: settings.isDark ? '#1f2937' : '#ffffff',
        borderColor: settings.isDark ? '#374151' : '#e5e7eb'
      }}
    >
      <div className="flex items-center justify-between px-4 py-4">
        
        {/* Left side */}
        <div className="flex items-center">
          {onBackClick && (
            <button 
              onClick={onBackClick}
              className="w-8 h-8 flex items-center justify-center mr-3"
              style={{ color: settings.textColor }}
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
          )}
          <div>
            <h1 
              className="font-[\'Pacifico\'] text-lg"
              style={{ color: settings.textColor }}
            >
              {scriptType === 'latin' ? 'Qur\'on' : 'Қуръон'}
            </h1>
            {currentSurah && (
              <p 
                className="text-sm opacity-70"
                style={{ color: settings.textColor }}
              >
                {getCurrentSurahName()}
              </p>
            )}
          </div>
        </div>

        {/* Right side */}
        <button 
          onClick={onSettingsClick}
          className="w-8 h-8 flex items-center justify-center"
          style={{ color: settings.textColor }}
        >
          <i className="ri-settings-3-line text-xl"></i>
        </button>
      </div>
    </div>
  );
}