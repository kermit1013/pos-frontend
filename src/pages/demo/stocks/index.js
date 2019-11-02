/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  Card,
  Table,
  Popconfirm,
  message,
  Button
} from "antd";
import CreateForm from "./components/CreateForm"
import UploadForm from "./components/UploadForm"
import axios from "@axios";

class Stocks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      createModalVisible: false,
      uploadModalVisible: false,
      dataSource: [],
    };
  }

  componentDidMount(){
    this.getAllStocks();
  }

  getAllStocks(){
    axios
    .request({
      url: "http://localhost:8080/stocks"
    })
    .then(res => {
      console.log("res", res);
      this.setState({
        dataSource: res.data
      })
    })
    .catch(error => {
      console.log("error");
      message.error("請求發生錯誤");
    });
  }

  handleCreateModalVisible = (flag) => {
    this.setState({
      createModalVisible: !!flag,
    });
  };
  handleUploadModalVisible = (flag) => {
    this.setState({
      uploadModalVisible: !!flag,
    });
  };

  handleAdd = (fields) => {
    axios
    .request({
      url: "http://localhost:8080/stocks",
      data: fields,
      method:"post"
    })
    .then(res => {
      console.log("res", res);
      this.getAllStocks()
      message.success("已成功新增");
    })
    .catch(error => {
      console.log("error");
      message.error("請求發生錯誤");
    });
    this.handleModalVisible();
  };



  render(){
    const columns = [
      {
        title: "產品名稱",
        dataIndex: "name",
        key: "name",
        
      },
      {
        title: "分類",
        dataIndex: "category",
        key: "category",
        
      },
      {
        title: "容量",
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: "單位",
        dataIndex: "unit",
        key: "unit",
      },
      {
        title: "最大數量",
        dataIndex: "maximum_quantity",
        key: "maximum_quantity",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) =>
        this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                console.log(text,record);
                axios
                .request({
                  url: `http://localhost:8080/stocks/${record.stock_id}`,
                  method:"delete"
                })
                .then(res => {
                  console.log("res", res);
                  this.getAllStocks()
                  message.success("已成功删除")
                })
                .catch(error => {
                  console.log("error");
                  message.error("請求發生錯誤");
                });
              }}
            >
              <a href="">刪除</a>
            </Popconfirm>
          ) : null
      }
    ];
  const { createModalVisible, uploadModalVisible } = this.state;  
  const createParentMethods = {
      handleAdd: this.handleAdd,
      handleCreateModalVisible: this.handleCreateModalVisible,
  };

  const uploadParentMethods = {
    handleUploadModalVisible: this.handleUploadModalVisible,
};

  return (
      <div>
        <Card className="card-wrap" title="庫存管理">
        <Button type="primary" onClick={()=>this.handleCreateModalVisible(true)}>新增</Button>
        <Button type="dashed" onClick={()=>this.handleUploadModalVisible(true)}>匯入</Button>
        
          <Table dataSource={this.state.dataSource} 
          columns={columns}  
          pagination={{
              defaultPageSize: 10,
              total: this.state.dataSource.length,
              pageSizeOptions: ["10", "20", "30", "40"],
            }}/>
        </Card>
       
        <CreateForm {...createParentMethods} modalVisible={createModalVisible} />
        <UploadForm {...uploadParentMethods} modalVisible={uploadModalVisible} />
      </div>
    );
  }
}

export default Stocks;
