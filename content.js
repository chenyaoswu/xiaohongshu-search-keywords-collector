let isDialogVisible = false; // 跟踪弹框是否显示

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showDialog") {
      showCollectDialog();
    }
  });

// 监听快捷键
document.addEventListener('keydown', function (e) {
    // 显示弹框的快捷键
    if (e.shiftKey && e.ctrlKey && e.key.toLowerCase() === 'g') {
        showCollectDialog();
    }
    
    // 只有在弹框显示时才处理 Ctrl+1 和 Ctrl+2
    if (isDialogVisible && e.ctrlKey) {
        if (e.key === '1') {
            // 触发全部采集
            const dialog = document.querySelector('.xhs-keyword-dialog');
            if (dialog) {
                collectKeywords();
                dialog.remove();
                isDialogVisible = false;
            }
        } else if (e.key === '2') {
            // 触发部分采集
            const dialog = document.querySelector('.xhs-keyword-dialog');
            if (dialog) {
                // TODO: 实现部分采集逻辑
                dialog.remove();
                isDialogVisible = false;
            }
        }
    }
});

// 显示采集对话框
function showCollectDialog() {
    console.log('显示采集对话框');
    const dialog = document.createElement('div');
    dialog.className = 'xhs-keyword-dialog';
    dialog.innerHTML = `
    <div class="dialog-content">
      <button class="collect-all">全部采集 (Ctrl+1)</button>
      <button class="collect-partial">部分采集 (Ctrl+2)</button>
    </div>
  `;

    // 阻止事件冒泡
    dialog.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    // 保持搜索框焦点
    const searchInput = document.querySelector('input[type="search"]');

    // 绑定全部采集按钮点击事件
    const collectAllBtn = dialog.querySelector('.collect-all');
    collectAllBtn.addEventListener('click', (e) => {
        console.log('点击全部采集按钮');
        e.preventDefault();
        e.stopPropagation();
        collectKeywords();
        dialog.remove();
        isDialogVisible = false;
        if (searchInput) {
            searchInput.focus();
        }
    });

    // 绑定部分采集按钮点击事件
    const collectPartialBtn = dialog.querySelector('.collect-partial');
    collectPartialBtn.addEventListener('click', (e) => {
        console.log('点击部分采集按钮');
        e.preventDefault();
        e.stopPropagation();
        // TODO: 实现部分采集逻辑
        dialog.remove();
        isDialogVisible = false;
        if (searchInput) {
            searchInput.focus();
        }
    });

    document.body.appendChild(dialog);
    isDialogVisible = true;
}

// 采集关键词
function collectKeywords() {
    console.log('开始采集关键词...');

    // 获取搜索建议容器
    const sugContainer = document.querySelector('.sug-container-wrapper');
    if (!sugContainer) {
        console.log('未找到建议容器');
        showMessage('未找到搜索建议容器');
        return;
    }

    // 获取所有建议项
    const sugItems = sugContainer.querySelectorAll('.sug-item');
    console.log(`找到 ${sugItems.length} 个建议项`);

    if (!sugItems.length) {
        showMessage('未找到关键词，请确保下拉框显示');
        return;
    }

    // 收集关键词
    const keywords = Array.from(sugItems).map(item => {
        // 获取所有 span 元素
        const spans = item.querySelectorAll('div[data-v-11280b1a] span');
        // 连接所有文本内容
        const keyword = Array.from(spans)
            .map(span => span.textContent)
            .join('');
        console.log('收集到关键词:', keyword);
        return keyword;
    }).filter(Boolean); // 过滤空值

    console.log('收集到的所有关键词:', keywords);

    if (keywords.length > 0) {
        // 保存到剪贴板
        navigator.clipboard.writeText(keywords.join('\n'))
            .then(() => {
                console.log('关键词已复制到剪贴板');
                showMessage(`成功采集 ${keywords.length} 个关键词！`);
            })
            .catch(err => {
                console.error('复制失败:', err);
                showMessage('复制失败：' + err.message);
            });
    } else {
        console.log('未找到有效关键词');
        showMessage('未找到有效关键词！');
    }
}

// 显示消息
function showMessage(text) {
    console.log('显示消息:', text);

    const message = document.createElement('div');
    message.className = 'xhs-message';
    message.textContent = text;

    // 阻止消息框的事件冒泡
    message.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}