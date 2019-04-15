import React, { Component } from 'react';
import { Modal } from 'antd';
import { createForm } from 'redux-form-utils';
import formConfig from './Modal.config';

@createForm(formConfig)
export default class ArticleModal extends Component {
  render() {
    const { title, desc, date } = this.props.fields;
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        onOk={this.props.addArticle}
      >
        {(!this.props.error) ? (<div className="form">
          <div className="control-group">
            <label>标题</label>
            <input type="text" {...title} />
          </div>
          <div className="control-group">
            <label>描述</label>
            <textarea {...desc} />
          </div>
          <div className="control-group">
            <label>发布日期</label>
            <input type="date" {...date} />
          </div>
        </div>) : <div>
          <span>error</span>
          <span onClick={this.props.showModal}>(click to goback)</span>
          <span onClick={this.props.hideModal}>(click to hidden)</span>
        </div>}
      </Modal>
    );
  }
}
