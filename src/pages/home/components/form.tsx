import React, { useEffect } from "react";
import { Form, Input, Button, InputNumber, Radio, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api";

interface IPhone {
  id?: string;
  title: string;
  price: number;
  image: string;
  memories: string[];
  isDelivery: boolean;
}

interface PhoneFormProps {
  editingPhone: IPhone | null;
  setEditingPhone: (phone: IPhone | null) => void;
}

const PhoneForm: React.FC<PhoneFormProps> = ({
  editingPhone,
  setEditingPhone,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (newPhone: IPhone) => {
      const { data } = await api.post("/phones", newPhone);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
      form.resetFields();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (phone: IPhone) => {
      const { data } = await api.put(`/phones/${phone.id}`, phone);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
      form.resetFields();
      setEditingPhone(null);
    },
  });

  useEffect(() => {
    if (editingPhone) {
      form.setFieldsValue(editingPhone);
    }
  }, [editingPhone, form]);

  const onFinish = (values: IPhone) => {
    const phone: IPhone = {
      id: editingPhone?.id,
      title: values.title,
      price: values.price,
      image: values.image,
      memories: values.memories,
      isDelivery: values.isDelivery,
    };

    if (editingPhone) {
      updateMutation.mutate(phone);
    } else {
      createMutation.mutate(phone);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
{/* 
      <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}

      <Form.Item name="memories" label="Memories" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          options={[
            { value: "128gb", label: "128 GB" },
            { value: "256gb", label: "256 GB" },
            { value: "512gb", label: "512 GB" },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="isDelivery"
        label="Delivery"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value={true}>Available</Radio>
          <Radio value={false}>Not Available</Radio>
        </Radio.Group>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {editingPhone ? "Update Phone" : "Add Phone"}
      </Button>
      {editingPhone && (
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            form.resetFields();
            setEditingPhone(null);
          }}
        >
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default PhoneForm;
