import React, { useState } from "react";
import { Upload, message } from "antd";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadDragger = ({ type }) => {
  const BASE_URL = process.env.REACT_APP_API;

  const uploadFile = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      responseType: "arraybuffer",
      onUploadProgress: (event) => {
        // console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };
    fmData.append("file", file);
    fmData.append("generate_type", type);
    axios
      .post(`${BASE_URL}/api/personal/generate_account`, fmData, config)
      .then((res) => {
        onSuccess(file);
        if ("content-disposition" in res.headers) {
          //设置下载文件类型为xlsx 不同的类型type也不一样，创建URL对象
          const url = window.URL.createObjectURL(
            new Blob([res.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
          );
          // 创建A标签
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          // 设置的下载文件文件名
          const fileName = decodeURI("失败文件" + file.name);
          // 触发点击方法
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          message.error("文件上传失败");
        } else {
          message.error("文件上传成功");
        }
      })
      .catch((err) => {
        const error = new Error("Some error");
        onError({ event: error });
      });
  };

  const props = {
    name: "file",
    customRequest: uploadFile,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
      } else if (status === "error") {
        message.error(`${info.file.name}文件上传失败`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
      <p className="ant-upload-hint">支持扩展名：.xlsx、.xls</p>
    </Dragger>
  );
};

export default UploadDragger;
