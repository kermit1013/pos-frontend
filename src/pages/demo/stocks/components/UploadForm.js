import { Upload, Button, Icon, message, Modal } from 'antd';
import React from "react";
import axios from "@axios";

class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    
}
  
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const { handleUploadModalVisible } = this.props;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    axios.
    request({
      url: "http://localhost:8080/stocks/import",
      method: 'post',
      processData: false,
      data: formData
    })
    .then(res => {
      this.setState({
        fileList: [],
        uploading: false,
      });
      handleUploadModalVisible();
      message.success('匯入成功!');
    })
    .catch(error => {
      console.log("error");
      message.error("請求發生錯誤");
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const { modalVisible, handleUploadModalVisible } = this.props;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Modal
      destroyOnClose
      title="匯入庫存"
      visible={modalVisible}
      footer={null}
      onCancel={() => handleUploadModalVisible()}
    >
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
      </Modal>
    );
  }
}

export default UploadComponent;