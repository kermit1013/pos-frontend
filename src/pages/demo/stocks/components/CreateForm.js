/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Form, Input, Modal } from 'antd';

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
    }

    okHandle() {
        const {form} = this.props;
        form.validateFields((err, fieldsValue) => {
            console.log('ok!');
        //   if (err) return;
        //   form.resetFields();
        //   handleAdd(fieldsValue);
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
           <Input placeholder="請輸入" />
          </Form.Item>
        </Modal>
      );
  }
}

export default CreateForm;
