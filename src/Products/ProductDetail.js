import React, { useEffect, useState } from "react";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Divider,
  Rate,
  Image,
  Skeleton,
  Form,
  Empty,
  Result,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import { categoryProduct, detailsProduct } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import RecentItemsBar from "../RecentItemsBar";

import NumberFormat from "react-number-format";
import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";

const { Meta } = Card;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const { Title, Text } = Typography;

export default function ProductDetail(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const categoryDetail = useSelector((state) => state.categoryList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [qty, setQty] = useState(1);
  const { product, loading, error } = productDetail;
  const { loadingCategory, products, errorCategory } = categoryDetail;
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const category = params.getAll("category");

  const renderSkeleton = [...Array(4).keys()].map((i) => {
    return (
      <Col key={i}>
        <Form layout="vertical">
          <Form.Item>
            <Skeleton.Input style={{ width: "16rem", height: "150px" }} />{" "}
            <br />
          </Form.Item>

          <Form.Item>
            <Skeleton.Input
              style={{ width: "150px", height: "1rem" }}
              active={true}
            />
          </Form.Item>
          <Form.Item>
            <Skeleton.Input
              style={{ width: "200px", height: "1rem" }}
              active={true}
            />
          </Form.Item>
        </Form>
      </Col>
    );
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    dispatch(categoryProduct(category));
    return () => {};
  }, []);

  function loginHandler() {
    return props.history.push("/login");
  }

  function handleAddToCart() {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  }
  function reloadHandler () {
    window.location.reload();
  };

  return (
    <>
      <main style={{ padding: "5px" }}>
        {loading ? (
          <Row
            justify="space-around"
            align="middle"
            style={{ padding: "10px", marginTop:"2rem" }}
          >
            <Col md={6} sm={6}>
              <Skeleton.Image style={{ width: "250px", height: "250px", objectFit:"contain" }} />
            </Col>
            <Col md={6} sm={6} style={{marginTop:"2rem"}}>
              <Form>
                <Form.Item>
                  <Skeleton.Input style={{ width: "250px", height:"1rem" }} />
                </Form.Item>
                <Form.Item>
                  <Skeleton.Input style={{ width: "150px", height:"1rem" }} />
                </Form.Item>
                <Form.Item>
                  <Skeleton.Input style={{ width: "200px", height:"1rem" }} />
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "300px", height: "300px" }} />
            </Col>
          </Row>
        ) : error ? (
          <Result status="500" subTitle={error}           extra={
            <Button onClick={reloadHandler} icon={<RedoOutlined />}>
              RETRY
            </Button>
          } />
        ) : (
          <Row
            style={{ padding: "10px" }}
            justify="space-around"
            align="middle"
          >
            <Col md={6} sm={6}>
              <Image
                src={"/" + product.image}
                alt="shoes again"
                style={{ width: "250px", height: "250px", objectFit:"contain" }}
              />
            </Col>

            <Col style={{ padding: "20px" }} md={6} sm={6}>
              <h2 level={3}>{product.product_name}</h2>
              <h3>Reviews: </h3>{" "}
              <Rate
                style={{ color: "#282c35" }}
                disabled
                allowHalf
                defaultValue={product.ratings}
              />
              <Divider plain></Divider>
              <h3 style={{ color: "#CD5C5C" }}>
                <NumberFormat
                  value={product.price}
                  thousandSeparator={true}
                  displayType={"text"}
                  prefix="Kshs: "
                  suffix=" /="
                />
              </h3>
              <h3 level={5}>Categorys': {product.category}</h3>
              <h3>Shipping: {product.category}</h3>
              <h3>Qty: </h3>
              <select
                defaultValue={qty}
                style={{ width: 120 }}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <Divider plain></Divider>
              {userInfo ? (
                <Row justify="space-around" style={{ margin: "2rem" }}>
                  <Button
                    style={{
                      display: "inline-block",
                      border: "0",
                      textDecoration: "none",
                      color: "black",
                    }}
                    block
                    size="large"
                    className="cart"
                    onClick={handleAddToCart}
                  >
                    <b style={{ color: "white" }}>Add cart</b>
                  </Button>
                </Row>
              ) : (
                <aside>
                  <Button
                    type="primary"
                    className="cart"
                    onClick={loginHandler}
                    size="large"
                    style={{
                      border: "none",
                      textDecoration: "none",
                      margin: "1rem",
                    }}
                    block
                  >
                    SIGNIN TO CHECKOUT
                  </Button>
                  <Button
                    className="reverse__cart"
                    size="large"
                    style={{
                      border: "none",
                      textDecoration: "none",
                      margin: "1rem",
                    }}
                    block
                  >
                    <Title level={5}>CONTINUE SHOPPING</Title>
                  </Button>
                </aside>
              )}
              <Divider plain></Divider>
            </Col>
            <Col sm={6} md={6}>
              <Card style={{ overflowY: "scroll" }}>
                <Title level={3}>Description</Title>
                <Text>{product.description}</Text>
              </Card>
            </Col>
          </Row>
        )}
        <RecentItemsBar title="Related Items" />
        {loadingCategory ? (
          <Row justify="space-around" align="middle">
            {renderSkeleton}
          </Row>
        ) : errorCategory ? (
          <></>
        ) : (
          <div>
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
            >
              {products.length === 0 ? (
                <Row justify="space-around" align="middle">
                  <Col>
                    <Empty description="No category"></Empty>
                  </Col>
                </Row>
              ) : (
                products.map((item) => (
                  <Row key={item.id} justify="space-around" align="middle">
                    <Col>
                      <a
                        href={`/product-detail/${item.id}/?category=${item.category}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card
                          style={{ height: "350px", border: "0" }}
                          cover={
                            <LazyLoadImage
                              src={"/" + item.image}
                              effect="blur"
                              alt="productimage"
                              style={{
                                width: "auto",
                                height: "auto",
                                maxWidth: "15.8rem",
                                maxHeight: "10.9rem",
                                display: "flex",
                                margin: "auto",
                              }}
                              // visibleByDefault={product.image}
                            />
                          }
                        >
                          <Meta
                            title={item.product_name}
                            description={item.shop}
                          />

                          <Text level={3}>ksh {item.price}</Text>
                        </Card>
                      </a>
                    </Col>
                  </Row>
                ))
              )}
            </Carousel>
          </div>
        )}
      </main>
    </>
  );
}
