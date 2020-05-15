// ==UserScript==
// @name         bili danmaku replace
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  replace bilibili danmaku
// @author       You
// @match        https://www.bilibili.com/video/*
// @require      https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var input_tag=document.createElement('input')
    input_tag.setAttribute('type','file')
    //input_tag.setAttribute('onchange',"function input_danmaku(files){files[0].text().then(function(i){danmaku=i});console.log(danmaku)}")
    input_tag.style.position='fixed'
    input_tag.style.bottom=0
    input_tag.addEventListener("change", input_danmaku)
    document.getElementsByTagName('body')[0].appendChild(input_tag)

    var danmaku='2'
    function input_danmaku(){
        input_tag.files[0].text().then(function(i){danmaku=i;console.log(danmaku)})
        console.log(danmaku)
    }
    ah.proxy({
        onRequest: (config, handler) => {
            handler.next(config);
        },
        //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
        onError: (err, handler) => {
            handler.next(err)
        },
        //请求成功后进入
        onResponse: (response, handler) => {
            var re = /api\.bilibili\.com\/x\/v[1-2]\/dm\/list\.so\?oid=\d+/
            var re1 = /api\.bilibili\.com\/x\/v[1-2]\/dm\/history\?type=1/
            //console.log(response.config.url)
            //console.log(response.response)
            //console.log(danmaku)
            if (re1.test(response.config.url) && danmaku!=''){
                console.log('match the danmaku!')
                console.log(response.response)
                response.response=danmaku
            }
            handler.next(response)
        }
    })
    // Your code here...
})();