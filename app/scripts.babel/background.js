'use strict';

console.log('QboAudit Background Script');

chrome.runtime.onInstalled.addListener(details => {
  console.log('QboAudit previousVersion', details.previousVersion);
})

chrome.webNavigation.onHistoryStateUpdated.addListener( (details) => {
  console.log('QboAudit Page uses History API and we heard a pushSate/replaceState.')
  if(typeof chrome._LAST_RUN === 'undefined' || notRunWithinTheLastSecond(details.timeStamp)){
    chrome._LAST_RUN = details.timeStamp
    chrome.tabs.getSelected(null, function (tab) { 
      if(tab.url.match(/.*\/app\/auditlog$/)){
        chrome.tabs.sendRequest(tab.id, 'runQboAuditLog')
      }
    })
  }
})

const notRunWithinTheLastSecond = (dt) => {
  const diff = dt - chrome._LAST_RUN
  if (diff < 1000){
    return false
  } else {
    return true
  }
}
