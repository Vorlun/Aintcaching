import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Spin, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api";

const { Meta } = Card;

interface IPhone {
  id: string;
  title: string;
  price: number;
  image: string;
  memories: string[];
  isDelivery: boolean;
}

interface PhonesListProps {
  setEditingPhone: (phone: IPhone | null) => void;
}

const PhonesList: React.FC<PhonesListProps> = ({ setEditingPhone }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<IPhone[]>({
    queryKey: ["phones"],
    queryFn: async () => {
      const { data } = await api.get("/phones");
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/phones/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
      message.success("Phone deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete phone!");
    },
  });

  if (isLoading) return <Spin size="large" />;
  if (isError) return <p>❌ Error loading phones</p>;

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" , height:"100px"}}>
      {data?.map((phone) => (
        <Card
          key={phone.id}
          style={{ width: 300 ,height:400 }}
          cover={<img draggable={false} alt={phone.title} src={phone.image}  />}
          actions={[
            <EditOutlined key="edit" onClick={() => setEditingPhone(phone)} />,
            <DeleteOutlined
              key="delete"
              onClick={() => deleteMutation.mutate(phone.id)}
            />,
          ]}
        >
          <Meta
            title={`${phone.title} - $${phone.price}`}
            description={
              <>
                <p>💾 Memories: {phone.memories.join(", ")}</p>
                <p>
                  🚚 Delivery: {phone.isDelivery ? "Available" : "Not available"}
                </p>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default PhonesList;
