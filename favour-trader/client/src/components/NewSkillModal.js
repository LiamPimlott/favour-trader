import React from 'react';
import { Modal, Form, Input, Select, Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;
const FormItem = Form.Item;

const NewSkillModal = Form.create()(
  (props) => {
    const skillset = props.skillset;
    const categories = props.categories;  
    const { visible, confirmNew, onCancel, onSave, form } = props;
    const { getFieldDecorator } = form;

    function handleBlur() {
        console.log('blur');
    }
      
    function handleFocus() {
        console.log('focus');
    }

    return (
      <Modal
        visible={visible}
        title="Add A New Skill To Your Profile"
        okText="Save"
        onCancel={onCancel}
        onOk={onSave}
        confirmLoading={confirmNew}
      >
        <Form layout="vertical">
            <FormItem label="Add to">
                {getFieldDecorator('skillSet', {
                    rules: [{ required: true, message: 'You must choose where to add this skill!' }]
                })(
                    <RadioGroup>
                        <RadioButton value="has">Skills I Have</RadioButton>
                        <RadioButton value="wants">Skills I Need</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem label="Skill Category">
                {getFieldDecorator('skillCategory', {
                    rules: [{ required: true, message: 'You must select a category!' }]
                })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a Category"
                        optionFilterProp="children"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            (categories !== [] ) ? (
                                categories.map( category => {
                                    return (<Option key={category.skill} value={category._id}>{category.skill}</Option>)
                                })
                            ) : ('')
                        }
                    </Select>
                )}
            </FormItem>
            <FormItem label="Describe Your Skill In Greater Detail">
                {getFieldDecorator('description')(<Input.TextArea rows={3} />)}
            </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default NewSkillModal;