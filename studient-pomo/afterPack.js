const fs = require('fs');
const path = require('path');

exports.default = async function (context) {
  const localesPath = path.join(context.appOutDir, 'locales');
  
  if (!fs.existsSync(localesPath)) {
    return;
  }

  console.log('🔧 Removing unused locale files to reduce size...');
  
  const locales = fs.readdirSync(localesPath);
  const keepLocales = ['en-US.pak'];
  
  let removedCount = 0;
  locales.forEach(locale => {
    if (!keepLocales.includes(locale)) {
      const localePath = path.join(localesPath, locale);
      fs.unlinkSync(localePath);
      removedCount++;
    }
  });
  
  console.log(`✅ Removed ${removedCount} unused locale files`);
};
