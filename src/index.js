import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';


const Option = Select.Option;

export default class XSelect extends PureComponent {

  static propTypes = {
    remoteUrl: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    recommend: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.func,
  }

  static defaultProps = {
    value: undefined,
    recommend: [],
    onChange: () => {},
    children: option => <Option key={option.value} value={option.value || ''}>{option.text}</Option>,
  }

  constructor(props) {
    super(props);

    this.fetchData = debounce(this.fetchData, 300);
  }

  state = {
    data: [],
    value: undefined,
    fetching: false,
  }

  componentDidMount() {
    const { recommend = [], value } = this.props;

    this.setState({ value })
    this.fetchData('', (data) => {
      if (recommend && recommend.length > 0) {
        recommend.map((obj) => {
          const find = data.find(o => o.value === obj.value);
          if (!find) {
            data.push({ text: obj.text, value: obj.value })
          }
        })
      }
    });
  }

  fetchData = (value = '', cb = null) => {
    const { remoteUrl = '', customLabelField = 'name', customeValueField = 'id' } = this.props;

    if (remoteUrl) {
      this.setState({ data: [], fetching: true });

      fetch(`${remoteUrl}${value}`)
        .then(response => response.json())
        .then((res) => {
          if (res && res.code === 1) {
            const resData = res.data || [];
            const data = resData.map(o => ({
              text: o[customLabelField],
              value: o[customeValueField],
            }));
            if (cb) {
              cb(data)
            }
            this.setState({ data, fetching: false });
          }
        })
    }
  }

  handleChange = (value) => {
    this.setState({ value, fetching: false })
    this.triggerChange(value)
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { style, ...rest } = this.props;
    const { data = [], fetching, value } = this.state;
    return (
      <Select
        {...rest}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchData}
        onChange={this.handleChange}
        style={style ? style : { width: '100%' }}
        value={value}
      >
        {data.length > 0 && data.map(o => this.props.children(o))}
      </Select>
    )
  }
}
