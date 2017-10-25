# Chrome Extension to export QuickBooks Online Audit Log Table to CSV

You can export the Audit Log Table to CSV as well as remove duplicates (based only the "Name" column)


![Animated GIF Using the QBO Audit Log to CSV Chrome Extension](qbo-audit-log-to-csv.gif?raw=true "Title")


### Getting Started

- `git clone git://git@github.com:minimul/qbo-audit-log-to-csv.git`
- `cd qbo-audit-log-to-csv`
- Within Chrome go to `chrome://extensions`
  - Install the extension in developer mode.
    - **If you want to modify the extension**
    - `gulp watch`
    - On the `chrome://extensions` page the folder you want to navigate to is `qbo-audit-log-to-csv\app`
    - Almost all of the code is in `app\scripts.babel\contentscript.js` and `app\scripts.babel\background.js`
    - **If you want to just use the extension**
    - `gulp build`
    - On the `chrome://extensions` page the folder you want to navigate to is `qbo-audit-log-to-csv\dist`
