import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadOss = ({
  onChange,
  fileList,
  type,
  size,
  isDisable = false,
  isads = false,
  isCut = false,
}) => {
  //使用
  // const normFile = (fileList) => fileList;
  // 放入Form.Item;
  // getValueFromEvent = { normFile };
  // valuePropName = "fileList";
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState();
  const [isUpload, setIsUpload] = useState(false);

  const BASE_URL = process.env.REACT_APP_API;
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";

    if (!isJpgOrPng) {
      message.error("只能上传JPG/PNG/GIF的文件");
    }
    return isJpgOrPng;
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = ({ fileList, file }) => {
    //自动切长图的上传图的改变
    if (isCut && file && file.response && file.response.data.length > 0) {
      setIsUpload(true);
      let fileCutObj = {};
      fileList = file.response.data.map((item, index) => {
        fileCutObj = {
          path: item,
          url: item,
          uid: index,
        };
        return fileCutObj;
      });
    } else {
      //小图的上传图的改变
      if (file.status === "done") {
        fileList = fileList.map((item) => {
          let fileObj = {
            path:
              (item.response && item.response.data) || item.path || item.url,
            url: (item.response && item.response.data) || item.path || item.url,
            uid: item.uid,
          };
          return fileObj;
        });
      }
    }
    if (isUpload) {
      message.success("连续上传长图请刷新网页");
      return;
    }
    onChange(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const data = (file) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    return {
      suffix: suffix,
      preffix: type,
    };
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload
        data={data}
        action={
          isCut
            ? `${BASE_URL}/api/common/cut_upload`
            : `${BASE_URL}/api/common/upload`
        }
        listType="picture-card"
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        fileList={fileList}
        accept={isads ? ".jpg, .png, .gif" : ".jpg, .png"}
        disabled={isDisable}
        showUploadList={{ showRemoveIcon: !isCut }}
      >
        {fileList && fileList.length >= size ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img src={previewImage} alt="avatar" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default UploadOss;
