import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const EditUserOverview = Form.create()(
  (props) => {
    const { firstName, lastName, country, state, city, about} = props.overview;  
    const { visible, confirmUpdate, onCancel, onSave, form } = props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Update your profile"
        okText="Save Profile"
        onCancel={onCancel}
        onOk={onSave}
        confirmLoading={confirmUpdate}
      >
        <Form layout="vertical">
            <FormItem label="Profile Picture (Url)">
                {getFieldDecorator('profilePic', {
                    rules: [
                        { type: 'url', message: 'The input is not valid url!'},
                    ],
                })(<Input />)}
            </FormItem>
            <FormItem label="First Name">
                {getFieldDecorator('firstName', {
                    initialValue: firstName,
                    rules: [
                        { required: true, message: 'Please provide your First Name!' },
                        { min: 2, message: 'First Name is too short!'},
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="Last Name">
                {getFieldDecorator('lastName', {
                    initialValue: lastName,
                    rules: [
                        { required: true, message: 'Please provide your Last Name!' },
                        { min: 2, message: 'Last Name is too short!'},
                    ],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="Country">
                {getFieldDecorator('country', {
                    initialValue: country,
                    rules: [{ required: true, message: 'Your Country is required to find matches!' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="Province/State">
                {getFieldDecorator('state', {
                    initialValue: state,
                    rules: [{ required: true, message: 'Your Region is required to find matches!' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="City">
                {getFieldDecorator('city', {
                    initialValue: city,
                    rules: [{ required: true, message: 'Your City is required to find matches!' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="Postal Code">
                {getFieldDecorator('postalCode')(<Input />)}
            </FormItem>
            <FormItem label="About">
                {getFieldDecorator('about', {
                    initialValue: about,
                })(
                    <Input.TextArea rows={3} />
                )}
            </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default EditUserOverview;