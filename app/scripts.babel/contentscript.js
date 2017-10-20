'use strict';

class QboAuditLog {
  constructor(){
    [this.date, this.time] = new Date().toLocaleString('en-US').split(', ');
    this.init()
  }

  init() {
    const domCheck = setInterval( () => {
      console.log('QboAudit loop running');
      if(document.querySelector('.filterBarContainer')){
        clearInterval(domCheck)
        this.createLinks()
      } else {
        console.log('QboAudit miss');
      }
    }, 2000)
  }

  createLinks(){
    this.csvLink()
    this.removeDupsLink()
  }

  csvLink(){
    const link = document.createElement('a')
    link.innerHTML = 'CSV'
    link.addEventListener('click', () => {
      this.triggerDownload()
      return false
    })
    return document.querySelector('.filterBarContainer').appendChild(link)
  }

  removeDupsLink(){
    const link = document.createElement('a')
    link.innerHTML = 'Remove Dups'
    link.style.paddingLeft = '10px'
    link.addEventListener('click', () => {
      this.removeDups()
      return false
    })
    return document.querySelector('.filterBarContainer').appendChild(link)
  }

  download(csv, filename) {
    const csvFile = new Blob([csv], {type: 'text/csv'})
    const downloadLink = document.createElement('a')
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
    console.dir(downloadLink);
    downloadLink.dispatchEvent(new MouseEvent('click'))
    document.body.removeChild(downloadLink)
  }

  triggerDownload() {
    let csv = []
    const rows = this.getRows()
    for (let i = 0; i < rows.length; i++) {
      let row = [], cols = rows[i].querySelectorAll('td')
      for (let j = 0; j < cols.length; j++){
        row.push(`"${cols[j].innerText}"`)
      }
      csv.push(row.join(','))
    }
    return this.download(csv.join('\n'), `daily-report-${this.date}.csv`)
  }

  getRows(){
    return document.querySelectorAll('.dgrid-content table tr')
  }

  removeDups() {
    const sel = '.dgrid-column-4';
    const els = document.querySelectorAll(sel)
    els.forEach((item) => {
      const name = item.innerText
      let seen = {}
      this.getRows().forEach((tr) => {
        const txt = tr.querySelector(sel).innerText
        //console.log(`QboAudit ${txt}`);
        if(txt === ''){
          tr.closest('div').remove()
          return
        }
        if (name === txt){
          if(seen[txt]){
            tr.closest('div').remove()
          } else {
            seen[txt] = true
          }
        }
      })
    })
  }

}

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
  if (request == 'runQboAuditLog') 
    new QboAuditLog()
}); 

