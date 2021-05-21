import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import request from "../utils/request";

const UploadPolyv = ({ videoId, strsList, setStrs }) => {
  const BASE_URL = process.env.REACT_APP_API;

  const hanleRemove = async (file) => {
    const res = await request
      .delete(`/api/polyv/caption/delete`, {
        data: {
          vid: videoId,
          ranks: file.uid,
        },
      })
      .then((res) => {
        message.success("删除成功");
      });
  };

  const hanleChange = async () => {
    const captionList = await request.get(
      `/api/polyv/caption/list?vid=${videoId}`
    );
    let FileList = [];
    captionList.srts.map((item) => {
      FileList.push({
        uid: item.rank,
        name: item.name,
        status: "done",
      });
    });
    setStrs(FileList);
  };
  const props = {
    action: `${BASE_URL}/api/polyv/caption/upload`,
    onChange({ file, fileList }) {
      hanleChange();
    },
    accept: ".srt",
    fileList: strsList.length > 0 && strsList,
  };

  const data = (file) => {
    const suffix = file.name.slice(0, file.name.indexOf("."));
    return {
      vid: videoId,
      title: suffix,
    };
  };

  return (
    <>
      <Upload {...props} data={data} onRemove={(file) => hanleRemove(file)}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};

export default UploadPolyv;
