import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import NumberFormat from "react-number-format";

import {
  Row,
  Col,
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
import { LazyLoadImage } from "react-lazy-load-image-component";

import { categoryProduct, detailsProduct } from "../_actions/productActions";

// import RecentItemsBar from "../RecentItemsBar";

import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
    props.history.push("/login");
  }

  function handleAddToCart() {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  }
  function reloadHandler() {
    window.location.reload();
  }

  return (
    <>
      {loading ? (
        <Row
          justify="space-around"
          align="middle"
          style={{ padding: "10px", marginTop: "2rem" }}
        >
          <Col md={6} sm={6}>
            <Skeleton.Image
              style={{ width: "250px", height: "250px", objectFit: "contain" }}
            />
          </Col>
          <Col md={6} sm={6} style={{ marginTop: "2rem" }}>
            <Form>
              <Form.Item>
                <Skeleton.Input style={{ width: "250px", height: "1rem" }} />
              </Form.Item>
              <Form.Item>
                <Skeleton.Input style={{ width: "150px", height: "1rem" }} />
              </Form.Item>
              <Form.Item>
                <Skeleton.Input style={{ width: "200px", height: "1rem" }} />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <Skeleton.Input style={{ width: "300px", height: "300px" }} />
          </Col>
        </Row>
      ) : error ? (
        <Result
          status="500"
          subTitle={error}
          extra={
            <Button onClick={reloadHandler} icon={<RedoOutlined />}>
              RETRY
            </Button>
          }
        />
      ) : (
        <div style={{ margin: "1rem" }}>
          <div
            style={{
              margin: "auto",
              display: "block",
              backgroundColor: "white",
              padding: ".1rem",
            }}
          >
            <Row justify="space-around" style={{ marginTop: "3rem" }}>
              <Col md={6} sm={6}>
                <h3
                  style={{ fontSize: "1.3rem", color: "#434343", margin: "0" }}
                >
                  {product.product_name}
                </h3>
                <Image
                  src={"/" + product.image}
                  alt="shoes again"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                  }}
                />
              </Col>

              <Col style={{ paddingLeft: "20px" }} md={6} sm={6}>
                <p style={{ color: "#CD5C5C", margin: "0" }}>
                  <NumberFormat
                    value={product.price}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix="Kshs: "
                    suffix=" /="
                  />
                </p>
                <p style={{ color: "grey", marginBottom: "0" }}>
                  Reviews: (123){" "}
                </p>
                <Rate
                  style={{ color: "#434343", fontSize: "1rem" }}
                  disabled
                  allowHalf
                  defaultValue={product.ratings}
                />
                <Divider plain style={{ margin: ".5rem" }}></Divider>

                <p style={{ margin: "0" }}>Categorys': {product.category}</p>
                <span style={{ color: "grey", margin: "0" }}>
                  Shipping: 350/=
                </span>
                <p>Qty: {product.stock}</p>
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
                <Divider style={{ marginTop: ".5rem" }} />
                {userInfo ? (
                  <Row justify="space-around" style={{ margin: "1rem" }}>
                    <Button
                      style={{
                        border: "0",
                        textDecoration: "none",
                        color: "white",
                      }}
                      block
                      size="large"
                      className="cart"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </Button>
                  </Row>
                ) : (
                  <>
                    <Button
                      className="cart"
                      size="large"
                      onClick={loginHandler}
                      style={{
                        margin: ".5rem",
                        border: "none",
                      }}
                      block
                    >
                      <p style={{ color: "white" }}>
                        <b>SignIn to checkout </b>
                      </p>
                    </Button>
                    <Button
                      size="large"
                      className="cart"
                      style={{
                        margin: ".5rem",
                        boreder: "none",
                      }}
                      block
                    >
                      <p style={{ color: "white" }}>
                        <b>Continue Shopping </b>
                      </p>
                    </Button>
                  </>
                )}
                <Divider></Divider>
              </Col>
              <Col
              >
                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <RecentItemsBar title="Related Items" />
      {loadingCategory ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : errorCategory ? (
        <></>
      ) : (
        <div
          style={{
            maxWidth: "85%",
            margin: "auto",
            display: "block",
            height: "400px",
            alignItems: "center",
          }}
        >
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
          >
            {products.length === 0 ? (
              <Row justify="space-around" align="middle">
                <Col>
                  <Empty description="No category"></Empty>
                </Col>
              </Row>
            ) : (
              products.map((item) => (
                <Row key={item.id} justify="center" style={{ margin: "1rem" }}>
                  <Col>
                    <Card
                      style={{
                        width: "13rem",
                        height: "270px",
                        border: "0",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                      }}
                      cover={
                        <LazyLoadImage
                          src={"/" + item.image}
                          effect="blur"
                          alt="productimage"
                          style={{
                            width: "12.8rem",
                            height: "8.5rem",
                            display: "flex",
                            margin: "auto",
                          }}
                          // visibleByDefault={product.image}
                        />
                      }
                    >
                      <Link
                        to={`/product-detail/${item.id}/?category=${item.category}`}
                      >
                        <p
                          style={{
                            color: "#1890ff",
                            margin: "0",
                            fontSize: "0.9rem",
                          }}
                        >
                          {item.product_name}
                        </p>
                      </Link>
                      <Rate
                        allowHalf={true}
                        style={{
                          fontSize: "1rem",
                          color: "#434343",

                          marginBottom: ".6rem",
                        }}
                        defaultValue={item.ratings}
                      />
                      <p
                        style={{
                          color: "grey",
                          fontSize: ".8rem",
                          margin: "0",
                        }}
                      >
                        <NumberFormat
                          value={item.price}
                          thousandSeparator={true}
                          displayType={"text"}
                          prefix="Kshs: "
                          suffix=" /="
                        />
                      </p>
                    </Card>
                  </Col>
                </Row>
              ))
            )}
          </Carousel>
        </div>
      )}
    </>
  );
}
