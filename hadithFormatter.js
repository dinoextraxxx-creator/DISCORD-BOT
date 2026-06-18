/**
 * 📖 Hadith Formatter System
 * مسؤول عن تنسيق الحديث داخل Embed بشكل موحد
 */

function formatHadith(hadith) {
  const base = `
🔸 ➤ **قال رسول الله ﷺ:** «${hadith.text}»

👤 ➤ **الراوي:** ${hadith.rawi}

📚 ➤ **المصدر:** ${hadith.source}
`;

  // إضافة "بيان" فقط إذا كان موجود
  const bayanPart = hadith.bayan
    ? `\n📖 ➤ **بيان:** ${hadith.bayan}\n`
    : "";

  return base + bayanPart;
}

module.exports = { formatHadith };
