# 小红书关键词采集插件

一个用于采集小红书搜索框下拉关键词的 Chrome 浏览器插件。

## 功能特点

- 一键采集搜索框下拉关键词
- 支持快捷键操作
- 支持全部采集和部分采集
- 自动复制到剪贴板
- 简洁的用户界面

## 安装方法

1. 下载源代码或克隆仓库
2. 打开 Chrome 浏览器，进入扩展程序页面：`chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择插件所在文件夹（包含 manifest.json 的目录）

## 使用说明

1. 访问小红书网站
2. 在搜索框中输入关键词，等待下拉框显示搜索建议
3. 按下 `Shift + Ctrl + G` 显示采集工具弹框
4. 在弹框显示后：
   - 按 `Ctrl + 1` 执行全部采集
   - 按 `Ctrl + 2` 按钮执行部分采集(待实现)
5. 采集的关键词会自动复制到剪贴板

## 快捷键列表

- `Shift + Ctrl + G`: 显示/隐藏采集工具弹框
- `Ctrl + 1`: 全部采集（仅在弹框显示时有效）
- `Ctrl + 2`: 部分采集（仅在弹框显示时有效）

## 文件结构

codes/labels/

├── manifest.json # 插件配置文件
├── content.js # 主要功能实现
├── styles.css # 样式文件
└── README.md # 说明文档

# 开发说明

### manifest.json
配置插件的基本信息、权限和资源。

### content.js
实现核心功能：
- 关键词采集逻辑
- 快捷键处理
- 用户界面交互

### styles.css
定义插件的视觉样式：
- 弹框样式
- 按钮样式
- 消息提示样式

## 注意事项

1. 确保在使用插件时小红书搜索框的下拉建议是可见的
2. 插件需要剪贴板权限来复制采集的关键词
3. 建议在采集前先确认搜索建议是否完全加载

## 更新日志

### v1.0
- 初始版本发布
- 实现基本的关键词采集功能
- 支持快捷键操作
- 添加用户界面

## 待实现功能

- [ ] 部分采集功能
- [ ] 导出为文件
- [ ] 历史记录
- [ ] 自定义快捷键
- [ ] 批量采集

## 问题反馈

如果遇到问题或有功能建议，请提交 Issue。

