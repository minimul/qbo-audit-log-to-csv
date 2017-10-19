'use strict';

console.log('QboAudit Background Script');

chrome.runtime.onInstalled.addListener(details => {
  console.log('QboAudit previousVersion', details.previousVersion);
})

chrome.webNavigation.onHistoryStateUpdated.addListener( (details) => {
  console.log('QboAudit Page uses History API and we heard a pushSate/replaceState.')
  if(typeof chrome._URL === 'undefined' || chrome._URL !== details.url){
    chrome._URL = details.url
    chrome.tabs.getSelected(null, function (tab) { 
      if(tab.url.match(/.*\/app\/auditlog$/)){
        chrome.tabs.sendRequest(tab.id, 'runQboAuditLog')
      }
    })
  }
})
