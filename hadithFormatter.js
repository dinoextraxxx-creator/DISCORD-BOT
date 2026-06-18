/**
 * 📖 hadithFormatter.js
 * مسؤول عن تحويل الحديث إلى شكل العرض النهائي داخل Discord
 * - تنسيق موحد
 * - دعم البيان عند الحاجة
 * - مسافات واضحة بين الفقرات
 * - دعم الحديث القدسي (قال الله تعالى)
 */

function formatHadith(hadith) {
  let message = "";

  // 🔷 التحقق من الحديث القدسي (اختياري لو أضفت flag لاحقًا)
  const isQudsi = hadith.isQudsi === true;

  /**
   * 🔸 السطر الأول (نص الحديث)
   */
  if (isQudsi) {
    message += `🔸 ➤ **قال رسول الله ﷺ: قال الله تعالى:** «${hadith.text}»\n\n`;
  } else {
    message += `🔸 ➤ **قال رسول الله ﷺ:** «${hadith.text}»\n\n`;
  }

  /**
   * 👤 الراوي
   */
  message += `👤 ➤ **الراوي:** ${hadith.rawi}\n\n`;

  /**
   * 📚 المصدر
   */
  message += `📚 ➤ **المصدر:** ${hadith.source}\n\n`;

  /**
   * 🕯️ البيان (يظهر فقط عند الحاجة)
   * - يتم عرضه فقط إذا كان موجودًا
   * - يكون مختصر جدًا
   */
  if (hadith.bayan && hadith.bayan.trim() !== "") {
    message += `🕯️ ➤ **بيان:** ${hadith.bayan}\n\n`;
  }

  return message;
}

module.exports = {
  formatHadith
};
