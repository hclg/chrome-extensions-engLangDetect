/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-16 23:35:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-09-10 14:29:46
 * @FilePath: \chrome-extensions-samplesc:\Users\HCLG\code\Google扩展\chrome-extensions-engLangDetect\popup.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
document.addEventListener('DOMContentLoaded', function() {
    const countButton = document.getElementById('countButton');
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');

    countButton.addEventListener('click', function() {
        const url = urlInput.value;

        if (url) {
            // 发送抓取请求
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { action: 'countWords', url }, function(response) {
                    if (response && response.wordCounts) {
                        const wordCounts = response.wordCounts;

                        // 对单词计数进行排序
                        const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

                        // 创建结果字符串
                        const result = sortedWords.map(word => `${word}: ${wordCounts[word]}`).join('<br>');

                        // 在页面上显示结果
                        resultDiv.innerHTML = result;
                    }
                });
            });
        }
    });
});