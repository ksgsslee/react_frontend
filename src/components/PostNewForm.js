import React, { useState } from 'react';
import { Upload, Form, Input, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getBase64 from 'utils/base64';
import { axiosInstance } from 'api';
import { useAppContext } from 'store';
import { parseErrorMessages } from 'utils/forms';

const PostNewForm = () => {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const [fileList, setFileList] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const onFinish = async (fieldValues) => {
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('location', location);
    fileList.forEach((file) => {
      formData.append('photo', file.originFileObj);
    });
    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      await axiosInstance.post('api/posts/', formData, {
        headers,
      });
      console.log('Upload 성공');
    } catch (error) {
      if (error.response) {
        console.log(error);
        const { data: fieldsErrorMessages } = error.response;
        setFieldErrors(parseErrorMessages(fieldsErrorMessages));
      }
    }
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  return (
    <Form {...layout} onFinish={onFinish} autoComplete={'false'}>
      <Form.Item
        label="Caption"
        name="caption"
        rules={[
          { required: true, message: 'Caption을 입력 해주세요.' },
          { min: 1, message: '5글자 입력해주세요.' },
        ]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: 'Location을 입력 해주세요.' },
          { min: 1, message: '5글자 입력해주세요.' },
        ]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: '사진을 입력해주세요. ' }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}
          beforeUpload={() => {
            return false;
          }}
        >
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Modal
        open={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img
          src={previewPhoto.base64}
          style={{ width: '100%' }}
          alt="Preview"
        />
      </Modal>
      <hr />
      {JSON.stringify(fileList)}
    </Form>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default PostNewForm;
