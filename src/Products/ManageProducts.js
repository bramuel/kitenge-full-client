import React, { useEffect, useState, Fragment, useRef, useCallback } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Row,
  Col,
  message,
  Skeleton,
  Result,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  updateProduct,
} from "../_actions/productActions";
import {
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const renderTH = [...Array(4).keys()].map((i) => {
  return (
    <Fragment key={i}>
          <th >
      <Skeleton.Input style={{ width: "3.5rem", height: "1.5rem" }} />
    </th>
    </Fragment>

  );
});


export default function ManageProducts() {
  const ProductList = useSelector((state) => state.productList);
  const ProductUpdate = useSelector((state) => state.productUpdate);
  const { product, loadingUpdate, errorUpdate } = ProductUpdate;
  const { posts, loading, error } = ProductList;

  const ProductDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = ProductList;
  const renderTB = [...Array(4).keys()].map((i) => {
    return (
      <Fragment key={i}>
              <td>
        <Skeleton.Input style={{ width: "3.5rem", height: "1.5rem" }} />
      </td>
      </Fragment>

    );
  });

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const mountedRef = useRef(true)
  useEffect(() => {
    dispatch(listProducts());
    return ()=>{mountedRef.current=false}
  }, []);

  const productEdit = useCallback( () => {
    dispatch(
       updateProduct(id, name, shop, price, image, category, description)
    );
    setTimeout(() => {
      dispatch(listProducts());
      setIsModalVisible(false);
      if (product) message.success("Product update successfully");
    }, 1000);
  })
  const deleteHandler = () => {
    dispatch(deleteProduct(id));
  };

  // const productAdd = (e) => {
  //   e.preventDefault();
  //   dispatch(saveProduct(name, shop, price, image, category, description));
  //   message.success("Product added succefully");
  //   setTimeout(() => {
  //     props.history.push("/product/manage");
  //   }, 2000);
  // };

  const showModal = (item) => {
    setIsModalVisible(true);
    setId(item.id);
    setImage(item.image);

    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };
  function handleReload () {
    window.location.reload();
  };

  function handleOk(){
    setIsModalVisible(false);
  };

  function handleCancel (){
    setIsModalVisible(false);
  };

  const prop = {
    name: "file",
    listType: "picture",
    action: "/upload",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve);
          };
        };
      });
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        // dispatch(saveProduct(name, shop, price, image, description));
        setShowLoading(false);
      }
      if (info.file.status === "done") {
        setShowButton(false);
        // const regex = /.jpeg/;
        // var mapObjs = {
        //   svg
        // }
        // const filename = info.file.name.replace(regex, ".webp");
        // setImage('/'+filename);
        setImage(info.file.name);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  return (
    <Fragment>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          layout="vertical"
          name="basic"
          encType="multipart/form-data"
          size="large"
        >
          <img
            src={"/" + image}
            style={{ width: "70px", marginBottom: ".3rem" }}
            alt={name}
          />
          <Form.Item
            required
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          >
            <Input
              value={name}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input hidden type="text" />
          </Form.Item>
          <Form.Item
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input
              value={price}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />

            <input
              hidden
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            hidden
            name="image"
            name="image"
            onChange={(e) => setImage(e.target.value)}
          >
            <Input value={image} />

            <input
              hidden
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            id="shop"
            name="shop"
            onChange={(e) => setShop(e.target.value)}
          >
            <Input
              value={shop}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input
              hidden
              type="text"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <Input
              value={category}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input
              hidden
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input.TextArea value={description} />
            <input
              hidden
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Row justify="space-around" align="middle">
            <Col>
              <Form.Item>
                <Upload {...prop}>
                  <Button icon={<UploadOutlined />}>UPLOAD IMAGE</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  loading={showLoading}
                  disabled={showButton}
                  htmlType="submit"
                  type="primary"
                  onClick={() => productEdit()}
                  style={{ backgroundColor: "#fdba45", border: "0" }}
                >
                  COMPLETE
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <main>
        {loading ? (
          <Row justify="space-around" align="middle">
            <Col>
              <table style={{ marginTop: "5rem" }}>
                <thead>
                  <tr>{renderTH}</tr>
                </thead>
                <tbody>
                  <tr>{renderTB}</tr>
                  <tr>{renderTB}</tr>
                  <tr>{renderTB}</tr>
                </tbody>
              </table>
            </Col>
          </Row>
        ) : error ? (
          <Row
            style={{ marginTop: "5rem" }}
            justify="space-around"
            align="middle"
          >
            <Col>
              <Result
                status="500"
                subTitle={error}
                extra={
                  <Button icon={<ReloadOutlined />} onClick={handleReload}>
                    RETRY
                  </Button>
                }
              />
            </Col>
          </Row>
        ) : (
          // <Table dataSource={posts} columns={columns}/>
          <Row
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
            justify="space-around"
            align="middle"
          >
            <Col>
              <table className="tableClass" style={{ width: "100%" }}>
                <thead>
                  <th>name</th>
                  <th>price</th>
                  <th>image</th>
                  <th>action</th>
                </thead>
                <tbody>
                  {posts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td>{item.price}</td>
                      <td>
                        <img
                          src={"/" + item.image}
                          style={{ width: "50px", height: "auto" }}
                          alt={item.product_name}
                        />
                      </td>
                      <td>
                        <Row justify="space-around">
                          <Col>
                            <Button
                              onClick={() => showModal(item)}
                              icon={<EditOutlined style={{color:"green"}}/>}
                              style={{margin:".2rem", borderRadius:"5px"}}
                            ></Button>
                          </Col>
                          <Col>
                            <Button
                              icon={<DeleteOutlined style={{color:"rgba(207, 0, 15, 0.6)"}} />}
                              onClick={() => deleteHandler(item.id)}
                              style={{margin:".2rem", backgroundColor:"rgba(0, 0, 0,0.6)", borderRadius:"5px"}}

                              

                            ></Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        )}
      </main>
    </Fragment>
  );
}
