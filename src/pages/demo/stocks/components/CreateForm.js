/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Form, Input, Modal } from 'antd';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.okHandle = this.okHandle.bind(this);
    }

    okHandle() {
        const { form, handleAdd } = this.props;
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          handleAdd(fieldsValue);
        });
    };

  render(){
    const { modalVisible, form, handleModalVisible } = this.props;
    return (
        <Modal
          destroyOnClose
          title="新增庫存"
          visible={modalVisible}
          onOk={this.okHandle}
          onCancel={() => handleModalVisible()}
        >
          <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名稱">
           <Input placeholder="請輸入名稱" />
          </Form.Item>
          <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 10 }} label="分類">
           <Input placeholder="請輸入分類" />
          </Form.Item>
          <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 8 }} label="容量">
           <Input placeholder="請輸入容量" />
          </Form.Item>
          <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 5 }} label="單位">
           <Input placeholder="請輸入單位" />
          </Form.Item>
          <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 8 }} label="最大數量">
           <Input placeholder="請輸入最大數量" />
          </Form.Item>
        </Modal>
      );
  }
}
const WrappedCreateForm = Form.create({ name: 'createForm' })(CreateForm);
export default WrappedCreateForm;
