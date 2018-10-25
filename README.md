# selectx
基于 Antd Select 组件封装，可使表单组件变成 Modal Form Component, XSelect 所有的属性同原Antd [Select](https://ant.design/components/select-cn/) 属性。

## 📦 安装
```bash
yarn add selectx 
or
npm install selectx --save
```
## 🔨 示例

```jsx
import XSelect from 'selectx';

// 默认
<XSelect
  remoteUrl="/remote/data/url?page=1&size=10&searchKeyword="
/>

// 自定义选项展示
<XSelect
  showSearch
  popContainer="developerFormWrap"
  customLabelField="realNameCn"
  customeValueField="empId"
  placeholder="搜索开发人员"
  remoteUrl="/api/user?size=30&w="
  style={{ width: '100%' }}
>
  {o => (<Option key={o.value} value={o.value}>{`${o.text}(${o.value})`}</Option>)}
</XSelect>
```

## ✨ API
* 继承于Antd Select 属性，参见 [Ant Design 文档](https://ant.design/components/select-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| remoteUrl | 获取远程数据的url地址（需自行解决跨域问题） | String | - |
| value | 指定当前选中的条目 | string\|string[]\|number\|number[] | undefined |
| customLabelField | 自定义label取值的字段名称 | Boolean | name |
| customeValueField | 自定义value取值的字段名称 | Boolean | id |
| recommend | 自定义默认选项值，为对象数组,其中的对象key定义为：text、value  | Array | [] |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | - |
| children | 自定义选项值展示 | function(optionObject) | - |







