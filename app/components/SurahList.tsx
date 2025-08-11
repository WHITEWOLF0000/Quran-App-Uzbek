
'use client';
import { useState } from 'react';

// Complete list of all 114 Surahs with both latin and cyrillic names
const allSurahs = [
  { number: 1, name: "Al-Fatiha", uzbekName: { latin: "Fotiha", cyrillic: "Фотиҳа" }, arabic: "الفاتحة", verses: 7, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 2, name: "Al-Baqara", uzbekName: { latin: "Baqara", cyrillic: "Бақара" }, arabic: "البقرة", verses: 286, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 3, name: "Ali 'Imran", uzbekName: { latin: "Oli Imron", cyrillic: "Оли Имрон" }, arabic: "آل عمران", verses: 200, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 4, name: "An-Nisa'", uzbekName: { latin: "Niso", cyrillic: "Нисо" }, arabic: "النساء", verses: 176, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 5, name: "Al-Ma'idah", uzbekName: { latin: "Moida", cyrillic: "Моида" }, arabic: "المائدة", verses: 120, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 6, name: "Al-An'am", uzbekName: { latin: "An'om", cyrillic: "Анъом" }, arabic: "الأنعام", verses: 165, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 7, name: "Al-A'raf", uzbekName: { latin: "A'rof", cyrillic: "Аъроф" }, arabic: "الأعراف", verses: 206, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 8, name: "Al-Anfal", uzbekName: { latin: "Anfol", cyrillic: "Анфол" }, arabic: "الأنفال", verses: 75, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 9, name: "At-Tawbah", uzbekName: { latin: "Tavba", cyrillic: "Тавба" }, arabic: "التوبة", verses: 129, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 10, name: "Yunus", uzbekName: { latin: "Yunus", cyrillic: "Юнус" }, arabic: "يونس", verses: 109, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 11, name: "Hud", uzbekName: { latin: "Hud", cyrillic: "Ҳуд" }, arabic: "هود", verses: 123, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 12, name: "Yusuf", uzbekName: { latin: "Yusuf", cyrillic: "Юсуф" }, arabic: "يوسف", verses: 111, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 13, name: "Ar-Ra'd", uzbekName: { latin: "Ra'd", cyrillic: "Раъд" }, arabic: "الرعد", verses: 43, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 14, name: "Ibrahim", uzbekName: { latin: "Ibrohim", cyrillic: "Иброҳим" }, arabic: "إبراهيم", verses: 52, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 15, name: "Al-Hijr", uzbekName: { latin: "Hijr", cyrillic: "Ҳижр" }, arabic: "الحجر", verses: 99, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 16, name: "An-Nahl", uzbekName: { latin: "Nahl", cyrillic: "Наҳл" }, arabic: "النحل", verses: 128, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 17, name: "Al-Isra'", uzbekName: { latin: "Isro", cyrillic: "Исро" }, arabic: "الإسراء", verses: 111, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 18, name: "Al-Kahf", uzbekName: { latin: "Kahf", cyrillic: "Каҳф" }, arabic: "الكهف", verses: 110, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 19, name: "Maryam", uzbekName: { latin: "Maryam", cyrillic: "Марям" }, arabic: "مريم", verses: 98, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 20, name: "Ta-Ha", uzbekName: { latin: "Toha", cyrillic: "Тоҳа" }, arabic: "طه", verses: 135, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 21, name: "Al-Anbiya'", uzbekName: { latin: "Anbiyo", cyrillic: "Анбиё" }, arabic: "الأنبياء", verses: 112, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 22, name: "Al-Hajj", uzbekName: { latin: "Haj", cyrillic: "Ҳаж" }, arabic: "الحج", verses: 78, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 23, name: "Al-Mu'minun", uzbekName: { latin: "Mu'minun", cyrillic: "Муъминун" }, arabic: "المؤمنون", verses: 118, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 24, name: "An-Nur", uzbekName: { latin: "Nur", cyrillic: "Нур" }, arabic: "النور", verses: 64, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 25, name: "Al-Furqan", uzbekName: { latin: "Furqon", cyrillic: "Фурқон" }, arabic: "الفرقان", verses: 77, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 26, name: "Ash-Shu'ara'", uzbekName: { latin: "Shu'aro", cyrillic: "Шуъаро" }, arabic: "الشعراء", verses: 227, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 27, name: "An-Naml", uzbekName: { latin: "Naml", cyrillic: "Намл" }, arabic: "النمل", verses: 93, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 28, name: "Al-Qasas", uzbekName: { latin: "Qasas", cyrillic: "Қасас" }, arabic: "القصص", verses: 88, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 29, name: "Al-'Ankabut", uzbekName: { latin: "Ankabut", cyrillic: "Анкабут" }, arabic: "العنكبوت", verses: 69, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 30, name: "Ar-Rum", uzbekName: { latin: "Rum", cyrillic: "Рум" }, arabic: "الروم", verses: 60, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 31, name: "Luqman", uzbekName: { latin: "Luqmon", cyrillic: "Луқмон" }, arabic: "لقمان", verses: 34, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 32, name: "As-Sajdah", uzbekName: { latin: "Sajda", cyrillic: "Сажда" }, arabic: "السجدة", verses: 30, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 33, name: "Al-Ahzab", uzbekName: { latin: "Ahzob", cyrillic: "Аҳзоб" }, arabic: "الأحزاب", verses: 73, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 34, name: "Saba'", uzbekName: { latin: "Saba", cyrillic: "Саба" }, arabic: "سبأ", verses: 54, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 35, name: "Fatir", uzbekName: { latin: "Fotir", cyrillic: "Фотир" }, arabic: "فاطر", verses: 45, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 36, name: "Ya-Sin", uzbekName: { latin: "Yaasin", cyrillic: "Яасин" }, arabic: "يس", verses: 83, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 37, name: "As-Saffat", uzbekName: { latin: "Soffot", cyrillic: "Соффот" }, arabic: "الصافات", verses: 182, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 38, name: "Sad", uzbekName: { latin: "Sod", cyrillic: "Сод" }, arabic: "ص", verses: 88, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 39, name: "Az-Zumar", uzbekName: { latin: "Zumar", cyrillic: "Зумар" }, arabic: "الزمر", verses: 75, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 40, name: "Ghafir", uzbekName: { latin: "G'ofir", cyrillic: "Ғофир" }, arabic: "غافر", verses: 85, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 41, name: "Fussilat", uzbekName: { latin: "Fussilat", cyrillic: "Фуссилат" }, arabic: "فصلت", verses: 54, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 42, name: "Ash-Shura", uzbekName: { latin: "Shuro", cyrillic: "Шуро" }, arabic: "الشورى", verses: 53, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 43, name: "Az-Zukhruf", uzbekName: { latin: "Zuxruf", cyrillic: "Зухруф" }, arabic: "الزخرف", verses: 89, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 44, name: "Ad-Dukhan", uzbekName: { latin: "Duxon", cyrillic: "Духон" }, arabic: "الدخان", verses: 59, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 45, name: "Al-Jathiyah", uzbekName: { latin: "Josiya", cyrillic: "Жосия" }, arabic: "الجاثية", verses: 37, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 46, name: "Al-Ahqaf", uzbekName: { latin: "Ahqof", cyrillic: "Аҳқоф" }, arabic: "الأحقاف", verses: 35, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 47, name: "Muhammad", uzbekName: { latin: "Muhammad", cyrillic: "Муҳаммад" }, arabic: "محمد", verses: 38, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 48, name: "Al-Fath", uzbekName: { latin: "Fath", cyrillic: "Фатҳ" }, arabic: "الفتح", verses: 29, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 49, name: "Al-Hujurat", uzbekName: { latin: "Hujurot", cyrillic: "Ҳужурот" }, arabic: "الحجرات", verses: 18, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 50, name: "Qaf", uzbekName: { latin: "Qof", cyrillic: "Қоф" }, arabic: "ق", verses: 45, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 51, name: "Adh-Dhariyat", uzbekName: { latin: "Zoriyot", cyrillic: "Зориёт" }, arabic: "الذاريات", verses: 60, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 52, name: "At-Tur", uzbekName: { latin: "Tur", cyrillic: "Тур" }, arabic: "الطور", verses: 49, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 53, name: "An-Najm", uzbekName: { latin: "Najm", cyrillic: "Нажм" }, arabic: "النجم", verses: 62, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 54, name: "Al-Qamar", uzbekName: { latin: "Qamar", cyrillic: "Қамар" }, arabic: "القمر", verses: 55, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 55, name: "Ar-Rahman", uzbekName: { latin: "Rahman", cyrillic: "Раҳмон" }, arabic: "الرحمن", verses: 78, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 56, name: "Al-Waqi'ah", uzbekName: { latin: "Voqia", cyrillic: "Воқиа" }, arabic: "الواقعة", verses: 96, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 57, name: "Al-Hadid", uzbekName: { latin: "Hadid", cyrillic: "Ҳадид" }, arabic: "الحديد", verses: 29, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 58, name: "Al-Mujadila", uzbekName: { latin: "Mujodala", cyrillic: "Мужодала" }, arabic: "المجادلة", verses: 22, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 59, name: "Al-Hashr", uzbekName: { latin: "Hashr", cyrillic: "Ҳашр" }, arabic: "الحشر", verses: 24, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 60, name: "Al-Mumtahanah", uzbekName: { latin: "Mumtahana", cyrillic: "Мумтаҳана" }, arabic: "الممتحنة", verses: 13, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 61, name: "As-Saff", uzbekName: { latin: "Saf", cyrillic: "Саф" }, arabic: "الصف", verses: 14, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 62, name: "Al-Jumu'ah", uzbekName: { latin: "Juma", cyrillic: "Жума" }, arabic: "الجمعة", verses: 11, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 63, name: "Al-Munafiqun", uzbekName: { latin: "Munofiqun", cyrillic: "Мунофиқун" }, arabic: "المنافقون", verses: 11, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 64, name: "At-Taghabun", uzbekName: { latin: "Tag'obun", cyrillic: "Тағобун" }, arabic: "التغابن", verses: 18, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 65, name: "At-Talaq", uzbekName: { latin: "Taloq", cyrillic: "Талоқ" }, arabic: "الطلاق", verses: 12, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 66, name: "At-Tahrim", uzbekName: { latin: "Tahrim", cyrillic: "Таҳрим" }, arabic: "التحریم", verses: 12, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 67, name: "Al-Mulk", uzbekName: { latin: "Mulk", cyrillic: "Мулк" }, arabic: "الملك", verses: 30, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 68, name: "Al-Qalam", uzbekName: { latin: "Qalam", cyrillic: "Қалам" }, arabic: "القلم", verses: 52, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 69, name: "Al-Haqqah", uzbekName: { latin: "Haqqa", cyrillic: "Ҳаққа" }, arabic: "الحاقة", verses: 52, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 70, name: "Al-Ma'arij", uzbekName: { latin: "Ma'orij", cyrillic: "Маориж" }, arabic: "المعارج", verses: 44, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 71, name: "Nuh", uzbekName: { latin: "Nuh", cyrillic: "Нуҳ" }, arabic: "نوح", verses: 28, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 72, name: "Al-Jinn", uzbekName: { latin: "Jin", cyrillic: "Жин" }, arabic: "الجن", verses: 28, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 73, name: "Al-Muzzammil", uzbekName: { latin: "Muzzammil", cyrillic: "Муззаммил" }, arabic: "المزمل", verses: 20, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 74, name: "Al-Muddaththir", uzbekName: { latin: "Muddassir", cyrillic: "Муддассир" }, arabic: "المدثر", verses: 56, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 75, name: "Al-Qiyamah", uzbekName: { latin: "Qiyoma", cyrillic: "Қиёма" }, arabic: "القيامة", verses: 40, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 76, name: "Al-Insan", uzbekName: { latin: "Inson", cyrillic: "Инсон" }, arabic: "الإنسان", verses: 31, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 77, name: "Al-Mursalat", uzbekName: { latin: "Mursolot", cyrillic: "Мурсолот" }, arabic: "المرسلات", verses: 50, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 78, name: "An-Naba'", uzbekName: { latin: "Naba", cyrillic: "Наба" }, arabic: "النبأ", verses: 40, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 79, name: "An-Nazi'at", uzbekName: { latin: "Nozi'ot", cyrillic: "Нозиот" }, arabic: "النازعات", verses: 46, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 80, name: "Abasa", uzbekName: { latin: "Abasa", cyrillic: "Абаса" }, arabic: "عبس", verses: 42, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 81, name: "At-Takwir", uzbekName: { latin: "Takvir", cyrillic: "Таквир" }, arabic: "التكوير", verses: 29, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 82, name: "Al-Infitar", uzbekName: { latin: "Infitor", cyrillic: "Инфитор" }, arabic: "الإنفطار", verses: 19, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 83, name: "Al-Mutaffifin", uzbekName: { latin: "Mutaffifin", cyrillic: "Мутаффифин" }, arabic: "المطففين", verses: 36, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 84, name: "Al-Inshiqaq", uzbekName: { latin: "Inshiqoq", cyrillic: "Иншиқоқ" }, arabic: "الإنشقاق", verses: 25, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 85, name: "Al-Buruj", uzbekName: { latin: "Buruj", cyrillic: "Буруж" }, arabic: "البروج", verses: 22, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 86, name: "At-Tariq", uzbekName: { latin: "Toriq", cyrillic: "Ториқ" }, arabic: "الطارق", verses: 17, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 87, name: "Al-A'la", uzbekName: { latin: "A'lo", cyrillic: "Аъло" }, arabic: "الأعلى", verses: 19, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 88, name: "Al-Ghashiyah", uzbekName: { latin: "G'oshiya", cyrillic: "Ғошия" }, arabic: "الغاشية", verses: 26, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 89, name: "Al-Fajr", uzbekName: { latin: "Fajr", cyrillic: "Фажр" }, arabic: "الفجر", verses: 30, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 90, name: "Al-Balad", uzbekName: { latin: "Balad", cyrillic: "Балад" }, arabic: "البلد", verses: 20, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 91, name: "Ash-Shams", uzbekName: { latin: "Shams", cyrillic: "Шамс" }, arabic: "الشمس", verses: 15, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 92, name: "Al-Layl", uzbekName: { latin: "Layl", cyrillic: "Лайл" }, arabic: "الليل", verses: 21, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 93, name: "Ad-Duha", uzbekName: { latin: "Zuho", cyrillic: "Зуҳо" }, arabic: "الضحى", verses: 11, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 94, name: "Ash-Sharh", uzbekName: { latin: "Sharh", cyrillic: "Шарҳ" }, arabic: "الشرح", verses: 8, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 95, name: "At-Tin", uzbekName: { latin: "Tin", cyrillic: "Тин" }, arabic: "التين", verses: 8, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 96, name: "Al-'Alaq", uzbekName: { latin: "Alaq", cyrillic: "Алақ" }, arabic: "العلق", verses: 19, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 97, name: "Al-Qadr", uzbekName: { latin: "Qadr", cyrillic: "Қадр" }, arabic: "القدر", verses: 5, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 98, name: "Al-Bayyinah", uzbekName: { latin: "Bayyina", cyrillic: "Баййина" }, arabic: "البينة", verses: 8, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 99, name: "Az-Zalzalah", uzbekName: { latin: "Zalzala", cyrillic: "Залзала" }, arabic: "الزلزلة", verses: 8, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 100, name: "Al-'Adiyat", uzbekName: { latin: "Adiyot", cyrillic: "Адиёт" }, arabic: "العاديات", verses: 11, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 101, name: "Al-Qari'ah", uzbekName: { latin: "Qoria", cyrillic: "Қориа" }, arabic: "القارعة", verses: 11, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 102, name: "At-Takathur", uzbekName: { latin: "Takosur", cyrillic: "Такосур" }, arabic: "التكاثر", verses: 8, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 103, name: "Al-'Asr", uzbekName: { latin: "Asr", cyrillic: "Аср" }, arabic: "العصر", verses: 3, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 104, name: "Al-Humazah", uzbekName: { latin: "Humaza", cyrillic: "Ҳумаза" }, arabic: "الهمزة", verses: 9, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 105, name: "Al-Fil", uzbekName: { latin: "Fil", cyrillic: "Фил" }, arabic: "الفيل", verses: 5, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 106, name: "Quraysh", uzbekName: { latin: "Qurash", cyrillic: "Қураш" }, arabic: "قريش", verses: 4, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 107, name: "Al-Ma'un", uzbekName: { latin: "Mo'un", cyrillic: "Моун" }, arabic: "الماعون", verses: 7, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 108, name: "Al-Kawthar", uzbekName: { latin: "Kavsar", cyrillic: "Кавсар" }, arabic: "الكوثر", verses: 3, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 109, name: "Al-Kafirun", uzbekName: { latin: "Kofirun", cyrillic: "Кофирун" }, arabic: "الكافرون", verses: 6, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 110, name: "An-Nasr", uzbekName: { latin: "Nasr", cyrillic: "Наср" }, arabic: "النصر", verses: 3, revelation: { latin: "Madina", cyrillic: "Мадина" } },
  { number: 111, name: "Al-Masad", uzbekName: { latin: "Masad", cyrillic: "Масад" }, arabic: "المسد", verses: 5, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 112, name: "Al-Ikhlas", uzbekName: { latin: "Ixlos", cyrillic: "Ихлос" }, arabic: "الإخلاص", verses: 4, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 113, name: "Al-Falaq", uzbekName: { latin: "Falaq", cyrillic: "Фалақ" }, arabic: "الفلق", verses: 5, revelation: { latin: "Makka", cyrillic: "Макка" } },
  { number: 114, name: "An-Nas", uzbekName: { latin: "Nos", cyrillic: "Нос" }, arabic: "الناس", verses: 6, revelation: { latin: "Makka", cyrillic: "Макка" } }
];

