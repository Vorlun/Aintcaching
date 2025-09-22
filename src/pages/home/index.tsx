import React, { useState } from "react";
import PhoneForm from "./components/form";
import PhonesList from "./components/phonecard";

interface IPhone {
  id?: string;
  title: string;
  price: number;
  image: string;
  memories: string[];
  isDelivery: boolean;
}

const App = () => {
  const [editingPhone, setEditingPhone] = useState<IPhone | null>(null);

  return (
    <div className="flex flex-col gap-10 p-6">
      <PhoneForm
        editingPhone={editingPhone}
        setEditingPhone={setEditingPhone}
      />
      <PhonesList setEditingPhone={setEditingPhone} />
    </div>
  );
};

export default React.memo(App);
