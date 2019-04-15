import React, { Component } from 'react';
import { Table, Modal } from 'antd';

const columns = [{
  title: '标题',
  dataIndex: 'title',
  width: 100,
}, {
  title: '描述',
  dataIndex: 'desc',
  width: 400,
}, {
  title: '发布日期',
  dataIndex: 'date',
  width: 100,
}, {
  title: '操作',
  render(text, record) {
    return <a className="op-btn" onClick={this.handleDelete.bind(this, record)}>删除</a>;
  },
}];

const obj = {
  arr: ['a', 'b', 'c'],
  type: 'red'
}
const s = {}
const Reduce = (state , action) => {
  console.log(state, action)
  if(action.type === 'red') {
    return action.arr.reduce(Reduce, state)
  } else {
    return state
  }
}
Reduce(s, obj)
export default class ArticleTable extends Component {
  componentDidMount() {
    this.props.loadArticles()
      .then(
        data => console.log(data),
        err => console.log(err)
      )
      .catch(err => console.log(err))
  }

  handleDelete(record) {
    Modal.confirm({
      title: '提示',
      content: '确认要删除该文章吗？',
      onOk: () => {
        this.props.deleteArticle(record)
          .then(
            data => console.log('success', data),
            err => console.log('error', err)
          )
          .catch(err => console.log(err))
      }
    });
  }

  render() {
    return (
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="请输入关键字"
            value={this.props.query || ''}
            onChange={this.props.changeQuery}
          />
          <button onClick={this.props.search}>搜索</button>
        </div>
        {/*  
          this.props.error
          ?  <div>error</div>
          : */  (<Table columns={columns.map(c => c.render ? ({
            ...c,
            render: c.render.bind(this)
          }) : c)} dataSource={this.props.articles} />)
        }
      </div>
    );
  }
}
