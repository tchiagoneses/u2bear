"use strict";var u2bear=angular.module("u2bear.filters",[]),filters={};filters.time=function(){return function(r){if(isNaN(r))return"";var e=Math.floor(r/60),t=r%60;return 10>t&&(t="0"+t),e+":"+t}},u2bear.filter(filters);