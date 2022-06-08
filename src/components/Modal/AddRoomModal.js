import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { Modal, Form, Input } from "antd";
import { addDocs } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => {
  const { isVisibleAddRoom, setIsVisibleAddRoom } = useContext(AppContext);
  const { uid } = useContext(AuthContext);
  const [form] = Form.useForm();

  function addRoom() {
    try {
      form
        .validateFields(["name", "description"])
        .then((values) => {
          setIsVisibleAddRoom(false);
          form.resetFields();
          addDocs("rooms", { ...values, members: [uid] });
        })
        .catch((err) => console.log(err));
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  }
  function handleOk() {
    addRoom();
  }
  function handleAddRoomKeyDown(e) {
    if (e.key === "Enter") {
      addRoom();
    }
  }
  function handleCancel() {
    setIsVisibleAddRoom(false);
  }
  return (
    <Modal
      title="新しいチャットルームを追加する"
      visible={isVisibleAddRoom}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onKeyDown={handleAddRoomKeyDown}>
        <Form.Item
          name="name"
          label="ルーム名"
          rules={[{ required: true, message: "ルーム名を入力してください。" }]}
        >
          <Input placeholder="ルーム名を入力する" />
        </Form.Item>
        <Form.Item
          name="description"
          label="説明"
          rules={[{ required: true, message: "説明を入力してください。" }]}
        >
          <Input placeholder="説明を入力する" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