export default function SurahList({ settings, onSurahSelect, scriptType, onScriptTypeChange, bookmarkedSurahs, onToggleBookmark }: {
  settings: any;
  onSurahSelect: (surahNumber: number) => void;
  scriptType: 'latin' | 'cyrillic';
  onScriptTypeChange: (type: 'latin' | 'cyrillic') => void;
  bookmarkedSurahs: number[];
  onToggleBookmark: (surahNumber: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = () => {
    let surahs = allSurahs;

    if (activeTab === 'bookmarked') {
      surahs = surahs.filter(surah => bookmarkedSurahs.includes(surah.number));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      surahs = surahs.filter(surah => {
        // Raqam bo'yicha qidirish
        if (query.match(/^\d+$/)) {
          return surah.number.toString().includes(query);
        }

        // Nom bo'yicha qidirish
        return surah.uzbekName.latin.toLowerCase().includes(query) ||
               surah.uzbekName.cyrillic.toLowerCase().includes(query) ||
               surah.name.toLowerCase().includes(query) ||
               surah.arabic.includes(query);
      });
    }

    return surahs;
  };

  const displaySurahs = filteredSurahs();

  return (
    <div className="px-4" style={{ fontFamily: settings.font }}>
      {/* Script Type Selector */}
      <div className="mb-6">
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-full p-1" style={{ backgroundColor: settings.isDark ? '#374151' : '#f3f4f6' }}>
            <button
              onClick={() => onScriptTypeChange('latin')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                scriptType === 'latin'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-white hover:text-gray-300'
              }`}
              style={{ fontFamily: settings.font, color: scriptType === 'latin' ? '#ffffff' : '#ffffff' }}
            >
              Lotin
            </button>
            <button
              onClick={() => onScriptTypeChange('cyrillic')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                scriptType === 'cyrillic'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-white hover:text-gray-300'
              }`}
              style={{ fontFamily: settings.font, color: scriptType === 'cyrillic' ? '#ffffff' : '#ffffff' }}
            >
              Кирилл
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: settings.textColor, fontFamily: settings.font }}
        >
          {scriptType === 'latin' ? 'Qur\'oni Karim' : 'Қуръони Карим'}
        </h2>
        <p
          className="text-sm text-center opacity-70"
          style={{ color: settings.textColor, fontFamily: settings.font }}
        >
          {scriptType === 'latin' ? 'Suralarni tanlang' : 'Сураларни танланг'}
        </p>
      </div>

      {/* Tab Selector */}
      <div className="mb-6">
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-full p-1" style={{ backgroundColor: settings.isDark ? '#374151' : '#f3f4f6' }}>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-blue-500 text-white shadow-md'
                  : settings.isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ fontFamily: settings.font }}
            >
              {scriptType === 'latin' ? 'Barchasi' : 'Барчаси'}
            </button>
            <button
              onClick={() => setActiveTab('bookmarked')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === 'bookmarked'
                  ? 'bg-blue-500 text-white shadow-md'
                  : settings.isDark ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{ fontFamily: settings.font }}
            >
              {scriptType === 'latin' ? 'Saqlangan' : 'Сақланган'} ({bookmarkedSurahs.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div
          className="flex items-center px-4 py-3 rounded-lg border"
          style={{
            backgroundColor: settings.isDark ? '#374151' : '#f9fafb',
            borderColor: settings.isDark ? '#4b5563' : '#e5e7eb'
          }}
        >
          <i
            className="ri-search-line mr-3"
            style={{ color: settings.textColor }}
          ></i>
          <input
            type="text"
            placeholder={scriptType === 'latin' ? 'Sura nomi yoki raqami...' : 'Сура номи ёки рақами...'}
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: settings.textColor, fontFamily: settings.font }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-4">
          <p
            className="text-sm opacity-70 text-center"
            style={{ color: settings.textColor, fontFamily: settings.font }}
          >
            {displaySurahs.length > 0
              ? `${displaySurahs.length} ta sura topildi`
              : scriptType === 'latin' ? 'Hech qanday sura topilmadi' : 'Ҳеч қандай сура топилмади'}
          </p>
        </div>
      )}

      {/* Surah List */}
      <div className="space-y-2">
        {displaySurahs.length === 0 && activeTab === 'bookmarked' && !searchQuery ? (
          <div className="text-center py-8">
            <i
              className="ri-bookmark-line text-4xl mb-4 opacity-50"
              style={{ color: settings.textColor }}
            ></i>
            <p
              className="opacity-60"
              style={{ color: settings.textColor, fontFamily: settings.font }}
            >
              {scriptType === 'latin' ? 'Hech qanday sura saqlanmagan' : 'Ҳеч қандай сура сақланмаган'}
            </p>
          </div>
        ) : displaySurahs.length === 0 && searchQuery ? (
          <div className="text-center py-8">
            <i
              className="ri-search-line text-4xl mb-4 opacity-50"
              style={{ color: settings.textColor }}
            ></i>
            <p
              className="opacity-60"
              style={{ color: settings.textColor, fontFamily: settings.font }}
            >
              {scriptType === 'latin' ? 'Qidiruv natijasi topilmadi' : 'Қидирув натижаси топилмади'}
            </p>
            <p
              className="text-sm opacity-50 mt-2"
              style={{ color: settings.textColor, fontFamily: settings.font }}
            >
              {scriptType === 'latin'
                ? 'Sura nomini yoki raqamini kiriting'
                : 'Сура номини ёки рақамини киритинг'}
            </p>
          </div>
        ) : (
          displaySurahs.map((surah) => (
            <div
              key={surah.number}
              className="w-full p-4 rounded-lg border transition-colors duration-200 shadow-sm hover:bg-green-50"
              style={{
                backgroundColor: settings.isDark ? '#374151' : '#ffffff',
                borderColor: settings.isDark ? '#4b5563' : '#e5e7eb',
                marginBottom: '12px'
              }}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSurahSelect(surah.number)}
                  className="flex items-center flex-1 hover:bg-green-100 dark:hover:bg-green-900 -m-2 p-2 rounded-lg transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 text-sm font-bold shadow-sm`}
                    style={{
                      backgroundColor: '#10b981',
                      color: '#ffffff'
                    }}
                  >
                    {surah.number}
                  </div>
                  <div className="text-left flex-1">
                    <h3
                      className="font-medium"
                      style={{ color: settings.textColor, fontFamily: settings.font }}
                    >
                      {surah.uzbekName[scriptType]}
                    </h3>
                    <p
                      className="text-sm opacity-60"
                      style={{ color: settings.textColor, fontFamily: settings.font }}
                    >
                      {surah.arabic} • {surah.verses} {scriptType === 'latin' ? 'oyat' : 'оят'} • {surah.revelation[scriptType]}
                    </p>
                  </div>
                  <i
                    className="ri-arrow-right-s-line text-xl opacity-60 ml-2"
                    style={{ color: settings.textColor }}
                  ></i>
                </button>

                <div className="flex items-center ml-2">
                  {/* Bookmark Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (bookmarkedSurahs.includes(surah.number) && activeTab === 'bookmarked') {
                        // Saqlangan suralar bo'limida bookmark tugmasini bosganda o'tsha suraga o'tish
                        onSurahSelect(surah.number);
                      } else {
                        // Oddiy bookmark toggle
                        onToggleBookmark(surah.number);
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={scriptType === 'latin' ? 'Saqlash' : 'Сақлаш'}
                    style={{
                      backgroundColor: bookmarkedSurahs.includes(surah.number) ? 'transparent' : 'transparent'
                    }}
                  >
                    <i
                      className={`${bookmarkedSurahs.includes(surah.number) ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-xl`}
                      style={{ color: bookmarkedSurahs.includes(surah.number) ? '#ffffff' : settings.textColor }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
