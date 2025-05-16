import React, { useState } from 'react';
import { Modal, Button } from 'antd';


const stories = {
  title: 'Antd/Dialog',
  component: Modal,
  tags: ['autodocs']
};
export default stories;

const Template = (args) => {
  const [open, setOpen] = useState(false);

  const showModal   = () => setOpen(true);
  const handleOk    = () => setOpen(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        type={args.triggerType || 'primary'}
        danger={args.primary}
        onClick={showModal}
      >
        {args.triggerText || 'Open Dialog'}
      </Button>

      <Modal
        {...args}
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
      >
      </Modal>
    </>
  );
};


export const DefaultDialog = Template.bind({});
DefaultDialog.args = {
  title: 'Default Dialog',
  okText: 'OK',
  cancelText: 'Cancel',
  children: (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit obcaecati
      iste alias iusto necessitatibus modi est explicabo atque nesciunt…
    </p>
  ),
};

export const DialogConfirmation = Template.bind({});
DialogConfirmation.args = {
  title: 'Confirmation',
  okText: 'Yes, Save',
  cancelText: 'Cancel',
  triggerText: 'Submit',
  danger: true,
  children: <p>Do you want to save this data?</p>,
};
