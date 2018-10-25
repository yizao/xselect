# selectx
基于 Antd Select 组件封装，可使表单组件变成 Modal Form Component, XSelect 所有的属性同原Antd Select 属性。

## 📦 安装
```bash
yarn add selectx 
or
npm install xselectx --save
```
## 🔨 示例

```jsx
import XSelect from 'selectx';

<XSelect
  customLabelField="projectName"
  remoteUrl="/remote/data/url?page=1&size=10&searchKeyword="
/>
```

## ✨ API
* 继承于Antd Select 属性，参见 [Ant Design 文档](https://ant.design/components/select-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| recommend | 自定义默认选项值,  | Array | [] |
| customLabelField | 自定义label取值的field | Boolean | name |
| customeValueField | 自定义value取值的field | Boolean | id |
| remoteUrl | 获取远程数据的url地址（需自行解决跨域问题） | String | {} |




