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

class Stocks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    };

  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields) => {
    console.log(fields);
    this.handleModalVisible();
  };



  render(){
    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      },
      {
        key: "3",
        name: "胡彦梅",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ];
  
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) =>
          dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => message.success("模仿删除")}
            >
              <a href="">刪除</a>
            </Popconfirm>
          ) : null
      }
    ];
  const { modalVisible } = this.state;  
  const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
  };

  return (
      <div>
        <Card className="card-wrap" title="庫存管理">
        <Button type="primary" onClick={()=>this.handleModalVisible(true)}>新增</Button>
          <Table dataSource={dataSource} 
          columns={columns}  
          pagination={{
              defaultPageSize: 10,
              total: dataSource.length,
              pageSizeOptions: ["10", "20", "30", "40"],
            }}/>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </div>
    );
  }
}

export default Stocks;
