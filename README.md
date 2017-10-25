# Chrome Extension to export QuickBooks Online Audit Table to CSV


### Getting Started

- `git clone ssh://git@bitbucket.org/minimul/qbo-audit-log-to-csv.git`
- `cd qbo-audit-log-to-csv`
- `npm install --global yo gulp-cli bower`
- `npm install -g generator-chrome-extension`
- Within Chrome go to `chrome://extensions`
- Install the extension in developer mode.
  - The folder you want to navigate to is `qbo-audit-log-to-csv\app`
  - The `dist` folder is for production distribution
- `gulp watch`
- Almost all of the code is in `app\scripts.babel\contentscript.js`
