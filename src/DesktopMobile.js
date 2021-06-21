import React, { useEffect } from "react";
import { CarouselItem } from "./Mobile/CarouselItem";
import { CarouselItems } from "./Desktop/CarouselItems";
import { useDispatch, useSelector } from "react-redux";
import {  Result } from "antd";
import { listProducts } from "./_actions/productActions";
import styled from "styled-components";
import { RefreshIcon } from "@heroicons/react/outline";


const renderSkeleton = [...Array(8).keys()].map((i) => {
  const Skeleton = styled.div`
  height:240px;
  width: 14rem;
  background-color: white;
  @media(max-width:767px){
    width:18rem;


  }

`
  return (
    <Skeleton
      key={i}
      className="mb-4"
    ></Skeleton>
  );
});

export default function DesktopMobile() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, [dispatch]);
  function reloadHandler() {
    window.location.reload();
  }

  return (
    <>
      <div className="mobile__carousel" style={{ marginTop: "5rem" }}>
        {loading ? (
          <Flex>{renderSkeleton}</Flex>
        ) : error ? (
          <Result
            status="500"
            subTitle={error}
            extra={
              <div className="flex flex-row justify-center content-center">
                <div
                  onClick={reloadHandler}
                  className="flex flex-row hover:cursor-pointer justify-center content-center space-x-4 ring-1 ring-gray-500 w-1/4"
                >
                  <RefreshIcon className="h-5 font-extralight" />
                  RETRY
                </div>
              </div>
            }
          />
        ) : (
          <Flex>
            {posts.map((item) => (
              <CarouselItem key={item.id} products={item} />
            ))}
          </Flex>
        )}
      </div>
      <div className="desktop__carousel">
        {loading ? (
          <Container>
            <Flex>{renderSkeleton}</Flex>
          </Container>
        ) : error ? (
          <div className="flex justify-center flex-row mt-8">
            <Result
              status="500"
              subTitle={error}
              extra={
                <div className="flex flex-row justify-center content-center">
                  <div
                    onClick={reloadHandler}
                    className="flex flex-row hover:cursor-pointer justify-center content-center space-x-4 ring-1 ring-gray-500 w-1/4"
                  >
                    <RefreshIcon className="h-5 font-extralight" />
                    RETRY
                  </div>
                </div>
              }
            />
          </div>
        ) : (
          <Container>
            <Flex>
              {posts.map((product) => (
                <CarouselItems key={product.id} product={product} />
              ))}
            </Flex>
          </Container>
        )}
      </div>
    </>
  );
}

const Container = styled.div`
  max-width: 83%;
  float: right;
  margin-top: 5rem;
  padding: 1.55rem;
  background-color: rgba(248, 248, 248, 0.2);
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
    justify-content: space-around;
    align-items: center;
  }
`;


